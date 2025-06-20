const RESUMEPROMPT = `
Samrat Mukherjee
Bengaluru, India | +91-9836746818 | mukherjeesamrat47@gmail.com
GitHub | LinkedIn | Portfolio

SUMMARY:
Software engineer with 4 years at SAP Labs. Experienced in designing secure, scalable microservices using Java, Spring Boot, React & AWS (S3, IAM, RDS, EC2, CodeBuild, CloudWatch). Strong in containerized deployments (Docker, Kubernetes) & building intelligent backend flows using GenAI, Redis, & Temporal.

EXPERIENCE:
SAP Labs India – Software Engineer
Aug 2021 – Present

SAP Concur R&D (Aug 2023 – Present)
- Collaborated with a 5-member team on a Spring Boot + React microservices system processing ~90,000 daily transactions across 3 regions, peaking at 120,000.
- Led backend security upgrades in US Gov Cloud: implemented SAML2 authentication and migrated cryptographic standards from MD5 to SHA-256, 3DES to AES.
- Resolved CodeQL-detected vulnerabilities: input validation, unsafe deserialization, null checks, etc.
- Refactored RBAC logic & config JSONs to support scalable, field-level access control.
- Designed 8+ REST APIs with Spring Boot & MySQL, integrated Redis to reduce latency by 35%.
- Co-integrated Temporal (Kafka-like orchestration engine) into the system and built fault-tolerant asynchronous workflows for multi-service orchestration; contributed system architecture diagrams.
- Integrated AWS S3 via AWS Java SDK for secure storage & retrieval of configuration artifacts.
- Built JSON-driven unified controller API, cutting backend effort for config screens by 66%.
- Upgraded Spring Boot version & fixed broken @ManyToOne/@ManyToMany mappings across 100+ entities due to stricter Hibernate validation.
- Refactored entity mappings to FetchType.LAZY, reducing unnecessary DB queries.
- Standardized logger declarations across services by enforcing static final usage, reducing redundant instantiation and improving debugging via Kibana & CloudWatch.
- Led backend integration of SAP Joule chat client: built data pipeline, validated inputs, & engineered prompts for LLM responses.
- Configured EC2-based dev environment using AWS CLI & Okta Keyman for secure, VPN-free access in preconfigured AWS network.
- Key contributor on React + Redux frontend. Developed config-driven UI tightly integrated with backend.
- Authored 5+ onboarding wikis and architectural diagrams referenced during SARB (Solution Architecture Review Board) evaluations.

SAP AI Cloud Ops & Security (Apr 2022 – Aug 2023)
- Remediated 200+ AWS environment vulnerabilities, enhancing backend security posture.
- Designed a RAG-based chatbot to accelerate on-call downtime resolution using historical RCA data.
- Automated Groovy script generation using GenAI and resolved Jenkins pipeline issues via console tools.

SAP Analytics Cloud (Aug 2021 – Apr 2022)
- Owned backend GDPR compliance by updating retention logic & sanitization flows in Java-based integration service.
- Boosted test reliability via improved JUnit & Mockito coverage.

PROJECTS:
SQL Query Agent - Converts NL to SQL with RAG + LLM + secure DB execution (GitHub)
Coding Agent - Local LLM-based VSCode tool for summarizing, debugging, & enhancing code (GitHub)
Inked - Tattoo Artist discovery platform (React, Node.js / React native) - A full stack app (Web / App)

SKILLS:
Languages: Java, JavaScript, Python, SQL
Frameworks: Spring Boot, React, Redis, Temporal
Cloud: AWS (S3, IAM, RDS, EC2, CodeBuild, CloudWatch), Kubernetes, Docker
Security: OAuth2, Secure Coding, CodeQL
AI: GenAI, RAG, Prompt Engineering, NLP
Other: Git, CI/CD, DSA

EDUCATION:
M.Tech in Software Engineering, BITS Pilani (Part-time, SAP sponsored | June 2025)
`

export default RESUMEPROMPT;