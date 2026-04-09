"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  className,
}: SlideInProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  const x = direction === "left" ? -40 : 40;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
