import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from './store';

// สร้าง hook `useAppDispatch` ที่มี Type ของ AppDispatch ติดไปด้วย
// ทำให้ dispatch ของคุณรู้จัก thunk actions โดยอัตโนมัติ
export const useAppDispatch: () => AppDispatch = useDispatch;

// สร้าง hook `useAppSelector` ที่มี Type ของ RootState ติดไปด้วย
// ทำให้ state ที่ได้จากการ select มี autocompletion ที่ถูกต้อง
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
