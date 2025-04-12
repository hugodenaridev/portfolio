import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import useStore from '../store/useStore';

interface CardProps extends MotionProps {
  children: ReactNode;
  variant?: 'solid' | 'glass' | 'outline';
  className?: string;
  as?: 'div' | 'article' | 'section';
  href?: string;
}

const Card = ({ 
  children, 
  variant = 'solid', 
  className = '',
  as = 'div',
  href,
  ...motionProps 
}: CardProps) => {
  const { isDarkMode } = useStore();
  const Component = motion[as];

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return isDarkMode
          ? 'bg-surface-800/50 backdrop-blur-xl border border-surface-700/50'
          : 'bg-white/50 backdrop-blur-xl border border-surface-200/50';
      case 'outline':
        return isDarkMode
          ? 'border border-surface-700 bg-transparent'
          : 'border border-surface-200 bg-transparent';
      default:
        return isDarkMode
          ? 'bg-surface-800 border border-surface-700'
          : 'bg-white border border-surface-200';
    }
  };

  const baseStyles = 'rounded-xl overflow-hidden shadow-lg transition-all duration-300';
  const hoverStyles = 'hover:shadow-xl hover:scale-[1.02] hover:border-primary-500/30';
  const allStyles = `${baseStyles} ${getVariantStyles()} ${hoverStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={allStyles}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4 }}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <Component 
      className={allStyles}
      whileHover={{ y: -4 }}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Card;