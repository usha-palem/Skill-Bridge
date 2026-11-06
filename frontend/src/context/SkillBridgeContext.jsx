import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const SkillBridgeContext = createContext(null);

// Fallback Job Roles Catalog
const FALLBACK_JOB_ROLES = [
  {
    title: 'Full Stack MERN Developer',
    category: 'Software Engineering',
    shortDescription: 'Build end-to-end modern web applications leveraging MongoDB, Express.js, React.js, and Node.js.',
    averageSalary: '$85,000 - $125,000 / ₹8 - 18 LPA',
    hiringDemand: 'High Demand',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Develop modular client-side components using React.js and modern state management',
      'Architect resilient RESTful APIs in Express.js with robust validation, authentication, and error handling',
      'Design, index, and optimize document schemas in MongoDB using Mongoose',
      'Containerize applications using Docker and collaborate via Git/GitHub'
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
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.5 }
    ]
  },
  {
    title: 'Frontend React Specialist',
    category: 'Frontend Engineering',
    shortDescription: 'Specialize in building blazing-fast, accessible, and high-fidelity user experiences using React & TypeScript.',
    averageSalary: '$80,000 - $120,000 / ₹7 - 16 LPA',
    hiringDemand: 'High Demand',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Translate design systems into pixel-perfect React components',
      'Manage complex client state with React hooks and Redux Toolkit',
      'Optimize web performance and Core Web Vitals'
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
      { skillName: 'Redux Toolkit', category: 'Frontend', minimumProficiency: 'Intermediate', importance: 'Recommended', weight: 0.5 }
    ]
  },
  {
    title: 'Backend & Cloud API Engineer',
    category: 'Backend Engineering',
    shortDescription: 'Architect resilient server-side architectures, microservices, databases, and high-performance APIs.',
    averageSalary: '$90,000 - $135,000 / ₹9 - 20 LPA',
    hiringDemand: 'Exponential Growth',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Design RESTful and microservice APIs with strict validation',
      'Optimize database queries, indexing, and connection pools',
      'Implement authentication, authorization (RBAC), and API rate limiting'
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
      { skillName: 'Docker', category: 'Cloud & DevOps', minimumProficiency: 'Intermediate', importance: 'Recommended', weight: 0.6 }
    ]
  },
  {
    title: 'Cloud & DevOps Engineer',
    category: 'Infrastructure & DevOps',
    shortDescription: 'Bridge software development and IT operations through automated CI/CD pipelines, containerization, and cloud infrastructure.',
    averageSalary: '$95,000 - $140,000 / ₹10 - 22 LPA',
    hiringDemand: 'Exponential Growth',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Automate integration and deployment cycles using GitHub Actions',
      'Containerize applications with multi-stage Docker builds',
      'Provision and manage cloud compute and storage on AWS'
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
      { skillName: 'System Design Fundamentals', category: 'System Architecture', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.6 }
    ]
  },
  {
    title: 'Data Analyst & Python Developer',
    category: 'Data Science & Analytics',
    shortDescription: 'Analyze business datasets, create data pipelines, and develop automated analytical reports using Python and SQL.',
    averageSalary: '$78,000 - $115,000 / ₹6 - 15 LPA',
    hiringDemand: 'High Demand',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Write complex SQL queries to extract analytical datasets',
      'Clean and transform data using Python and Pandas',
      'Generate visual statistical dashboards for stakeholders'
    ],
    requiredSkills: [
      { skillName: 'Python', category: 'Programming Languages', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'SQL / PostgreSQL', category: 'Database', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.3 },
      { skillName: 'Pandas & NumPy', category: 'AI & Data Science', minimumProficiency: 'Intermediate', importance: 'Mandatory', weight: 1.2 },
      { skillName: 'Git & GitHub', category: 'Cloud & DevOps', minimumProficiency: 'Beginner', importance: 'Core Requirement', weight: 0.7 }
    ],
    recommendedSkills: [
      { skillName: 'Machine Learning', category: 'AI & Data Science', minimumProficiency: 'Beginner', importance: 'Recommended', weight: 0.6 }
    ]
  },
  {
    title: 'AI / Machine Learning Associate',
    category: 'Artificial Intelligence',
    shortDescription: 'Develop, evaluate, and operationalize machine learning models and data pipelines for intelligent software applications.',
    averageSalary: '$95,000 - $145,000 / ₹10 - 24 LPA',
    hiringDemand: 'Exponential Growth',
    experienceLevel: 'Entry Level / College Graduate',
    keyResponsibilities: [
      'Preprocess large numerical datasets for model training',
      'Train, fine-tune, and evaluate supervised algorithms',
      'Deploy machine learning models via RESTful inference endpoints'
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
      { skillName: 'REST APIs & Postman', category: 'Backend', minimumProficiency: 'Intermediate', importance: 'Recommended', weight: 0.5 }
    ]
  }
];

