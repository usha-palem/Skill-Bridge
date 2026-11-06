/**
 * Personalized Roadmap Generator
 * Synthesizes skill gaps into an actionable, sequential milestone roadmap.
 */

// Default learning metadata catalog for major tech skills
const SKILL_METADATA_PRESETS = {
  'react': {
    duration: '18 Hours (2.5 Weeks)',
    hours: 18,
    objectives: [
      'Component lifecycle, JSX syntax, and props passing',
      'State management with useState, useEffect, and custom hooks',
      'Routing with React Router and nested layouts',
      'API integration using Axios/Fetch and handling loading states'
    ],
    resources: [
      { title: 'Official React 19 Documentation & Interactive Sandbox', type: 'Documentation', platform: 'react.dev', url: 'https://react.dev' },
      { title: 'Full Modern React Course for Beginners', type: 'Video Course', platform: 'freeCodeCamp YouTube', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
      { title: 'Building Production React Apps Guide', type: 'Interactive Tutorial', platform: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started' }
    ],
    project: {
      title: 'Responsive SaaS Analytics Dashboard',
      description: 'Build a modular dashboard with interactive charts, light/dark theme toggle, and client-side filtering.'
    }
  },
  'node.js': {
    duration: '16 Hours (2 Weeks)',
    hours: 16,
    objectives: [
      'Asynchronous Event Loop, Callbacks, and Promises',
      'Core modules: fs, path, http, events, and stream processing',
      'Package management with npm and writing modular code',
      'Building resilient CLI utilities and server processes'
    ],
    resources: [
      { title: 'Node.js Official Documentation Guides', type: 'Documentation', platform: 'nodejs.org', url: 'https://nodejs.org/en/learn' },
      { title: 'Node.js Complete Backend Architecture Tutorial', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' }
    ],
    project: {
      title: 'Automated File Batch Processor & Web Scraper',
      description: 'Create a background CLI utility that parses CSV reports, validates data, and generates structured JSON output.'
    }
  },
  'express.js': {
    duration: '14 Hours (1.5 Weeks)',
    hours: 14,
    objectives: [
      'Express routing, parameter extraction, and query strings',
      'Custom middleware for authentication, logging, and error handling',
      'RESTful API design principles and HTTP status code standards',
      'CORS configuration, rate limiting, and security best practices with Helmet'
    ],
    resources: [
      { title: 'Express.js Getting Started Guide', type: 'Documentation', platform: 'expressjs.com', url: 'https://expressjs.com/en/starter/installing.html' },
      { title: 'Building Secure REST APIs with Express & JWT', type: 'Hands-on Project', platform: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs' }
    ],
    project: {
      title: 'E-Commerce Micro-Catalog API',
      description: 'Develop a scalable REST API with pagination, filtering, input validation, and role-based permissions.'
    }
  },
  'mongodb': {
    duration: '15 Hours (2 Weeks)',
    hours: 15,
    objectives: [
      'Document databases vs relational databases & schema modeling',
      'Mongoose schemas, validation, middleware hooks, and virtuals',
      'Complex queries, indexing strategies, and aggregation pipelines',
      'Transactions, connection pooling, and Atlas cloud deployment'
    ],
    resources: [
      { title: 'MongoDB University: Mongoose & Node.js Developer Path', type: 'Interactive Course', platform: 'learn.mongodb.com', url: 'https://learn.mongodb.com/' },
      { title: 'MongoDB & Mongoose Architecture Crash Course', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=ofme2o29ngU' }
    ],
    project: {
      title: 'Multi-Tenant Blog & Comment System',
      description: 'Implement nested references, indexed searches, and aggregation reports for top-trending posts.'
    }
  },
  'javascript (es6+)': {
    duration: '12 Hours (1.5 Weeks)',
    hours: 12,
    objectives: [
      'Closures, lexical scoping, and execution contexts',
      'Async/await, Promises, and Microtask queues',
      'Destructuring, spread/rest operators, optional chaining, and nullish coalescing',
      'ES Modules, Map/Set data structures, and functional utilities'
    ],
    resources: [
      { title: 'JavaScript.info: The Modern JavaScript Tutorial', type: 'Documentation', platform: 'javascript.info', url: 'https://javascript.info/' },
      { title: 'MDN JavaScript Deep Dive', type: 'Documentation', platform: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
    ],
    project: {
      title: 'Interactive Kanban Task Board with Local Storage',
      description: 'Code a drag-and-drop workflow board using pure modern JavaScript without any external libraries.'
    }
  },
  'typescript': {
    duration: '16 Hours (2 Weeks)',
    hours: 16,
    objectives: [
      'Static typing, primitive types, unions, and intersections',
      'Interfaces, custom types, and generics in functions/classes',
      'Type narrowing, Discriminated Unions, and utility types (Partial, Pick, Omit)',
      'Integrating TypeScript with React components and Express APIs'
    ],
    resources: [
      { title: 'Official TypeScript Handbook', type: 'Documentation', platform: 'typescriptlang.org', url: 'https://www.typescriptlang.org/docs/' },
      { title: 'Total TypeScript Essentials', type: 'Interactive Tutorial', platform: 'totaltypescript.com', url: 'https://www.totaltypescript.com/tutorials' }
    ],
    project: {
      title: 'Strictly Typed Finance Tracker',
      description: 'Build a financial transaction tracker with strict validation, generic API response handlers, and type assertions.'
    }
  },
  'docker': {
    duration: '14 Hours (2 Weeks)',
    hours: 14,
    objectives: [
      'Containerization concepts vs virtualization',
      'Writing multi-stage Dockerfiles for optimized production builds',
      'Docker Compose for multi-container apps (Frontend + Backend + DB)',
      'Volume mounting, environment injection, and container networking'
    ],
    resources: [
      { title: 'Docker Official Get Started Tutorial', type: 'Documentation', platform: 'docs.docker.com', url: 'https://docs.docker.com/get-started/' },
      { title: 'Docker for Full Stack Developers Crash Course', type: 'Video Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=pg19Z8LL06w' }
    ],
    project: {
      title: 'Full Stack App Multi-Container Orchestration',
      description: 'Dockerize a React frontend, Node backend, and MongoDB database with one-command `docker compose up`.'
    }
  },
  'git & github': {
    duration: '8 Hours (1 Week)',
    hours: 8,
    objectives: [
      'Version control fundamentals: commit history, staging, and branching',
      'Merge conflicts resolution and interactive rebase',
      'Pull requests, code review etiquette, and semantic commit conventions',
      'Setting up automated CI/CD workflows with GitHub Actions'
    ],
    resources: [
      { title: 'Pro Git Book (Free Online)', type: 'Documentation', platform: 'git-scm.com', url: 'https://git-scm.com/book/en/v2' },
      { title: 'GitHub Skills Interactive Lab', type: 'Interactive Course', platform: 'skills.github.com', url: 'https://skills.github.com/' }
    ],
    project: {
      title: 'Open Source Contribution & Automated CI Pipeline',
      description: 'Setup branch protection rules, linting checks, and automated unit test runners on pull requests.'
    }
  },
  'rest apis & postman': {
    duration: '10 Hours (1 Week)',
    hours: 10,
    objectives: [
      'REST architectural constraints and HTTP verbs (GET, POST, PUT, PATCH, DELETE)',
      'Status codes, payload structures, pagination, and error responses',
      'Postman collections, automated API test scripts, and environment variables',
      'API documentation with OpenAPI / Swagger'
    ],
    resources: [
      { title: 'RESTful API Guidelines & Standards', type: 'Documentation', platform: 'restfulapi.net', url: 'https://restfulapi.net/' },
      { title: 'Postman Student Expert Certification Guide', type: 'Interactive Tutorial', platform: 'postman.com', url: 'https://academy.postman.com/' }
    ],
    project: {
      title: 'Published API Documentation & Test Suite',
      description: 'Author a complete OpenAPI schema and Postman collection with automated test assertions.'
    }
  },
  'sql / postgresql': {
    duration: '18 Hours (2.5 Weeks)',
    hours: 18,
    objectives: [
      'Relational database design, 3NF normalization, and primary/foreign keys',
      'Complex SELECT queries, INNER/OUTER JOINs, GROUP BY, and aggregations',
      'Subqueries, CTEs (Common Table Expressions), and window functions',
      'Indexing, EXPLAIN ANALYZE performance tuning, and ORM usage with Prisma'
    ],
    resources: [
      { title: 'PostgreSQL Tutorial for Developers', type: 'Interactive Tutorial', platform: 'postgresqltutorial.com', url: 'https://www.postgresqltutorial.com/' },
      { title: 'SQL & Database Design Masterclass', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4' }
    ],
    project: {
      title: 'University Course Management Relational Schema',
      description: 'Architect schemas for students, instructors, and enrollments with complex join analytics reports.'
    }
  },
  'python': {
    duration: '16 Hours (2 Weeks)',
    hours: 16,
    objectives: [
      'Python data structures (lists, dicts, sets, tuples) & comprehensions',
      'Object-Oriented Programming (classes, inheritance, dunder methods)',
      'Exception handling, file I/O, and virtual environments',
      'Working with packages like Requests, Pandas, and FastAPI'
    ],
    resources: [
      { title: 'Official Python Tutorial', type: 'Documentation', platform: 'python.org', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'Python for Beginners Full Course', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' }
    ],
    project: {
      title: 'Automated Real-Time Currency & Stock Monitor',
      description: 'Fetch data from financial APIs, perform statistical summaries, and export email summaries.'
    }
  },
  'machine learning': {
    duration: '24 Hours (3 Weeks)',
    hours: 24,
    objectives: [
      'Supervised vs Unsupervised learning paradigms',
      'Data preprocessing, feature engineering, and train/test split',
      'Regression, Classification (Logistic, Decision Trees, Random Forests)',
      'Model evaluation metrics (Accuracy, Precision, Recall, F1, ROC-AUC)'
    ],
    resources: [
      { title: 'Scikit-Learn User Guide & Tutorials', type: 'Documentation', platform: 'scikit-learn.org', url: 'https://scikit-learn.org/stable/user_guide.html' },
      { title: 'Machine Learning Specialization by Andrew Ng', type: 'Interactive Course', platform: 'Coursera / DeepLearning.AI', url: 'https://www.coursera.org/specializations/machine-learning-introduction' }
    ],
    project: {
      title: 'House Price Prediction & Classification Engine',
      description: 'Clean housing dataset, train multiple regression models, optimize hyperparameters, and evaluate test error.'
    }
  },
  'system design fundamentals': {
    duration: '20 Hours (2.5 Weeks)',
    hours: 20,
    objectives: [
      'Horizontal vs Vertical scaling, Load Balancers, and Reverse Proxies',
      'Caching strategies (Redis, Memcached, CDN, Cache-aside pattern)',
      'Database partitioning, sharding, replication, and CAP Theorem',
      'Message Queues & Event-Driven Architecture (Kafka, RabbitMQ)'
    ],
    resources: [
      { title: 'System Design Primer (Open Source Standard)', type: 'Documentation', platform: 'GitHub', url: 'https://github.com/donnemartin/system-design-primer' },
      { title: 'System Design Interview Fundamentals', type: 'Video Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=m8Icp_Cid5o' }
    ],
    project: {
      title: 'High-Availability URL Shortener Architecture Doc',
      description: 'Write an end-to-end design document with capacity estimation, caching layers, and database schemas.'
    }
  },
  'aws / cloud basics': {
    duration: '16 Hours (2 Weeks)',
    hours: 16,
    objectives: [
      'Cloud compute models: EC2, Lambda serverless, and ECS',
      'Object storage with Amazon S3 and static website hosting',
      'VPC networking, Subnets, Security Groups, and IAM security roles',
      'Managed databases with Amazon RDS and DynamoDB'
    ],
    resources: [
      { title: 'AWS Cloud Practitioner Essentials', type: 'Interactive Course', platform: 'aws.training', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/' },
      { title: 'AWS Beginner Crash Course', type: 'Video Course', platform: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=k1RI5locZE4' }
    ],
    project: {
      title: 'Serverless REST API on AWS Lambda & S3',
      description: 'Deploy serverless compute functions connected to API Gateway and an S3 bucket for file uploads.'
    }
  },
  'tailwind css': {
    duration: '8 Hours (1 Week)',
    hours: 8,
    objectives: [
      'Utility-first CSS methodology and responsive breakpoints',
      'Flexbox, Grid, spacing, typography, and color tokens',
      'Custom theme configuration in tailwind.config.js',
      'Building accessible UI components and animations'
    ],
    resources: [
      { title: 'Tailwind CSS Documentation & Guides', type: 'Documentation', platform: 'tailwindcss.com', url: 'https://tailwindcss.com/docs' },
      { title: 'Tailwind CSS From Scratch Course', type: 'Video Course', platform: 'YouTube', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' }
    ],
    project: {
      title: 'Modern Landing Page Clone',
      description: 'Build a pixel-perfect, responsive marketing landing page with glassmorphism and subtle animations.'
    }
  }
};

/**
 * Generates an individualized learning roadmap based on missing skills and proficiency gaps
 */
function generateRoadmap(gapAnalysis, existingRoadmap = null) {
  const { missingRequired = [], proficiencyGaps = [], missingRecommended = [], jobRoleTitle } = gapAnalysis;

  const modules = [];
  let orderIndex = 1;
  let totalEstimatedHours = 0;

  // Build a lookup map of previously completed topic IDs if existing roadmap is passed
  const completedTopicMap = new Set();
  if (existingRoadmap && existingRoadmap.modules) {
    existingRoadmap.modules.forEach(m => {
      if (m.isCompleted) completedTopicMap.add(m.topicId);
    });
  }

  // 1. Process Missing Required Skills (Priority: High)
  missingRequired.forEach(item => {
    const key = item.skillName.toLowerCase().trim();
    const preset = SKILL_METADATA_PRESETS[key] || {
      duration: '12 Hours (1.5 Weeks)',
      hours: 12,
      objectives: [
        `Core syntax, foundational architecture, and setup for ${item.skillName}`,
        `Industry best practices and standard design patterns in ${item.skillName}`,
        `Testing, debugging, and deployment strategies`,
        `Real-world portfolio implementation`
      ],
      resources: [
        {
          title: `Mastering ${item.skillName}: Complete Technical Guide`,
          type: 'Documentation',
          platform: 'Official Dev Docs',
          url: `https://www.google.com/search?q=${encodeURIComponent(item.skillName + ' official documentation tutorial')}`
        },
        {
          title: `${item.skillName} Industry Best Practices & Walkthrough`,
          type: 'Video Course',
          platform: 'freeCodeCamp / YouTube',
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.skillName + ' crash course')}`
        }
      ],
      project: {
        title: `${item.skillName} Practical Showcase Project`,
        description: `Design and implement a clean, documented sample application demonstrating ${item.skillName} industry proficiency.`
      }
    };

    const topicId = `topic-req-${key.replace(/[^a-z0-9]/g, '-')}`;
    const isCompleted = completedTopicMap.has(topicId);
    const weekNumber = orderIndex;

    modules.push({
      topicId,
      weekNumber,
      weekTitle: `Week ${weekNumber}: Core Missing Competency - ${item.skillName}`,
      skillName: item.skillName,
      category: item.category || 'Core Skill',
      priority: 'High',
      targetProficiency: item.requiredProficiency || 'Intermediate',
      currentProficiency: 'Not Started',
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
      order: orderIndex++,
      estimatedDuration: preset.duration || '12-16 Hours',
      learningObjectives: preset.objectives,
      resources: preset.resources,
      practicalProject: preset.project
    });

    totalEstimatedHours += preset.hours || 10;
  });

  // 2. Process Proficiency Gaps (Priority: Medium)
  proficiencyGaps.forEach(item => {
    const key = item.skillName.toLowerCase().trim();
    const preset = SKILL_METADATA_PRESETS[key] || {
      duration: '8 Hours (1 Week)',
      hours: 8,
      objectives: [
        `Deep dive advanced patterns in ${item.skillName}`,
        `Performance optimization, memory management, and profiling`,
        `Enterprise code structuring and unit testing`
      ],
      resources: [
        {
          title: `Advanced ${item.skillName} Mastery & Performance`,
          type: 'Documentation',
          platform: 'Tech Deep Dives',
          url: `https://www.google.com/search?q=${encodeURIComponent('advanced ' + item.skillName + ' patterns')}`
        }
      ],
      project: {
        title: `Refactor & Optimize ${item.skillName} Implementation`,
        description: `Upgrade an existing codebase to utilize advanced architectural patterns and performance optimizations.`
      }
    };

    const topicId = `topic-gap-${key.replace(/[^a-z0-9]/g, '-')}`;
    const isCompleted = completedTopicMap.has(topicId);
    const weekNumber = orderIndex;

    modules.push({
      topicId,
      weekNumber,
      weekTitle: `Week ${weekNumber}: Proficiency Upgrade - ${item.skillName}`,
      skillName: `${item.skillName} (Proficiency Upgrade)`,
      category: item.category || 'Skill Upgrade',
      priority: 'Medium',
      targetProficiency: item.required,
      currentProficiency: item.current,
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
      order: orderIndex++,
      estimatedDuration: preset.duration || '8-10 Hours',
      learningObjectives: [
        `Bridge gap from current level (${item.current}) to required industry standard (${item.required})`,
        ...preset.objectives
      ],
      resources: preset.resources,
      practicalProject: preset.project
    });

    totalEstimatedHours += preset.hours || 8;
  });

  // 3. Process Recommended Skills (Up to 3 top recommendations, Priority: Optional)
  const topRecommended = missingRecommended.slice(0, 3);
  topRecommended.forEach(item => {
    const key = item.skillName.toLowerCase().trim();
    const preset = SKILL_METADATA_PRESETS[key] || {
      duration: '6 Hours (0.5 Weeks)',
      hours: 6,
      objectives: [
        `Introductory workflow and tool integration for ${item.skillName}`,
        `Understanding when and why to use ${item.skillName} in production`
      ],
      resources: [
        {
          title: `Introductory Guide to ${item.skillName}`,
          type: 'Documentation',
          platform: 'Developer Resource',
          url: `https://www.google.com/search?q=${encodeURIComponent(item.skillName + ' quick start')}`
        }
      ],
      project: {
        title: `Mini-Integration of ${item.skillName}`,
        description: `Integrate ${item.skillName} into a hobby project to showcase broad industry awareness.`
      }
    };

    const topicId = `topic-rec-${key.replace(/[^a-z0-9]/g, '-')}`;
    const isCompleted = completedTopicMap.has(topicId);
    const weekNumber = orderIndex;

    modules.push({
      topicId,
      weekNumber,
      weekTitle: `Week ${weekNumber}: Recommended Elective - ${item.skillName}`,
      skillName: `${item.skillName} (Bonus / Recommended)`,
      category: item.category || 'Elective',
      priority: 'Optional',
      targetProficiency: 'Beginner',
      currentProficiency: 'Not Started',
      isCompleted,
      completedAt: isCompleted ? new Date() : null,
      order: orderIndex++,
      estimatedDuration: preset.duration,
      learningObjectives: preset.objectives,
      resources: preset.resources,
      practicalProject: preset.project
    });

    totalEstimatedHours += preset.hours || 6;
  });

  const completedModules = modules.filter(m => m.isCompleted).length;

  return {
    jobRoleTitle,
    totalModules: modules.length,
    completedModules,
    completionPercentage: modules.length > 0 ? Math.round((completedModules / modules.length) * 100) : 100,
    totalEstimatedHours,
    modules
  };
}

module.exports = { generateRoadmap, SKILL_METADATA_PRESETS };
