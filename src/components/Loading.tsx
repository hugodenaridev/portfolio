import { motion } from 'framer-motion';
import useStore from '../store/useStore';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  const { isDarkMode } = useStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-t-transparent"
        style={{
          borderColor: isDarkMode ? '#ffffff40' : '#00000040',
          borderTopColor: 'transparent'
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <p className={`mt-4 text-sm ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {message}
      </p>
    </div>
  );
};

export default Loading;