import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '@/app/store';

import { hideNotification } from '@/shared/state/notification.slice';

// สร้าง Map สำหรับจับคู่ type กับสีของ Tailwind
const typeColors = {
  success: 'bg-green-500 border-green-700',
  error: 'bg-red-500 border-red-700',
  warning: 'bg-yellow-500 border-yellow-700',
  info: 'bg-blue-500 border-blue-700',
};

const Notification = () => {
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector(
    (state: RootState) => state.notification,
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center justify-between gap-4 rounded-md border-l-4 p-4 text-white shadow-lg 
      ${typeColors[type]} 
      animate-fade-in-right`}
    >
      <span>{message}</span>
      <button
        onClick={() => dispatch(hideNotification())}
        className="text-xl font-bold opacity-80 hover:opacity-100"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
