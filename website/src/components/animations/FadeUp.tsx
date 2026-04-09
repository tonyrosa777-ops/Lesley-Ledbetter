"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  className,
}: FadeUpProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
