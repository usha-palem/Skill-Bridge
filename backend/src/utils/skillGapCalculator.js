/**
 * Skill Gap Analysis & Match Calculation Engine
 * Dynamically compares student's skill portfolio against industry job role requirements.
 */

const PROFICIENCY_VALUES = {
  beginner: 1,
  intermediate: 2,
  advanced: 3
};

function normalizeSkill(str) {
  if (!str) return '';
  return str.toString().trim().toLowerCase();
}

/**
 * Calculates dynamic skill gap analysis
 * @param {Array} studentSkills - Array of { name, proficiency, category }
 * @param {Object} jobRole - Job role object with requiredSkills & recommendedSkills
 * @returns {Object} Analysis result containing matchPercentage, matched, missing, and readiness assessment
 */
function calculateSkillGap(studentSkills = [], jobRole = {}) {
  const reqSkills = jobRole.requiredSkills || [];
  const recSkills = jobRole.recommendedSkills || [];

  // Create a fast lookup map of student's skills
  const studentMap = new Map();
  studentSkills.forEach((item) => {
    const key = normalizeSkill(item.name || item.skillName);
    if (key) {
      studentMap.set(key, {
        name: item.name || item.skillName,
        category: item.category || 'General',
        proficiency: item.proficiency || 'Beginner',
        scoreVal: PROFICIENCY_VALUES[normalizeSkill(item.proficiency)] || 1
      });
    }
  });

  let earnedRequiredScore = 0;
  let totalRequiredScore = 0;

  const matchedRequired = [];
  const missingRequired = [];
  const proficiencyGaps = [];

  // 1. Evaluate Required Skills
  reqSkills.forEach((req) => {
    const weight = req.weight || 1.0;
    totalRequiredScore += weight;

    const key = normalizeSkill(req.skillName);
    const minProfStr = req.minimumProficiency || 'Intermediate';
    const reqProfVal = PROFICIENCY_VALUES[normalizeSkill(minProfStr)] || 2;

    if (studentMap.has(key)) {
      const studentSkill = studentMap.get(key);
      const isProficient = studentSkill.scoreVal >= reqProfVal;

      if (isProficient) {
        earnedRequiredScore += weight;
        matchedRequired.push({
          skillName: req.skillName,
          category: req.category || studentSkill.category,
          studentProficiency: studentSkill.proficiency,
          requiredProficiency: minProfStr,
          status: 'Full Match',
          isProficiencyAdequate: true,
          importance: req.importance || 'Core Requirement'
        });
      } else {
        // Has skill, but lower proficiency (e.g. Beginner when role requires Intermediate)
        const partialCredit = weight * 0.65;
        earnedRequiredScore += partialCredit;
        matchedRequired.push({
          skillName: req.skillName,
          category: req.category || studentSkill.category,
          studentProficiency: studentSkill.proficiency,
          requiredProficiency: minProfStr,
          status: 'Proficiency Upgrade Needed',
          isProficiencyAdequate: false,
          importance: req.importance || 'Core Requirement'
        });
        proficiencyGaps.push({
          skillName: req.skillName,
          category: req.category || studentSkill.category,
          current: studentSkill.proficiency,
          required: minProfStr,
          action: `Upgrade from ${studentSkill.proficiency} to ${minProfStr}`
        });
      }
    } else {
      missingRequired.push({
        skillName: req.skillName,
        category: req.category || 'Core Skill',
        requiredProficiency: minProfStr,
        importance: req.importance || 'Core Requirement',
        weight
      });
    }
  });

  // 2. Evaluate Recommended Skills
  const matchedRecommended = [];
  const missingRecommended = [];

  recSkills.forEach((rec) => {
    const key = normalizeSkill(rec.skillName);
    if (studentMap.has(key)) {
      const studentSkill = studentMap.get(key);
      matchedRecommended.push({
        skillName: rec.skillName,
        category: rec.category || studentSkill.category,
        studentProficiency: studentSkill.proficiency,
        status: 'Bonus Skill Matched'
      });
      // Small bonus towards total score (up to 5% bonus capped at 100%)
      earnedRequiredScore += 0.2;
    } else {
      missingRecommended.push({
        skillName: rec.skillName,
        category: rec.category || 'Elective',
        importance: 'Recommended'
      });
    }
  });

  // Calculate percentage
  let matchPercentage = 0;
  if (totalRequiredScore > 0) {
    matchPercentage = Math.round((earnedRequiredScore / totalRequiredScore) * 100);
    if (matchPercentage > 100) matchPercentage = 100;
  }

  // Determine readiness verdict
  let readinessLevel = 'Foundational Stage';
  let readinessColor = 'text-amber-600 bg-amber-50 border-amber-200';
  let summaryMessage = 'Significant technical gaps identified. Follow your custom learning roadmap to build fundamental competencies.';

  if (matchPercentage >= 80) {
    readinessLevel = 'Industry Ready';
    readinessColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    summaryMessage = 'Excellent match! You possess the primary core competencies required for entry-level hiring.';
  } else if (matchPercentage >= 50) {
    readinessLevel = 'Moderate Competency';
    readinessColor = 'text-blue-700 bg-blue-50 border-blue-200';
    summaryMessage = 'Good foundation! Closing 2-3 key missing skills will make you a highly competitive applicant.';
  }

  return {
    jobRoleTitle: jobRole.title,
    matchPercentage,
    readinessLevel,
    readinessColor,
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
}

module.exports = { calculateSkillGap, normalizeSkill };
