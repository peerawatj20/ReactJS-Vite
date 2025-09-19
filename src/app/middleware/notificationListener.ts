import { createListenerMiddleware } from '@reduxjs/toolkit';

import {
  hideNotification,
  showNotification,
} from '@/shared/state/notification.slice';

// 1. สร้าง instance ของ listener middleware
export const notificationListenerMiddleware = createListenerMiddleware();

// 2. เริ่ม "ดักฟัง" action ที่เราสนใจ
notificationListenerMiddleware.startListening({
  // 3. ระบุ action ที่จะให้เริ่มทำงาน (ในที่นี้คือ showNotification)
  actionCreator: showNotification,

  // 4. กำหนด "effect" ที่จะให้เกิดขึ้นหลังจาก action นั้นถูก dispatch
  effect: async (action, listenerApi) => {
    // ดึงค่า duration จาก payload, ถ้าไม่มีให้ใช้ 3000ms
    const { duration = 3000 } = action.payload;

    // 5. ใช้ listenerApi.delay ซึ่งเป็น setTimeout เวอร์ชันที่ test ง่ายกว่า
    await listenerApi.delay(duration);

    // 6. dispatch action hideNotification หลังจากรอเสร็จ
    listenerApi.dispatch(hideNotification());
  },
});
