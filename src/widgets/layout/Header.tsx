import { useAppSelector } from '@/app/hooks';

import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { selectCurrentUser } from '@/features/auth/state/auth.selectors';

const Header = () => {
  const user = useAppSelector(selectCurrentUser);
  const { handleLogout } = useAuthActions();

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
