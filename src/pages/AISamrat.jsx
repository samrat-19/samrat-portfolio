import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { speakText } from '../utils/voiceUtils';
import SYSTEM_PROMPT from '../utils/systemPrompt';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const COOLDOWN_DURATION = 120; // in seconds

const AISamrat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);
  const preferredVoiceRef = useRef(null);

  // Voice setup
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        preferredVoiceRef.current =
          voices.find(v =>
            v.name.toLowerCase().includes('daniel') ||
            v.name.toLowerCase().includes('google us') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('male') ||
            v.lang.toLowerCase().includes('en-us')
          ) || voices[0];
      };
      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Restore cooldown from localStorage
  useEffect(() => {
    const expiry = localStorage.getItem('sambot_cooldown_expiry');
    if (expiry) {
      const remaining = Math.floor((+expiry - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  // Countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(timer);
          localStorage.removeItem('sambot_cooldown_expiry');
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      fetchLLMResponse(spoken);
    };

    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      speechSynthesis.cancel();
      setTranscript('');
      setResponse('');
      setIsThinking(false);
      setIsRecording(false);
      setIsSpeaking(false);
    };
  }, []);

  const startRecording = () => {
    setTranscript('');
    setResponse('');
    setIsRecording(true);
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    recognitionRef.current.stop();
    setIsRecording(false);
  };

  const fetchLLMResponse = async (prompt) => {
    if (!prompt || prompt.trim().length < 5) {
      setResponse("🧠 That was too short. Try asking something more specific.");
      return;
    }

    const expiry = Date.now() + COOLDOWN_DURATION * 1000;
    localStorage.setItem('sambot_cooldown_expiry', expiry.toString());
    setCooldown(COOLDOWN_DURATION);
    setIsThinking(true);

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "user", parts: [{ text: prompt }] }
        ],
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from SamBot.";
      setResponse(text);
      speakOutLoud(text);
    } catch (err) {
      console.error(err);
      setResponse("⚡ Oops! SamBot tripped over a wire.");
    }

    setIsThinking(false);
  };

  const speakOutLoud = (text) => {
    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  };

  return (
    <div className="p-4 sm:p-6 text-white font-mono min-h-screen bg-zinc-950 pb-10">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2 text-left">
        /samBot
      </h1>

      <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 w-full sm:w-auto disabled:opacity-40"
            disabled={cooldown > 0 || isRecording}
          >
            🎙️ Start Listening
          </button>

          {isRecording && (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 w-full sm:w-auto"
            >
              🔇 Stop Listening
            </button>
          )}

          {isSpeaking && (
            <button
              onClick={() => speechSynthesis.cancel()}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 w-full sm:w-auto"
            >
              🛑 Stop Speaking
            </button>
          )}

          <div className="flex-1 text-sm text-zinc-400 italic text-center sm:text-left">
            {isRecording
              ? 'Listening to your voice...'
              : isThinking
              ? 'Thinking...'
              : isSpeaking
              ? 'Responding...'
              : cooldown > 0
              ? `Cooldown: ${cooldown}s left`
              : 'Click to talk to SamBot. Maybe ask about his experience or tools?'}
          </div>
        </div>

        {cooldown > 0 && (
          <div className="text-xs text-zinc-400 italic animate-pulse text-center sm:text-left">
            ⏳ SamBot cooldown in progress: {cooldown}s
          </div>
        )}

        {transcript && (
          <div className="bg-zinc-800 p-4 rounded text-zinc-300 text-sm">
            <span className="text-fuchsia-300 font-semibold">You said:</span>
            <TypingText text={transcript} />
          </div>
        )}

        {response && (
          <div className="bg-black p-4 rounded border border-zinc-700 text-green-400 text-sm">
            <TypingText text={response} />
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500 text-left">
        <p>🧠 Did you know? SamBot was born during a startup interview assignment. I just couldn’t stop after the deadline.</p>
        <p className="mt-2 text-xs text-zinc-600">🚧 Still under development — stay tuned for more updates.</p>
      </div>
    </div>
  );
};

const TypingText = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [text]);
  return <pre className="whitespace-pre-wrap mt-1">{displayed}<span className="animate-pulse">█</span></pre>;
};

export default AISamrat;