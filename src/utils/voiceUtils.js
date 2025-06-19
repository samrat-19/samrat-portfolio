// voiceUtils.js

let selectedVoice = null;

const loadVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  selectedVoice =
    voices.find((v) => v.name === 'Gordon') ||
    voices.find((v) => v.lang === 'en-IN') ||
    voices[0];
};

if (typeof window !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

export const speakText = (text, onEnd) => {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.rate = 0.95;
  utterance.pitch = 1.2;
  utterance.volume = 1;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

export const startSpeechRecognition = (onResult) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert('Speech Recognition not supported in this browser.');

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    onResult('');
  };

  recognition.start();
  window.recognitionInstance = recognition;
};