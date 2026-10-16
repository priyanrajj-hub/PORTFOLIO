// api/tts.ts
// Vercel Serverless Function: High-performance text-to-speech endpoint.
// Supports licensed stock presets from Google Cloud Text-to-Speech, Gemini Audio, and ElevenLabs.
// All keys remain strictly server-side. No copyrighted audio or likeness cloning.

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 audio generations per minute per IP
const MAX_TEXT_LENGTH = 600;

// Periodic cleanup of expired rate limits
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

// Preset configurations for Google Cloud Text-to-Speech
const GOOGLE_TTS_PRESETS = {
  jarvis: {
    voiceName: 'en-GB-Neural2-B', // Licensed Google Cloud British male preset
    languageCode: 'en-GB',
    speakingRate: 1.0,
    pitch: -1.0,
    geminiVoice: 'Puck',
  },
  sosuke: {
    voiceName: 'en-GB-Neural2-D', // Deep, deliberate male preset
    languageCode: 'en-GB',
    speakingRate: 0.88,
    pitch: -3.5,
    geminiVoice: 'Charon',
  },
};

const MULTILINGUAL_GOOGLE_VOICES: Record<string, { voiceName: string; languageCode: string }> = {
  en: { voiceName: 'en-GB-Neural2-B', languageCode: 'en-GB' },
  ta: { voiceName: 'ta-IN-Standard-B', languageCode: 'ta-IN' },
  hi: { voiceName: 'hi-IN-Neural2-B', languageCode: 'hi-IN' },
  te: { voiceName: 'te-IN-Standard-B', languageCode: 'te-IN' },
  es: { voiceName: 'es-ES-Neural2-B', languageCode: 'es-ES' },
  fr: { voiceName: 'fr-FR-Neural2-B', languageCode: 'fr-FR' },
  de: { voiceName: 'de-DE-Neural2-B', languageCode: 'de-DE' },
  ja: { voiceName: 'ja-JP-Neural2-C', languageCode: 'ja-JP' },
};

export default async function handler(req: any, res: any) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // 1. Rate Limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      fallback: true,
      error: 'Audio synthesis rate limit exceeded. Please wait a moment before generating more voice transmissions.'
    });
  }

  // 2. Body Validation
  const { text, persona = 'jarvis', language = 'en' } = req.body || {};
  const rawText = typeof text === 'string' ? text.trim() : '';

  if (!rawText) {
    return res.status(400).json({ error: 'Text cannot be empty.' });
  }

  if (rawText.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({
      error: `Text exceeds maximum allowed length of ${MAX_TEXT_LENGTH} characters.`
    });
  }

  // Sanitize text for speech: strip markdown symbols, URLs, asterisks, brackets
  const cleanText = rawText
    .replace(/https?:\/\/\S+/g, 'link')
    .replace(/[*#_`~>[\]()]/g, '')
    .trim();

  const personaKey = persona === 'sosuke' ? 'sosuke' : 'jarvis';
  const preset = GOOGLE_TTS_PRESETS[personaKey];

  // 3. Provider A: ElevenLabs (if ELEVENLABS_API_KEY exists)
  const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
  if (elevenLabsApiKey) {
    try {
      const voiceId = personaKey === 'sosuke'
        ? (process.env.VOICE_ID_SOSUKE || 'nPczCjzI2devNBz1zQrb') // "Brian" stock voice
        : (process.env.VOICE_ID_JARVIS || 'JBFqnCBsd6RMkjVDRZzb'); // "George" stock voice

      const elevenUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      const elevenResp = await fetch(elevenUrl, {
        method: 'POST',
        headers: {
          'xi-api-key': elevenLabsApiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: personaKey === 'sosuke' ? 0.78 : 0.65,
            similarity_boost: 0.85
          }
        })
      });

      if (elevenResp.ok) {
        const audioBuffer = await elevenResp.arrayBuffer();
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        return res.status(200).send(Buffer.from(audioBuffer));
      } else {
        console.warn('ElevenLabs API returned status', elevenResp.status);
      }
    } catch (e) {
      console.warn('ElevenLabs synthesis failed, checking Google fallback:', e);
    }
  }

  // 4. Provider B: Google Cloud Text-to-Speech API (via GEMINI_API_KEY)
  const geminiApiKey =
    process.env.GEMINI_API_KEY ||
    process.env.Gemini_API_key ||
    process.env.VITE_GEMINI_API_KEY;

  if (geminiApiKey) {
    try {
      // Determine voice according to selected language
      const langVoice = MULTILINGUAL_GOOGLE_VOICES[language] || {
        voiceName: preset.voiceName,
        languageCode: preset.languageCode
      };

      const googleTtsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${geminiApiKey}`;
      const googleResp = await fetch(googleTtsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: cleanText },
          voice: {
            languageCode: langVoice.languageCode,
            name: language === 'en' ? preset.voiceName : langVoice.voiceName,
            ssmlGender: 'MALE'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: language === 'en' ? preset.speakingRate : 1.0,
            pitch: language === 'en' ? preset.pitch : 0.0
          }
        })
      });

      if (googleResp.ok) {
        const data = await googleResp.json();
        if (data.audioContent) {
          const audioBuffer = Buffer.from(data.audioContent, 'base64');
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
          return res.status(200).send(audioBuffer);
        }
      } else {
        // If Google Cloud Text-to-Speech is not enabled on this key, attempt Gemini 2.0 audio generation
        const geminiAudioUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
        const geminiResp = await fetch(geminiAudioUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `Speak the following message clearly with natural diction: "${cleanText}"` }]
            }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: preset.geminiVoice
                  }
                }
              }
            }
          })
        });

        if (geminiResp.ok) {
          const gemData = await geminiResp.json();
          const inlineData = gemData?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (inlineData?.data) {
            const buffer = Buffer.from(inlineData.data, 'base64');
            res.setHeader('Content-Type', inlineData.mimeType || 'audio/wav');
            res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
            return res.status(200).send(buffer);
          }
        }
      }
    } catch (gErr) {
      console.warn('Google TTS synthesis failed:', gErr);
    }
  }

  // 5. Fallback Notice: instruct client to use window.speechSynthesis
  return res.status(200).json({
    fallback: true,
    notice: 'Using browser speech synthesis fallback.'
  });
}
