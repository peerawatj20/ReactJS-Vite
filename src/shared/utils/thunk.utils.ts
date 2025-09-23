import type { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { hideLoading, showLoading } from '@/shared/state/loading.slice';

import { pushNotification } from '../state/notification.slice';
import { getErrorMessage } from './error.utils';

export const withAppHandler = <Returned, ThunkArg = void>(
  title: string,
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
          title: `${title} Failed`,
          message: errorMessage,
          type: 'error',
        }),
      );
      return rejectWithValue(errorMessage) as Returned;
    }
  };
};
