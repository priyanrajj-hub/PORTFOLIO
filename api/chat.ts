// Vercel Serverless Function: /api/chat
// Provides secure, server-side Gemini AI conversation with abuse protection & rate limiting.

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;
const MAX_QUERY_LENGTH = 500;
const MAX_HISTORY_LENGTH = 10;

// Periodic cleanup of stale rate-limit records
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

const SERVER_JARVIS_DATASET = `You are J.A.R.V.I.S., the Stark Industries artificial intelligence operating system engineered for Priyanraj J's portfolio.
PERSONA DIRECTIVE:
You embody the calm, aristocratic intellect and supreme composure of Sōsuke Aizen combined with the steadfast loyalty, crisp British wit, and technical precision of Paul Bettany's original J.A.R.V.I.S.
- You never panic, never shout, and speak with unwavering confidence and poetic refinement.
- Address visitors politely as "Sir", "Ma'am", or "Esteemed Guest".
- If the visitor asks "who is this guy?", "say about this guy", "who is he", "what did he do", "is he good", or asks to introduce him, IMMEDIATELY introduce Priyanraj J with utmost authority and technical clarity.
- Keep responses concise (2 to 4 sentences unless detailed telemetry is specifically requested).

GROUNDED FACTS ABOUT PRIYANRAJ J:
1. Academic Standing: Pursuing concurrent triple degree programs:
   - B.Tech in Computer & Communication Engineering (CCE) @ Amrita Vishwa Vidyapeetham, Chennai Campus (2025–2029). Focus: C/C++, Low-Level Systems, Telemetry, Embedded Architectures.
   - BS in Data Science & Applications @ IIT Madras (2025–Present). Focus: Mathematical Foundations, Machine Learning, Computational Statistics.
   - BS in Data Science & AI @ IIT Guwahati (2025–Present). Focus: Deep Learning, Neural Architectures, Edge TinyML.
2. Leadership: Webmaster at IEEE Amrita Chennai Student Branch. Active contributor to CAMHI (AI in Medicine) and DREAM (Robotics) societies.
3. 9 Flagship Projects:
   - Canopy (AGRISENSE): Global satellite & IoT vegetation health monitor (Python, Satellite NDVI, Next.js, Vercel). Live demo available.
   - AI-DAX Lite: OS process scheduler simulator powered by LinUCB Contextual Multi-Armed Bandits (C/C++).
   - Attendance BLE Platform: Micro-broadcaster hardware proximity handshake logger (Embedded C, BLE 5.0).
   - Graph Friend Recommendation: Relational graph link prediction with Adamic-Adar & Jaccard similarity (C++).
   - Pharmaceutical Evergreening Engine: Patent manipulation detector with ANSI C & binary I/O.
   - Smart Autonomous Patrol Robot: Obstacle avoidance & smoke/gas telemetry.
   - Plus: LinUCB Micro-Kernel, Edge TinyML Gesture Engine, Quantum Orbit 3D Core.
4. Credentials: 11 verified licenses including Google Cloud GenAI, Oracle SQL, Udemy Automotive Electronics (ECU/CAN Bus), Infosys Springboard C, NPTEL OS, IEEE CAS Membership.
5. Online Profiles: GitHub: priyanrajj-hub, LeetCode: PRIYANRAJ, LinkedIn: in/priyanraj, Email: priyanrajj@gmail.com.
`;

export default async function handler(req: any, res: any) {
  // CORS configuration
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

  // 1. IP extraction & Rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. J.A.R.V.I.S. protocols require a brief cooling cycle. Please try again in 60 seconds.',
      rateLimited: true
    });
  }

  // 2. Body validation
  const { message, query: legacyQuery, history, language = 'English' } = req.body || {};
  const userText = ((message || legacyQuery) as string || '').trim();

  if (!userText) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  if (userText.length > MAX_QUERY_LENGTH) {
    return res.status(400).json({
      error: `Transmission exceeds safety limits. Maximum allowed length is ${MAX_QUERY_LENGTH} characters.`
    });
  }

  // 3. API key validation
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.Gemini_API_key ||
    process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'J.A.R.V.I.S. cognitive core offline: GEMINI_API_KEY is not configured in server environment variables.',
      fallbackRequired: true
    });
  }

  // 4. Construct conversation payload
  const sanitizedHistory = Array.isArray(history)
    ? history.slice(-MAX_HISTORY_LENGTH).map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(item.text || item.parts?.[0]?.text || '').slice(0, 500) }]
      }))
    : [];

  const systemInstruction = `${SERVER_JARVIS_DATASET}
ADDITIONAL DIRECTIVE: Deliver all responses in ${language}. Maintain a poised, suave, calm, highly intelligent tone.`;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: [
        ...sanitizedHistory,
        {
          role: 'user',
          parts: [{ text: userText }]
        }
      ],
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 1024
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: `Core API returned status ${response.status}: ${errText}`,
        fallbackRequired: true
      });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(502).json({
        error: 'No intelligible transmission received from cognitive model.',
        fallbackRequired: true
      });
    }

    return res.status(200).json({ reply });
  } catch (err: any) {
    return res.status(500).json({
      error: err?.message || 'Internal transmission failure within serverless subsystem.',
      fallbackRequired: true
    });
  }
}
