import axios from 'axios';

/**
 * แปลง error ที่ไม่ทราบประเภทให้เป็นข้อความที่สามารถแสดงผลได้
 * @param error - error ที่ได้รับจาก catch block (ประเภท unknown)
 * @returns - ข้อความ error (string) ที่พร้อมใช้งาน
 */
export function getErrorMessage(error: unknown): string {
  // 1. ตรวจสอบว่าเป็น AxiosError (Error จาก API) หรือไม่
  if (axios.isAxiosError(error)) {
    // พยายามดึง message จาก response data ของ API ก่อน
    // รูปแบบ response อาจเป็น { message: '...' } หรือ { error: '...' }
    // คุณสามารถปรับแก้ส่วนนี้ให้ตรงกับ API ของคุณได้
    if (
      error.response?.data &&
      typeof error.response.data.message === 'string'
    ) {
      return error.response.data.message;
    }
    // ถ้าไม่มี message ใน data ก็ใช้ message หลักของ error แทน
    return error.message;
  }

  // 2. ตรวจสอบว่าเป็น Error instance ทั่วไปหรือไม่
  if (error instanceof Error) {
    return error.message;
  }

  // 3. กรณีที่ throw มาเป็น string ตรงๆ
  if (typeof error === 'string') {
    return error;
  }

  // 4. กรณีอื่นๆ ที่ไม่คาดคิด
  return 'เกิดข้อผิดพลาดที่ไม่คาดคิด';
}
