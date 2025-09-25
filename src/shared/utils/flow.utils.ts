import i18n from '@/app/i18n';
import type { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { hideLoading, showLoading } from '@/shared/state/loading.slice';

import { pushNotification } from '../state/notification.slice';
import { getErrorMessage } from './error.utils';

export const withAppFlowHandler = <Returned, ThunkArg = void>(
  flowName: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>,
): AsyncThunkPayloadCreator<Returned, ThunkArg> => {
  return async (arg, thunkAPI): Promise<Returned> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(showLoading());
      const result = (await payloadCreator(arg, thunkAPI)) as Promise<Returned>;
      dispatch(hideLoading());
      return result;
    } catch (error) {
      dispatch(hideLoading());
      const errorMessage = getErrorMessage(error);
      dispatch(
        pushNotification({
          title: i18n.t(`error.action_failed`, { name: i18n.t(flowName) }),
          message: errorMessage,
          type: 'error',
        }),
      );
      return rejectWithValue(errorMessage) as Returned;
    }
  };
};

/**
 * สร้าง i18n key สำหรับ flow name และ return key นั้นออกมา
 * @param feature - ชื่อของ feature (e.g., 'auth')
 * @param page - ชื่อของหน้า (e.g., 'login')
 * @param flowKey - ชื่อของ flow (e.g., 'loginFlow')
 * @returns {string} i18n key ที่สมบูรณ์
 */
export const getFlowName = (
  feature: string,
  component: string,
  flowKey: string,
): string => {
  const i18nKey = `translation:features.${feature}.${component}.flowName.${flowKey}`;

  return i18n.t(i18nKey, {
    postProcess: 'returnKey',
  });
};
