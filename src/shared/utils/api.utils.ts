import { store } from '@/app/store';

import { pushNotification } from '../state/notification.slice';
import { getErrorMessage } from './error.utils';

interface ExecuteApiRequestOptions<T> {
  action: () => Promise<T>;
  onSuccess?: (result: T) => void;
  onError?: (error: any) => void;
}

export const executeApiRequest = async <T>({
  action,
  onSuccess,
  onError,
}: ExecuteApiRequestOptions<T>) => {
  try {
    const result = await action();
    if (onSuccess) {
      onSuccess(result);
    }
    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    store.dispatch(
      pushNotification({
        title: 'Action Failed',
        message: errorMessage,
        type: 'error',
      }),
    );
    if (onError) {
      onError(error);
    }
    throw error;
  }
};
