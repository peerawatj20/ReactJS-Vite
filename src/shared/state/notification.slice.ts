import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { NotificationType } from '../types/notification';

// Payload ที่รับเข้ามาตอนสร้าง Notification
export interface NotificationPayload {
  message: string;
  type: NotificationType;
  duration?: number;
}

// State ที่เก็บใน Store จะมี id ที่สร้างขึ้นมาด้วย
export interface Notification extends NotificationPayload {
  id: string;
}
interface NotificationState {
  // เปลี่ยนจาก queue เป็น notifications array
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

// 1. สร้าง Thunk สำหรับ "แสดงแล้วซ่อน"
export const pushNotification = createAsyncThunk(
  'notification/pushNotification',
  async (payload: NotificationPayload, { dispatch }) => {
    // สร้าง ID ขึ้นมาเพื่อใช้อ้างอิง
    const id = nanoid();
    // เพิ่ม notification เข้าไปใน state
    dispatch(addNotification({ id, ...payload }));
    // รอตามเวลาที่กำหนด
    await new Promise((resolve) =>
      setTimeout(resolve, payload.duration || 4000),
    );
    // สั่งลบ notification ตัวเดิมออกโดยใช้ id
    dispatch(removeNotification({ id }));
  },
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // Reducer สำหรับเพิ่ม notification ใหม่
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    // Reducer สำหรับลบ notification ตาม id
    removeNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload.id,
      );
    },
  },
});

const { addNotification } = notificationSlice.actions;
export const { removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
