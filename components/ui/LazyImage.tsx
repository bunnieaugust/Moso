import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface LazyImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  containerClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "", containerClassName = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-200 dark:bg-stone-800 ${containerClassName}`}>
      {/* Skeleton / Blur Placeholder */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ 
          opacity: isLoaded ? 0 : 1 
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full bg-stone-200 dark:bg-white/5 animate-pulse" />
      </motion.div>

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`block w-full h-full object-cover transition-transform duration-700 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default LazyImage;