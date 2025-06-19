import { useEffect, useState } from 'react';

const Projects = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [animatedLogs, setAnimatedLogs] = useState([]);
  const [typing, setTyping] = useState(false);

  const projects = [
    {
      name: 'SQL Query Agent',
      desc: 'Converts natural language to SQL using RAG, LLM, and secure DB execution.',
      link: 'https://github.com/samrat-19/iqa-core',
      tech: ['RAG', 'LLM', 'MySQL', 'Secure Execution'],
      logLines: [
        '> run iqa-core',
        '✔ connected to MySQL',
        '✔ parsed: "get active users in last 7 days"',
        '✔ SQL generated and executed'
      ]
    },
    {
      name: 'Coding Agent',
      desc: 'VSCode tool using local LLMs to summarize, debug, and enhance code.',
      link: 'https://github.com/samrat-19/codingAgent',
      tech: ['React', 'VSCode API', 'LLM'],
      logLines: [
        '> run codingAgent --file App.jsx',
        '✔ summarizing component...',
        '✔ found 2 props, 1 state variable',
        '✔ added missing comment blocks'
      ]
    },
    {
      name: 'Inked',
      desc: 'Tattoo artist discovery platform built with React, Node.js, and React Native.',
      link: 'https://github.com/samrat-19/inked-core',
      tech: ['React', 'Node.js', 'MongoDB', 'React Native'],
      logLines: [
        '> start inked',
        '✔ loading artists in your area...',
        '✔ applied filters: style = realism',
        '✔ 24 profiles loaded'
      ]
    },
    {
      name: 'Sam Bot',
      desc: 'My voice-controlled digital clone. Powered by Ollama + LLaMA 3.1 with WebSpeech, Flask backend, and React UI.',
      link: 'https://github.com/samrat-19/SamBot-core',
      tech: ['LLaMA 3.1', 'Ollama', 'Flask', 'React', 'Tailwind', 'Web Speech API'],
      logLines: [
        '> booting SamBot...',
        '✔ model loaded: LLaMA 3.1 (via Ollama)',
        '✔ system prompt: loaded personality and context',
        '✔ Flask server started on port 5000',
        '✔ UI connected — listening for voice commands',
        '🧠 SamBot is ready. Ask me anything.'
      ]
    }
  ];

  const toggleTerminal = (i, logs) => {
    if (openIndex === i) {
      setOpenIndex(null);
      setAnimatedLogs([]);
      setTyping(false);
    } else {
      setOpenIndex(i);
      setAnimatedLogs([]);
      setTyping(true);
      animateLogs(logs);
    }
  };

  const animateLogs = (lines) => {
    let i = 0;
    setAnimatedLogs([]);
    const next = () => {
      if (i < lines.length) {
        setAnimatedLogs((prev) => [...prev, lines[i]]);
        const baseDelay = 350;
        const randomOffset = Math.floor(Math.random() * 300);
        const lineLengthFactor = Math.min(lines[i].length * 8, 1200);
        i++;
        setTimeout(next, baseDelay + randomOffset + lineLengthFactor);
      } else {
        setTyping(false);
      }
    };
    next();
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12 pb-10">
      <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2 text-left sm:text-left">/projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {projects.map(({ name, desc, link, tech, logLines }, i) => (
          <div
            key={i}
            className="flex flex-col justify-between h-full bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-4 hover:border-fuchsia-500 transition duration-300 hover:shadow-[0_0_12px_#D946EF]"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">{name}</h2>
              <p className="text-zinc-400 text-sm mb-3">{desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-fuchsia-600/20 text-fuchsia-300 px-2 py-1 rounded font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-400 hover:underline text-sm sm:whitespace-nowrap"
                >
                  View on GitHub →
                </a>

                <button
                  onClick={() => toggleTerminal(i, logLines)}
                  className="text-xs text-zinc-300 hover:text-fuchsia-400 border border-zinc-600 px-2 py-1 rounded transition w-fit"
                >
                  {openIndex === i ? 'Hide Logs' : 'View Logs'}
                </button>
              </div>

              {openIndex === i && (
                <pre className="bg-zinc-950 text-green-400 text-xs font-mono p-3 mt-4 rounded border border-zinc-800 whitespace-pre-wrap break-words min-h-[100px]">
                  {animatedLogs.join('\n')}
                  {typing && <span className="animate-pulse">█</span>}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500 text-center sm:text-left">
        ⚡ Did you know? Every one of these projects started as a weekend experiment. Some just never stopped.
      </div>
    </div>
  );
};

export default Projects;