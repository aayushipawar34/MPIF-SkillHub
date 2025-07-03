// src/api/api.js (or index.js if you prefer)
import axiosInstance from './axios';

// 🔐 Authentication
export const signup = (formData) => axiosInstance.post('/user/sign-up', formData);
export const signIn = (formData) => axiosInstance.post('/user/sign-in', formData);
export const verifyOtp = (data) => axiosInstance.post('/user/verify', data);
export const googleAuth = (formData) => axiosInstance.post('/user/google-auth', formData);
export const forgotPassword = (email) => axiosInstance.post('/user/forgot-password', { email });
export const resetPassword = (formData) => axiosInstance.post('/user/reset-password', formData);

// 👤 Profile
export const getProfile = () => axiosInstance.get('/profile');
export const updateProfile = (formData) =>
  axiosInstance.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteProfile = () => axiosInstance.delete('/profile');

// 🎓 Courses
export const getCourses = () => axiosInstance.get('/courses');  // Cleaned name from `course`
export const addCourse = (data, token) =>
  axiosInstance.post('/courses', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateCourse = (id, data, token) =>
  axiosInstance.put(`/courses/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteCourse = (id, token) =>
  axiosInstance.delete(`/courses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 📥 Admission
export const submitAdmission = (formData) =>
  axiosInstance.post('/admission', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// 📬 Contact
export const contact = (formData) => axiosInstance.post('/contact/add', formData);
