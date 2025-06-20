import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const worldParams = {
  health: { label: 'Health', min: 0, max: 100, default: 60 },
  stamina: { label: 'Stamina', min: 0, max: 100, default: 50 },
  enemyNearby: { label: 'Enemy Nearby', type: 'boolean', default: true },
  hasPotion: { label: 'Has Potion', type: 'boolean', default: true },
  treasureThreatLevel: {
    label: 'Treasure Threat Level',
    type: 'select',
    options: ['low', 'medium', 'high'],
    default: 'medium'
  }
};

export default function NPCSimulation() {
  const [worldState, setWorldState] = useState(
    Object.fromEntries(
      Object.entries(worldParams).map(([key, val]) => [key, val.default])
    )
  );
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateState = (key, value) => {
    setWorldState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSimulate = async () => {
    setLoading(true);
    setOutput(null);
    setError('');

    const stateStr = JSON.stringify(worldState, null, 2);
    const prompt = `You are a dungeon guardian with the following world state:

${stateStr}

Choose a goal from this list: ["Survive", "EliminateThreat", "ProtectTreasure", "PrepareForBattle"].
Explain your reasoning and return the following JSON format only:
{
  "goal": "...",
  "reason": "...",
  "plan": ["step1", "step2", "..."]
}

Only include the JSON object in your reply. Do not wrap in markdown.`;

    try {
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { thinkingConfig: { thinkingBudget: 0 } }
      });

      const raw = result.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(raw);
      setOutput(parsed);
    } catch (err) {
      setError('⚠️ Failed to simulate. Try changing parameters.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-12 pb-24 text-left">
      <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2">/npc-simulation</h1>

      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg max-w-2xl w-full">
        <p className="text-sm text-zinc-400 mb-4">
          Simulate how a dungeon guardian thinks. Adjust the world state and see how goals are selected.
        </p>

        {Object.entries(worldParams).map(([key, config]) => (
          <div key={key} className="mb-4">
            <label className="block text-zinc-300 text-sm mb-1">{config.label}</label>
            {config.type === 'boolean' ? (
              <select
                className="bg-zinc-800 border border-zinc-600 p-2 rounded text-white text-sm"
                value={worldState[key] ? 'true' : 'false'}
                onChange={(e) => updateState(key, e.target.value === 'true')}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            ) : config.type === 'select' ? (
              <select
                className="bg-zinc-800 border border-zinc-600 p-2 rounded text-white text-sm"
                value={worldState[key]}
                onChange={(e) => updateState(key, e.target.value)}
              >
                {config.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type="range"
                min={config.min}
                max={config.max}
                value={worldState[key]}
                onChange={(e) => updateState(key, Number(e.target.value))}
                className="w-full"
              />
            )}
            {config.type !== 'boolean' && config.type !== 'select' && (
              <p className="text-xs text-zinc-500 mt-1">{worldState[key]}</p>
            )}
          </div>
        ))}

        <button
          onClick={handleSimulate}
          className="mt-4 px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 text-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Simulate'}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {output && (
          <div className="mt-6 border border-zinc-700 p-4 rounded bg-zinc-950">
            <p className="text-green-400 text-sm font-semibold">🎯 Goal: {output.goal}</p>
            <p className="text-zinc-300 text-sm mt-2">🧠 Reason: {output.reason}</p>
            <p className="text-fuchsia-400 text-sm mt-4">🪜 Plan:</p>
            <ul className="text-sm text-zinc-300 list-decimal ml-5">
              {output.plan.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500">
        🤖 This demo combines symbolic AI (GOAP) and LLM reasoning to simulate intelligent NPCs.
      </div>
    </div>
  );
}