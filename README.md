# SkillBridge – Academic to Industry Skill Development Platform

SkillBridge is a modern, beginner-friendly **MERN Stack (MongoDB, Express.js, React.js, Node.js)** web platform designed to bridge the gap between academic university curricula and current industry hiring requirements.

The platform empowers students to evaluate their existing technical skill portfolio against real-world tech job roles, run dynamic skill gap analysis, generate sequential learning roadmaps with curated resources, and track progress interactively toward industry job readiness.

---

## 🌟 Key Features

1. **Student Registration & Authentication**
   - Secure student sign-up and login with hashed passwords (`bcryptjs`) and stateless session tokens (`jsonwebtoken`).
   - One-click **Demo Account** auto-fill (`demo@student.edu` / `password123`) for immediate assessment.

2. **Student Academic & Career Profile**
   - Manage university, degree program, graduation year, bio, and active target role track.
   - Live synchronization across all gap calculations and roadmaps.

3. **Technical Skill Selection & Portfolio**
   - Searchable catalog of 40+ industry skills across 8 domains (Frontend, Backend, Database, Cloud & DevOps, Programming Languages, System Architecture, AI/Data Science, Security).
   - Multi-proficiency tagging (**Beginner**, **Intermediate**, **Advanced**) with instant addition and removal.

4. **Job Roles & Industry Requirements Catalog**
   - 8 comprehensive industry roles (Full Stack MERN Developer, Frontend React Specialist, Backend & Cloud API Engineer, Cloud & DevOps Specialist, Data Analyst & Python Developer, AI / Machine Learning Associate, etc.).
   - Full role specifications: salary brackets, hiring demand indices, day-to-day responsibilities, and mandatory vs. recommended skill requirements.

5. **Dynamic Skill Gap Analysis Engine (Zero Hardcoded Results)**
   - Compares student's active verified skills against the target role's weighted requirements.
   - Calculates **Match Percentage Score (0–100%)**.
   - Categorizes skills into:
     - **Full Matches** (Student meets or exceeds required proficiency level)
     - **Proficiency Gaps** (Student has the skill, but requires an upgrade to meet hiring benchmarks)
     - **Critical Missing Skills** (Required by the role but not yet acquired)
     - **Elective / Bonus Matches** (Recommended industry skills)
   - Industry Readiness Verdict: **Industry Ready**, **Moderate Competency**, or **Foundational Stage**.

6. **Personalized Learning Roadmap Generation**
   - Sequentially generated milestone syllabus based directly on identified missing skills and proficiency gaps.
   - Each module contains:
     - Estimated study duration (hours / weeks)
     - Explicit syllabus learning objectives
     - Curated learning resources (official documentation, video courses, interactive sandboxes)
     - Hands-on practical portfolio project ideas
   - Interactive completion toggles (**Mark Complete** / **In Progress**) that **dynamically award the skill to the student profile and recalculate match scores**!

7. **Modern Blue & White Aesthetic**
   - Clean, professional design system built with custom CSS variables, Plus Jakarta Sans typography, Lucide icons, responsive cards, gauges, and tables.

---

## 📁 Project Architecture & Structure

