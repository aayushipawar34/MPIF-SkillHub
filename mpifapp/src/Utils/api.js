import axiosInstance from './axios';

export const signup = (formData) => axiosInstance.post('user/sign-up', formData);
export const signIn = (formData) => axiosInstance.post('user/sign-in', formData);
export const verifyOtp = (data) => axiosInstance.post('user/verify', data);
// export const googleAuth = (formData) => axiosInstance.post('user/google-auth', formData);
export const googleAuth = ({ token }) =>
  axiosInstance.post("user/google-auth", { token });
export const forgotPassword = (email) => axiosInstance.post('user/forgot-password', { email });
export const resetPassword = (formData) => axiosInstance.post('user/reset-password', formData);
export const getProfile = () => axiosInstance.get('/profile');
export const updateProfile = (formData) =>
  axiosInstance.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteProfile = () => axiosInstance.delete('/profile');
export const course = () => axiosInstance.get('/courses');
export const addmision = (formData) =>
  axiosInstance.post('/admission', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const contact = (formData) => axiosInstance.post('/contact/add', formData);
