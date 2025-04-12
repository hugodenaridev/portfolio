import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProgressiveImage = ({ src, alt, className = '' }: ProgressiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
  }, [src]);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.1 : 1,
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default ProgressiveImage;