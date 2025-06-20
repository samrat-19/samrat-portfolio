import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import RESUMEPROMPT from '../prompts/resumePrompt';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const Resume = () => {
  const [jdText, setJdText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState('');

  // ⏳ Restore cooldown from localStorage on load
  useEffect(() => {
    const expiry = localStorage.getItem("resumeCooldownExpiry");
    if (expiry) {
      const remaining = Math.floor((parseInt(expiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem("resumeCooldownExpiry");
      }
    }
  }, []);

  // ⏲ Countdown effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("resumeCooldownExpiry");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const analyzeJD = async () => {
    setLoading(true);
    setError('');
    setAnalysis(null);

    const prompt = `Given the following resume and job description, evaluate the match.

Return only valid JSON in this format:
{
  "score": integer (0-100),
  "matched_skills": ["..."],
  "missing_skills": ["..."],
  "suggestions": ["..."]
}

Resume:
${RESUMEPROMPT}

Job Description:
${jdText}

Respond only with valid JSON. Do not wrap it inside code blocks or markdown. Just return the JSON object.`;

    // 🔐 Start cooldown
    const expiry = Date.now() + 120 * 1000;
    localStorage.setItem("resumeCooldownExpiry", expiry.toString());
    setCooldown(120);

    let attempts = 0;
    while (attempts < 3) {
      try {
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: { thinkingConfig: { thinkingBudget: 0 } }
        });

        const raw = result.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(raw);
        setAnalysis(parsed);
        break;
      } catch (err) {
        attempts++;
        if (attempts === 3) setError('Failed to analyze JD. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-12 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2 text-left">
        /resume
      </h1>

      {/* Resume Download */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-6 hover:border-fuchsia-500 hover:shadow-[0_0_12px_#D946EF] transition duration-300 max-w-xl w-full text-left">
        <p className="text-zinc-300 mb-4 text-sm">
          You can download my latest resume below.
        </p>
        <a
          href="/Samrat-Mukherjee-Resume-2025.pdf"
          target="_blank"
          download
          className="inline-block px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition text-sm"
        >
          ⬇ Download Resume (PDF)
        </a>
      </div>

      {/* Analyzer Section */}
      <div className="mt-10 border-t border-zinc-800 pt-6 text-left">
        <h2 className="text-xl font-semibold text-fuchsia-400 mb-3">📋 Resume vs JD Analyzer</h2>
        <p className="text-sm text-zinc-400 mb-2">Paste a JD below. We’ll tell you how well you match.</p>

        <textarea
          rows={6}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste JD here..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-sm text-white mb-4"
        />

        <button
          onClick={analyzeJD}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 text-sm disabled:opacity-50"
          disabled={loading || !jdText.trim() || cooldown > 0}
        >
          {loading
            ? 'Analyzing...'
            : cooldown > 0
            ? `⏳ Cooldown: ${cooldown}s`
            : 'Analyze'}
        </button>

        {/* Cooldown Progress Bar */}
        {cooldown > 0 && (
          <div className="mt-3 w-full h-2 bg-zinc-800 rounded overflow-hidden">
            <div
              className="h-full bg-fuchsia-500 transition-all duration-1000"
              style={{ width: `${(120 - cooldown) / 120 * 100}%` }}
            />
          </div>
        )}

        {/* Error */}
        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

        {/* Results */}
        {analysis && (
          <div className="mt-6 bg-zinc-900 border border-zinc-700 p-4 rounded">
            <p className="text-green-400 text-sm font-semibold">Score: {analysis.score}/100</p>

            <p className="text-fuchsia-400 text-sm mt-3">Matched Skills:</p>
            <ul className="text-sm text-zinc-300 list-disc ml-5">
              {analysis.matched_skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>

            <p className="text-yellow-400 text-sm mt-3">Missing Skills:</p>
            <ul className="text-sm text-zinc-300 list-disc ml-5">
              {analysis.missing_skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>

            <p className="text-blue-400 text-sm mt-3">Suggestions:</p>
            <ul className="text-sm text-zinc-300 list-disc ml-5">
              {analysis.suggestions.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500 text-left">
        🧪 Note: PDF upload is currently disabled due to reliability issues. We recommend pasting JD text directly from job portals.
      </div>

      <div className="mt-4 text-sm italic text-zinc-500 text-left">
        📜 Did you know? This resume has survived more screening rounds than my first job.
      </div>
    </div>
  );
};

export default Resume;