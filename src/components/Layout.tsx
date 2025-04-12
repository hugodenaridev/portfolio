import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import ScrollToTop from './ScrollToTop';
import ThemeToggle from './ThemeToggle';
import KeyboardShortcuts from './KeyboardShortcuts';
import ScrollProgress from './ScrollProgress';
import Notification from './Notification';
import useKeyboardNavigation from '../hooks/useKeyboardNavigation';
import useFirstVisit from '../hooks/useFirstVisit';
import useActiveSection from '../hooks/useActiveSection';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode, isMenuOpen, toggleMenu } = useStore();
  const isFirstVisit = useFirstVisit();
  const activeSection = useActiveSection();
  const location = useLocation();
  useKeyboardNavigation();

  // Apply dark mode to the HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { 
      path: '/', 
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      path: '/about', 
      label: 'About',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    },
    { 
      path: '/projects', 
      label: 'Projects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577" />
        </svg>
      )
    },
    { 
      path: '/contact', 
      label: 'Contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      )
    }
  ];

  const isActiveSection = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && activeSection === 'home';
    }
    return location.pathname.startsWith(path) || activeSection === path.slice(1);
  };

  useEffect(() => {
    // Enable smooth scrolling for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-surface-900 text-white' : 'bg-surface-50 text-surface-900'
    }`}>
      <ScrollProgress />
      {isFirstVisit && (
        <Notification
          message="Welcome! Press 'K' to view keyboard shortcuts"
          type="success"
          isVisible={true}
          onClose={() => {}}
        />
      )}
      
      <header className="sticky top-0 z-50">
        <nav className={`backdrop-blur-md border-b transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-surface-900/80 border-surface-800' 
            : 'bg-surface-50/80 border-surface-200/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <ul className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isDarkMode 
                            ? 'hover:bg-surface-800 text-white' 
                            : 'hover:bg-surface-200/50 text-surface-900'
                        } ${isActiveSection(item.path) ? 'font-medium' : ''}`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {isActiveSection(item.path) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                              isDarkMode ? 'bg-primary-400' : 'bg-primary-600'
                            }`}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <motion.button
                  onClick={toggleMenu}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-surface-800 text-white' 
                      : 'hover:bg-surface-200/50 text-surface-900'
                  }`}
                  aria-label="Toggle menu"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <motion.div
                      animate={{
                        rotate: isMenuOpen ? 45 : 0,
                        y: isMenuOpen ? 8 : 0
                      }}
                      className={`w-6 h-0.5 transform origin-center transition-colors ${
                        isDarkMode ? 'bg-white' : 'bg-surface-900'
                      }`}
                    />
                    <motion.div
                      animate={{
                        opacity: isMenuOpen ? 0 : 1
                      }}
                      className={`w-6 h-0.5 transition-colors ${
                        isDarkMode ? 'bg-white' : 'bg-surface-900'
                      }`}
                    />
                    <motion.div
                      animate={{
                        rotate: isMenuOpen ? -45 : 0,
                        y: isMenuOpen ? -8 : 0
                      }}
                      className={`w-6 h-0.5 transform origin-center transition-colors ${
                        isDarkMode ? 'bg-white' : 'bg-surface-900'
                      }`}
                    />
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden border-t border-surface-200/50 dark:border-surface-800"
                >
                  <ul className="py-2 space-y-1">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <Link
                          to={item.path}
                          onClick={toggleMenu}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-surface-800 text-white' 
                              : 'hover:bg-surface-200/50 text-surface-900'
                          } ${isActiveSection(item.path) ? 'font-medium' : ''}`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="px-4 py-2">
                        <ThemeToggle />
                      </div>
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className={`border-t py-8 transition-colors ${
        isDarkMode 
          ? 'bg-surface-900 border-surface-800' 
          : 'bg-surface-50 border-surface-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-center ${
            isDarkMode ? 'text-surface-400' : 'text-surface-500'
          }`}>
            © {new Date().getFullYear()} Portfolio. Built with React & Vite.
          </p>
          <p className={`text-center mt-2 text-sm ${
            isDarkMode ? 'text-surface-500' : 'text-surface-400'
          }`}>
            Press <kbd className={`px-1.5 py-0.5 rounded text-xs font-mono ${
              isDarkMode
                ? 'bg-surface-800 border border-surface-700'
                : 'bg-surface-200/50 border border-surface-300'
            }`}>K</kbd> to view keyboard shortcuts
          </p>
        </div>
      </footer>

      <ScrollToTop />
      <KeyboardShortcuts />
    </div>
  );
};

export default Layout;