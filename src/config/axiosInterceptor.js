import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// instance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');
//       // Gửi request để refresh token
//       const newTokens = await axios.post('/refreshToken', { refreshToken });
//       if (newTokens) {
//         localStorage.setItem('accessToken', newTokens.data.accessToken);
//         localStorage.setItem('refreshToken', newTokens.data.refreshToken);
//         // Thử lại request ban đầu với token mới
//         return instance(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
