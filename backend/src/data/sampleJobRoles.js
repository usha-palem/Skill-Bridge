const sampleJobRoles = [
  {
    title: 'Full Stack MERN Developer',
    category: 'Software Engineering',
    shortDescription: 'Build end-to-end modern web applications leveraging MongoDB, Express.js, React.js, and Node.js.',
    fullDescription: 'As an Associate Full Stack MERN Developer, you will collaborate with cross-functional teams to engineer responsive frontend interfaces, craft robust RESTful microservices, and manage database schemas for enterprise and consumer platforms.',
    averageSalary: '$85,000 - $125,000 / ₹8 - 18 LPA',
    hiringDemand: 'High Demand',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Develop modular and reusable client-side components using React.js and modern state management',
      'Architect resilient RESTful APIs in Express.js with robust validation, authentication, and error handling',
      'Design, index, and optimize document schemas in MongoDB using Mongoose',
      'Containerize applications using Docker and collaborate via Git/GitHub version control workflows'
    ],
    requiredSkills: [
      { skillName: 'React', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'Node.js', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'Express.js', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.0 },
      { skillName: 'MongoDB', category: 'Database', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.0 },
      { skillName: 'JavaScript (ES6+)', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.1 },
      { skillName: 'Git & GitHub', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Core Requirement', weight: 0.8 },
      { skillName: 'REST APIs & Postman', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Core Requirement', weight: 0.9 }
    ],
    recommendedSkills: [
      { skillName: 'TypeScript', category: 'Frontend', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 },
      { skillName: 'Tailwind CSS', category: 'Frontend', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.4 },
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 },
      { skillName: 'OAuth & JWT Authentication', category: 'Security & Testing', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 }
    ]
  },
  {
    title: 'Frontend React Specialist',
    category: 'Frontend Engineering',
    shortDescription: 'Specialize in building blazing-fast, accessible, and high-fidelity user experiences using React & TypeScript.',
    fullDescription: 'Focuses deeply on interface craftsmanship, responsive web layouts, component design systems, client-side caching, and state synchronization across complex web applications.',
    averageSalary: '$80,000 - $120,000 / ₹7 - 16 LPA',
    hiringDemand: 'High Demand',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Translate Figma wireframes into responsive, accessible, and pixel-perfect React components',
      'Manage complex client state with React hooks, context, and Redux Toolkit',
      'Optimize web performance, Core Web Vitals, and bundle sizes',
      'Author unit tests with Jest and React Testing Library'
    ],
    requiredSkills: [
      { skillName: 'React', category: 'Frontend', minimumProficiency: 'Advanced', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'JavaScript (ES6+)', category: 'Frontend', minimumProficiency: 'Advanced', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'HTML5 & CSS3', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.0 },
      { skillName: 'Tailwind CSS', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Core Requirement', weight: 0.9 },
      { skillName: 'TypeScript', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Core Requirement', weight: 1.0 },
      { skillName: 'Git & GitHub', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Core Requirement', weight: 0.8 }
    ],
    recommendedSkills: [
      { skillName: 'Next.js', category: 'Frontend', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 },
      { skillName: 'Redux Toolkit', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Recommended', weight: 0.5 },
      { skillName: 'Jest & Unit Testing', category: 'Security & Testing', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.4 }
    ]
  },
  {
    title: 'Backend & Cloud API Engineer',
    category: 'Backend Engineering',
    shortDescription: 'Architect resilient server-side architectures, microservices, databases, and high-performance APIs.',
    fullDescription: 'Designs scalable REST and event-driven backends, optimizes relational and document databases, configures cloud hosting, and implements secure authentication protocols.',
    averageSalary: '$90,000 - $135,000 / ₹9 - 20 LPA',
    hiringDemand: 'Exponential Growth',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Design RESTful and microservice APIs with strict validation and error handling',
      'Optimize database queries, indexing, connection pools, and caching layers',
      'Implement authentication, authorization (RBAC), and API rate limiting',
      'Deploy and monitor backend services in cloud environments'
    ],
    requiredSkills: [
      { skillName: 'Node.js', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'Express.js', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.1 },
      { skillName: 'SQL / PostgreSQL', category: 'Database', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'MongoDB', category: 'Database', minimumProficiency: 'Intermediate', importance: 'Core Requirement', weight: 0.9 },
      { skillName: 'REST APIs & Postman', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.0 },
      { skillName: 'OAuth & JWT Authentication', category: 'Security & Testing', minimumProficiency: 'Intermediate', importance: 'Core Requirement', weight: 1.0 }
    ],
    recommendedSkills: [
      { skillName: 'Redis', category: 'Database', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.6 },
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Recommended', weight: 0.6 },
      { skillName: 'AWS / Cloud Basics', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 },
      { skillName: 'System Design Fundamentals', category: 'System Architecture', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.6 }
    ]
  },
  {
    title: 'Cloud & DevOps Engineer',
    category: 'Infrastructure & DevOps',
    shortDescription: 'Bridge software development and IT operations through automated CI/CD pipelines, containerization, and cloud infrastructure.',
    fullDescription: 'Builds automated deployment pipelines, manages cloud resources, oversees container orchestration, and guarantees system reliability and uptime.',
    averageSalary: '$95,000 - $140,000 / ₹10 - 22 LPA',
    hiringDemand: 'Exponential Growth',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Automate integration and deployment cycles using GitHub Actions',
      'Containerize applications with multi-stage Docker builds',
      'Provision and manage cloud compute, networking, and storage on AWS',
      'Monitor container health, logging, and security compliance'
    ],
    requiredSkills: [
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'Linux & Bash Scripting', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'Git & GitHub', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.0 },
      { skillName: 'CI/CD Pipelines', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.1 },
      { skillName: 'AWS / Cloud Basics', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 }
    ],
    recommendedSkills: [
      { skillName: 'Python', category: 'Programming Languages', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 },
      { skillName: 'System Design Fundamentals', category: 'System Architecture', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.6 },
      { skillName: 'SQL / PostgreSQL', category: 'Database', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.4 }
    ]
  },
  {
    title: 'Data Analyst & Python Developer',
    category: 'Data Science & Analytics',
    shortDescription: 'Analyze business datasets, create data pipelines, and develop automated analytical reports using Python and SQL.',
    fullDescription: 'Extracts actionable business insights by querying relational databases, manipulating datasets with Pandas/NumPy, and building clear interactive data visualizations.',
    averageSalary: '$78,000 - $115,000 / ₹6 - 15 LPA',
    hiringDemand: 'High Demand',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Write complex SQL queries, views, and CTEs to extract analytical datasets',
      'Clean, normalize, and transform raw messy data using Python and Pandas',
      'Generate statistical reports and visual dashboards for stakeholders',
      'Automate repetitive data collection and ingestion workflows'
    ],
    requiredSkills: [
      { skillName: 'Python', category: 'Programming Languages', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'SQL / PostgreSQL', category: 'Database', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'Pandas & NumPy', category: 'AI & Data Science', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'Git & GitHub', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Core Requirement', weight: 0.7 }
    ],
    recommendedSkills: [
      { skillName: 'Machine Learning', category: 'AI & Data Science', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.6 },
      { skillName: 'REST APIs & Postman', category: 'Backend', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.4 },
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.4 }
    ]
  },
  {
    title: 'AI / Machine Learning Associate',
    category: 'Artificial Intelligence',
    shortDescription: 'Develop, evaluate, and operationalize machine learning models and data pipelines for intelligent software applications.',
    fullDescription: 'Builds predictive models, performs feature engineering, evaluates algorithmic performance metrics, and deploys model inference endpoints for web and mobile apps.',
    averageSalary: '$95,000 - $145,000 / ₹10 - 24 LPA',
    hiringDemand: 'Exponential Growth',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Preprocess large numerical and categorical datasets for model training',
      'Train, fine-tune, and evaluate supervised and unsupervised algorithms',
      'Deploy machine learning models via RESTful inference microservices',
      'Monitor model drift and performance metrics in production'
    ],
    requiredSkills: [
      { skillName: 'Python', category: 'Programming Languages', minimumProficiency: 'Advanced', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'Machine Learning', category: 'AI & Data Science', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'Pandas & NumPy', category: 'AI & Data Science', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.1 },
      { skillName: 'Data Structures & Algorithms', category: 'Programming Languages', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.1 },
      { skillName: 'SQL / PostgreSQL', category: 'Database', minimumProficiency: 'Intermediate', importance: 'Core Requirement', weight: 0.9 }
    ],
    recommendedSkills: [
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 },
      { skillName: 'REST APIs & Postman', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Recommended', weight: 0.5 },
      { skillName: 'AWS / Cloud Basics', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 }
    ]
  }
];

module.exports = sampleJobRoles;
