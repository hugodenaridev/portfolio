import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const KeyboardShortcuts = () => {
  const { isDarkMode } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const shortcuts = useMemo(() => [
    { key: 'g h', label: 'Go to Home', action: () => navigate('/') },
    { key: 'g a', label: 'Go to About', action: () => navigate('/about') },
    { key: 'g p', label: 'Go to Projects', action: () => navigate('/projects') },
    { key: 'g c', label: 'Go to Contact', action: () => navigate('/contact') },
    { key: 't', label: 'Toggle theme', action: () => useStore.getState().toggleTheme() },
    { key: 'ESC', label: 'Close this dialog', action: () => setIsOpen(false) },
  ], [navigate]);

  useEffect(() => {
    let keys: string[] = [];
    const keyTimeout = 1000; // Reset combination after 1 second
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      clearTimeout(timer);
      const key = e.key.toLowerCase();
      
      // Toggle shortcuts dialog with 'k'
      if (key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      // Handle ESC to close dialog
      if (key === 'escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Handle other shortcuts
      keys.push(key);
      
      // Check for navigation shortcuts (g + letter)
      if (keys.length === 2 && keys[0] === 'g') {
        const combination = keys.join(' ');
        const shortcut = shortcuts.find(s => s.key === combination);
        if (shortcut) {
          e.preventDefault();
          shortcut.action();
        }
        keys = [];
      }

      // Reset keys after delay
      timer = setTimeout(() => {
        keys = [];
      }, keyTimeout);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [navigate, isOpen, shortcuts]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-label="Keyboard shortcuts"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg
              overflow-hidden rounded-xl shadow-2xl border
              ${isDarkMode 
                ? 'bg-surface-800/95 border-surface-700' 
                : 'bg-white/95 border-surface-200'
              } backdrop-blur-xl`}
          >
            <div className="p-4 border-b border-surface-200/20">
              <h2 className="text-lg font-medium">Keyboard Shortcuts</h2>
            </div>

            <div className="p-2">
              {shortcuts.map((shortcut) => (
                <motion.button
                  key={shortcut.key}
                  onClick={() => {
                    shortcut.action();
                    if (shortcut.key !== 't') setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg
                    text-left transition-colors
                    ${isDarkMode
                      ? 'hover:bg-surface-700/50'
                      : 'hover:bg-surface-100/50'
                    }`}
                  whileHover={{ x: 4 }}
                >
                  <span>{shortcut.label}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.key.split(' ').map((k, i) => (
                      <kbd
                        key={i}
                        className={`px-2 py-1 rounded text-sm font-mono
                          ${isDarkMode
                            ? 'bg-surface-700 text-surface-200'
                            : 'bg-surface-100 text-surface-900'
                          }`}
                      >
                        {k.toUpperCase()}
                      </kbd>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className={`p-4 text-sm text-center
              ${isDarkMode ? 'text-surface-400' : 'text-surface-500'}`}
            >
              Press ESC to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;