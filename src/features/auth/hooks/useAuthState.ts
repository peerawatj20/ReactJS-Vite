import { useAppSelector } from '@/app/hooks';

import { selectCurrentUser } from '../state/auth.selectors';

export const useAuthState = () => {
  const user = useAppSelector(selectCurrentUser);

  return { user };
};
