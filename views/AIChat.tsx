
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, AlertCircle, Info, Mic, Shield, Square, MicOff, WifiOff, RefreshCw } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { Message } from '../types';
import { Button } from '../components/Button';

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'ai',
      text: 'Namaste! I am MannSathi, your mind\'s companion. How are you feeling today? (Aap kaisa mehsoos kar rahe hain?)',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crisisDetected, setCrisisDetected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'permission' | 'network' | 'general' | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isStartingRef = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }

    const initRecognition = () => {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMessage(null);
        setErrorType(null);
        isStartingRef.current = false;
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
        isStartingRef.current = false;
        
        switch (event.error) {
          case 'not-allowed':
            setErrorType('permission');
            setErrorMessage('Microphone access denied. Please allow it in settings.');
            break;
          case 'network':
            setErrorType('network');
            setErrorMessage('Speech service connection lost. This often happens on unstable networks or if the service is blocked.');
            break;
          case 'no-speech':
            // Silence detected, naturally end
            break;
          case 'audio-capture':
            setErrorType('general');
            setErrorMessage('Microphone not found. Check your hardware connections.');
            break;
          default:
            setErrorType('general');
            setErrorMessage(`Voice input error: ${event.error}. Please try typing instead.`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        isStartingRef.current = false;
      };

      recognitionRef.current = recognition;
    };

    initRecognition();
  }, []);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await GeminiService.getCompanionResponse(textToSend);
    
    if (response.isCrisis) {
      setCrisisDetected(true);
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      senderId: 'ai',
      text: response.reply || "I'm listening. Please go on...",
      timestamp: Date.now(),
      sentiment: response.sentiment
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const toggleRecording = async () => {
    if (!recognitionRef.current || isStartingRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setTimeout(() => {
        if (input.trim()) handleSend();
      }, 500);
    } else {
      try {
        isStartingRef.current = true;
        setErrorMessage(null);
        setErrorType(null);
        
        // Request permissions first to ensure availability
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        setInput('');
        recognitionRef.current.start();
      } catch (err: any) {
        console.error('Permission or start error', err);
        isStartingRef.current = false;
        setIsRecording(false);
        setErrorType('permission');
        setErrorMessage('Microphone permission required for voice chat.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col pt-6 pb-4 px-4">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 p-2.5 rounded-2xl shadow-lg shadow-teal-200">
             <Bot className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">MannSathi AI</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-teal-600 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Online Now
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-2xl text-gray-500 text-xs font-bold shadow-sm">
            <Shield size={14} className="text-teal-500" /> Fully Anonymous
          </div>
        </div>
      </div>

      {crisisDetected && (
        <div className="bg-red-50 border border-red-100 text-red-700 p-5 rounded-3xl mb-6 flex gap-4 animate-in zoom-in duration-300">
          <AlertCircle className="flex-shrink-0 text-red-500" />
          <div className="flex-grow">
            <p className="font-black text-lg mb-1">We're here for you.</p>
            <p className="text-sm opacity-90 leading-relaxed">It sounds like you're going through a lot. Please reach out to our emergency support line at <strong>9152987821</strong>. You are not alone.</p>
          </div>
          <button onClick={() => setCrisisDetected(false)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {errorMessage && (
        <div className={`p-4 rounded-2xl mb-4 text-xs font-bold flex items-center justify-between gap-4 animate-in slide-in-from-top-2 shadow-sm ${
          errorType === 'network' ? 'bg-indigo-50 border border-indigo-200 text-indigo-800' : 'bg-orange-50 border border-orange-200 text-orange-800'
        }`}>
          <div className="flex items-center gap-3">
            {errorType === 'network' ? <WifiOff size={16} /> : <AlertCircle size={16} />}
            <div className="flex flex-col">
              <span>{errorMessage}</span>
              {errorType === 'network' && <span className="text-[10px] opacity-70 mt-0.5">Tip: Try using a stable Wi-Fi connection or use the text input below.</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {errorType === 'network' && (
              <button 
                onClick={toggleRecording} 
                className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-indigo-700 transition-colors"
              >
                <RefreshCw size={12} /> Retry
              </button>
            )}
            <button onClick={() => setErrorMessage(null)} className="opacity-50 hover:opacity-100 p-1">Dismiss</button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto space-y-6 mb-6 px-4 py-2 custom-scrollbar"
      >
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex ${m.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-[2rem] px-6 py-4 shadow-sm ${
                m.senderId === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              <p className="text-base leading-relaxed font-medium">{m.text}</p>
              <div className={`mt-2 flex items-center gap-2 text-[10px] opacity-60 font-bold ${m.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {m.sentiment && <span className="bg-black/10 px-1.5 py-0.5 rounded uppercase">{m.sentiment}</span>}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-[2rem] rounded-tl-none px-6 py-4 shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition duration-300"></div>
        <div className="relative bg-white p-2.5 border border-gray-200 rounded-[2.5rem] flex gap-3 items-center shadow-xl">
          <button 
            onClick={toggleRecording}
            disabled={!isSpeechSupported || isLoading}
            className={`p-3 transition-all duration-300 rounded-full flex items-center justify-center relative ${
              isRecording 
                ? 'bg-red-500 text-white shadow-inner' 
                : 'bg-gray-50 text-gray-400 hover:text-teal-600'
            } disabled:opacity-30`}
            title={isSpeechSupported ? "Voice Input" : "Speech not supported in this browser"}
          >
            {isRecording ? <Square size={22} fill="white" className="animate-pulse" /> : (isSpeechSupported ? <Mic size={22} /> : <MicOff size={22} />)}
            {isRecording && (
              <span className="absolute -inset-1 rounded-full border-2 border-red-500 animate-ping opacity-50"></span>
            )}
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 font-medium py-3 px-2"
            placeholder={isRecording ? "Listening... (Aap bol sakte hain)" : "Share what's on your mind..."}
          />
          <Button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shrink-0 shadow-teal-200 shadow-lg"
          >
            <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-gray-400 font-medium">
         <div className="flex items-center gap-1.5">
           <Info size={12} /> 
           <span>MannSathi AI is a supportive tool, not a medical professional.</span>
         </div>
      </div>
    </div>
  );
};

export default AIChat;
