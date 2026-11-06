/**
 * SkillBridge Unified Frontend API Client
 * Seamlessly interfaces with Node/Express backend with resilient fallback capabilities.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('skillbridge_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // --- AUTH ENDPOINTS ---
  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async register(userData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async getMe() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch current user');
    return data;
  },

  // --- USER PROFILE & SKILLS ---
  async updateProfile(profileData) {
    const res = await fetch(`${BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  },

  async getUserSkills() {
    const res = await fetch(`${BASE_URL}/users/skills`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch user skills');
    return data;
  },

  async addUserSkill(skillData) {
    const res = await fetch(`${BASE_URL}/users/skills`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(skillData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add skill');
    return data;
  },

  async syncUserSkills(skills) {
    const res = await fetch(`${BASE_URL}/users/skills/bulk`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ skills })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to sync skills');
    return data;
  },

  async deleteUserSkill(skillName) {
    const res = await fetch(`${BASE_URL}/users/skills/${encodeURIComponent(skillName)}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to remove skill');
    return data;
  },

  // --- MASTER SKILLS CATALOG ---
  async getAllSkills(category = '', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${BASE_URL}/skills?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load skills catalog');
    return data;
  },

  async getSkillCategories() {
    const res = await fetch(`${BASE_URL}/skills/categories`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load skill categories');
    return data;
  },

  // --- JOB ROLES & GAP ANALYSIS ---
  async getAllJobRoles(category = '', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${BASE_URL}/jobs?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load job roles');
    return data;
  },

  async getJobRoleDetails(idOrTitle) {
    const res = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(idOrTitle)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load job role details');
    return data;
  },

  async analyzeSkillGap(idOrTitle, skills = null) {
    const res = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(idOrTitle)}/analyze-gap`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ skills })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to run gap analysis');
    return data;
  },

  // --- ROADMAP & PROGRESS ---
  async getPersonalizedRoadmap(roleTitle = '') {
    const params = new URLSearchParams();
    if (roleTitle) params.append('roleTitle', roleTitle);

    const res = await fetch(`${BASE_URL}/roadmap?${params.toString()}`, {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load personalized roadmap');
    return data;
  },

  async toggleRoadmapTopic(topicId, roleTitle = '') {
    const res = await fetch(`${BASE_URL}/roadmap/toggle-item`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ topicId, roleTitle })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update topic status');
    return data;
  },

  async resetRoadmapProgress(roleTitle = '') {
    const res = await fetch(`${BASE_URL}/roadmap/reset`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ roleTitle })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to reset roadmap');
    return data;
  }
};
