import { motion } from 'framer-motion';
import useStore from '../store/useStore';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loading = ({ size = 'md', className = '' }: LoadingProps) => {
  const { isDarkMode } = useStore();
  
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3'
  };

  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    initial: { opacity: 0.4 },
    animate: {
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        variants={containerVariants}
        animate="animate"
        className={`${sizes[size]} rounded-full 
          border-current border-r-transparent
          ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}
      >
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className="w-full h-full rounded-full border-2 border-current border-l-transparent"
        />
      </motion.div>
    </div>
  );
};

export default Loading;