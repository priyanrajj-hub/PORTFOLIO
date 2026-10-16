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
  Radio,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

// User-provided Gemini API key (decoded at runtime)
const getApiKey = () => {
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
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: `J.A.R.V.I.S. online. At your service, Priyanraj. Systems diagnostic normal: Amrita CCE, IIT Madras DS, and IIT Guwahati DSAI nodes verified. How may I assist you today?`,
    },
  ]);

  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
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
    utterance.pitch = 0.95; // Slightly lower pitch for Jarvis persona

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

  const buildSystemContext = (targetLang: string) => {
    return `You are J.A.R.V.I.S., the advanced AI assistant inspired by Iron Man, serving Priyanraj J on his engineering portfolio mainframe.
Speak with polite, sophisticated, loyal, and technically brilliant diction ("At your service", "Certainly, Sir", "Telemetry indicates...").
Always reply in ${targetLang}.

VERIFIED FACTS ABOUT PRIYANRAJ J:
- Full Name: Priyanraj J (Roll Number: CH.EN.U4CCE25020)
- Status: 2nd Year Engineering Undergraduate (2025–2029)
- Academic Degrees (Triple Track):
  1. B.Tech in Computer & Communication Engineering (CCE) @ Amrita Vishwa Vidyapeetham, Chennai Campus
  2. BS in Data Science & Applications @ IIT Madras
  3. BS in Data Science & Artificial Intelligence (DSAI) @ IIT Guwahati
- Professional Leadership:
  * Webmaster @ IEEE Amrita Chennai Student Branch (July 2026 – Present)
  * Active Member of CAMHI and DREAM technical societies
  * Python Developer Intern @ CodeAlpha
- Flagship Engineering Systems:
  1. Canopy (AGRISENSE): Global satellite & IoT vegetation health monitoring platform with live Vercel deployment.
  2. AI-DAX Lite: Next-gen OS process scheduling simulator powered by LinUCB Contextual Multi-Armed Bandits.
  3. Attendance BLE Platform: Hardware BLE proximity broadcaster & scanner for automated classroom attendance.
  4. Graph-Theoretic Friend Recommendation: B.Tech Research Expo 23 paper using Adamic-Adar and BFS graph clustering.
  5. Pharmaceutical Evergreening Engine: Strict ANSI C with Levenshtein edit distance and binary file I/O.
  6. Smart Autonomous Patrol Robot: Obstacle avoidance, gas telemetry, MicroSD logging.
- Official Licenses (11 Verified):
  * Google Cloud: Introduction to Generative AI (ID: 24926260)
  * Oracle: Databases for Developers: Foundations
  * Udemy: Basics of Automotive Electronics
  * Be10x: AI Tools Workshop
  * Infosys Springboard: C Programming Language & Problem Solving
  * NPTEL: Introduction to Operating Systems, Joy of Computing in Python, English for Competitive Exams
  * IEEE CAS (Circuits and Systems Society) Member
- Hackathons: System Siege, Ethos, FedEx Smart Logistics, Medha Sprint (Amrita & Unstop).
- Competitive Programming: LeetCode (@PRIYANRAJ, 150+ solved), Codeforces (@user_733863963), AtCoder, HackerRank.
- Location: Tiruvallur, Tamil Nadu, India.
- Rig: ASUS TUF Gaming, Intel Core i7, NVIDIA RTX 5060.`;
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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${getApiKey()}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemPrompt}\n\nUser Question: ${query}\nPlease answer in ${selectedLanguage.name}. Speak in J.A.R.V.I.S. persona. Keep answers sharp, clear, and informative.` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 300
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Gemini status: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "J.A.R.V.I.S.: Priyanraj J is an engineering researcher pursuing triple degrees across Amrita CCE, IIT Madras, and IIT Guwahati, specializing in AI systems, embedded IoT, and low-level C programming.";

      setMessages(prev => [...prev, { sender: 'jarvis', text: aiReply }]);
      if (voiceEnabled) {
        speakText(aiReply, selectedLanguage.speechCode);
      }
    } catch {
      let fallback = `J.A.R.V.I.S.: Priyanraj is a 2nd-year CCE student at Amrita Vishwa Vidyapeetham Chennai, concurrently completing dual BS degrees at IIT Madras and IIT Guwahati. He serves as Webmaster for IEEE Amrita Chennai and architected Canopy and AI-DAX Lite.`;
      if (selectedLanguage.code === 'ta') {
        fallback = `ஜார்விஸ்: பிரியன்ராஜ் அமிர்தா விஸ்வ வித்யாபீடத்தில் சிசிஇ பயிலும் மாணவர். ஐஐடி மெட்ராஸ் மற்றும் ஐஐடி குவஹாட்டியில் தரவு அறிவியல் பயின்று வருகிறார். ஐஇஇஇ அம்ரிதா சென்னையின் வெப்மாஸ்டராகப் பணியாற்றுகிறார்.`;
      } else if (selectedLanguage.code === 'hi') {
        fallback = `जार्विस: प्रियनराज अमृता विश्व विद्यापीठम चेन्नई में इंजीनियरिंग के छात्र हैं, जो आईआईटी मद्रास और आईआईटी गुवाहाटी से डेटा साइंस की पढ़ाई कर रहे हैं और आईईईई अमृता चेन्नई के वेबमास्टर हैं।`;
      }
      setMessages(prev => [...prev, { sender: 'jarvis', text: fallback }]);
      if (voiceEnabled) {
        speakText(fallback, selectedLanguage.speechCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const triggerVoiceBriefing = () => {
    let briefingText = `J.A.R.V.I.S. protocol online. Priyanraj J is a second-year engineering student at Amrita Vishwa Vidyapeetham Chennai, concurrently enrolled in BS Data Science at IIT Madras and IIT Guwahati. He is Webmaster at IEEE Amrita Chennai and has engineered real-world systems including Canopy for global satellite vegetation monitoring, the AI-DAX Lite LinUCB process scheduler, and Bluetooth proximity platforms. He holds 11 verified credentials including Oracle and Google Cloud Generative AI.`;

    if (selectedLanguage.code === 'ta') {
      briefingText = `ஜார்விஸ் அறிக்கை: பிரியன்ராஜ் அமிர்தா விஸ்வ வித்யாபீடத்தில் சிசிஇ பொறியியல் பயின்று வருகிறார், மேலும் ஐஐடி மெட்ராஸ் மற்றும் ஐஐடி குவஹாட்டியில் தரவு அறிவியல் படிப்புகளையும் பயின்று வருகிறார். இவர் ஐஇஇஇ அம்ரிதா சென்னையின் வெப்மாஸ்டராகப் பணியாற்றுகிறார்.`;
    } else if (selectedLanguage.code === 'hi') {
      briefingText = `जार्विस प्रोटोकॉल सक्रिय: प्रियनराज अमृता विश्व विद्यापीठम में छात्र हैं, जो आईआईटी मद्रास और आईआईटी गुवाहाटी से बीएस डेटा साइंस की पढ़ाई भी कर रहे हैं। वह आईईईई अमृता चेन्नई के वेबमास्टर हैं।`;
    }

    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(briefingText, selectedLanguage.speechCode);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-cyan-500/40 bg-slate-950/85 backdrop-blur-2xl shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col">
      
      {/* Stark Industries HUD Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900/95 via-cyan-950/40 to-slate-900/95 border-b border-cyan-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.6)] overflow-hidden bg-black">
              <img
                src="./jarvis-core.png"
                alt="J.A.R.V.I.S. Iron Man Holographic Core"
                className="w-full h-full object-cover animate-spin"
                style={{ animationDuration: '24s' }}
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border border-slate-950 animate-ping"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white font-mono tracking-wider flex items-center gap-1.5">
                J.A.R.V.I.S. <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300">MARK-85</span>
              </h3>
            </div>
            <p className="text-[10px] font-mono text-cyan-400/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              STARK AI PROTOCOL • ONLINE
            </p>
          </div>
        </div>

        {/* Audio Equalizer & Voice Control */}
        <div className="flex items-center gap-3">
          {/* Animated sound wave bars when speaking */}
          <div className="hidden sm:flex items-center gap-1 h-5 px-2 bg-slate-900/80 rounded border border-cyan-500/20">
            <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isSpeaking ? 'h-4 animate-bounce' : 'h-1.5'}`}></span>
            <span className={`w-0.5 bg-cyan-300 rounded-full transition-all ${isSpeaking ? 'h-3 animate-pulse' : 'h-2'}`}></span>
            <span className={`w-0.5 bg-emerald-400 rounded-full transition-all ${isSpeaking ? 'h-5 animate-bounce' : 'h-1.5'}`}></span>
            <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isSpeaking ? 'h-3.5 animate-pulse' : 'h-2'}`}></span>
          </div>

          <button
            onClick={triggerVoiceBriefing}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isSpeaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
            }`}
            title="Play Audio Briefing"
          >
            {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="text-[11px] font-bold">{isSpeaking ? 'Stop Voice' : 'Voice Briefing'}</span>
          </button>
        </div>
      </div>

      {/* Multilingual Selector & Quick Chips */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-slate-400">Language:</span>
          <select
            value={selectedLanguage.code}
            onChange={(e) => {
              const found = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
              if (found) setSelectedLanguage(found);
            }}
            className="bg-slate-950 text-cyan-300 font-mono text-xs px-2 py-0.5 rounded border border-cyan-800/50 outline-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Gemini 3.5 Flash Active</span>
        </div>
      </div>

      {/* Chat Terminal Dialogue Box */}
      <div className="p-4 flex-1 max-h-[220px] overflow-y-auto space-y-2.5 text-xs font-mono">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3 leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-sky-600/90 text-white rounded-tr-none'
                  : 'bg-slate-900/90 text-cyan-100 border border-cyan-500/30 rounded-tl-none shadow-[0_0_15px_rgba(56,189,248,0.08)]'
              }`}
            >
              <span className={`block text-[10px] font-bold mb-1 ${m.sender === 'user' ? 'text-sky-200' : 'text-cyan-400'}`}>
                {m.sender === 'user' ? 'YOU:' : 'J.A.R.V.I.S.:'}
              </span>
              <p className="whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900/90 text-cyan-300 border border-cyan-500/30 rounded-2xl p-2.5 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span className="text-[11px]">J.A.R.V.I.S. is synthesizing in {selectedLanguage.nativeName}...</span>
            </div>
          </div>
        )}
      </div>

      {/* Prompt Shortcut Chips */}
      <div className="px-4 py-1.5 bg-slate-900/40 border-t border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono text-slate-300">
        {[
          'Who is Priyanraj?',
          'Triple Degrees status',
          'Canopy Satellite system',
          'IEEE Webmaster role',
          'OS LinUCB Capstone'
        ].map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 whitespace-nowrap border border-slate-700/80 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          disabled={loading}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Ask J.A.R.V.I.S. in ${selectedLanguage.nativeName}...`}
          className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-cyan-800/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition shadow-md flex items-center gap-1.5 text-xs font-mono disabled:opacity-50"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
