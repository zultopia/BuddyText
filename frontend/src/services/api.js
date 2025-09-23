import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export const simplificationService = {
  async simplifyText(data) {
    try {
      const response = await api.post('/api/simplify/text', data);
      return response.data;
    } catch (error) {
      console.error('Error simplifying text:', error);
      throw error;
    }
  },

  async createStepByStepGuide(data) {
    try {
      const response = await api.post('/api/simplify/steps', data);
      return response.data;
    } catch (error) {
      console.error('Error creating step-by-step guide:', error);
      throw error;
    }
  }
};

export const tutorService = {
  async askQuestion(data) {
    try {
      const response = await api.post('/api/tutor/ask', data);
      return response.data;
    } catch (error) {
      console.error('Error asking question:', error);
      throw error;
    }
  }
};

export const stepByStepService = {
  async createGuide(data) {
    try {
      const response = await api.post('/api/simplify/steps', data);
      return response.data;
    } catch (error) {
      console.error('Error creating guide:', error);
      throw error;
    }
  }
};

export const evaluationService = {
  async evaluateReadability(data) {
    try {
      const response = await api.post('/api/evaluate/readability', data);
      return response.data;
    } catch (error) {
      console.error('Error evaluating readability:', error);
      throw error;
    }
  }
};

export default api;
