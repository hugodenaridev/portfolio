import { motion } from 'framer-motion';
import useStore from '../store/useStore';

interface BackgroundProps {
  variant?: 'hero' | 'subtle';
  className?: string;
}

const Background = ({ variant = 'subtle', className = '' }: BackgroundProps) => {
  const { isDarkMode } = useStore();

  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className={`absolute inset-0 ${
            isDarkMode
              ? 'bg-gradient-to-br from-surface-900 via-surface-900 to-primary-950/50'
              : 'bg-gradient-to-br from-surface-50 via-surface-50 to-primary-100/50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Animated gradient circles */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0) 70%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0) 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0) 70%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(14,165,233,0) 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Grid pattern */}
        <div 
          className={`absolute inset-0 bg-grid opacity-[0.075] ${className}`}
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <motion.div
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-b from-surface-900 to-surface-900/95'
            : 'bg-gradient-to-b from-surface-50 to-surface-50/95'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <div 
        className={`absolute inset-0 bg-grid opacity-[0.035]`}
      />
    </div>
  );
};

export default Background;