import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import useStore from '../store/useStore';

const ScrollProgress = () => {
  const { isDarkMode } = useStore();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
        style={{
          scaleX,
          background: isDarkMode 
            ? 'linear-gradient(to right, #4f46e5, #818cf8)' 
            : 'linear-gradient(to right, #3b82f6, #60a5fa)'
        }}
      />
      <div 
        className={`fixed bottom-4 right-4 px-3 py-1 rounded-full text-sm ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-300 border border-gray-700' 
            : 'bg-white text-gray-600 shadow-md'
        }`}
      >
        {Math.round(scrollYProgress.get() * 100)}%
      </div>
    </>
  );
};

export default ScrollProgress;