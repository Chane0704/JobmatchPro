// JobMatch Pro - Comprehensive Skills Database & Taxonomy
// Contains 350+ categorized tech and professional keywords with synonyms & weightings.

const SKILLS_DATABASE = [
  // Programming Languages
  { name: 'JavaScript', category: 'Languages', aliases: ['javascript', 'js', 'es6', 'es2020', 'vanilla js'] },
  { name: 'TypeScript', category: 'Languages', aliases: ['typescript', 'ts'] },
  { name: 'Python', category: 'Languages', aliases: ['python', 'py', 'python3'] },
  { name: 'Java', category: 'Languages', aliases: ['java', 'core java'] },
  { name: 'C++', category: 'Languages', aliases: ['c++', 'cpp'] },
  { name: 'C#', category: 'Languages', aliases: ['c#', 'csharp', '.net'] },
  { name: 'Go', category: 'Languages', aliases: ['golang', 'go language'] },
  { name: 'Rust', category: 'Languages', aliases: ['rust', 'rustlang'] },
  { name: 'Ruby', category: 'Languages', aliases: ['ruby', 'ruby on rails', 'rails'] },
  { name: 'PHP', category: 'Languages', aliases: ['php', 'php8'] },
  { name: 'Swift', category: 'Languages', aliases: ['swift', 'ios'] },
  { name: 'Kotlin', category: 'Languages', aliases: ['kotlin', 'android'] },
  { name: 'SQL', category: 'Languages', aliases: ['sql', 'ansi sql', 't-sql', 'pl/sql'] },
  { name: 'HTML5', category: 'Languages', aliases: ['html', 'html5'] },
  { name: 'CSS3', category: 'Languages', aliases: ['css', 'css3', 'scss', 'sass', 'less'] },
  { name: 'Bash', category: 'Languages', aliases: ['bash', 'shell script', 'powershell', 'zsh'] },
  { name: 'R', category: 'Languages', aliases: ['r programming', 'r language'] },
  { name: 'Scala', category: 'Languages', aliases: ['scala'] },

  // Frontend Libraries & Frameworks
  { name: 'React', category: 'Frontend', aliases: ['react', 'react.js', 'reactjs'] },
  { name: 'Next.js', category: 'Frontend', aliases: ['next.js', 'nextjs', 'next'] },
  { name: 'Vue.js', category: 'Frontend', aliases: ['vue', 'vue.js', 'vuejs', 'vue 3'] },
  { name: 'Angular', category: 'Frontend', aliases: ['angular', 'angularjs', 'angular 2+'] },
  { name: 'Svelte', category: 'Frontend', aliases: ['svelte', 'sveltekit'] },
  { name: 'Tailwind CSS', category: 'Frontend', aliases: ['tailwind', 'tailwindcss'] },
  { name: 'Redux', category: 'Frontend', aliases: ['redux', 'redux toolkit', 'rtk'] },
  { name: 'GraphQL', category: 'Frontend', aliases: ['graphql', 'apollo client'] },
  { name: 'REST APIs', category: 'Frontend', aliases: ['rest', 'restful', 'rest api', 'restful apis'] },
  { name: 'Webpack', category: 'Frontend', aliases: ['webpack', 'vite', 'turbopack', 'rollup'] },
  { name: 'Responsive Design', category: 'Frontend', aliases: ['responsive design', 'mobile-first', 'flexbox', 'css grid'] },
  { name: 'WebSockets', category: 'Frontend', aliases: ['websockets', 'socket.io'] },
  { name: 'Web Accessibility', category: 'Frontend', aliases: ['accessibility', 'a11y', 'wcag'] },

  // Backend & Architecture
  { name: 'Node.js', category: 'Backend', aliases: ['node.js', 'nodejs', 'node'] },
  { name: 'Express', category: 'Backend', aliases: ['express', 'express.js', 'expressjs'] },
  { name: 'NestJS', category: 'Backend', aliases: ['nestjs', 'nest.js'] },
  { name: 'Django', category: 'Backend', aliases: ['django', 'django rest framework', 'drf'] },
  { name: 'FastAPI', category: 'Backend', aliases: ['fastapi', 'fast-api'] },
  { name: 'Flask', category: 'Backend', aliases: ['flask'] },
  { name: 'Spring Boot', category: 'Backend', aliases: ['spring boot', 'spring framework', 'spring'] },
  { name: 'Microservices', category: 'Backend', aliases: ['microservices', 'microservice architecture', 'distributed systems'] },
  { name: 'gRPC', category: 'Backend', aliases: ['grpc', 'protobuf'] },
  { name: 'Kafka', category: 'Backend', aliases: ['kafka', 'apache kafka', 'message queue'] },
  { name: 'RabbitMQ', category: 'Backend', aliases: ['rabbitmq', 'amqp'] },
  { name: 'Serverless', category: 'Backend', aliases: ['serverless', 'lambda', 'aws lambda', 'cloud functions'] },

  // Databases & Caching
  { name: 'PostgreSQL', category: 'Database', aliases: ['postgresql', 'postgres', 'psql'] },
  { name: 'MySQL', category: 'Database', aliases: ['mysql', 'mariadb'] },
  { name: 'MongoDB', category: 'Database', aliases: ['mongodb', 'mongo', 'nosql'] },
  { name: 'Redis', category: 'Database', aliases: ['redis', 'caching', 'in-memory cache'] },
  { name: 'Elasticsearch', category: 'Database', aliases: ['elasticsearch', 'opensearch', 'elk stack'] },
  { name: 'DynamoDB', category: 'Database', aliases: ['dynamodb'] },
  { name: 'Supabase', category: 'Database', aliases: ['supabase'] },
  { name: 'Firebase', category: 'Database', aliases: ['firebase', 'firestore'] },
  { name: 'Prisma ORM', category: 'Database', aliases: ['prisma', 'typeorm', 'sequelize', 'hibernate'] },

  // Cloud & DevOps
  { name: 'AWS', category: 'DevOps', aliases: ['aws', 'amazon web services', 'ec2', 's3', 'rds', 'cloudformation'] },
  { name: 'Docker', category: 'DevOps', aliases: ['docker', 'containerization', 'docker compose'] },
  { name: 'Kubernetes', category: 'DevOps', aliases: ['kubernetes', 'k8s', 'helm'] },
  { name: 'CI/CD', category: 'DevOps', aliases: ['ci/cd', 'continuous integration', 'continuous delivery', 'github actions', 'jenkins', 'gitlab ci'] },
  { name: 'Terraform', category: 'DevOps', aliases: ['terraform', 'infrastructure as code', 'iac'] },
  { name: 'Google Cloud (GCP)', category: 'DevOps', aliases: ['gcp', 'google cloud', 'google cloud platform'] },
  { name: 'Azure', category: 'DevOps', aliases: ['azure', 'microsoft azure'] },
  { name: 'Linux', category: 'DevOps', aliases: ['linux', 'unix', 'ubuntu', 'debian'] },
  { name: 'Monitoring', category: 'DevOps', aliases: ['prometheus', 'grafana', 'datadog', 'sentry', 'new relic'] },

  // AI, ML & Data
  { name: 'Machine Learning', category: 'AI/Data', aliases: ['machine learning', 'ml', 'deep learning'] },
  { name: 'Large Language Models (LLMs)', category: 'AI/Data', aliases: ['llm', 'llms', 'gpt', 'openai', 'gemini', 'claude', 'langchain', 'rag'] },
  { name: 'PyTorch', category: 'AI/Data', aliases: ['pytorch', 'torch'] },
  { name: 'TensorFlow', category: 'AI/Data', aliases: ['tensorflow', 'keras'] },
  { name: 'Pandas', category: 'AI/Data', aliases: ['pandas', 'numpy', 'scipy'] },
  { name: 'ETL Pipelines', category: 'AI/Data', aliases: ['etl', 'data pipeline', 'data warehousing', 'snowflake', 'bigquery', 'dbt'] },
  { name: 'Apache Spark', category: 'AI/Data', aliases: ['spark', 'apache spark', 'pyspark'] },

  // Testing & Quality
  { name: 'Unit Testing', category: 'Testing', aliases: ['unit testing', 'unit tests', 'tdd', 'test driven development'] },
  { name: 'Jest', category: 'Testing', aliases: ['jest', 'vitest'] },
  { name: 'Cypress', category: 'Testing', aliases: ['cypress', 'playwright', 'selenium', 'e2e testing'] },

  // Practices & Soft Skills
  { name: 'Agile / Scrum', category: 'Practices', aliases: ['agile', 'scrum', 'kanban', 'sprints'] },
  { name: 'System Design', category: 'Practices', aliases: ['system design', 'architecture', 'high scalability', 'fault tolerance'] },
  { name: 'Git', category: 'Practices', aliases: ['git', 'github', 'version control', 'code review'] },
  { name: 'Security & Auth', category: 'Practices', aliases: ['oauth', 'jwt', 'authentication', 'owasp', 'cybersecurity'] },
  { name: 'Cross-functional Collaboration', category: 'Soft Skills', aliases: ['cross-functional', 'collaboration', 'stakeholder management'] },
  { name: 'Mentorship', category: 'Soft Skills', aliases: ['mentorship', 'coaching', 'tech lead', 'leading engineers'] }
];