```text
c:\Users\HP\Desktop\vu.448\
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                       # Mongoose connection with high-resiliency fallback
│   │   ├── controllers/
│   │   │   ├── authController.js           # Student register, login, and getMe
│   │   │   ├── userController.js           # Profile updates and skill portfolio management
│   │   │   ├── skillController.js          # Master technical skills catalog
│   │   │   ├── jobRoleController.js        # Job roles catalog & gap analysis API
│   │   │   └── roadmapController.js        # Roadmap generation and progress tracking
│   │   ├── data/
│   │   │   ├── sampleSkills.js             # 40+ curated industry skills
│   │   │   └── sampleJobRoles.js           # 8 production job role specifications
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js           # JWT Bearer token protection & session handling
│   │   │   └── errorMiddleware.js          # Global error handling and validation parsing
│   │   ├── models/
│   │   │   ├── User.js                     # Mongoose student schema & password hashing
│   │   │   ├── Skill.js                    # Mongoose skill schema with learning resources
│   │   │   ├── JobRole.js                  # Mongoose job role requirements schema
│   │   │   └── Roadmap.js                  # Mongoose student roadmap schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js               # /api/auth endpoints
│   │   │   ├── userRoutes.js               # /api/users endpoints
│   │   │   ├── skillRoutes.js              # /api/skills endpoints
│   │   │   ├── jobRoleRoutes.js            # /api/jobs endpoints
│   │   │   └── roadmapRoutes.js            # /api/roadmap endpoints
│   │   ├── utils/
│   │   │   ├── skillGapCalculator.js       # Dynamic skill gap analysis calculation algorithm
│   │   │   └── roadmapGenerator.js         # Roadmap synthesis engine
│   │   ├── seed.js                         # Database seeder script
│   │   └── server.js                       # Express application bootstrap
│   ├── .env                                # Local environment config
│   ├── .env.example                        # Sample environment template
│   └── package.json                        # Backend dependencies & npm scripts
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg                     # SkillBridge brand icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx              # Responsive header navigation
│   │   │   │   ├── Footer.jsx              # Academic-to-industry footer
│   │   │   │   ├── ProgressBar.jsx         # Custom progress meter
│   │   │   │   ├── SkillBadge.jsx          # Proficiency-tagged badge
│   │   │   │   └── Modal.jsx               # Reusable accessible modal dialog
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsOverview.jsx       # 4 primary KPI statistic cards
│   │   │   │   ├── SkillMatchMeter.jsx     # Visual match gauge & readiness verdict
│   │   │   │   ├── TargetRoleCard.jsx      # Active target role summary & quick-switch
│   │   │   │   └── RecentRoadmapWidget.jsx # Interactive roadmap checkoff list
│   │   │   ├── skills/
│   │   │   │   ├── SkillSelector.jsx       # Search & multi-category skill picker
│   │   │   │   └── SkillList.jsx           # Student verified skill list with level selector
│   │   │   ├── jobs/
│   │   │   │   ├── JobRoleCard.jsx         # Job role overview card with salary & demand
│   │   │   │   └── JobDetailModal.jsx      # Full job role specs & responsibilities modal
│   │   │   ├── gapAnalysis/
│   │   │   │   ├── GapAnalysisCard.jsx     # High-level gap overview & score breakdown
│   │   │   │   └── SkillComparisonTable.jsx# Side-by-side technical skill comparison table
│   │   │   └── roadmap/
│   │   │       ├── RoadmapTimeline.jsx     # Filterable sequential milestones
│   │   │       ├── RoadmapItem.jsx         # Expandable module with syllabus & objectives
│   │   │       └── ResourceCard.jsx        # Direct resource link card with external link
│   │   ├── context/
│   │   │   ├── AuthContext.jsx             # Student session & portfolio state
│   │   │   └── SkillBridgeContext.jsx      # Global roles, skills, and roadmap engine
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx           # Comprehensive student dashboard
│   │   │   ├── SkillsManagerPage.jsx       # Skill selection & proficiency manager
│   │   │   ├── JobRolesPage.jsx            # Job roles catalog with filters
│   │   │   ├── GapAnalysisPage.jsx         # Dynamic skill comparison & gap breakdown
│   │   │   ├── RoadmapPage.jsx             # Personalized learning roadmap
│   │   │   ├── ProfilePage.jsx             # Student academic details & target track
│   │   │   ├── LoginPage.jsx               # Sign in page with demo credentials
│   │   │   └── RegisterPage.jsx            # New student registration
│   │   ├── services/
│   │   │   └── api.js                      # Centralized API service with offline fallback
│   │   ├── styles/
│   │   │   └── index.css                   # Professional blue & white design stylesheet
│   │   ├── App.jsx                         # Main app routing & tab manager
│   │   └── main.jsx                        # React root entrypoint
│   ├── index.html                          # HTML template with typography imports
│   ├── vite.config.js                      # Vite config with API proxy
│   ├── .env                                # Frontend environment variables
│   ├── .env.example                        # Sample environment template
│   └── package.json                        # Frontend dependencies & npm scripts
│
└── README.md                               # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0 or higher recommended, verified with v24.15)
- **npm** (v9.0 or higher)
- **MongoDB** (Optional: local MongoDB community server or MongoDB Atlas URI. *Note: If MongoDB is offline, the backend and frontend automatically operate in high-resiliency mode for seamless demonstration!*)

---

### Step 1: Backend Setup

1. Open a terminal in the root directory and navigate to `backend`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Review the environment configuration in `backend/.env` (pre-configured):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skillbridge
   JWT_SECRET=skillbridge_super_secret_jwt_key_2026
   NODE_ENV=development
   ```

