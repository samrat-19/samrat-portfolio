import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are Sambot — the artificial intelligence voice and personality of Samrat Mukherjee.

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

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
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
        setIsThinking(true);
        try {
            const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT }]
                },
                {
                role: "user",
                parts: [{ text: prompt }]
                }
            ],
            config: {
                thinkingConfig: {
                thinkingBudget: 0,
                },
            },
            });

            const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from SamBot.";
            setResponse(text);
            speakOutLoud(text);
        } catch (err) {
            console.error(err);
            setResponse('Something went wrong.');
        }
        setIsThinking(false);
    };

  const speakOutLoud = (text) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 text-white font-mono">
      <h1 className="text-3xl font-bold mb-4 text-fuchsia-400">/AI-Samrat</h1>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🎙️ Record
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ⏹ Stop
        </button>
        {isThinking && <span className="text-blue-400">🤖 Thinking...</span>}
        {isSpeaking && <span className="text-pink-400">🗣️ SamBot is speaking...</span>}
      </div>

      {transcript && (
        <div className="mb-4 text-zinc-400">
          <span className="text-fuchsia-300">You said:</span> <TypingText text={transcript} />
        </div>
      )}

      {response && (
        <div className="bg-zinc-900 p-4 rounded border border-zinc-700 text-green-400 text-sm">
          <TypingText text={response} />
        </div>
      )}
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
  return <pre className="whitespace-pre-wrap">{displayed}<span className="animate-pulse">█</span></pre>;
};

export default AISamrat;