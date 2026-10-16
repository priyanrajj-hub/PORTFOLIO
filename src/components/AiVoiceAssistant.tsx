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
  Mic,
  MicOff,
  Zap,
  Activity,
  Maximize2,
  ChevronDown
} from 'lucide-react';
import { JARVIS_SYSTEM_DATASET } from '../data/jarvisDataset';

// User-provided Gemini API key (supports Gemini_API_key from Vercel)
const getApiKey = () => {
  const envKey = (import.meta as any).env?.Gemini_API_key || (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.VITE_API_KEY;
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

export const AiVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: `J.A.R.V.I.S. MARK-85 online. Systems diagnostic nominal: Amrita CCE, IIT Madras DS, and IIT Guwahati DSAI nodes verified. At your service, Sir. Ask me anything regarding Priyanraj's engineering projects, degrees, or experience!`,
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
    const handleOpenAi = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenAi);

    return () => {
      window.removeEventListener('open-ai-chat', handleOpenAi);
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

  // Web Speech API Voice Recognition
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
- If the visitor asks "say about this guy", "who is this guy", "who is he", "tell me about him", explain Mr. Priyanraj J with utmost elegance and detail.
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
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${getApiKey()}`;
      
      const payload = {
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: 'user',
            parts: [
              { text: query }
            ]
          }
        ],
        generationConfig: {
          thinkingConfig: { thinkingBudget: 0 },
          temperature: 0.7,
          maxOutputTokens: 2048
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
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiReply) {
        throw new Error("Empty candidate received");
      }

      setMessages(prev => [...prev, { sender: 'jarvis', text: aiReply }]);
      if (voiceEnabled) {
        speakText(aiReply, selectedLanguage.speechCode);
      }
    } catch (err) {
      console.warn("Falling back to local grounded knowledge engine:", err);
      
      let fallback = `Allow me to introduce Mr. Priyanraj J (UID: CH.EN.U4CCE25020), Sir.\n\nPriyanraj is an exceptional 2nd-year engineering scholar concurrently pursuing a triple academic track:\n• B.Tech in Computer & Communication Engineering @ Amrita Vishwa Vidyapeetham, Chennai\n• BS in Data Science & Applications @ IIT Madras\n• BS in Data Science & Artificial Intelligence @ IIT Guwahati\n\nHe serves as the elected Webmaster for IEEE Amrita Chennai Student Branch and has engineered landmark systems including Canopy (global satellite NDVI vegetation monitoring live on Vercel), AI-DAX Lite (OS LinUCB bandit process scheduler), and hardware BLE proximity attendance platforms. He holds 11 verified credentials including Oracle and Google Cloud Generative AI.`;

      if (selectedLanguage.code === 'ta') {
        fallback = `பிரியன்ராஜ் ஜெ பற்றிய முழுமையான அறிக்கை, ஐயா:\n\nபிரியன்ராஜ் அவர்கள் ஒரே நேரத்தில் மூன்று முன்னணி நிறுவனங்களில் பொறியியல் மற்றும் தரவு அறிவியல் பயிலும் ஆற்றல்மிக்க ஆய்வாளர்:\n• அம்ரிதா விஸ்வ வித்யாபீடத்தில் சிசிஇ பி.டெக்\n• ஐஐடி மெட்ராஸில் தரவு அறிவியல் பி.எஸ்\n• ஐஐடி குவஹாட்டியில் ஏஐ பி.எஸ்\n\nஅவர் ஐஇஇஇ அம்ரிதா சென்னையின் வெப்மாஸ்டராகப் பொறுப்பு வகிக்கிறார். கேனோபி செயற்கைக்கோள் தாவர ஆரோக்கியக் கண்காணிப்பு தளம் மற்றும் ஏஐ-டிஏஎக்ஸ் லைட் ஓஎஸ் திட்டங்களை வெற்றிகரமாக உருவாக்கியுள்ளார்.`;
      } else if (selectedLanguage.code === 'hi') {
        fallback = `प्रियनराज जे का आधिकारिक परिचय, सर:\n\nप्रियनराज एक असाधारण द्वितीय वर्ष के इंजीनियरिंग शोधकर्ता हैं जो एक साथ तीन प्रतिष्ठित डिग्रियों का अध्ययन कर रहे हैं:\n• अमृता विश्व विद्यापीठम से बी.टेक (सीसीई)\n• आईआईटी मद्रास से बीएस (डेटा साइंस)\n• आईआईटी गुवाहाटी से बीएस (डेटा साइंस एवं एआई)\n\nवह आईईईई अमृता चेन्नई के आधिकारिक वेबमास्टर हैं और उन्होंने कैनोपी (उपग्रह वनस्पति स्वास्थ्य मॉनिटर) तथा एआई-डीएएक्स लाइट (लिनयूसीबी ओएस शेड्यूलर) जैसे उन्नत सिस्टम्स का निर्माण किया है।`;
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
    <>
      {/* Floating Stark Industries Arc Reactor Trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        
        {/* Quick Voice Briefing Button */}
        <button
          onClick={triggerVoiceBriefing}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 font-mono text-xs border ${
            isSpeaking 
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
              : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/40 backdrop-blur-md'
          }`}
          title="Play J.A.R.V.I.S. voice briefing in selected language"
        >
          {isSpeaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <span className="hidden sm:inline">{isSpeaking ? 'Pause Audio' : `Voice Briefing (${selectedLanguage.nativeName})`}</span>
        </button>

        {/* J.A.R.V.I.S. Arc Reactor Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2.5 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-transform hover:scale-110 group"
          aria-label="Toggle J.A.R.V.I.S. Stark AI Assistant"
          title="Open J.A.R.V.I.S. Stark AI Assistant"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img
              src="./jarvis-core.png"
              alt="J.A.R.V.I.S. Core"
              className="w-full h-full object-cover animate-spin group-hover:scale-110 transition-transform"
              style={{ animationDuration: '20s' }}
            />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse"></span>
        </button>
      </div>

      {/* J.A.R.V.I.S. Holographic Drawer Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[460px] max-h-[640px] rounded-3xl bg-slate-950/95 border-2 border-cyan-500/40 shadow-[0_0_60px_rgba(56,189,248,0.25)] flex flex-col overflow-hidden backdrop-blur-2xl">
          
          {/* Stark Industries HUD Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900/95 via-cyan-950/50 to-slate-900/95 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-400 p-0.5 shadow-[0_0_15px_rgba(56,189,248,0.6)] overflow-hidden bg-black">
                <img
                  src="./jarvis-core.png"
                  alt="J.A.R.V.I.S. Core"
                  className="w-full h-full object-cover animate-spin"
                  style={{ animationDuration: '24s' }}
                />
              </div>
              <div>
                <h4 className="text-sm font-black text-white font-mono tracking-wider flex items-center gap-1.5">
                  J.A.R.V.I.S. <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-700/60 text-cyan-300">MARK-85</span>
                </h4>
                <p className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  STARK AI PROTOCOL • ONLINE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
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
                title="Close J.A.R.V.I.S."
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Language Selector Bar */}
          <div className="px-4 py-2 bg-slate-900/70 border-b border-cyan-500/20 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono flex items-center gap-1.5 text-[11px]">
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              Language:
            </span>
            <select
              value={selectedLanguage.code}
              onChange={(e) => {
                const found = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
                if (found) setSelectedLanguage(found);
              }}
              className="bg-slate-900 text-cyan-300 font-mono text-xs px-2.5 py-1 rounded-lg border border-cyan-800/60 outline-none focus:border-cyan-500 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Questions Chips */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-cyan-500/20 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-slate-300">
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
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 whitespace-nowrap border border-slate-700/80 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div ref={chatScrollRef} className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs font-mono">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-600/95 text-white rounded-tr-none'
                      : 'bg-slate-900/95 text-cyan-100 border border-cyan-500/30 rounded-tl-none shadow-[0_0_15px_rgba(56,189,248,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold ${m.sender === 'user' ? 'text-sky-200' : 'text-cyan-400'}`}>
                      {m.sender === 'user' ? 'YOU:' : 'J.A.R.V.I.S.:'}
                    </span>
                    {m.sender === 'jarvis' && (
                      <button
                        onClick={() => speakText(m.text, selectedLanguage.speechCode)}
                        className="text-slate-400 hover:text-cyan-300 p-0.5"
                        title="Read aloud"
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
                <div className="bg-slate-900 text-cyan-300 border border-cyan-500/30 rounded-2xl p-3 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>J.A.R.V.I.S. is synthesizing telemetry in {selectedLanguage.nativeName}...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box with Microphone Voice Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              disabled={loading}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask in ${selectedLanguage.nativeName} (e.g. "say about this guy")...`}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-cyan-800/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-xl border transition ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-950 text-cyan-400 border-cyan-800/60 hover:bg-slate-900'
              }`}
              title={isListening ? "Listening... Click to stop" : "Speak to J.A.R.V.I.S."}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
