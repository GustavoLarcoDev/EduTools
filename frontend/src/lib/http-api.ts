import axios from 'axios';
import { AuthResponse, Career, Tool, Tutorial, User } from '@/types';
import { BASE_PATH } from './config';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = `${BASE_PATH}/auth/login`;
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const register = async (data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): Promise<AuthResponse> => {
  const response = await api.post('auth/register/', data);
  return response.data;
};

export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await api.post('auth/login/', data);
  return response.data;
};

export const loginWithGoogle = async (code: string) => {
  const response = await api.post('auth/google/', { code });
  return response.data;
};

export const verifyToken = async (token: string): Promise<User> => {
  const response = await api.get('auth/verify-token/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Careers
export const getCareers = async (): Promise<Career[]> => {
  const response = await api.get('careers/');
  return response.data;
};

export const getCareer = async (id: number) => {
  const response = await api.get(`careers/${id}/`);
  return response.data;
};

export const createCareer = async (data: Partial<Career>) => {
  const response = await api.post('careers/', data);
  return response.data;
};

export const updateCareer = async (id: number, data: Partial<Career>) => {
  const response = await api.put(`careers/${id}/`, data);
  return response.data;
};

export const deleteCareer = async (id: number) => {
  await api.delete(`careers/${id}/`);
};

// Tools
export const getTools = async (params?: { career?: number }): Promise<Tool[]> => {
  const response = await api.get('tools/', { params });
  return response.data;
};

export const getTool = async (id: number) => {
  const response = await api.get(`tools/${id}/`);
  return response.data;
};

export const createTool = async (data: FormData) => {
  const response = await api.post('tools/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTool = async (id: number, data: FormData) => {
  const response = await api.put(`tools/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTool = async (id: number) => {
  await api.delete(`tools/${id}/`);
};

// Tutorials
export const getTutorials = async (params?: { career?: number; tool?: number }): Promise<Tutorial[]> => {
  const response = await api.get('tutorials/', { params });
  return response.data;
};

export const getTutorial = async (id: number) => {
  const response = await api.get(`tutorials/${id}/`);
  return response.data;
};

export const createTutorial = async (data: Partial<Tutorial>) => {
  const response = await api.post('tutorials/create/', data);
  return response.data;
};

export const updateTutorial = async (id: number, data: Partial<Tutorial>) => {
  const response = await api.put(`tutorials/${id}/update/`, data);
  return response.data;
};

export const deleteTutorial = async (id: number) => {
  await api.delete(`tutorials/${id}/delete/`);
};

// Subscriptions
export const createCheckoutSession = async (): Promise<{ url?: string; sessionId?: string }> => {
  const response = await api.post('subscriptions/create-checkout-session/');
  return response.data;
};

export { api };
