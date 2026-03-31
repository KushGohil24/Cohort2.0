import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Point to our backend avoiding port 5000 (Airplay receiver collision)
});

// Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const loginCall = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerCall = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

export const getItems = async (type) => {
  const url = type ? `/items/filter?type=${type}` : '/items';
  const { data } = await api.get(url);
  return data;
};

export const createItem = async (itemData) => {
  const { data } = await api.post('/items', itemData);
  return data;
};

export const updateItem = async (id, updates) => {
  const { data } = await api.patch(`/items/${id}`, updates);
  return data;
};

export const deleteItem = async (id) => {
  const { data } = await api.delete(`/items/${id}`);
  return data;
};

export const getUploadAuth = async () => {
  const { data } = await api.get('/upload/auth');
  return data;
};

export const extractUrl = async (url) => {
  const { data } = await api.post('/extract', { url });
  return data;
};

export const getCollections = async () => {
  const { data } = await api.get('/collections');
  return data;
};

export default api;
