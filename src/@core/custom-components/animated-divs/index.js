import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedEntry = ({ children, animation = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } } }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger the animation once
    threshold: 0.5, // Adjust the threshold as needed
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }else{
      // controls.start('hidden')
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      transition={{delay: 0.1, easings: 0.1}}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedEntry;
