const Experience = () => (
  <div>
    <h1 className="text-3xl font-bold mb-6">Experience</h1>

    <section className="mb-6">
      <h2 className="text-xl font-semibold">SAP Concur R&D (Aug 2023 – Present)</h2>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Built a microservice system (Spring Boot + React) handling ~90k transactions/day.</li>
        <li>Led US Gov Cloud backend security: SAML2, SHA-256, AES migration.</li>
        <li>Integrated Redis, reduced backend latency by 35%.</li>
        <li>Co-built Temporal orchestration for multi-service workflows.</li>
        <li>Backend+Frontend config APIs with JSON-driven controllers.</li>
      </ul>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold">SAP AI Cloud Ops & Security (Apr 2022 – Aug 2023)</h2>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Remediated 200+ AWS vulnerabilities.</li>
        <li>Built RAG-based GenAI chatbot to reduce downtime using RCA data.</li>
        <li>Automated Jenkins/Groovy tasks using GenAI + CLI.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold">SAP Analytics Cloud (Aug 2021 – Apr 2022)</h2>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Owned backend GDPR compliance for integration layer.</li>
        <li>Improved test reliability via JUnit + Mockito coverage.</li>
      </ul>
    </section>
  </div>
);

export default Experience;