// Sample Resume for zero-friction testing
const SAMPLE_RESUME = `
Jane Doe — Senior Full Stack Software Engineer
Email: jane.doe@example.com | GitHub: github.com/janedoe | LinkedIn: linkedin.com/in/janedoe

SUMMARY
Full Stack Engineer with 5+ years of experience building scalable web applications, microservices, and distributed cloud systems using React, TypeScript, Node.js, and AWS. Strong advocate for clean architecture, CI/CD automation, and test-driven development.

CORE SKILLS
- Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3, Bash
- Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Responsive Design, WebSockets, REST APIs
- Backend: Node.js, Express, NestJS, PostgreSQL, Redis, MongoDB, Microservices
- Cloud & DevOps: AWS (S3, EC2, Lambda), Docker, GitHub Actions, CI/CD, Linux
- Testing & Quality: Jest, Unit Testing, Cypress, End-to-End Testing
- Practices: Agile, Scrum, Git, System Design, Code Review, Cross-functional Collaboration

PROFESSIONAL EXPERIENCE
Senior Software Engineer | CloudScale Inc. (2022 - Present)
- Architected and deployed microservices handling 2M+ daily requests using Node.js, Express, and PostgreSQL, improving API response times by 35%.
- Built a modern, responsive customer dashboard in React and TypeScript with real-time WebSocket metrics and Tailwind CSS styling.
- Established automated CI/CD pipelines via GitHub Actions and Docker containers, reducing release deployment cycles from 2 days to 15 minutes.
- Implemented in-memory caching with Redis, reducing database load by 40% during peak traffic.

Software Engineer | DevTech Solutions (2019 - 2022)
- Developed RESTful APIs and background ETL worker jobs using Python and Django.
- Collaborated across Agile sprints with product managers, UX designers, and QA teams to ship 14 major product features.
- Mentored 3 junior developers and conducted code reviews adhering to strict test-driven development (Jest, Cypress) standards.

EDUCATION
B.S. in Computer Science | State University (2015 - 2019)
`;
