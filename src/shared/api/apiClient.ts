import i18n from '@/app/i18n';
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor ฝั่ง Request: มีหน้าที่ "เตรียม" คำขอก่อนส่ง
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // จัดการ Error ที่เกิด "ก่อน" การส่ง Request เช่น Network Error
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// ✅ Interceptor ฝั่ง Response: มีหน้าที่ "จัดการ" ผลลัพธ์ที่ได้รับกลับมา
apiClient.interceptors.response.use(
  (response) => {
    // ทางสำเร็จ: ถ้า server ตอบกลับด้วย status 2xx ให้ส่งข้อมูลกลับไปตามปกติ
    return response;
  },
  (error: AxiosError) => {
    // 👈 2. ย้าย Logic ทั้งหมดมาไว้ในส่วนจัดการ Error ของ Response
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMessage = error.message || 'An error occurred';

      switch (status) {
        case 401: // Unauthorized
          // ควรมีการเคลียร์ข้อมูล user/token ก่อน redirect
          // localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;

        case 403: // Forbidden
          error.message = i18n.t('common:error.api.forbidden');
          break;

        case 404: // Not Found
          error.message = i18n.t('common:error.api.not_found');
          break;

        case 500: // Internal Server Error
          error.message = i18n.t('common:error.api.server_error');
          break;

        default:
          console.error(
            `API Error - Status: ${status}, Message: ${errorMessage}`,
          );
          error.message = i18n.t('common:error.api.unknown');
          break;
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