4. *(Optional)* Seed the database with sample skills, job roles, and a demo student:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   > Server will start on `http://localhost:5000` with health check at `http://localhost:5000/api/health`.

---

### Step 2: Frontend Setup

1. Open a second terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   > Frontend will be running at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🧪 Demonstration & Testing Walkthrough

1. **Dashboard & Overview**
   - Open `http://localhost:3000` in your browser.
   - Notice the greeting, academic details, 4 KPI statistic cards, the **Job Role Readiness Meter**, the **Target Role Card**, and the active **Learning Roadmap Milestones**.

2. **Managing Skills (`My Skills` Tab)**
   - Click **My Skills** in the navbar.
   - Use the category filters (e.g., *Frontend*, *Backend*, *Database*, *Cloud & DevOps*) or the search bar.
   - Set the proficiency level (e.g. *Intermediate* or *Advanced*) and click **+ Add**.
   - Notice how adding or removing skills immediately updates your verified portfolio.

3. **Job Catalog (`Job Catalog` Tab)**
   - Browse across 8 high-demand career tracks.
   - Click **Role Specs** on any role (e.g., *Full Stack MERN Developer* or *Cloud & DevOps Engineer*) to inspect day-to-day responsibilities, industry salaries, and required vs recommended skills.
   - Click **Set as Target** to switch your target role.

4. **Dynamic Skill Gap Analysis (`Gap Analysis` Tab)**
   - Inspect the **Match Percentage** and **Readiness Level**.
   - Notice the side-by-side comparison matrix showing:
     - Full matches with adequate proficiency
     - Proficiency upgrade recommendations
     - Critical missing skills
   - Click **"I Know This"** or **"Upgrade"** directly from the table to watch the score recalculate algorithmically in real time!

5. **Personalized Learning Roadmap (`Roadmap` Tab)**
   - View your customized milestones ordered chronologically.
   - Click any milestone (e.g. *Docker* or *Node.js*) to expand the syllabus objectives, curated documentation links, and suggested portfolio project.
   - Click **Mark Complete** on a milestone:
     - The milestone gets checked off with a green badge.
     - The skill is automatically added/upgraded in your student profile!
     - Your overall Job Match Score dynamically increases!

6. **Authentication & Profile**
   - Click **Logout** to test the sign-in screen.
   - Use the **Auto-Fill Demo Credentials** button (`demo@student.edu` / `password123`) or register a new student account.
   - Visit the **Profile** tab to update your university, graduation year, or career bio.

---

## 🛠️ API Reference

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new student | Public |
| `POST` | `/api/auth/login` | Student login & token issue | Public |
| `GET`  | `/api/auth/me` | Fetch logged-in student profile | Private (Bearer) |
| `PUT`  | `/api/users/profile` | Update academic details & target role | Private (Bearer) |
| `GET`  | `/api/users/skills` | Get student verified skills | Private (Bearer) |
| `POST` | `/api/users/skills` | Add/update a skill in student portfolio | Private (Bearer) |
| `DELETE` | `/api/users/skills/:skillName` | Remove a skill from student portfolio | Private (Bearer) |
| `GET`  | `/api/skills` | Get all skills with search & category filters | Public |
| `GET`  | `/api/skills/categories` | Get all skill domain categories | Public |
| `GET`  | `/api/jobs` | Get all industry job roles | Public |
| `GET`  | `/api/jobs/:idOrTitle` | Get full specifications of a job role | Public |
| `POST` | `/api/jobs/:idOrTitle/analyze-gap` | Dynamic skill gap calculation against role | Public / Private |
| `GET`  | `/api/roadmap` | Get personalized learning roadmap | Private (Bearer) |
| `PUT`  | `/api/roadmap/toggle-item` | Toggle roadmap topic completion status | Private (Bearer) |
| `POST` | `/api/roadmap/reset` | Reset roadmap completion progress | Private (Bearer) |
