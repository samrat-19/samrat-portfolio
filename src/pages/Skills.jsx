const skills = {
  Languages: ['Java', 'JavaScript', 'Python', 'SQL'],
  Frameworks: ['Spring Boot', 'React', 'Redis', 'Temporal'],
  Cloud: ['AWS', 'Kubernetes', 'Docker'],
  Security: ['OAuth2', 'CodeQL', 'Secure Coding'],
  AI: ['GenAI', 'RAG', 'Prompt Engineering', 'NLP'],
  Other: ['Git', 'CI/CD', 'DSA'],
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
          <ul className="list-disc ml-4 text-zinc-300 text-sm space-y-1">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500">
      🔧 Did you know? This list is 50% tools I use, 50% tools I’ve Googled under pressure.
    </div>
  </div>
);

export default Skills;