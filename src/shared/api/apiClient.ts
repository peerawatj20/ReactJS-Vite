import { useDispatch } from 'react-redux';

import axios, { AxiosError } from 'axios';

import { showNotification } from '../state/notification.slice';

const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // 2. ถ้า Response เป็น Error ให้เข้ามาจัดการในนี้
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMessage = error.message || 'An error occurred';
      const dispatch = useDispatch();

      switch (status) {
        case 401: // Unauthorized
          window.location.href = '/login';
          break;

        case 403: // Forbidden
          dispatch(
            showNotification({
              message: 'คุณไม่มีสิทธิ์เข้าถึง',
              type: 'error',
            }),
          );
          break;

        case 404: // Not Found
          dispatch(
            showNotification({
              message: 'คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้',
              type: 'error',
            }),
          );
          break;

        case 500: // Internal Server Error
          // - แสดง Notification ว่า "เกิดข้อผิดพลาดที่ Server"
          dispatch(
            showNotification({
              message: 'เกิดข้อผิดพลาดที่ Server กรุณาลองใหม่อีกครั้ง',
              type: 'error',
            }),
          );
          break;

        default:
          // - จัดการ Error อื่นๆ
          console.error(
            `API Error - Status: ${status}, Message: ${errorMessage}`,
          );
          break;
      }
    } else {
      // จัดการ Error ที่ไม่ได้มาจาก Axios
      console.error('An unexpected error occurred:', error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
