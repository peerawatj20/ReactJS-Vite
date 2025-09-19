import type { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { hideLoading, showLoading } from '@/shared/state/loading.slice';

export const withLoadingHandler = <Returned, ThunkArg = void>(
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>,
): AsyncThunkPayloadCreator<Returned, ThunkArg> => {
  return async (arg, thunkAPI): Promise<Returned> => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(showLoading());

      return (await payloadCreator(arg, thunkAPI)) as Promise<Returned>;
    } finally {
      dispatch(hideLoading());
    }
  };
};
