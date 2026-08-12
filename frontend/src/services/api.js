import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const user = localStorage.getItem('sahtain_user')
    ? JSON.parse(localStorage.getItem('sahtain_user'))
    : null;

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const LOCAL_KEY = 'sahtain_site_config_v1';

const getLocalConfig = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setLocalConfig = (data) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { method, url, data: requestData, config } = error.config || {};
    const isConfigRequest = url && url.includes('/config');
    const isGet = method && method.toLowerCase() === 'get';

    if (isGet && isConfigRequest) {
      const local = getLocalConfig();
      if (local) {
        return Promise.resolve({ data: local, status: 200, config, statusText: 'OK', headers: {} });
      }
    }

    if (!isGet && isConfigRequest && requestData) {
      const current = getLocalConfig();
      const merged = { ...current, ...requestData };
      setLocalConfig(merged);
      return Promise.resolve({ data: merged, status: 200, config, statusText: 'OK', headers: {} });
    }

    return Promise.reject(error);
  }
);

export default API;
