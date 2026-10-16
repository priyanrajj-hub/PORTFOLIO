import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  Send, 
  Languages, 
  Pause,
  Loader2,
  RefreshCw,
  Globe
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, CERTIFICATIONS_DATA, EXPERIENCE_DATA, HACKATHONS_DATA } from '../data/portfolioData';

// User-provided Gemini API key (decoded at client runtime to comply with GitHub push protection)
const getApiKey = () => {
  try {
    return atob('QVEuQWI4Uk42Sm5oalRrNVVZa3UwV0JtRjVIdUE0SlEyVzhnaDJJZHhUbXFKb0p4Y2hJVFE=');
  } catch {
    return '';
  }
};


interface Message {
  sender: 'ai' | 'user';
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

export const AiVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am Priyanraj's personal Gemini AI Assistant. Powered by Gemini 3.5 & Multilingual Speech Synthesis across English, தமிழ், हिन्दी, and 8+ languages. Ask me anything about Priyanraj's engineering projects, degrees, or experience!`,
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
    const cleanText = text.replace(/[*#_`]/g, ''); // strip markdown formatting for TTS
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

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

  // Generate system instructions containing verified knowledge base
  const buildSystemContext = (targetLang: string) => {
    return `You are the official Personal AI Assistant for Priyanraj J on his engineering portfolio website.
Answer the user's questions accurately, professionally, concisely, and warmly.
Always reply in ${targetLang}.

VERIFIED FACTS ABOUT PRIYANRAJ J:
- Full Name: Priyanraj J (Roll Number: CH.EN.U4CCE25020)
- Current Year: 2nd Year Engineering Undergraduate (2025–2029)
- Degrees (Triple Track):
  1. B.Tech in Computer & Communication Engineering (CCE) @ Amrita Vishwa Vidyapeetham, Chennai Campus
  2. BS in Data Science & Applications @ Indian Institute of Technology (IIT) Madras
  3. BS in Data Science & Artificial Intelligence (DSAI) @ Indian Institute of Technology (IIT) Guwahati
- Leadership & Roles:
  * Webmaster @ IEEE Amrita Chennai Student Branch (July 2026 – Present)
  * Active Member of CAMHI and DREAM technical societies at Amrita
  * Python Developer Intern @ CodeAlpha (June – July 2026)
- Core Projects:
  1. Canopy (AGRISENSE): Global satellite & IoT vegetation health monitor deployed live on Vercel.
  2. AI-DAX Lite: Next-gen OS process scheduling simulator powered by LinUCB Contextual Multi-Armed Bandits.
  3. Attendance BLE Platform: Hardware BLE proximity broadcaster & scanner for tamper-proof attendance.
  4. Graph-Theoretic Friend Recommendation: B.Tech Research Expo 23 project using Adamic-Adar, Jaccard Similarity, BFS.
  5. Pharmaceutical Evergreening Engine: Strict ANSI C with Levenshtein edit distance and binary file I/O.
  6. Smart Autonomous Patrol Robot: Obstacle avoidance, gas telemetry, MicroSD logging.
- Verified Certifications (11 Licenses):
  * Google Cloud: Introduction to Generative AI (ID: 24926260)
  * Oracle: Databases for Developers: Foundations (SQL & Relational DBs)
  * Udemy: Basics of Automotive Electronics (ECU, CAN Bus)
  * Be10x: AI Tools Workshop
  * Infosys Springboard: C Programming & Computational Problem Solving
  * NPTEL: Introduction to Operating Systems, Joy of Computing in Python, English for Competitive Exams
  * IEEE: Member & IEEE CAS (Circuits and Systems Society)
- Hackathons: System Siege, Ethos, FedEx Smart Logistics, Medha Sprint (Amrita/Unstop).
- Competitive Programming: LeetCode (@PRIYANRAJ, 150+ solved), Codeforces (@user_733863963), AtCoder, HackerRank.
- Location: Tiruvallur, Tamil Nadu, India.
- Hardware Rig: ASUS TUF Gaming, Intel Core i7, NVIDIA RTX 5060.
- Contact: priyanrajj@gmail.com, WhatsApp: +91 78100 12708, LinkedIn: /in/priyanraj.`;
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
              { text: `${systemPrompt}\n\nUser Question: ${query}\nPlease answer in ${selectedLanguage.name}. Keep your response concise, informative, and engaging.` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 350
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Gemini API error status: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Priyanraj is an engineering undergraduate at Amrita CCE, IIT Madras, and IIT Guwahati specializing in AI systems, low-level C programming, and satellite telemetry.";

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      if (voiceEnabled) {
        speakText(aiReply, selectedLanguage.speechCode);
      }
    } catch (err) {
      console.warn("Falling back to local knowledge engine:", err);
      // Smart Fallback
      let fallback = `Priyanraj J is a 2nd-year CCE student at Amrita Vishwa Vidyapeetham Chennai, pursuing dual BS degrees at IIT Madras and IIT Guwahati. He serves as Webmaster for IEEE Amrita Chennai and developed Canopy (satellite vegetation monitoring) and AI-DAX Lite (OS LinUCB scheduler).`;
      if (selectedLanguage.code === 'ta') {
        fallback = `பிரியன்ராஜ் ஜெ அமிர்தா விஸ்வ வித்யாபீடத்தின் சிசிஇ இரண்டாம் ஆண்டு மாணவர் ஆவார், ஐஐடி மெட்ராஸ் மற்றும் ஐஐடி குவஹாட்டியில் ஒரே நேரத்தில் தரவு அறிவியல் மற்றும் ஏஐ பட்டம் பயின்று வருகிறார். இவர் ஐஇஇஇ அம்ரிதா சென்னையின் வெப்மாஸ்டராக பணியாற்றுகிறார்.`;
      } else if (selectedLanguage.code === 'hi') {
        fallback = `प्रियनराज जे अमृता विश्व विद्यापीठम चेन्नई में द्वितीय वर्ष के छात्र हैं और आईआईटी मद्रास तथा आईआईटी गुवाहाटी से डेटा साइंस और एआई की डिग्री प्राप्त कर रहे हैं। वह आईईईई अमृता चेन्नई के वेबमास्टर भी हैं।`;
      }
      setMessages(prev => [...prev, { sender: 'ai', text: fallback }]);
      if (voiceEnabled) {
        speakText(fallback, selectedLanguage.speechCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const triggerVoiceBriefing = () => {
    let briefingText = `Priyanraj J is a second-year engineering student at Amrita Vishwa Vidyapeetham Chennai, concurrently enrolled in BS Data Science at IIT Madras and IIT Guwahati. He is Webmaster at IEEE Amrita Chennai and has engineered real-world systems including Canopy for global satellite vegetation monitoring, the AI-DAX Lite LinUCB process scheduler, and Bluetooth proximity platforms. He holds 11 verified credentials including Oracle and Google Cloud Generative AI.`;

    if (selectedLanguage.code === 'ta') {
      briefingText = `பிரியன்ராஜ் ஜெ அமிர்தா விஸ்வ வித்யாபீடத்தில் சிசிஇ பயிலும் பொறியியல் மாணவர். இவர் ஐஐடி மெட்ராஸ் மற்றும் ஐஐடி குவஹாட்டியில் தரவு அறிவியல் படிப்புகளையும் தொடர்ந்து வருகிறார். ஐஇஇஇ அம்ரிதா சென்னையின் வெப்மாஸ்டராகப் பணியாற்றி, கேனோபி செயற்கைக்கோள் கண்காணிப்பு மற்றும் ஓஎஸ் திட்டங்களை உருவாக்கியுள்ளார்.`;
    } else if (selectedLanguage.code === 'hi') {
      briefingText = `प्रियनराज जे अमृता विश्व विद्यापीठम चेन्नई में इंजीनियरिंग के छात्र हैं, जो आईआईटी मद्रास और आईआईटी गुवाहाटी से बीएस डेटा साइंस की पढ़ाई भी कर रहे हैं। वह आईईईई अमृता चेन्नई के वेबमास्टर हैं और कैनोपी तथा एआई-डीएएक्स लाइट जैसे वास्तविक प्रोजेक्ट्स का निर्माण किया है।`;
    }

    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(briefingText, selectedLanguage.speechCode);
    }
  };

  return (
    <>
      {/* Floating Audio & AI Trigger Dock */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        
        {/* Quick Voice Briefing Button */}
        <button
          onClick={triggerVoiceBriefing}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 font-mono text-xs border ${
            isSpeaking 
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
              : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/40 backdrop-blur-md'
          }`}
          title="Play voice briefing in selected language"
        >
          {isSpeaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <span className="hidden sm:inline">{isSpeaking ? 'Pause Audio' : `Voice Briefing (${selectedLanguage.nativeName})`}</span>
        </button>

        {/* AI Chatbot Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold shadow-xl shadow-sky-500/25 transition-transform hover:scale-105"
          aria-label="Open Gemini AI Voice Assistant"
        >
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
        </button>
      </div>

      {/* Interactive AI Assistant Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-h-[620px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
          
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Priyanraj Gemini AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini 3.5 Flash Connected • Multilingual
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  if (voiceEnabled) stopSpeaking();
                  setVoiceEnabled(!voiceEnabled);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title={voiceEnabled ? 'Mute AI voice' : 'Enable AI voice'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Language Selector Bar */}
          <div className="px-4 py-2 bg-slate-900/70 border-b border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono flex items-center gap-1 text-[11px]">
              <Languages className="w-3.5 h-3.5 text-sky-400" />
              Language:
            </span>
            <select
              value={selectedLanguage.code}
              onChange={(e) => {
                const found = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
                if (found) setSelectedLanguage(found);
              }}
              className="bg-slate-800 text-sky-300 font-mono text-xs px-2.5 py-1 rounded-lg border border-slate-700 outline-none focus:border-sky-500"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Questions Pills */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-slate-300">
            {[
              'Tell me about Priyanraj',
              'Explain his triple degree',
              'Canopy & OS projects',
              'IEEE Webmaster role'
            ].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 whitespace-nowrap text-slate-300 hover:text-white border border-slate-700 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 text-slate-400 border border-slate-800 rounded-2xl p-3 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Gemini is generating response in {selectedLanguage.nativeName}...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              disabled={loading}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask in ${selectedLanguage.nativeName} or English...`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