// Rich Curated Metadata for Roadmap Generation
const WEEKLY_SKILL_PRESETS = {
  'node.js': {
    duration: '16 Hours',
    topics: ['Event Loop & Non-blocking I/O', 'Core Modules (fs, path, http, crypto)', 'Stream Processing & Buffers', 'npm Package Management'],
    objectives: [
      'Understand Node.js asynchronous architecture and libuv thread pool',
      'Build resilient command-line utilities and HTTP file streaming servers',
      'Author modular CommonJS and ES Modules conforming to industry standards'
    ],
    resources: [
      { title: 'Node.js Official Documentation & Guides', type: 'Documentation', platform: 'nodejs.org', url: 'https://nodejs.org/en/learn' },
      { title: 'Node.js Complete Architecture Deep Dive', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' }
    ],
    project: {
      title: 'Real-Time File Log Streamer & Parser CLI',
      description: 'Create a background CLI tool that monitors server access logs, parses IP metrics, and outputs formatted JSON stats.'
    }
  },
  'express.js': {
    duration: '14 Hours',
    topics: ['Express Routing & Controllers', 'Custom Middleware & Request Pipelines', 'JWT Authentication & Security Headers', 'Error Handling Architecture'],
    objectives: [
      'Design modular RESTful API endpoints following standard HTTP verbs',
      'Create custom authentication and role-based access control middleware',
      'Enforce security best practices with Helmet, CORS, and rate-limiting'
    ],
    resources: [
      { title: 'Express.js Routing & Middleware Guide', type: 'Documentation', platform: 'expressjs.com', url: 'https://expressjs.com/en/starter/installing.html' },
      { title: 'Building Production REST APIs with Express', type: 'Interactive Course', platform: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs' }
    ],
    project: {
      title: 'Scalable E-Commerce Microservice API',
      description: 'Build a secure REST API with product inventory CRUD, bearer token protection, and pagination.'
    }
  },
  'mongodb': {
    duration: '15 Hours',
    topics: ['BSON Document Modeling', 'Mongoose Schemas & Middleware Hooks', 'Indexing & Query Optimization', 'Aggregation Pipelines'],
    objectives: [
      'Model relational domain concepts inside JSON-like MongoDB documents',
      'Implement Mongoose validation, virtual properties, and pre/post save hooks',
      'Write multi-stage aggregation pipelines for analytical business reporting'
    ],
    resources: [
      { title: 'MongoDB University: Developer Certification Path', type: 'Interactive Course', platform: 'learn.mongodb.com', url: 'https://learn.mongodb.com/' },
      { title: 'Mongoose Documentation & Query Schema Guide', type: 'Documentation', platform: 'mongoosejs.com', url: 'https://mongoosejs.com/docs/guide.html' }
    ],
    project: {
      title: 'Multi-Tenant Blog & Nested Comments System',
      description: 'Implement nested references, indexed text searches, and aggregation reports for trending user posts.'
    }
  },
  'rest apis & postman': {
    duration: '10 Hours',
    topics: ['REST Architectural Constraints', 'HTTP Status Codes & Contracts', 'Postman Collections & Automated Tests', 'OpenAPI / Swagger Documentation'],
    objectives: [
      'Master REST architectural principles, idempotent verbs, and error payloads',
      'Author automated integration test scripts inside Postman test collections',
      'Generate interactive OpenAPI specification contracts for frontend teams'
    ],
    resources: [
      { title: 'Postman Student Academy & Certification', type: 'Interactive Tutorial', platform: 'academy.postman.com', url: 'https://academy.postman.com/' },
      { title: 'RESTful API Design Standards & Best Practices', type: 'Documentation', platform: 'restfulapi.net', url: 'https://restfulapi.net/' }
    ],
    project: {
      title: 'Published API Documentation & Test Runner',
      description: 'Author a complete OpenAPI schema and Postman collection with automated status code assertions.'
    }
  },
  'react': {
    duration: '16 Hours',
    topics: ['Custom Hooks & Component Lifecycle', 'Context API & Global State', 'Client-side Caching & Data Fetching', 'Performance Profiling & Memoization'],
    objectives: [
      'Upgrade from basic UI rendering to production state architecture with custom hooks',
      'Optimize component re-renders with useMemo, useCallback, and React.memo',
      'Integrate seamless loading states and optimistic updates'
    ],
    resources: [
      { title: 'Official React Documentation & Interactive Sandbox', type: 'Documentation', platform: 'react.dev', url: 'https://react.dev' },
      { title: 'React Hooks & State Architecture Masterclass', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' }
    ],
    project: {
      title: 'Production SaaS Analytics Dashboard',
      description: 'Build an interactive dashboard with chart visualizations, light/dark themes, and persistent filters.'
    }
  },
  'docker': {
    duration: '14 Hours',
    topics: ['Containerization Fundamentals', 'Multi-stage Production Dockerfiles', 'Docker Compose Multi-Container Orchestration', 'Volumes & Environment Variables'],
    objectives: [
      'Package full stack applications into portable, reproducible Docker containers',
      'Configure Docker Compose to spin up React frontend, Node backend, and MongoDB with one command',
      'Optimize image layer caching and reduce production bundle sizes'
    ],
    resources: [
      { title: 'Docker Official Get Started Guides', type: 'Documentation', platform: 'docs.docker.com', url: 'https://docs.docker.com/get-started/' },
      { title: 'Docker for MERN Stack Developers Crash Course', type: 'Video Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=pg19Z8LL06w' }
    ],
    project: {
      title: 'Full Stack Multi-Container Orchestration',
      description: 'Dockerize a React client, Express API, and MongoDB container network with Docker Compose.'
    }
  },
  'sql / postgresql': {
    duration: '18 Hours',
    topics: ['3NF Normalization & Constraints', 'Complex JOIN Queries & Aggregations', 'CTEs & Window Functions', 'Database Indexing & Performance Tuning'],
    objectives: [
      'Design normalized relational database schemas with primary/foreign key integrity',
      'Execute multi-table INNER/OUTER JOINs and analytical window functions',
      'Profile slow queries with EXPLAIN ANALYZE and apply composite indexes'
    ],
    resources: [
      { title: 'PostgreSQL Tutorial for Developers', type: 'Interactive Tutorial', platform: 'postgresqltutorial.com', url: 'https://www.postgresqltutorial.com/' }
    ],
    project: {
      title: 'University Student Enrollment Relational Schema',
      description: 'Author relational tables for students, instructors, and enrollments with complex GPA ranking queries.'
    }
  },
  'typescript': {
    duration: '16 Hours',
    topics: ['Static Typing & Primitive Types', 'Interfaces, Generics & Type Aliases', 'Discriminated Unions & Type Guards', 'TypeScript with React & Express'],
    objectives: [
      'Eliminate runtime errors using strict compile-time TypeScript type checking',
      'Implement reusable generic components and type-safe API responses',
      'Migrate JavaScript codebases to strictly typed TypeScript'
    ],
    resources: [
      { title: 'Official TypeScript Handbook', type: 'Documentation', platform: 'typescriptlang.org', url: 'https://www.typescriptlang.org/docs/' }
    ],
    project: {
      title: 'Type-Safe Financial Transaction Ledger',
      description: 'Build a finance tracker with strict validation, generic API response handlers, and type assertions.'
    }
  }
};

// Resilient Master Skills Catalog Fallback (26 Industry Standard Skills)
const FALLBACK_ALL_SKILLS = [
  // --- FRONTEND ---
  {
    name: 'React',
    category: 'Frontend',
    description: 'Component-based UI library for creating single-page interactive web applications.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 25
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    description: 'Core web programming language covering modern asynchronous paradigms, closures, and modules.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 20
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Typed superset of JavaScript providing compile-time type safety for enterprise applications.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 18
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    description: 'Semantic markup structure, modern CSS flexbox, grid, and responsive web standards.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 12
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Utility-first CSS framework for rapid and maintainable responsive interface design.',
    industryDemand: 'High',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 10
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'Full-stack React framework featuring Server-Side Rendering (SSR) and Server Components.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 22
  },
  {
    name: 'Redux Toolkit',
    category: 'Frontend',
    description: 'Predictable state container and middleware manager for complex frontend client state.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 14
  },

  // --- BACKEND ---
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Event-driven asynchronous JavaScript runtime for high-throughput server backends.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 20
  },
  {
    name: 'Express.js',
    category: 'Backend',
    description: 'Fast, unopinionated, minimalist web framework for Node.js REST API engineering.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 16
  },
  {
    name: 'REST APIs & Postman',
    category: 'Backend',
    description: 'Architecting RESTful HTTP endpoints, JSON payload contracts, and automated test collections.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 12
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    description: 'Versatile programming language widely adopted in backend web engineering, AI, and automation.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 22
  },
  {
    name: 'Java & Spring Boot',
    category: 'Backend',
    description: 'Enterprise Java framework for building robust, scalable microservices and APIs.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 30
  },

  // --- DATABASE ---
  {
    name: 'MongoDB',
    category: 'Database',
    description: 'Leading document-based NoSQL database for flexible JSON-like structured data storage.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 18
  },
  {
    name: 'SQL / PostgreSQL',
    category: 'Database',
    description: 'Relational database management, ACID compliance, complex JOIN queries, and schema optimization.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 22
  },
  {
    name: 'Redis',
    category: 'Database',
    description: 'In-memory key-value data store used for sub-millisecond caching, pub/sub, and rate-limiting.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 10
  },

  // --- CLOUD & DEVOPS ---
  {
    name: 'Docker',
    category: 'Cloud & DevOps',
    description: 'Containerization standard ensuring reproducible environments from development to production.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 16
  },
  {
    name: 'Git & GitHub',
    category: 'Cloud & DevOps',
    description: 'Distributed version control, collaborative PR workflows, and branching strategies.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Beginner',
    estimatedHoursToLearn: 8
  },
  {
    name: 'AWS / Cloud Basics',
    category: 'Cloud & DevOps',
    description: 'Cloud infrastructure fundamentals covering compute (EC2), storage (S3), and serverless (Lambda).',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 20
  },
  {
    name: 'CI/CD Pipelines',
    category: 'Cloud & DevOps',
    description: 'Automating build, testing, and cloud deployment pipelines using GitHub Actions or Jenkins.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 12
  },
  {
    name: 'Linux & Bash Scripting',
    category: 'Cloud & DevOps',
    description: 'Command line terminal navigation, file permissions, process monitoring, and shell scripting.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 14
  },

  // --- SYSTEM ARCHITECTURE & FOUNDATIONS ---
  {
    name: 'System Design Fundamentals',
    category: 'System Architecture',
    description: 'Architecting scalable distributed web systems, load balancers, caching, and database sharding.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 25
  },
  {
    name: 'Data Structures & Algorithms',
    category: 'Programming Languages',
    description: 'Arrays, Trees, Graphs, Sorting, Dynamic Programming, and Big-O computational complexity.',
    industryDemand: 'Critical',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 40
  },

  // --- AI & DATA SCIENCE ---
  {
    name: 'Machine Learning',
    category: 'AI & Data Science',
    description: 'Supervised and unsupervised statistical learning models using Scikit-Learn and Python.',
    industryDemand: 'High',
    typicalDifficulty: 'Advanced',
    estimatedHoursToLearn: 30
  },
  {
    name: 'Pandas & NumPy',
    category: 'AI & Data Science',
    description: 'Numerical data analysis, matrix calculations, data cleaning, and dataset transformation.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 15
  },

  // --- SECURITY & TESTING ---
  {
    name: 'OAuth & JWT Authentication',
    category: 'Security & Testing',
    description: 'Stateless JSON Web Tokens, refresh tokens, bearer authentication, and OAuth 2.0 flows.',
    industryDemand: 'Very High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 12
  },
  {
    name: 'Jest & Unit Testing',
    category: 'Security & Testing',
    description: 'Automated test suites, unit testing, mocking, and code coverage for frontend and backend code.',
    industryDemand: 'High',
    typicalDifficulty: 'Intermediate',
    estimatedHoursToLearn: 12
  }
];

export const SkillBridgeProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  const [jobRoles, setJobRoles] = useState(FALLBACK_JOB_ROLES);
  const [selectedRole, setSelectedRole] = useState(FALLBACK_JOB_ROLES[0]);
  const [allSkills, setAllSkills] = useState(FALLBACK_ALL_SKILLS);
  const [gapAnalysis, setGapAnalysis] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  // Synchronize master catalog from Backend API / MongoDB on mount
  useEffect(() => {
    let isMounted = true;

    api.getAllJobRoles()
      .then(res => {
        if (isMounted && res?.roles && res.roles.length > 0) {
          setJobRoles(res.roles);
          // Sync selectedRole if title matches
          const matched = res.roles.find(r => r.title === selectedRole?.title);
          if (matched) setSelectedRole(matched);
        }
      })
      .catch(() => {});

    api.getAllSkills()
      .then(res => {
        if (isMounted && res?.skills && res.skills.length > 0) {
          setAllSkills(res.skills);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic Skill Gap Calculation Client-Side Engine
  const calculateGapLocally = useCallback((studentSkills = [], targetRole = null) => {
    const role = targetRole || selectedRole;
    if (!role) return null;

    const reqSkills = role.requiredSkills || [];
    const recSkills = role.recommendedSkills || [];

    const profVal = { beginner: 1, intermediate: 2, advanced: 3 };
    const studentMap = new Map();
    studentSkills.forEach(s => {
      const key = (s.name || s.skillName || '').toLowerCase().trim();
      if (key) {
        studentMap.set(key, {
          name: s.name || s.skillName,
          category: s.category || 'General',
          proficiency: s.proficiency || 'Beginner',
          scoreVal: profVal[(s.proficiency || 'beginner').toLowerCase()] || 1
        });
      }
    });

    let earnedScore = 0;
    let totalScore = 0;
    const matchedRequired = [];
    const missingRequired = [];
    const proficiencyGaps = [];

    reqSkills.forEach(req => {
      const weight = req.weight || 1.0;
      totalScore += weight;
      const key = (req.skillName || '').toLowerCase().trim();
      const reqVal = profVal[(req.minimumProficiency || 'intermediate').toLowerCase()] || 2;

      if (studentMap.has(key)) {
        const studentSkill = studentMap.get(key);
        if (studentSkill.scoreVal >= reqVal) {
          earnedScore += weight;
          matchedRequired.push({
            skillName: req.skillName,
            category: req.category,
            studentProficiency: studentSkill.proficiency,
            requiredProficiency: req.minimumProficiency,
            status: 'Full Match',
            isProficiencyAdequate: true,
            importance: req.importance
          });
        } else {
          earnedScore += weight * 0.65;
          matchedRequired.push({
            skillName: req.skillName,
            category: req.category,
            studentProficiency: studentSkill.proficiency,
            requiredProficiency: req.minimumProficiency,
            status: 'Proficiency Upgrade Needed',
            isProficiencyAdequate: false,
            importance: req.importance
          });
          proficiencyGaps.push({
            skillName: req.skillName,
            category: req.category,
            current: studentSkill.proficiency,
            required: req.minimumProficiency,
            action: `Upgrade from ${studentSkill.proficiency} to ${req.minimumProficiency}`
          });
        }
      } else {
        missingRequired.push({
          skillName: req.skillName,
          category: req.category,
          requiredProficiency: req.minimumProficiency,
          importance: req.importance
        });
      }
    });

    const matchedRecommended = [];
    const missingRecommended = [];

    recSkills.forEach(rec => {
      const key = (rec.skillName || '').toLowerCase().trim();
      if (studentMap.has(key)) {
        matchedRecommended.push({
          skillName: rec.skillName,
          category: rec.category,
          status: 'Bonus Skill Matched'
        });
        earnedScore += 0.2;
      } else {
        missingRecommended.push({
          skillName: rec.skillName,
          category: rec.category,
          importance: 'Recommended'
        });
      }
    });

    let matchPercentage = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0;
    if (matchPercentage > 100) matchPercentage = 100;

    let readinessLevel = 'Foundational Stage';
    let summaryMessage = 'Significant technical gaps identified. Complete roadmap milestones to build core hiring competencies.';
    if (matchPercentage >= 80) {
      readinessLevel = 'Industry Ready';
      summaryMessage = 'Superb match! You possess the required skill competencies for entry-level hiring!';
    } else if (matchPercentage >= 50) {
      readinessLevel = 'Moderate Competency';
      summaryMessage = 'Solid foundation. Mastering 2-3 key missing skills will make you a prime applicant.';
    }

    return {
      jobRoleTitle: role.title,
      matchPercentage,
      readinessLevel,
      summaryMessage,
      stats: {
        totalRequiredSkills: reqSkills.length,
        matchedSkillsCount: matchedRequired.length,
        fullyMatchedCount: matchedRequired.filter(s => s.isProficiencyAdequate).length,
        missingRequiredCount: missingRequired.length,
        missingRecommendedCount: missingRecommended.length,
        totalStudentSkills: studentSkills.length
      },
      matchedRequired,
      proficiencyGaps,
      missingRequired,
      matchedRecommended,
      missingRecommended
    };
  }, [selectedRole]);

  // Recalculate gap analysis whenever user skills or selected role changes
  useEffect(() => {
    if (!selectedRole) return;
    const studentSkills = user?.skills || [];
    const analysis = calculateGapLocally(studentSkills, selectedRole);
    setGapAnalysis(analysis);
  }, [user?.skills, selectedRole, calculateGapLocally]);

  // Generate Personalized Weekly Roadmap
  const loadRoadmap = useCallback(async (roleTitle = null) => {
    const targetTitle = roleTitle || selectedRole?.title || 'Full Stack MERN Developer';
    setLoading(true);

    // 1. Try fetching from Backend API
    try {
      const res = await api.getPersonalizedRoadmap(targetTitle);
      if (res?.roadmap && res.roadmap.modules && res.roadmap.modules.length > 0) {
        setRoadmap(res.roadmap);
        setLoading(false);
        return;
      }
    } catch {
      // Backend offline or in-memory fallback
    }

    // 2. Client-Side High-Resiliency Weekly Roadmap Generator
    const currentGap = calculateGapLocally(user?.skills || [], selectedRole);
    const modules = [];
    let weekIndex = 1;
    let totalHours = 0;

    // Load saved completion state from localStorage
    const savedCompletedMap = new Set();
    try {
      const stored = localStorage.getItem(`skillbridge_completed_${targetTitle.replace(/\s+/g, '_')}`);
      if (stored) {
        JSON.parse(stored).forEach(id => savedCompletedMap.add(id));
      }
    } catch {}

    // A. Missing Required Skills -> High Priority Weekly Sprints
    (currentGap?.missingRequired || []).forEach(m => {
      const key = m.skillName.toLowerCase().trim();
      const preset = WEEKLY_SKILL_PRESETS[key] || {
        duration: '14 Hours',
        topics: [`Core architecture & patterns in ${m.skillName}`, `Industry best practices`, `Hands-on project development`],
        objectives: [
          `Master fundamental concepts and syntax of ${m.skillName}`,
          `Implement production patterns conforming to enterprise engineering standards`,
          `Build and document a practical portfolio showcase project`
        ],
        resources: [
          { title: `${m.skillName} Official Documentation`, type: 'Documentation', platform: 'Official Docs', url: `https://www.google.com/search?q=${encodeURIComponent(m.skillName + ' official documentation')}` },
          { title: `${m.skillName} Industry Crash Course`, type: 'Video Course', platform: 'freeCodeCamp', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(m.skillName + ' tutorial')}` }
        ],
        project: {
          title: `${m.skillName} Industry Portfolio Showcase`,
          description: `Build a clean, documented mini-app highlighting real-world mastery of ${m.skillName}.`
        }
      };

      const topicId = `topic-req-${key.replace(/[^a-z0-9]/g, '-')}`;
      const isCompleted = savedCompletedMap.has(topicId);

      modules.push({
        topicId,
        weekNumber: weekIndex,
        weekLabel: `Week ${weekIndex}`,
        weekTitle: `Week ${weekIndex}: Core Competency - ${m.skillName}`,
        skillName: m.skillName,
        category: m.category || 'Core Skill',
        priority: 'High',
        targetProficiency: m.requiredProficiency || 'Intermediate',
        currentProficiency: 'Not Started',
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : null,
        order: weekIndex,
        estimatedDuration: `${preset.duration} (Week ${weekIndex})`,
        topics: preset.topics,
        learningObjectives: preset.objectives,
        resources: preset.resources,
        practicalProject: preset.project
      });

      totalHours += parseInt(preset.duration) || 12;
      weekIndex++;
    });

    // B. Proficiency Gaps -> Medium Priority Weekly Upgrades
    (currentGap?.proficiencyGaps || []).forEach(g => {
      const key = g.skillName.toLowerCase().trim();
      const preset = WEEKLY_SKILL_PRESETS[key] || {
        duration: '10 Hours',
        topics: [`Advanced architectural patterns in ${g.skillName}`, `Performance profiling & memory optimization`, `Production unit testing & debugging`],
        objectives: [
          `Bridge gap from current level (${g.current}) to required industry standard (${g.required})`,
          `Learn performance profiling, memory optimization, and enterprise design patterns`,
          `Author automated test suites verifying edge case resiliency`
        ],
        resources: [
          { title: `Advanced ${g.skillName} Architecture Patterns`, type: 'Documentation', platform: 'Tech Deep Dive', url: `https://www.google.com/search?q=${encodeURIComponent('advanced ' + g.skillName)}` }
        ],
        project: {
          title: `Refactor & Optimize ${g.skillName} Implementation`,
          description: `Refactor an existing implementation to leverage advanced patterns and unit test suites.`
        }
      };

      const topicId = `topic-gap-${key.replace(/[^a-z0-9]/g, '-')}`;
      const isCompleted = savedCompletedMap.has(topicId);

      modules.push({
        topicId,
        weekNumber: weekIndex,
        weekLabel: `Week ${weekIndex}`,
        weekTitle: `Week ${weekIndex}: Proficiency Upgrade - ${g.skillName}`,
        skillName: `${g.skillName} (Level Upgrade)`,
        category: g.category || 'Skill Upgrade',
        priority: 'Medium',
        targetProficiency: g.required,
        currentProficiency: g.current,
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : null,
        order: weekIndex,
        estimatedDuration: `${preset.duration} (Week ${weekIndex})`,
        topics: preset.topics,
        learningObjectives: preset.objectives,
        resources: preset.resources,
        practicalProject: preset.project
      });

      totalHours += parseInt(preset.duration) || 10;
      weekIndex++;
    });

    // C. Top Recommended Skills (Up to 2 electives)
    (currentGap?.missingRecommended || []).slice(0, 2).forEach(r => {
      const key = r.skillName.toLowerCase().trim();
      const preset = WEEKLY_SKILL_PRESETS[key] || {
        duration: '8 Hours',
        topics: [`${r.skillName} Quickstart & Workflow Setup`, `Integration with production tech stacks`],
        objectives: [
          `Gain functional familiarity with ${r.skillName} for competitive portfolio advantage`
        ],
        resources: [
          { title: `${r.skillName} Developer Guide`, type: 'Documentation', platform: 'Developer Docs', url: `https://www.google.com/search?q=${encodeURIComponent(r.skillName)}` }
        ],
        project: {
          title: `Mini-Integration of ${r.skillName}`,
          description: `Integrate ${r.skillName} into a sample project to showcase broad industry awareness.`
        }
      };

      const topicId = `topic-rec-${key.replace(/[^a-z0-9]/g, '-')}`;
      const isCompleted = savedCompletedMap.has(topicId);

      modules.push({
        topicId,
        weekNumber: weekIndex,
        weekLabel: `Week ${weekIndex}`,
        weekTitle: `Week ${weekIndex}: Elective Sprint - ${r.skillName}`,
        skillName: `${r.skillName} (Recommended)`,
        category: r.category || 'Elective',
        priority: 'Optional',
        targetProficiency: 'Beginner',
        currentProficiency: 'Not Started',
        isCompleted,
        completedAt: isCompleted ? new Date().toISOString() : null,
        order: weekIndex,
        estimatedDuration: `${preset.duration} (Week ${weekIndex})`,
        topics: preset.topics,
        learningObjectives: preset.objectives,
        resources: preset.resources,
        practicalProject: preset.project
      });

      totalHours += parseInt(preset.duration) || 8;
      weekIndex++;
    });

    const completedCount = modules.filter(m => m.isCompleted).length;
    const localRoadmap = {
      jobRoleTitle: targetTitle,
      totalModules: modules.length,
      completedModules: completedCount,
      completionPercentage: modules.length > 0 ? Math.round((completedCount / modules.length) * 100) : 100,
      totalEstimatedHours: totalHours || (modules.length * 12),
      modules
    };

    setRoadmap(localRoadmap);
    setLoading(false);
  }, [selectedRole, calculateGapLocally, user?.skills]);

  // Initial load
  useEffect(() => {
    loadRoadmap();
  }, [selectedRole?.title]);

  // Toggle Roadmap Item & dynamically update student skills + sync to backend
  const toggleRoadmapItem = async (topicId) => {
    if (!roadmap) return;

    const targetTitle = selectedRole?.title || 'Full Stack MERN Developer';
    const roleKey = targetTitle.replace(/\s+/g, '_');

    // 1. Optimistically update local roadmap modules
    let updatedSkillName = null;
    let updatedTargetProf = 'Intermediate';
    let updatedCategory = 'General';
    let isNowCompleted = false;

    const updatedModules = roadmap.modules.map(m => {
      if (m.topicId === topicId) {
        const nextState = !m.isCompleted;
        isNowCompleted = nextState;
        updatedSkillName = m.skillName.replace(/\s*\([^)]*\)/g, '').trim();
        updatedTargetProf = m.targetProficiency || 'Intermediate';
        updatedCategory = m.category || 'General';
        return {
          ...m,
          isCompleted: nextState,
          completedAt: nextState ? new Date().toISOString() : null
        };
      }
      return m;
    });

    const completedCount = updatedModules.filter(m => m.isCompleted).length;
    const updatedRoadmap = {
      ...roadmap,
      modules: updatedModules,
      completedModules: completedCount,
      completionPercentage: updatedModules.length > 0 ? Math.round((completedCount / updatedModules.length) * 100) : 100
    };

    setRoadmap(updatedRoadmap);

    // Save completed topic IDs to localStorage
    const completedIds = updatedModules.filter(m => m.isCompleted).map(m => m.topicId);
    localStorage.setItem(`skillbridge_completed_${roleKey}`, JSON.stringify(completedIds));

    // 2. Update Student Profile with the acquired skill if completed!
    if (isNowCompleted && updatedSkillName) {
      const userSkills = [...(user?.skills || [])];
      const existIdx = userSkills.findIndex(s => s.name.toLowerCase() === updatedSkillName.toLowerCase());
      if (existIdx > -1) {
        userSkills[existIdx].proficiency = updatedTargetProf;
      } else {
        userSkills.push({
          _id: 'skill_' + Date.now(),
          name: updatedSkillName,
          category: updatedCategory,
          proficiency: updatedTargetProf
        });
      }

      const updatedUser = { ...user, skills: userSkills };
      setUser(updatedUser);
      localStorage.setItem('skillbridge_user', JSON.stringify(updatedUser));
    }

    // 3. Persist to Backend API / MongoDB
    try {
      await api.toggleRoadmapTopic(topicId, targetTitle);
    } catch {
      // Backend offline: gracefully maintained in local state & localStorage
    }
  };

  const resetRoadmapProgress = async () => {
    const targetTitle = selectedRole?.title || 'Full Stack MERN Developer';
    const roleKey = targetTitle.replace(/\s+/g, '_');
    localStorage.removeItem(`skillbridge_completed_${roleKey}`);

    try {
      await api.resetRoadmapProgress(targetTitle);
    } catch {}

    await loadRoadmap(targetTitle);
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    if (user) {
      const updatedUser = { ...user, targetRoleTitle: role.title };
      setUser(updatedUser);
      localStorage.setItem('skillbridge_user', JSON.stringify(updatedUser));
      api.updateProfile({ targetRoleTitle: role.title }).catch(() => {});
    }
  };

  return (
    <SkillBridgeContext.Provider
      value={{
        jobRoles,
        allSkills,
        selectedRole,
        setSelectedRole: handleSelectRole,
        gapAnalysis,
        roadmap,
        loading,
        loadRoadmap,
        toggleRoadmapItem,
        resetRoadmapProgress
      }}
    >
      {children}
    </SkillBridgeContext.Provider>
  );
};

export const useSkillBridge = () => {
  const context = useContext(SkillBridgeContext);
  if (!context) throw new Error('useSkillBridge must be used within SkillBridgeProvider');
  return context;
};
