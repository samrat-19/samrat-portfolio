const roles = [
  {
    title: 'SAP Concur R&D',
    period: 'Aug 2023 – Present',
    tech: ['Microservices', 'Spring Boot', 'React', 'MySQL', 'Temporal', 'Redis', 'AWS', 'Web Security'],
    bullets: [
      'Built microservices system (Spring Boot + React) handling ~90k transactions/day.',
      'Led backend security upgrades (SAML2, SHA-256, AES).',
      'Integrated Redis to reduce latency by 35%.',
      'Built JSON-driven config controller, cut backend effort by 66%.',
      'Co-integrated Temporal to orchestrate multi-service workflows.'
    ]
  },
  {
    title: 'SAP AI Cloud Ops & Security',
    period: 'Apr 2022 – Aug 2023',
    tech: ['Automation', 'DevOps', 'AWS', 'Cloud Security', 'GenAI'],
    bullets: [
      'Remediated 200+ AWS environment vulnerabilities.',
      'Built RAG-based GenAI chatbot for on-call troubleshooting.',
      'Automated Groovy + Jenkins tasks using GenAI tooling.'
    ]
  },
  {
    title: 'SAP Analytics Cloud',
    period: 'Aug 2021 – Apr 2022',
    tech: ['Java', 'JUnit', 'Mockito'],
    bullets: [
      'Owned backend GDPR compliance flow.',
      'Improved test reliability using JUnit and Mockito.'
    ]
  }
];

const Experience = () => (
  <div className="px-4 sm:px-8 lg:px-12 pb-10">
    <h1 className="text-3xl font-bold mb-6 text-fuchsia-400 border-b border-zinc-700 pb-2 text-left sm:text-left">/experience</h1>

    <div className="space-y-6">
      {roles.map(({ title, period, bullets, tech }, i) => (
        <div
          key={i}
          className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700 rounded-lg p-4 hover:border-fuchsia-500 transition duration-300 hover:shadow-[0_0_12px_#D946EF]"
        >
          {/* Title + Period (mobile stacked) */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
            <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
            <span className="text-sm text-zinc-400">{period}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tech.map((t) => (
              <span
                key={t}
                className="text-xs bg-fuchsia-600/20 text-fuchsia-300 px-2 py-1 rounded font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bullet Points */}
          <ul className="list-disc ml-5 text-zinc-300 text-sm space-y-1">
            {bullets.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-10 border-t border-zinc-800 pt-4 text-sm italic text-zinc-500 text-center sm:text-left">
      🐛 Did you know? I once did a Spring Boot major upgrade. It worked. I cried.
    </div>
  </div>
);

export default Experience;