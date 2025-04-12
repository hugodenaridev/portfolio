import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const ProgressiveImage = ({ src, alt, className = '', ...props }: ProgressiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(
    `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg"/>')}`
  );

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          className={`transition-all duration-500 ${className} ${
            isLoading ? 'scale-105 blur-xl' : 'scale-100 blur-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.5 }
          }}
          exit={{ opacity: 0 }}
          {...(props as React.ComponentProps<typeof motion.img>)}
        />
      </AnimatePresence>
      
      {isLoading && (
        <div className="absolute inset-0 bg-surface-200/20 dark:bg-surface-800/20 animate-pulse" />
      )}
    </div>
  );
};

export default ProgressiveImage;