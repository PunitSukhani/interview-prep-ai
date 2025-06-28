const BASE_URL = 'http://localhost:5000/api';

const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    PROFILE: `${BASE_URL}/auth/profile`,
  },
  SESSION: {
    CREATE: `${BASE_URL}/session/create`,
    MY_SESSIONS: `${BASE_URL}/session/my-sessions`,
    GET_BY_ID: (id) => `${BASE_URL}/session/${id}`,
    DELETE: (id) => `${BASE_URL}/session/${id}`,
  },
  QUESTION: {
    ADD: `${BASE_URL}/question/add`,
    TOGGLE_PIN: (id) => `${BASE_URL}/question/${id}/pin`,
    UPDATE_NOTE: (id) => `${BASE_URL}/question/${id}/note`,
  },
  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/ai/generate-questions`,
    GENERATE_EXPLANATION: `${BASE_URL}/ai/generate-explanation`,
  }
};

export default API_PATHS;
