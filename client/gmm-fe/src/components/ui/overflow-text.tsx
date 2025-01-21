'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const OverflowText = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setIsOverflowing(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children]);

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <motion.div
        ref={containerRef}
        style={{
          whiteSpace: 'nowrap',
          display: 'inline-block',
          paddingRight: '50px',
        }}
        animate={{
          x: isOverflowing ? ['0%', '-100%'] : '0%',
        }}
        transition={{
          duration: 5,
          repeat: isOverflowing ? Infinity : 0,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default OverflowText;
