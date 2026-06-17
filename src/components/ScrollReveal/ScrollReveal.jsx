import { motion, useReducedMotion } from 'framer-motion';
import './ScrollReveal.css';

export default function ScrollReveal({ children, delay = 0, duration = 0.6, y = 30, x = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="reveal-wrapper"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : y, x: shouldReduceMotion ? 0 : x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0 : duration, delay: shouldReduceMotion ? 0 : delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
}
