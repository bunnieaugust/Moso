
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHeaderHover, setIsHeaderHover] = useState(false); // New state to track header
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position state for the main dot (instant)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for the trailing ring (smooth delay)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has a mouse (not touch)
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    if (!isPointer) return;

    setIsVisible(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if inside Header
      const headerElement = target.closest('header');
      if (headerElement) {
        setIsHeaderHover(true);
      } else {
        setIsHeaderHover(false);
      }

      // Check if hovering over clickable elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('group') // Often used for cards
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // Calculate cursor size based on state
  // Normal Hover: Reduced from 64px to 40px
  // Header Hover: Reduced from 20px to 12px
  // Default: Reduced from 32px to 24px
  const cursorSize = isHeaderHover ? 12 : (isHovered ? 40 : 24);

  return (
    <>
      {/* 1. Main Pointer (The Dot) - Stays fixed to mouse */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 2. The Aura (The Ring) - Follows with physics */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          // If in header, become solid/subtle outline. If normal hover, become Aura.
          backgroundColor: isHeaderHover 
              ? 'rgba(212, 138, 39, 0.2)' // Header: subtle fill
              : (isHovered ? 'rgba(212, 138, 39, 0.05)' : 'transparent'), // Body Hover: even lighter aura
          
          borderWidth: isHeaderHover ? '1px' : '1px',
          borderColor: isHeaderHover 
              ? 'rgba(212, 138, 39, 0.8)' // Header: Solid gold border
              : (isHovered ? 'rgba(212, 138, 39, 0.5)' : 'rgba(212, 138, 39, 0.2)'), // Thinner default border
          
          backdropFilter: isHeaderHover ? 'blur(0px)' : (isHovered ? 'blur(1px)' : 'blur(0px)'),
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.3
        }}
      >
        {/* Inner subtle glow - Hide in header for clarity */}
        {!isHeaderHover && (
           <div className="w-full h-full rounded-full bg-gold-400/5 animate-pulse" />
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
