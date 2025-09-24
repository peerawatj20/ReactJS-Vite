import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';

import { selectIsLoggedIn } from '@/shared/state/auth.selectors';

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
