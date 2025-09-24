import { useAppSelector } from '@/app/hooks';

import { selectCurrentUser } from '@/shared/state/auth.selectors';

const HomePage = () => {
  // ดึงข้อมูล user ที่ login อยู่จาก Redux store
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold">Main Page</h1>
      <p className="mb-2">This is the main content area.</p>

      {user && (
        <div>
          <h2 className="mt-6 text-xl font-semibold">Your Information</h2>
          <ul className="list-inside list-disc">
            <li>Email: {user.email}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
