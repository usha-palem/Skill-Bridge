const sampleSkills = [
  // --- FRONTEND ---
  {
    name: 'React',
    category: 'Frontend',
    description: 'Component-based UI library for creating single-page interactive web applications.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 25,
    resources: [
      { title: 'React Official Documentation', type: 'Documentation', url: 'https://react.dev', platform: 'React Docs' },
      { title: 'Full Modern React Course', type: 'Video Course', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', platform: 'freeCodeCamp' }
    ]
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    description: 'Core web programming language covering modern asynchronous paradigms, closures, and modules.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 20,
    resources: [
      { title: 'The Modern JavaScript Tutorial', type: 'Documentation', url: 'https://javascript.info', platform: 'JavaScript.info' },
      { title: 'MDN Web JavaScript Guide', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', platform: 'MDN Web Docs' }
    ]
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Typed superset of JavaScript providing compile-time type safety for enterprise applications.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 18,
    resources: [
      { title: 'TypeScript Handbook', type: 'Documentation', url: 'https://www.typescriptlang.org/docs/', platform: 'Official Docs' }
    ]
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    description: 'Semantic markup structure, modern CSS flexbox, grid, and responsive web standards.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 12,
    resources: [
      { title: 'MDN HTML & CSS Learning Path', type: 'Interactive Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn', platform: 'MDN' }
    ]
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Utility-first CSS framework for rapid and maintainable responsive interface design.',
    industryDemand: 'High',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 10,
    resources: [
      { title: 'Tailwind CSS Official Documentation', type: 'Documentation', url: 'https://tailwindcss.com/docs', platform: 'Tailwind' }
    ]
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'Full-stack React framework featuring Server-Side Rendering (SSR) and Server Components.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 22,
    resources: [
      { title: 'Learn Next.js Interactive Tutorial', type: 'Interactive Tutorial', url: 'https://nextjs.org/learn', platform: 'Vercel' }
    ]
  },
  {
    name: 'Redux Toolkit',
    category: 'Frontend',
    description: 'Predictable state container and middleware manager for complex frontend client state.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 14,
    resources: [
      { title: 'Redux Essentials Tutorial', type: 'Documentation', url: 'https://redux.js.org/tutorials/essentials/part-1-overview-concepts', platform: 'Redux Docs' }
    ]
  },

  // --- BACKEND ---
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Event-driven asynchronous JavaScript runtime for high-throughput server backends.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 20,
    resources: [
      { title: 'Node.js Learn Path', type: 'Documentation', url: 'https://nodejs.org/en/learn', platform: 'Node.js' },
      { title: 'Node.js Architecture Crash Course', type: 'Video Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', platform: 'freeCodeCamp' }
    ]
  },
  {
    name: 'Express.js',
    category: 'Backend',
    description: 'Fast, unopinionated, minimalist web framework for Node.js REST API engineering.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 16,
    resources: [
      { title: 'Express.js Starter Guide', type: 'Documentation', url: 'https://expressjs.com/', platform: 'Express' }
    ]
  },
  {
    name: 'REST APIs & Postman',
    category: 'Backend',
    description: 'Architecting RESTful HTTP endpoints, JSON payload contracts, and automated test collections.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 12,
    resources: [
      { title: 'Postman Student Academy', type: 'Interactive Tutorial', url: 'https://academy.postman.com/', platform: 'Postman' }
    ]
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    description: 'Versatile programming language widely adopted in backend web engineering, AI, and automation.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 22,
    resources: [
      { title: 'Official Python Tutorial', type: 'Documentation', url: 'https://docs.python.org/3/tutorial/', platform: 'Python' }
    ]
  },
  {
    name: 'Java & Spring Boot',
    category: 'Backend',
    description: 'Enterprise Java framework for building robust, scalable microservices and APIs.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 30,
    resources: [
      { title: 'Spring Guides & Tutorials', type: 'Documentation', url: 'https://spring.io/guides', platform: 'Spring' }
    ]
  },

  // --- DATABASE ---
  {
    name: 'MongoDB',
    category: 'Database',
    description: 'Leading document-based NoSQL database for flexible JSON-like structured data storage.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 18,
    resources: [
      { title: 'MongoDB University', type: 'Interactive Course', url: 'https://learn.mongodb.com/', platform: 'MongoDB' }
    ]
  },
  {
    name: 'SQL / PostgreSQL',
    category: 'Database',
    description: 'Relational database management, ACID compliance, complex JOIN queries, and schema optimization.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 22,
    resources: [
      { title: 'PostgreSQL Tutorials', type: 'Documentation', url: 'https://www.postgresqltutorial.com/', platform: 'Postgres Tutorial' }
    ]
  },
  {
    name: 'Redis',
    category: 'Database',
    description: 'In-memory key-value data store used for sub-millisecond caching, pub/sub, and rate-limiting.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 10,
    resources: [
      { title: 'Redis University & Getting Started', type: 'Documentation', url: 'https://redis.io/learn', platform: 'Redis' }
    ]
  },

  // --- CLOUD & DEVOPS ---
  {
    name: 'Docker',
    category: 'Cloud & DevOps',
    description: 'Containerization standard ensuring reproducible environments from development to production.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 16,
    resources: [
      { title: 'Docker Official Get Started', type: 'Documentation', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }
    ]
  },
  {
    name: 'Git & GitHub',
    category: 'Cloud & DevOps',
    description: 'Distributed version control, collaborative PR workflows, and branching strategies.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 8,
    resources: [
      { title: 'GitHub Skills Labs', type: 'Interactive Tutorial', url: 'https://skills.github.com/', platform: 'GitHub' }
    ]
  },
  {
    name: 'AWS / Cloud Basics',
    category: 'Cloud & DevOps',
    description: 'Cloud infrastructure fundamentals covering compute (EC2), storage (S3), and serverless (Lambda).',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 20,
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', type: 'Video Course', url: 'https://aws.amazon.com/training/', platform: 'AWS' }
    ]
  },
  {
    name: 'CI/CD Pipelines',
    category: 'Cloud & DevOps',
    description: 'Automating build, testing, and cloud deployment pipelines using GitHub Actions or Jenkins.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 12,
    resources: [
      { title: 'GitHub Actions Documentation', type: 'Documentation', url: 'https://docs.github.com/actions', platform: 'GitHub Docs' }
    ]
  },
  {
    name: 'Linux & Bash Scripting',
    category: 'Cloud & DevOps',
    description: 'Command line terminal navigation, file permissions, process monitoring, and shell scripting.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 14,
    resources: [
      { title: 'Linux Journey Tutorial', type: 'Interactive Tutorial', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }
    ]
  },

  // --- SYSTEM ARCHITECTURE & FOUNDATIONS ---
  {
    name: 'System Design Fundamentals',
    category: 'System Architecture',
    description: 'Architecting scalable distributed web systems, load balancers, caching, and database sharding.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 25,
    resources: [
      { title: 'System Design Primer', type: 'Documentation', url: 'https://github.com/donnemartin/system-design-primer', platform: 'GitHub' }
    ]
  },
  {
    name: 'Data Structures & Algorithms',
    category: 'Programming Languages',
    description: 'Arrays, Trees, Graphs, Sorting, Dynamic Programming, and Big-O computational complexity.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 40,
    resources: [
      { title: 'NeetCode Roadmap & Algorithms', type: 'Interactive Tutorial', url: 'https://neetcode.io/', platform: 'NeetCode' }
    ]
  },

  // --- AI & DATA SCIENCE ---
  {
    name: 'Machine Learning',
    category: 'AI & Data Science',
    description: 'Supervised and unsupervised statistical learning models using Scikit-Learn and Python.',
    industryDemand: 'High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 30,
    resources: [
      { title: 'Scikit-Learn User Guide', type: 'Documentation', url: 'https://scikit-learn.org/stable/', platform: 'Scikit-Learn' }
    ]
  },
  {
    name: 'Pandas & NumPy',
    category: 'AI & Data Science',
    description: 'Numerical data analysis, matrix calculations, data cleaning, and dataset transformation.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 15,
    resources: [
      { title: '10 Minutes to Pandas', type: 'Documentation', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', platform: 'Pandas Docs' }
    ]
  },

  // --- SECURITY & TESTING ---
  {
    name: 'OAuth & JWT Authentication',
    category: 'Security & Testing',
    description: 'Stateless JSON Web Tokens, refresh tokens, bearer authentication, and OAuth 2.0 flows.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 12,
    resources: [
      { title: 'JWT.io Introduction to JSON Web Tokens', type: 'Documentation', url: 'https://jwt.io/introduction', platform: 'JWT.io' }
    ]
  },
  {
    name: 'Jest & Unit Testing',
    category: 'Security & Testing',
    description: 'Automated test suites, unit testing, mocking, and code coverage for frontend and backend code.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 12,
    resources: [
      { title: 'Jest Getting Started', type: 'Documentation', url: 'https://jestjs.io/docs/getting-started', platform: 'Jest Docs' }
    ]
  }
];

module.exports = sampleSkills;
