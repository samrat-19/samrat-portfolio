import { useState } from 'react';

const Tools = () => {
  const [input, setInput] = useState('');
  const [tool, setTool] = useState('base64');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    try {
      if (tool === 'base64') {
        setOutput(btoa(input));
      } else if (tool === 'base64-decode') {
        setOutput(atob(input));
      } else if (tool === 'jwt') {
        const parts = input.split('.');
        const [header, payload] = parts;
        const decoded = {
          header: JSON.parse(atob(header)),
          payload: JSON.parse(atob(payload)),
        };
        setOutput(JSON.stringify(decoded, null, 2));
      } else if (tool === 'json') {
        const formatted = JSON.stringify(JSON.parse(input), null, 2);
        setOutput(formatted);
      }
    } catch (e) {
      setOutput('⚠️ Invalid input or format');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2">/tools</h1>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-zinc-300">Select Tool:</label>
        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="bg-zinc-800 border border-zinc-600 p-2 rounded text-sm text-white"
        >
          <option value="base64">Base64 Encode</option>
          <option value="base64-decode">Base64 Decode</option>
          <option value="jwt">JWT Decode</option>
          <option value="json">JSON Formatter</option>
        </select>
      </div>

      <textarea
        rows={5}
        placeholder="Paste input here..."
        className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-sm text-white mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleRun}
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded text-sm mb-4"
      >
        Run
      </button>

      <pre className="bg-zinc-900 border border-zinc-700 p-4 rounded text-sm text-green-300 whitespace-pre-wrap overflow-auto">
        {output || 'Output will appear here'}
      </pre>
    </div>
  );
};

export default Tools;