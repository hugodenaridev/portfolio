import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useStore();
  const { shortcuts } = useKeyboardNavigation();

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(prev => !prev);
    document.addEventListener('toggle-keyboard-help', toggleVisibility);
    return () => {
      document.removeEventListener('toggle-keyboard-help', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            className={`max-w-md w-full rounded-lg p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                className={`p-2 rounded-lg hover:bg-gray-100 ${
                  isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-500'
                }`}
                aria-label="Close keyboard shortcuts"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {shortcuts.map(({ key, description }) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2"
                >
                  <span className={
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }>
                    {description}
                  </span>
                  <kbd className={`px-2 py-1 rounded text-sm font-mono ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 border border-gray-600'
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;