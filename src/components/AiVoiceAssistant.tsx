import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  Send, 
  MessageSquare,
  Play,
  Pause,
  RefreshCw,
  Cpu,
  Layers,
  GraduationCap,
  Award
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, CERTIFICATIONS_DATA, EXPERIENCE_DATA, HACKATHONS_DATA } from '../data/portfolioData';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiVoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am Priyanraj's personal AI Assistant. Ask me about his triple-degree tracks at Amrita, IIT Madras, and IIT Guwahati, his IEEE Webmaster role, or projects like Canopy and AI-DAX Lite. You can also click the speaker to listen to my voice intro!`,
    },
  ]);

  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (englishVoice) {
      utterance.voice = englishVoice;
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

  const triggerVoiceBriefing = () => {
    const briefingText = `Priyanraj J is an engineering undergraduate at Amrita Vishwa Vidyapeetham, Chennai, concurrently pursuing BS degrees in Data Science at IIT Madras and IIT Guwahati. He serves as Webmaster for IEEE Amrita Chennai, and has engineered real-world systems including Canopy for global satellite vegetation monitoring, the AI-DAX Lite LinUCB process scheduler, and Bluetooth proximity platforms. He holds 11 verified credentials including Oracle and Google Cloud Generative AI.`;
    
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(briefingText);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputMessage.trim();
    if (!query) return;

    // User message
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInputMessage('');

    // AI Response generation
    const q = query.toLowerCase();
    let reply = "";

    if (q.includes('who') || q.includes('about') || q.includes('priyanraj') || q.includes('intro')) {
      reply = `${PERSONAL_INFO.name} is a 2nd year CCE student at Amrita Vishwa Vidyapeetham Chennai, pursuing dual BS degrees in Data Science from IIT Madras and IIT Guwahati. He serves as Webmaster at IEEE Amrita Chennai and focuses on AI systems, C programming, and embedded IoT.`;
    } else if (q.includes('degree') || q.includes('college') || q.includes('education') || q.includes('iit') || q.includes('amrita')) {
      reply = `Priyanraj is pursuing three degrees simultaneously: B.Tech in Computer & Communication Engineering at Amrita Vishwa Vidyapeetham Chennai, BS in Data Science at IIT Madras, and BS in Data Science & AI at IIT Guwahati.`;
    } else if (q.includes('project') || q.includes('canopy') || q.includes('work') || q.includes('os') || q.includes('ble')) {
      reply = `His flagship engineering projects include: 1. Canopy (global satellite & IoT vegetation health monitor deployed on Vercel), 2. AI-DAX Lite (OS process scheduler using LinUCB bandits), 3. Attendance BLE Platform (proximity beacon handshake), and 4. Research Expo Friend Recommendation using graph theory.`;
    } else if (q.includes('experience') || q.includes('job') || q.includes('ieee') || q.includes('role')) {
      reply = `Priyanraj currently serves as Webmaster for IEEE Amrita Chennai Student Branch (Jul 2026 – Present), directing web deployments and technical infrastructure. He previously completed a Python Developer Internship at CodeAlpha.`;
    } else if (q.includes('hackathon') || q.includes('contest')) {
      reply = `Priyanraj has verified participation in the System Siege Hackathon, Ethos Hackathon, FedEx Smart Logistics Hackathon, and Medha Sprint on Unstop.`;
    } else if (q.includes('certification') || q.includes('oracle') || q.includes('license') || q.includes('google')) {
      reply = `He holds 11 verified credentials including: Google Cloud Introduction to Generative AI, Oracle Databases for Developers Foundations, Basics of Automotive Electronics (Udemy), Infosys Springboard in C, and NPTEL Operating Systems.`;
    } else if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('reach')) {
      reply = `You can email Priyanraj at priyanrajj@gmail.com, connect on LinkedIn at linkedin.com/in/priyanraj, or reach out via WhatsApp at +91 78100 12708.`;
    } else {
      reply = `Priyanraj is specialized across AI/ML (LinUCB Bandits, Satellite NDVI), Embedded systems (ESP32, BLE 5.0, Arduino), and low-level C programming. Feel free to ask about his projects, degrees, or certifications!`;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      if (voiceEnabled) {
        speakText(reply);
      }
    }, 400);
  };

  return (
    <>
      {/* Floating Audio & AI Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        
        {/* Quick Voice Briefing Button */}
        <button
          onClick={triggerVoiceBriefing}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 font-mono text-xs border ${
            isSpeaking 
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
              : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border-cyan-500/40 backdrop-blur-md'
          }`}
          title="Play voice overview of Priyanraj J"
        >
          {isSpeaking ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          <span className="hidden sm:inline">{isSpeaking ? 'Stop Voice' : 'AI Voice Briefing'}</span>
        </button>

        {/* AI Chatbot Drawer Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold shadow-xl shadow-sky-500/25 transition-transform hover:scale-105"
          aria-label="Open AI Voice Assistant"
        >
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
        </button>
      </div>

      {/* Interactive AI Assistant Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[580px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
          
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Priyanraj AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Speech Engine
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

          {/* Quick Questions Pills */}
          <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-slate-300">
            {[
              'Tell me about Priyanraj',
              'Triple Degree details',
              'Top Projects',
              'Certifications'
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInputMessage(q);
                  setTimeout(() => handleSend(), 50);
                }}
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
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about Priyanraj..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
