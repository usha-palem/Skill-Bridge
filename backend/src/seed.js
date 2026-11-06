const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Skill = require('./models/Skill');
const JobRole = require('./models/JobRole');
const User = require('./models/User');
const sampleSkills = require('./data/sampleSkills');
const sampleJobRoles = require('./data/sampleJobRoles');

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillbridge';
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log('✅ Connected to MongoDB. Clearing existing data...');
    await Skill.deleteMany({});
    await JobRole.deleteMany({});
    await User.deleteMany({});

    console.log(`📥 Inserting ${sampleSkills.length} skills...`);
    const insertedSkills = await Skill.insertMany(sampleSkills);
    console.log(`✅ Successfully seeded ${insertedSkills.length} technical skills.`);

    console.log(`📥 Inserting ${sampleJobRoles.length} industry job roles...`);
    const insertedRoles = await JobRole.insertMany(sampleJobRoles);
    console.log(`✅ Successfully seeded ${insertedRoles.length} job roles.`);

    // Create a demo student account
    console.log('👤 Creating default demo student account (demo@student.edu)...');
    const demoUser = await User.create({
      name: 'Alex Rivera',
      email: 'demo@student.edu',
      password: 'password123',
      college: 'National Institute of Technology',
      degree: 'B.Tech / B.E. Computer Science',
      graduationYear: 2026,
      bio: 'Aspiring Full Stack Engineer passionate about building scalable web platforms and bridging academic theory with industry engineering standards.',
      targetRoleTitle: 'Full Stack MERN Developer',
      targetRoleId: insertedRoles[0]._id,
      skills: [
        { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 'Intermediate' },
        { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 'Intermediate' },
        { name: 'React', category: 'Frontend', proficiency: 'Beginner' },
        { name: 'Git & GitHub', category: 'Cloud & DevOps', proficiency: 'Beginner' }
      ]
    });

    console.log(`✅ Demo student created successfully! (Email: ${demoUser.email}, Password: password123)`);
    console.log('🎉 SkillBridge Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
