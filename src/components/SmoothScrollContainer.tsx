'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SmoothScrollContainerProps {
  children: ReactNode;
}

const SmoothScrollContainer = ({ children }: SmoothScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Spring animation for smoother scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 40,
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-gold to-primary-dark-gold origin-left z-50"
        style={{
          scaleX: smoothProgress
        }}
      />
      
      {/* Floating scroll indicator */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-1 h-20 bg-border rounded-full relative overflow-hidden"
          >
            <motion.div
              className="absolute left-0 w-full bg-gradient-to-t from-primary-gold to-primary-dark-gold rounded-full"
              style={{
                height: useTransform(smoothProgress, [0, 1], ['0%', '100%'])
              }}
            />
          </motion.div>
          <div className="text-xs text-gray-500 font-medium">SCROLL</div>
        </div>
      </motion.div>

      {children}
    </div>
  );
};

export default SmoothScrollContainer;
