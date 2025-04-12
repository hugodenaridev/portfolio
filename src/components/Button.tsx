import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  href?: string;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  to, 
  href,
  ...props 
}: ButtonProps) => {
  const { isDarkMode } = useStore();

  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-colors';
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return isDarkMode
          ? 'bg-white text-gray-900 hover:bg-gray-100'
          : 'bg-gray-900 text-white hover:bg-gray-800';
      case 'secondary':
        return isDarkMode
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200';
      case 'outline':
        return isDarkMode
          ? 'border border-white text-white hover:bg-white hover:text-gray-900'
          : 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white';
      default:
        return '';
    }
  };

  const allStyles = `${baseStyles} ${getVariantStyles()} ${className}`;

  if (to) {
    return (
      <Link to={to} className={allStyles}>
        {children}
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
        {children}
      </a>
    );
  }

  return (
    <button className={allStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;