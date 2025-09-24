import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/app/hooks';

import { selectIsLoggedIn } from '@/shared/state/auth.selectors';

import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign In</h1>
          <p className="mt-2 text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
