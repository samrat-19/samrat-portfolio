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
    <h1 className="text-3xl font-bold mb-6">Projects</h1>
    <ul className="space-y-6">
      {projects.map((p, i) => (
        <li key={i}>
          <h2 className="text-xl font-semibold">{p.name}</h2>
          <p className="text-zinc-300">{p.desc}</p>
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View on GitHub</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Projects;