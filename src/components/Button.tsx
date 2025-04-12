import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';
import useStore from '../store/useStore';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  to?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  to, 
  href,
  isLoading,
  disabled,
  ...props 
}: ButtonProps) => {
  const { isDarkMode } = useStore();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const baseStyles = `relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ${sizeClasses[size]}`;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return isDarkMode
          ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white hover:from-primary-500 hover:to-primary-600 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 active:shadow-primary-500/10'
          : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 active:shadow-primary-600/10';
      case 'secondary':
        return isDarkMode
          ? 'bg-surface-800 text-white hover:bg-surface-700 shadow-lg shadow-surface-900/10'
          : 'bg-surface-100 text-surface-900 hover:bg-surface-200 shadow-lg shadow-surface-900/5';
      case 'outline':
        return isDarkMode
          ? 'border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm'
          : 'border-2 border-surface-900 text-surface-900 hover:bg-surface-900/10 backdrop-blur-sm';
      case 'ghost':
        return isDarkMode
          ? 'text-white hover:bg-white/10'
          : 'text-surface-900 hover:bg-surface-900/10';
      default:
        return '';
    }
  };

  const loadingSpinner = (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  const allStyles = `${baseStyles} ${getVariantStyles()} ${
    isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''
  } ${className}`;

  const content = (
    <>
      <span className={isLoading ? 'invisible' : 'visible'}>{children}</span>
      {isLoading && loadingSpinner}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={allStyles}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a 
        href={href} 
        className={allStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      className={allStyles}
      disabled={isLoading || disabled}
      whileTap={{ scale: 0.98 }}
      {...(props as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
};

export default Button;