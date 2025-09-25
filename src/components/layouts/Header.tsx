import { useAuthAction } from '@/features/auth/hooks/useAuthAction';
import { useAuthState } from '@/features/auth/hooks/useAuthState';

const Header = () => {
  const { user } = useAuthState();

  const { handleLogout } = useAuthAction();

  return (
    <header className="flex h-16 items-center justify-between bg-white px-8 shadow-md">
      <div>
        <h1 className="text-lg font-semibold">Welcome Back!</h1>
      </div>
      <div className="flex items-center gap-4">
        <span>Hello, {user?.email || 'Guest'}</span>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default Header;
