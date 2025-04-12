import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import Card from './Card';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const Notification = ({ message, type, isVisible, onClose }: NotificationProps) => {
  const { isDarkMode } = useStore();

  const getTypeStyles = () => {
    if (type === 'success') {
      return isDarkMode
        ? 'border-l-4 border-l-green-400 bg-green-500/10'
        : 'border-l-4 border-l-green-500 bg-green-50';
    }
    return isDarkMode
      ? 'border-l-4 border-l-red-400 bg-red-500/10'
      : 'border-l-4 border-l-red-500 bg-red-50';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
          className="fixed top-4 right-4 z-50 max-w-md w-full"
        >
          <Card
            variant="glass"
            className={`p-4 shadow-lg backdrop-blur-xl ${getTypeStyles()}`}
          >
            <div className="flex items-start gap-3">
              {type === 'success' ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`w-5 h-5 mt-0.5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-500'
                  }`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`w-5 h-5 mt-0.5 ${
                    isDarkMode ? 'text-red-400' : 'text-red-500'
                  }`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}

              <div className="flex-1">
                <p className={
                  type === 'success'
                    ? isDarkMode ? 'text-green-300' : 'text-green-800'
                    : isDarkMode ? 'text-red-300' : 'text-red-800'
                }>
                  {message}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`p-1 rounded-full transition-colors ${
                  type === 'success'
                    ? isDarkMode 
                      ? 'text-green-400 hover:bg-green-400/20' 
                      : 'text-green-600 hover:bg-green-100'
                    : isDarkMode
                      ? 'text-red-400 hover:bg-red-400/20'
                      : 'text-red-600 hover:bg-red-100'
                }`}
                aria-label="Close notification"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </motion.button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;