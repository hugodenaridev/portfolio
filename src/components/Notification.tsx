import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const Notification = ({ message, type, isVisible, onClose }: NotificationProps) => {
  const { isDarkMode } = useStore();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 ${
            type === 'success'
              ? isDarkMode 
                ? 'bg-green-800 text-green-100' 
                : 'bg-green-100 text-green-800'
              : isDarkMode
                ? 'bg-red-800 text-red-100'
                : 'bg-red-100 text-red-800'
          }`}>
            <span>{message}</span>
            <button
              onClick={onClose}
              className="ml-4 text-sm hover:opacity-75"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;