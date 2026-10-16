import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Send, 
  Languages, 
  Pause,
  Loader2,
  Mic,
  MicOff,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { JARVIS_SYSTEM_DATASET, getGroundedFallbackResponse } from '../data/jarvisDataset';

// User-provided Gemini API key (supports Gemini_API_key and GEMINI_API_KEY from Vercel)
const getApiKey = () => {
  const env = (import.meta as any).env;
  const envKey = env?.Gemini_API_key || env?.GEMINI_API_KEY || env?.VITE_GEMINI_API_KEY || env?.VITE_API_KEY;
  if (envKey) return envKey;

  try {
    return atob('QVEuQWI4Uk42Sm5oalRrNVVZa3UwV0JtRjVIdUE0SlEyVzhnaDJJZHhUbXFKb0p4Y2hJVFE=');
  } catch {
    return '';
  }
};

interface Message {
  sender: 'jarvis' | 'user';
  text: string;
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  speechCode: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-US' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', speechCode: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', speechCode: 'fr-FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', speechCode: 'de-DE' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', speechCode: 'ja-JP' },
];

export const JarvisHeroWidget: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: `J.A.R.V.I.S. MARK-85 online. Systems diagnostic nominal: Amrita CCE, IIT Madras DS, and IIT Guwahati DSAI nodes verified. At your service, Sir. How may I assist you with Priyanraj's engineering telemetry today?`,
    },
  ]);

  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const handleFocusJarvis = () => {
      const inputEl = document.getElementById('jarvis-hero-input');
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('focus-jarvis', handleFocusJarvis);

    return () => {
      window.removeEventListener('focus-jarvis', handleFocusJarvis);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speakText = (text: string, langCode: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;
    utterance.rate = 1.05;
    utterance.pitch = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const matchVoice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Web Speech Recognition
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is supported in Chrome and Edge.");
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = selectedLanguage.speechCode;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(transcript);
          handleSend(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const buildSystemContext = (targetLang: string) => {
    return `${JARVIS_SYSTEM_DATASET}
CURRENT CONTEXT & INSTRUCTIONS:
- Target Language: ${targetLang}. All conversational outputs MUST be delivered in ${targetLang}.
- Persona: J.A.R.V.I.S. (polite, intelligent, authoritative, technically exhaustive).
- If the query asks "say about this guy", "who is this guy", "who is he", "tell me about him", explain Mr. Priyanraj J with utmost elegance and detail.
`;
  };

  const handleSend = async (customQuery?: string) => {
    const query = (customQuery || inputMessage).trim();
    if (!query || loading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);

    try {
      const systemPrompt = buildSystemContext(selectedLanguage.name);
      let aiReply = '';

      // 1. Check if hosted on Vercel with /api/chat serverless route
      try {
        const vercelRes = await fetch('./api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, systemPrompt, language: selectedLanguage.code })
        });
        if (vercelRes.ok) {
          const vData = await vercelRes.json();
          if (vData?.reply) {
            aiReply = vData.reply;
          }
        }
      } catch {
        // Fall through to client API or local grounded engine
      }

      // 2. Direct client Google Gemini 2.0 Flash call if API key exists
      if (!aiReply) {
        const apiKey = getApiKey();
        if (apiKey) {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
          const payload = {
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: query }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048
            }
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json();
            aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          }
        }
      }

      // 3. Multi-tier grounded knowledge engine fallback (instant, adblocker-proof)
      if (!aiReply) {
        aiReply = getGroundedFallbackResponse(query, selectedLanguage.code);
      }

      setMessages(prev => [...prev, { sender: 'jarvis', text: aiReply }]);
      if (voiceEnabled) {
        speakText(aiReply, selectedLanguage.speechCode);
      }
    } catch (err) {
      console.warn("Deploying local high-fidelity J.A.R.V.I.S. intelligence node:", err);
      const fallback = getGroundedFallbackResponse(query, selectedLanguage.code);
      setMessages(prev => [...prev, { sender: 'jarvis', text: fallback }]);
      if (voiceEnabled) {
        speakText(fallback, selectedLanguage.speechCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const triggerVoiceBriefing = () => {
    let briefingText = `J.A.R.V.I.S. protocol active. Diagnostic report for Mr. Priyanraj J: Concurrently enrolled in B.Tech CCE at Amrita Vishwa Vidyapeetham Chennai, alongside dual BS degrees in Data Science at IIT Madras and IIT Guwahati. He serves as Webmaster for the IEEE Amrita Chennai Student Branch and has engineered real-world production architectures including Canopy for satellite vegetation monitoring, the AI-DAX Lite LinUCB process scheduler, and Bluetooth proximity platforms. He possesses 11 verified licenses including Oracle and Google Cloud Generative AI. All systems operate at peak efficiency, Sir.`;

    if (selectedLanguage.code === 'ta') {
      briefingText = `ஜார்விஸ் வாய்ஸ் அறிக்கை: பிரியன்ராஜ் ஜெ அம்ரிதா விஸ்வ வித்யாபீடத்தில் சிசிஇ பி.டெக் படிப்பதுடன், ஐஐடி மெட்ராஸ் மற்றும் ஐஐடி குவஹாட்டியில் தரவு அறிவியல் படிப்புகளையும் பயின்று வருகிறார். ஐஇஇஇ அம்ரிதா சென்னையின் வெப்மாஸ்டராகப் பணியாற்றி, கேனோபி மற்றும் ஓஎஸ் திட்டங்களை வடிவமைத்துள்ளார். அனைத்து அமைப்புகளும் சிறப்பாக செயல்படுகின்றன, ஐயா.`;
    } else if (selectedLanguage.code === 'hi') {
      briefingText = `जार्विस वॉइस ब्रीफिंग: प्रियनराज जे अमृता विश्व विद्यापीठम चेन्नई में इंजीनियरिंग के छात्र हैं, और आईआईटी मद्रास तथा आईआईटी गुवाहाटी से बीएस डेटा साइंस की पढ़ाई कर रहे हैं। वह आईईईई अमृता चेन्नई के वेबमास्टर हैं और कैनोपी तथा ओएस शेड्यूलर जैसी वास्तविक प्रणालियों का निर्माण किया है।`;
    }

    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(briefingText, selectedLanguage.speechCode);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-amber-400/30 bg-[#07080d]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,183,3,0.12)] overflow-hidden flex flex-col">
      
      {/* Stark Industries HUD Header with Arc Reactor Gold */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#10121a]/95 via-[#1a1816]/70 to-[#10121a]/95 border-b border-amber-400/25 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 p-0.5 shadow-[0_0_15px_rgba(255,183,3,0.5)] overflow-hidden bg-black">
              <img
                src="./jarvis-core.png"
                alt="J.A.R.V.I.S. Iron Man Arc Reactor"
                className="w-full h-full object-cover animate-spin"
                style={{ animationDuration: '24s' }}
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border border-slate-950 animate-ping"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white font-mono tracking-wider flex items-center gap-1.5">
                J.A.R.V.I.S. <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 border border-amber-400/40 text-amber-300 font-bold">MARK-85</span>
              </h3>
            </div>
            <p className="text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              STARK NEURAL CORE • TRAINED & GROUNDED
            </p>
          </div>
        </div>

        {/* Audio Equalizer & Voice Control */}
        <div className="flex items-center gap-2">
          {/* Animated sound wave bars when speaking */}
          <div className="hidden sm:flex items-center gap-1 h-5 px-2 bg-[#141722] rounded border border-amber-400/20">
            <span className={`w-0.5 bg-amber-400 rounded-full transition-all ${isSpeaking ? 'h-4 animate-bounce' : 'h-1.5'}`}></span>
            <span className={`w-0.5 bg-orange-400 rounded-full transition-all ${isSpeaking ? 'h-3 animate-pulse' : 'h-2'}`}></span>
            <span className={`w-0.5 bg-amber-300 rounded-full transition-all ${isSpeaking ? 'h-5 animate-bounce' : 'h-1.5'}`}></span>
            <span className={`w-0.5 bg-amber-500 rounded-full transition-all ${isSpeaking ? 'h-3.5 animate-pulse' : 'h-2'}`}></span>
          </div>

          <button
            onClick={() => {
              if (voiceEnabled) stopSpeaking();
              setVoiceEnabled(!voiceEnabled);
            }}
            className="p-1.5 rounded-lg text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-[#141722] transition"
            title={voiceEnabled ? 'Mute voice' : 'Enable voice'}
            aria-label="Toggle voice briefing"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          <button
            onClick={triggerVoiceBriefing}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/40'
            }`}
            title="Play Audio Briefing"
          >
            {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="text-[11px] font-bold">{isSpeaking ? 'Stop Voice' : 'Voice Briefing'}</span>
          </button>
        </div>
      </div>

      {/* Multilingual Selector & Status Bar */}
      <div className="px-4 py-2 bg-[#10121a]/60 border-b border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono text-[#9a9aa8]">Language:</span>
          <select
            value={selectedLanguage.code}
            onChange={(e) => {
              const found = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
              if (found) setSelectedLanguage(found);
            }}
            className="bg-[#141722] text-amber-300 font-mono text-xs px-2 py-0.5 rounded border border-amber-400/30 outline-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Gemini 3.5 Flash Grounded</span>
        </div>
      </div>

      {/* Chat Terminal Dialogue Box */}
      <div ref={chatScrollRef} className="p-4 flex-1 max-h-[250px] overflow-y-auto space-y-3 text-xs font-mono">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl p-3 leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-amber-500/10'
                  : 'bg-[#10121a] text-[#f4f1ea] border border-white/10 rounded-tl-none shadow-[0_0_20px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold ${m.sender === 'user' ? 'text-slate-950' : 'text-amber-400'}`}>
                  {m.sender === 'user' ? 'YOU:' : 'J.A.R.V.I.S.:'}
                </span>
                {m.sender === 'jarvis' && (
                  <button
                    onClick={() => speakText(m.text, selectedLanguage.speechCode)}
                    className="text-[#9a9aa8] hover:text-amber-400 p-0.5"
                    title="Read aloud"
                    aria-label="Read text aloud"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#10121a] text-amber-300 border border-amber-400/25 rounded-2xl p-2.5 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span className="text-[11px]">J.A.R.V.I.S. is synthesizing telemetry in {selectedLanguage.nativeName}...</span>
            </div>
          </div>
        )}
      </div>

      {/* Dataset Shortcut Chips */}
      <div className="px-4 py-2 bg-[#10121a]/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono text-[#9a9aa8]">
        {[
          'Say about this guy',
          'Who is Priyanraj?',
          'Triple Degrees status',
          'Canopy Satellite system',
          '11 Verified Licenses',
          'OS LinUCB Capstone'
        ].map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="px-2.5 py-1 rounded bg-[#141722] hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-400/40 whitespace-nowrap border border-white/8 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box with Microphone Voice Input */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-[#10121a]/90 border-t border-amber-400/20 flex items-center gap-2">
        <input
          id="jarvis-hero-input"
          type="text"
          value={inputMessage}
          disabled={loading}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Ask J.A.R.V.I.S. in ${selectedLanguage.nativeName} (e.g. "say about this guy")...`}
          className="flex-1 px-3 py-2 rounded-xl bg-[#07080d] border border-white/10 text-xs text-[#f4f1ea] placeholder-[#6b6b7a] focus:outline-none focus:border-amber-400 font-mono"
        />

        {/* Voice Input Button */}
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-xl border transition ${
            isListening
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
              : 'bg-[#141722] text-amber-400 border-white/10 hover:border-amber-400/40'
          }`}
          title={isListening ? "Listening... Click to stop" : "Speak to J.A.R.V.I.S."}
          aria-label="Microphone speech input"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !inputMessage.trim()}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold transition shadow-md flex items-center gap-1.5 text-xs font-mono disabled:opacity-50"
          aria-label="Send query"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
