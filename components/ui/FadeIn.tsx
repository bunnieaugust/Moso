
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'scale-up' | 'blur';
  fullWidth?: boolean;
  className?: string;
  viewportMargin?: string; // Allow customizing when it triggers
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  fullWidth = false,
  className = "",
  viewportMargin = "-10%",
  ...props 
}) => {
  
  // Define initial states for different animation types
  const getInitialState = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 40, x: 0, scale: 1, filter: 'blur(0px)' };
      case 'down': return { opacity: 0, y: -40, x: 0, scale: 1, filter: 'blur(0px)' };
      case 'left': return { opacity: 0, x: 40, y: 0, scale: 1, filter: 'blur(0px)' };
      case 'right': return { opacity: 0, x: -40, y: 0, scale: 1, filter: 'blur(0px)' };
      case 'scale-up': return { opacity: 0, y: 20, x: 0, scale: 0.9, filter: 'blur(0px)' };
      case 'blur': return { opacity: 0, y: 20, x: 0, scale: 1, filter: 'blur(10px)' };
      case 'none':
      default: return { opacity: 0, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1, 
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1] // Custom "luxury" cubic-bezier for smooth landing
      }}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
