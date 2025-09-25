import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';

import { selectIsLoggedIn } from '@/features/auth/state/auth.selectors';

const PublicRoute = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
