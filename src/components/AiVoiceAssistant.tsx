import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Trash2,
  Sliders
} from 'lucide-react';
import { getGroundedFallbackResponse } from '../data/jarvisDataset';

interface Message {
  sender: 'jarvis' | 'user';
  text: string;
  timestamp: string;
  error?: boolean;
}

interface LanguageOption {
  code: string;
  name: string;
  speechCode: string;
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'ta', name: 'Tamil', speechCode: 'ta-IN' },
  { code: 'hi', name: 'Hindi', speechCode: 'hi-IN' },
  { code: 'te', name: 'Telugu', speechCode: 'te-IN' },
  { code: 'es', name: 'Spanish', speechCode: 'es-ES' },
  { code: 'fr', name: 'French', speechCode: 'fr-FR' },
  { code: 'de', name: 'German', speechCode: 'de-DE' },
  { code: 'ja', name: 'Japanese', speechCode: 'ja-JP' },
];

const SUGGESTED_CHIPS = [
  'Who is Priyanraj?',
  'Show projects',
  'Tell me about the triple degrees',
  'How can I contact him?'
];

export const AiVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voicePersona, setVoicePersona] = useState<'aizen' | 'jarvis'>('aizen'); // User requested Aizen / JARVIS voice
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: "Greetings. I am J.A.R.V.I.S., operating with the calculated composure of Sōsuke Aizen and the loyalty of Stark Industries. How may I enlighten you regarding Mr. Priyanraj J's systems and research?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Global Keyboard shortcuts: '/' opens chat, 'Escape' closes chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-ai-chat', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-ai-chat', handleCustomOpen);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isOpen]);

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      stopSpeaking();
    }
  }, [isOpen]);

  // Speech Synthesis with Aizen & Original J.A.R.V.I.S. persona voice tuning
  const speakText = (text: string, langCode: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;

    // Apply voice persona settings
    if (voicePersona === 'aizen') {
      // Sōsuke Aizen: deep, calm, hypnotic, measured aristocratic cadence
      utterance.pitch = 0.82;
      utterance.rate = 0.90;
    } else {
      // Original J.A.R.V.I.S.: crisp, articulate, slightly faster British wit
      utterance.pitch = 0.94;
      utterance.rate = 1.02;
    }

    const voices = window.speechSynthesis.getVoices();
    // Prefer British English, deep male voices or natural voices
    const matchVoice = voices.find(v => 
      v.name.includes('UK English Male') || 
      v.name.includes('George') || 
      v.name.includes('Daniel') || 
      v.name.includes('Alex') || 
      v.name.includes('Oliver') ||
      (v.lang.startsWith(langCode.split('-')[0]) && v.name.toLowerCase().includes('male'))
    ) || voices.find(v => v.lang.startsWith(langCode.split('-')[0]));

    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Web Speech Microphone Recognition
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setErrorMessage("Speech recognition is supported in Chrome, Edge, and Safari.");
      setTimeout(() => setErrorMessage(null), 4000);
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
        const transcript = event.results?.[0]?.[0]?.transcript;
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

  // Dispatch message via Vercel /api/chat with fallback
  const handleSend = async (customQuery?: string) => {
    const query = (customQuery || inputMessage).trim();
    if (!query || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'user', text: query, timestamp: timeStr };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);
    setErrorMessage(null);

    try {
      let aiReply = '';

      // 1. Primary secure call to /api/chat serverless route
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: messages.slice(-8).map(m => ({
              role: m.sender === 'user' ? 'user' : 'model',
              text: m.text
            })),
            language: selectedLanguage.name
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.reply) {
            aiReply = data.reply;
          }
        } else if (res.status === 429) {
          const errData = await res.json();
          aiReply = errData.error || "Rate limit reached. Please allow J.A.R.V.I.S. a 60-second recharge period.";
        }
      } catch (netErr) {
        console.warn("Direct /api/chat unreachable, activating offline intelligence node:", netErr);
      }

      // 2. Offline / Grounded Dataset Fallback
      if (!aiReply) {
        aiReply = getGroundedFallbackResponse(query, selectedLanguage.code);
      }

      const botMsg: Message = {
        sender: 'jarvis',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);

      if (voiceEnabled) {
        speakText(aiReply, selectedLanguage.speechCode);
      }
    } catch (_err: unknown) {
      const fallback = getGroundedFallbackResponse(query, selectedLanguage.code);
      setMessages(prev => [
        ...prev,
        {
          sender: 'jarvis',
          text: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          error: true
        }
      ]);
      if (voiceEnabled) {
        speakText(fallback, selectedLanguage.speechCode);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    stopSpeaking();
    setMessages([
      {
        sender: 'jarvis',
        text: "Neural memory buffer reset. How may I assist you further, Sir?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Arc Reactor Launcher Button at bottom-right (Section 8.1) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#10121a]/95 hover:bg-[#171a25] border border-[#ffb703]/40 text-[#ffb703] shadow-2xl shadow-[#ffb703]/20 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 focus:outline-none"
            aria-label="Open J.A.R.V.I.S. AI Assistant (Shortcut: /)"
            title="Open J.A.R.V.I.S. (Press /)"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ffb703] to-[#ff6b35] flex items-center justify-center p-0.5 shadow-md shadow-[#ffb703]/40">
              <Bot className="w-4 h-4 text-[#07080d]" />
            </div>
            <span className="font-mono font-bold text-xs tracking-wider text-[#f4f1ea] group-hover:text-[#ffb703] transition-colors">
              J.A.R.V.I.S.
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] font-mono text-[#9a9aa8]">
              /
            </span>
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          </button>
        </div>
      )}

      {/* Floating J.A.R.V.I.S. Dialog Panel (Desktop floating / Mobile full-screen) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="J.A.R.V.I.S. AI Chat"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[640px] z-50 flex flex-col bg-[#07080d] sm:bg-[#10121a]/95 sm:backdrop-blur-2xl border sm:border-white/[0.12] sm:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/[0.08] bg-[#10121a] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ffb703] via-[#ff6b35] to-[#ffb703] flex items-center justify-center shadow-lg shadow-[#ffb703]/25 shrink-0">
                <Bot className="w-5 h-5 text-[#07080d]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-sm text-[#f4f1ea]">
                    J.A.R.V.I.S.
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#34d399]/15 text-[#34d399]">
                    Online
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#9a9aa8] block">
                  Persona: {voicePersona === 'aizen' ? 'Sōsuke Aizen' : 'Classic Stark AI'}
                </span>
              </div>
            </div>

            {/* Actions: Persona Toggle, Mute, Clear, Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setVoicePersona(p => p === 'aizen' ? 'jarvis' : 'aizen')}
                className="p-2 rounded-lg text-[#9a9aa8] hover:text-[#ffb703] hover:bg-white/[0.06] transition text-xs font-mono"
                title={`Toggle Persona (Current: ${voicePersona === 'aizen' ? 'Aizen Voice' : 'JARVIS Voice'})`}
                aria-label="Toggle AI Persona"
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition ${
                  voiceEnabled ? 'text-[#ffb703] hover:bg-white/[0.06]' : 'text-[#6b6b7a] hover:bg-white/[0.06]'
                }`}
                title={voiceEnabled ? 'Mute Speech Output' : 'Unmute Speech Output'}
                aria-label={voiceEnabled ? 'Mute voice' : 'Unmute voice'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-[#9a9aa8] hover:text-[#ff6b35] hover:bg-white/[0.06] transition"
                title="Clear Chat History"
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-white/[0.06] transition"
                title="Close J.A.R.V.I.S. (ESC)"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="px-4 py-2 bg-rose-500/15 border-b border-rose-500/30 text-rose-300 text-xs font-mono flex items-center justify-between">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage(null)} className="text-rose-400">✕</button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div 
            ref={chatScrollRef} 
            className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs"
            aria-live="polite"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] text-[#9a9aa8]">
                    {m.sender === 'user' ? 'You' : 'J.A.R.V.I.S.'}
                  </span>
                  <span className="text-[9px] text-[#6b6b7a]">
                    {m.timestamp}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#ffb703] text-[#07080d] font-medium rounded-tr-none shadow-md'
                      : 'bg-[#171a25] text-[#f4f1ea] border border-white/[0.08] rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}

            {/* Typing / Thinking Indicator */}
            {loading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#171a25] text-[#ffb703] border border-white/[0.08] max-w-[80px]">
                <span className="w-2 h-2 rounded-full bg-[#ffb703] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#ffb703] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#ffb703] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Suggested Question Chips (Section 8.2) */}
          <div className="px-4 py-2 border-t border-white/[0.06] bg-[#07080d]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {SUGGESTED_CHIPS.map((chip, cIdx) => (
              <button
                key={cIdx}
                onClick={() => handleSend(chip)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full bg-[#171a25] hover:bg-[#202535] border border-white/[0.08] hover:border-[#ffb703]/30 text-[11px] font-mono text-[#9a9aa8] hover:text-[#f4f1ea] whitespace-nowrap transition shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input & Voice Controls Footer */}
          <div className="p-3 border-t border-white/[0.08] bg-[#10121a] shrink-0">
            <div className="flex items-center gap-2 mb-2">
              {/* Language Selector (8 languages preserved) */}
              <select
                value={selectedLanguage.code}
                onChange={(e) => {
                  const found = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
                  if (found) setSelectedLanguage(found);
                }}
                className="px-2 py-1 rounded-md bg-[#171a25] border border-white/[0.08] text-[11px] font-mono text-[#9a9aa8] focus:outline-none focus:border-[#ffb703]"
                aria-label="Language Selector"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>

              {/* Persona Pill Indicator */}
              <button
                onClick={() => setVoicePersona(p => p === 'aizen' ? 'jarvis' : 'aizen')}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#171a25] border border-white/[0.08] text-[#ffb703] hover:border-[#ffb703]/40 transition"
              >
                Voice: {voicePersona === 'aizen' ? 'Aizen' : 'J.A.R.V.I.S.'}
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask J.A.R.V.I.S. anything..."
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#07080d] border border-white/10 text-white placeholder-[#9a9aa8]/40 text-sm font-mono focus:outline-none focus:border-[#ffb703] transition"
                aria-label="Ask J.A.R.V.I.S. anything"
              />

              {/* Microphone Toggle (Visible idle/listening state) */}
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border transition ${
                  isListening
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                    : 'bg-[#171a25] text-[#ffb703] border-white/10 hover:border-[#ffb703]/40'
                }`}
                title={isListening ? 'Stop listening' : 'Start microphone speech input'}
                aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="p-2.5 rounded-xl bg-[#ffb703] hover:bg-[#ffc42e] disabled:opacity-40 text-[#07080d] transition font-bold"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
