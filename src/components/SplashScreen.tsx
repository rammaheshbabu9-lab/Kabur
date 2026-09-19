import React from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#e0f5f3] via-[#faf8ef] to-[#dff3f1] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[420px] min-h-[540px] bg-[#fffef9] rounded-[32px] shadow-2xl shadow-[#07505c]/15 border border-[#dcebea] flex flex-col items-center justify-center p-8 text-center"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-[26px] bg-gradient-to-tr from-[#066f80] to-[#078da3] text-white flex items-center justify-center font-extrabold text-4xl shadow-lg shadow-[#078da3]/30 font-heading mb-4"
        >
          K
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-heading font-extrabold text-4xl tracking-wider text-[#078da3] mt-2 mb-1"
        >
          KABUR
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs font-semibold text-[#58757d] tracking-wide uppercase"
        >
          Share • Connect • Grow
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-[#078da3] animate-ping" />
          <span className="text-xs font-medium text-[#718991]">Loading community...</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
