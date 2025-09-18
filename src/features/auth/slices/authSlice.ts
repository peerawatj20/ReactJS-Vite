import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { LoginSchemaType } from "../schemas/loginSchema";
import { authService } from "@/shared/services/authService";

// กำหนด Type ของข้อมูล User และ State
interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// กำหนด State เริ่มต้น
const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginSchemaType) => {
    const response = await authService.login(
      credentials.email,
      credentials.password
    );

    return response.data; // e.g., { user, token }
  }
);

// 2. สร้าง Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducers ปกติ (Sync) สำหรับจัดการ State โดยตรง
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  // 3. extraReducers สำหรับจัดการ State ที่มาจาก Thunk (Async)
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
