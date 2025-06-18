const projects = [
  {
    name: 'SQL Query Agent',
    desc: 'Converts natural language to SQL using RAG, LLM, and secure DB execution.',
    link: 'https://github.com/samrat-19/iqa-core',
  },
  {
    name: 'Coding Agent',
    desc: 'VSCode tool using local LLMs to summarize, debug, and enhance code.',
    link: 'https://github.com/samrat-19/codingAgent',
  },
  {
    name: 'Inked',
    desc: 'Tattoo artist discovery platform built with React, Node.js, and React Native.',
    link: 'https://github.com/samrat-19/inked-core',
  }
];

const Projects = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2">/projects</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <div
          key={i}
          className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-4 hover:border-fuchsia-500 transition duration-300 hover:shadow-[0_0_12px_#D946EF]"
        >
          <h2 className="text-xl font-semibold text-white">{p.name}</h2>
          <p className="text-zinc-400 mb-2">{p.desc}</p>
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fuchsia-400 hover:underline text-sm"
          >
            View on GitHub →
          </a>
        </div>
      ))}
    </div>

    <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500">
      ⚡ Did you know? Every one of these projects started as a weekend experiment. Some just never stopped.
    </div>
  </div>
);

export default Projects;