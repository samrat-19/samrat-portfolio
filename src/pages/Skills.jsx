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
    <h1 className="text-3xl font-bold mb-6">Skills</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <ul className="list-disc ml-6 text-zinc-300">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default Skills;