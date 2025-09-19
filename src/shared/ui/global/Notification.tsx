import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AnimatePresence, motion } from 'framer-motion';

import { removeNotification } from '@/shared/state/notification.slice';

// Map สำหรับจับคู่ type กับสีของ Tailwind
const typeColors = {
  success: 'bg-green-500 border-green-700',
  error: 'bg-red-500 border-red-700',
  warning: 'bg-yellow-500 border-yellow-700',
  info: 'bg-blue-500 border-blue-700',
};
const NotificationList = () => {
  const dispatch = useAppDispatch();
  // 1. ดึง notifications ทั้งหมดใน array มาใช้งาน
  const notifications = useAppSelector(
    (state) => state.notification.notifications,
  );

  return (
    // 2. สร้าง Container สำหรับวาง Notification ทั้งหมด
    <div className="fixed top-5 right-5 z-50 flex w-80 flex-col items-end gap-3">
      <AnimatePresence>
        {/* 3. วนลูปเพื่อ render Notification ทุกตัว */}
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            layout // 👈 ทำให้ตัวที่เหลือเลื่อนขึ้นมาอย่างนุ่มนวล
            className={`flex w-full items-center justify-between gap-4 rounded-md border-l-4 p-4 text-white shadow-lg ${typeColors[notification.type]}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <span>{notification.message}</span>
            <button
              onClick={() =>
                dispatch(removeNotification({ id: notification.id }))
              } // 👈 ส่ง id ไปให้ action
              className="text-xl font-bold opacity-80 hover:opacity-100"
              aria-label="Close notification"
            >
              &times;
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList;
