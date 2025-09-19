import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { NotificationType } from '../types/notification';

interface ShowNotificationPayload {
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationState {
  isOpen: boolean;
  message: string;
  type: NotificationType;
}

const initialState: NotificationState = {
  isOpen: false,
  message: '',
  type: 'info',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<ShowNotificationPayload>,
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
