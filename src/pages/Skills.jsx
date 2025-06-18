const skills = {
  Languages: [
    { name: 'Java', level: 75 },
    { name: 'JavaScript', level: 70 },
    { name: 'Python', level: 60 },
    { name: 'SQL', level: 75 }
  ],
  Frameworks: [
    { name: 'Spring Boot', level: 80 },
    { name: 'React', level: 70 },
    { name: 'Redis', level: 60 },
    { name: 'Temporal', level: 75 }
  ],
  Cloud: [
    { name: 'AWS', level: 75 },
    { name: 'Kubernetes', level: 70 },
    { name: 'Docker', level: 65 }
  ],
  Security: [
    { name: 'Cloud Security', level: 70 },
    { name: 'Cryptography', level: 40 },
    { name: 'Backend Security', level: 75 }
  ],
  AI: [
    { name: 'GenAI', level: 85 },
    { name: 'RAG', level: 70 },
    { name: 'Prompt Engineering', level: 85 },
    { name: 'NLP', level: 60 }
  ],
  Other: [
    { name: 'Git', level: 80 },
    { name: 'CI/CD', level: 70 },
    { name: 'DSA', level: 85 }
  ]
};

const Skills = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2">/skills</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(skills).map(([category, items]) => (
        <div
          key={category}
          className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-4 hover:border-fuchsia-500 transition duration-300 hover:shadow-[0_0_12px_#D946EF]"
        >
          <h2 className="text-xl font-semibold mb-2 text-white">{category}</h2>
          <div className="space-y-3">
          {items.map(({ name, level }) => (
            <div key={name}>
              <div className="flex justify-between text-sm text-zinc-300 mb-1">
                <span>{name}</span>
                <span className="text-zinc-500">{level}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full">
                <div className="h-full bg-fuchsia-300/60 rounded-full" style={{ width: `${level}%` }} />
              </div>
            </div>
          ))}
        </div>
        </div>
      ))}
    </div>

    <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500">
      🔧 Did you know? This list is 50% tools I use, 50% tools I’ve Googled under pressure.
    </div>
  </div>
);

export default Skills;