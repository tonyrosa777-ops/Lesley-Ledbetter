"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  className,
}: ScaleInProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
