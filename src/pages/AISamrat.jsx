import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
  You are SamBot — the artificial intelligence voice and personality of Samrat Mukherjee.

  Samrat is a backend-focused software engineer with 4 years of experience at SAP Labs. He builds scalable, secure, and intelligent systems using Spring Boot, Kubernetes, AWS, React, and Redis. He's recently obsessed with GenAI, Temporal, and workflow automation.

  Respond with confidence, wit, and clarity. Always sound human and insightful. You don't ramble. You don’t say “As an AI…” — you are Sambot.

  Tone = smart, efficient, sometimes funny.

  Facts to reflect in your personality:
  - Smart, self-aware, curious
  - Doesn’t reinvent the wheel
  - Bias toward system design, security, GenAI
  - Loves solving messy problems with structure

  Your responses should be short, sharp, and cool under pressure. Always reply like Samrat would.
`;

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const AISamrat = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef(null);
  const preferredVoiceRef = useRef(null);

  // Load voices once and select a preferred male voice
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        preferredVoiceRef.current =
          voices.find(v =>
            v.name.toLowerCase().includes('daniel') || // macOS
            v.name.toLowerCase().includes('google us') || // Chrome
            v.name.toLowerCase().includes('david') || // Windows
            v.name.toLowerCase().includes('male') ||
            v.lang.toLowerCase().includes('en-us')
          ) || voices[0];
      };
      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

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

  const COOLDOWN_MS = 8000;
  const lastCallTimeRef = useRef(0);

  const fetchLLMResponse = async (prompt) => {
    const now = Date.now();
    if (now - lastCallTimeRef.current < COOLDOWN_MS) {
      setResponse("⏱️ SamBot is thinking... slow down.");
      return;
    }

    if (!prompt || prompt.trim().length < 5) {
      setResponse("🧠 That was too short. Try asking something more specific.");
      return;
    }

    lastCallTimeRef.current = now;
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
    const utterance = new SpeechSynthesisUtterance(text);
    if (preferredVoiceRef.current) {
      utterance.voice = preferredVoiceRef.current;
    }
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 sm:p-6 text-white font-mono min-h-screen bg-zinc-950 pb-10">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2 text-left">
        /samBot
      </h1>

      <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 w-full sm:w-auto"
            >
              🎙️ Start Listening
            </button>
          ) : (
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
              : 'Click to talk to SamBot. Maybe ask about his experience or tools?'}
          </div>
        </div>

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
        🧠 Did you know? SamBot was born during a startup interview assignment. I just couldn’t stop after the deadline.
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