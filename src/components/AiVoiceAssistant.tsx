// src/components/AiVoiceAssistant.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Volume2, 
  VolumeX, 
  Square,
  Mic, 
  MicOff, 
  Trash2,
  Info
} from 'lucide-react';
import { getGroundedFallbackResponse } from '../data/jarvisDataset';
import { VOICE_PERSONAS, type PersonaId } from '../data/voices';

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
  { code: 'en', name: 'English', speechCode: 'en-GB' },
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

// Simple deterministic hash for speech audio caching
function getAudioCacheKey(text: string, persona: string, lang: string): string {
  let hash = 0;
  const str = `${persona}:${lang}:${text.trim()}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `tts_${hash}`;
}

export const AiVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpokenText, setCurrentSpokenText] = useState('');
  
  // Voice output is OFF by default per autoplay rules
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('jarvis_voice_enabled');
    return saved ? saved === 'true' : false;
  });

  const [voicePersona, setVoicePersona] = useState<PersonaId>(() => {
    const saved = localStorage.getItem('jarvis_persona') as PersonaId;
    return saved === 'sosuke' ? 'sosuke' : 'jarvis';
  });

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [isListening, setIsListening] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>(() => [
    {
      sender: 'jarvis',
      text: VOICE_PERSONAS[voicePersona].greetingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const memoryAudioCache = useRef<Map<string, string>>(new Map());

  // Initialize HTMLAudioElement for high-quality server-side TTS playback
  useEffect(() => {
    const audio = new Audio();
    audio.onplay = () => setIsSpeaking(true);
    audio.onended = () => {
      setIsSpeaking(false);
      setCurrentSpokenText('');
    };
    audio.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpokenText('');
    };
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Save voice settings to localStorage
  useEffect(() => {
    localStorage.setItem('jarvis_persona', voicePersona);
  }, [voicePersona]);

  useEffect(() => {
    localStorage.setItem('jarvis_voice_enabled', String(voiceEnabled));
  }, [voiceEnabled]);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Stop any active audio / speech
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentSpokenText('');
  };

  // Keyboard shortcut handlers ('/' opens, 'Escape' closes)
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
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      stopSpeaking();
    }
  }, [isOpen]);

  // Browser SpeechSynthesis fallback
  const speakWithBrowserFallback = (cleanText: string, persona: PersonaId, langCode: string) => {
    if (!('speechSynthesis' in window) || !voiceEnabled) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const personaConfig = VOICE_PERSONAS[persona];
    const fallback = personaConfig.browserFallback;

    utterance.rate = fallback.rate;
    utterance.pitch = fallback.pitch;
    utterance.lang = langCode === 'en' ? 'en-GB' : langCode;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => 
      fallback.preferredVoiceSubstrings.some(sub => v.name.includes(sub))
    ) || voices.find(v => v.lang.startsWith(langCode));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpokenText('');
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpokenText('');
    };

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Primary High-Fidelity Speech Engine (Server-side /api/tts + in-memory cache)
  const playSpeech = async (text: string, persona: PersonaId, langCode: string) => {
    if (!voiceEnabled) return;

    stopSpeaking();
    setCurrentSpokenText(text);

    const cleanText = text
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/[*#_`~>[\]()]/g, '')
      .trim();

    if (!cleanText) return;

    const cacheKey = getAudioCacheKey(cleanText, persona, langCode);

    // 1. Check in-memory audio cache
    if (memoryAudioCache.current.has(cacheKey)) {
      const cachedUrl = memoryAudioCache.current.get(cacheKey)!;
      if (audioRef.current) {
        audioRef.current.src = cachedUrl;
        try {
          await audioRef.current.play();
          return;
        } catch {
          // Fall through to re-synthesizing if blob expired
        }
      }
    }

    // 2. Call serverless /api/tts endpoint
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText.slice(0, 600),
          persona,
          language: langCode
        })
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && (contentType.includes('audio') || contentType.includes('mpeg') || contentType.includes('wav'))) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        memoryAudioCache.current.set(cacheKey, blobUrl);

        if (audioRef.current && voiceEnabled) {
          audioRef.current.src = blobUrl;
          await audioRef.current.play();
          return;
        }
      } else {
        const json = await res.json().catch(() => ({}));
        if (json.notice) {
          setNoticeMessage(json.notice);
          setTimeout(() => setNoticeMessage(null), 4000);
        }
      }
    } catch {
      // Serverless TTS unavailable, continue to browser fallback
    }

    // 3. Fallback to browser Web Speech API
    speakWithBrowserFallback(cleanText, persona, langCode);
  };

  // Change voice persona & update greeting if at start
  const handlePersonaChange = (newPersona: PersonaId) => {
    if (newPersona === voicePersona) return;
    setVoicePersona(newPersona);
    stopSpeaking();

    // If chat only contains the initial greeting, update it to the new persona greeting
    if (messages.length <= 1) {
      setMessages([
        {
          sender: 'jarvis',
          text: VOICE_PERSONAS[newPersona].greetingText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      if (voiceEnabled) {
        playSpeech(VOICE_PERSONAS[newPersona].greetingText, newPersona, selectedLanguage.code);
      }
    }
  };

  // Web Speech Microphone Input
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

      // 1. Primary call to /api/chat serverless route
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            persona: voicePersona,
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
          aiReply = errData.error || "Rate limit reached. Please allow the system a brief 60-second cooling period.";
        }
      } catch (netErr) {
        console.warn("Direct /api/chat unreachable, activating grounded intelligence node:", netErr);
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
        playSpeech(aiReply, voicePersona, selectedLanguage.code);
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
        playSpeech(fallback, voicePersona, selectedLanguage.code);
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
        text: VOICE_PERSONAS[voicePersona].greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Arc Reactor Launcher Button at bottom-right */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setIsOpen(true);
              // Pre-cache greeting audio on first open if voice is enabled
              if (voiceEnabled && messages.length > 0) {
                playSpeech(messages[0].text, voicePersona, selectedLanguage.code);
              }
            }}
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

            {/* Speaking / Active Indicator */}
            {isSpeaking ? (
              <div className="flex items-center gap-0.5" aria-hidden="true">
                <span className="w-1 bg-[#ffb703] rounded-full animate-wave-1" />
                <span className="w-1 bg-[#ffb703] rounded-full animate-wave-2" />
                <span className="w-1 bg-[#ffb703] rounded-full animate-wave-3" />
              </div>
            ) : (
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            )}
          </button>
        </div>
      )}

      {/* Floating J.A.R.V.I.S. Dialog Panel (Desktop floating / Mobile full-screen) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="J.A.R.V.I.S. AI Chat"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[450px] sm:h-[640px] z-50 flex flex-col bg-[#07080d] sm:bg-[#10121a]/95 sm:backdrop-blur-2xl border sm:border-white/[0.12] sm:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Accessible Screen Reader Speech Captions */}
          <div aria-live="polite" className="sr-only">
            {isSpeaking && currentSpokenText ? `Speaking: ${currentSpokenText}` : ''}
          </div>

          {/* Header */}
          <div className="p-3.5 border-b border-white/[0.08] bg-[#10121a] flex flex-col gap-2.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#ffb703] via-[#ff6b35] to-[#ffb703] flex items-center justify-center shadow-md shadow-[#ffb703]/25 shrink-0">
                  <Bot className="w-4 h-4 text-[#07080d]" />
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#34d399] border-2 border-[#10121a] animate-ping" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm text-[#f4f1ea]">
                      J.A.R.V.I.S.
                    </h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#34d399]/15 text-[#34d399]">
                      Online
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9a9aa8] block">
                    {VOICE_PERSONAS[voicePersona].tagline}
                  </span>
                </div>
              </div>

              {/* Actions: Stop, Voice Toggle, Clear, Close */}
              <div className="flex items-center gap-1">
                {/* Stop Speech Button (visible when speaking) */}
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition flex items-center gap-1"
                    title="Stop Audio Playback"
                    aria-label="Stop speaking"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[10px] font-mono font-bold">Stop</span>
                  </button>
                )}

                {/* Voice Enable/Mute Toggle */}
                <button
                  onClick={() => {
                    const next = !voiceEnabled;
                    setVoiceEnabled(next);
                    if (!next) {
                      stopSpeaking();
                    } else if (messages.length > 0) {
                      playSpeech(messages[messages.length - 1].text, voicePersona, selectedLanguage.code);
                    }
                  }}
                  className={`p-2 rounded-lg transition ${
                    voiceEnabled 
                      ? 'text-[#ffb703] hover:bg-white/[0.06]' 
                      : 'text-[#6b6b7a] hover:bg-white/[0.06]'
                  }`}
                  title={voiceEnabled ? 'Mute Speech Output' : 'Enable Speech Output'}
                  aria-label={voiceEnabled ? 'Mute speech output' : 'Enable speech output'}
                  aria-pressed={voiceEnabled}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Clear Chat */}
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg text-[#9a9aa8] hover:text-[#ff6b35] hover:bg-white/[0.06] transition"
                  title="Clear Conversation Buffer"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Close Dialog */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-[#9a9aa8] hover:text-[#f4f1ea] hover:bg-white/[0.06] transition"
                  title="Close Assistant (ESC)"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Persona Switcher Chips (Requirement 4) */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-[#07080d]/80 border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => handlePersonaChange('jarvis')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    voicePersona === 'jarvis'
                      ? 'bg-[#ffb703] text-[#07080d] font-bold shadow-sm'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea]'
                  }`}
                  aria-pressed={voicePersona === 'jarvis'}
                  aria-label="Select J.A.R.V.I.S. Classic persona"
                >
                  J.A.R.V.I.S. Classic
                </button>
                <button
                  type="button"
                  onClick={() => handlePersonaChange('sosuke')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    voicePersona === 'sosuke'
                      ? 'bg-[#ff6b35] text-[#07080d] font-bold shadow-sm'
                      : 'text-[#9a9aa8] hover:text-[#f4f1ea]'
                  }`}
                  aria-pressed={voicePersona === 'sosuke'}
                  aria-label="Select Sōsuke Mode persona"
                >
                  Sōsuke Mode
                </button>
              </div>

              {/* Waveform Animation when speaking */}
              {isSpeaking && (
                <div className="flex items-center gap-1 h-3.5 px-2 bg-amber-500/10 rounded-full border border-amber-500/20" aria-hidden="true">
                  <span className="w-0.5 bg-[#ffb703] rounded-full animate-wave-1" />
                  <span className="w-0.5 bg-[#ffb703] rounded-full animate-wave-2" />
                  <span className="w-0.5 bg-[#ffb703] rounded-full animate-wave-3" />
                  <span className="w-0.5 bg-[#ffb703] rounded-full animate-wave-4" />
                </div>
              )}
            </div>
          </div>

          {/* Non-blocking Notice Banner */}
          {noticeMessage && (
            <div className="px-3.5 py-1.5 bg-[#ffb703]/10 border-b border-[#ffb703]/20 text-[#ffb703] text-[11px] font-mono flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                {noticeMessage}
              </span>
              <button onClick={() => setNoticeMessage(null)} className="text-[#9a9aa8] hover:text-white">✕</button>
            </div>
          )}

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
                    {m.sender === 'user' ? 'You' : VOICE_PERSONAS[voicePersona].name}
                  </span>
                  <span className="text-[9px] text-[#6b6b7a]">
                    {m.timestamp}
                  </span>
                </div>

                <div
                  className={`group relative p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#ffb703] text-[#07080d] font-medium rounded-tr-none shadow-md'
                      : 'bg-[#171a25] text-[#f4f1ea] border border-white/[0.08] rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  
                  {/* Replay voice button for bot messages */}
                  {m.sender === 'jarvis' && voiceEnabled && (
                    <button
                      onClick={() => playSpeech(m.text, voicePersona, selectedLanguage.code)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 text-[10px] font-mono text-[#ffb703] flex items-center gap-1 hover:underline"
                      aria-label="Replay audio for this message"
                      title="Replay message audio"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Replay</span>
                    </button>
                  )}
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

          {/* Suggested Question Chips */}
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
            <div className="flex items-center justify-between gap-2 mb-2">
              {/* Language Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-[#6b6b7a]">Lang:</span>
                <select
                  value={selectedLanguage.code}
                  onChange={(e) => {
                    const found = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
                    if (found) setSelectedLanguage(found);
                  }}
                  className="px-2 py-0.5 rounded-md bg-[#171a25] border border-white/[0.08] text-[11px] font-mono text-[#9a9aa8] focus:outline-none focus:border-[#ffb703]"
                  aria-label="Language Selector"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>

              {/* Status Note */}
              <span className="text-[10px] font-mono text-[#6b6b7a]">
                {voiceEnabled ? 'Voice: Active' : 'Voice: Muted'}
              </span>
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
