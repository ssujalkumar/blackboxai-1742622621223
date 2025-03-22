import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Article {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'reader' | 'writer';
}

export const articlesApi = {
  getAll: () => api.get<Article[]>('/articles'),
  search: (query: string) => api.get<Article[]>(`/articles/search?q=${query}`),
  getById: (id: string) => api.get<Article>(`/articles/${id}`),
  create: (data: Omit<Article, '_id' | 'author' | 'createdAt'>) => 
    api.post<Article>('/articles', data),
  update: (id: string, data: Partial<Article>) => 
    api.put<Article>(`/articles/${id}`, data),
  delete: (id: string) => api.delete(`/articles/${id}`),
};

export const authApi = {
  login: (email: string, password: string) => 
    api.post<{ token: string; user: User }>('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) => 
    api.post<{ token: string; user: User }>('/auth/register', { name, email, password }),
  getCurrentUser: () => api.get<User>('/auth/me'),
};

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;