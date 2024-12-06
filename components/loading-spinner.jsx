'use client';

import React from 'react';
import { CircleNotch } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

// function LoadingSpinner() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center"
//     >
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//       >
//         <CircleNotch weight="bold" className="w-12 h-12 text-red-500" />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default LoadingSpinner;

function LoadingSpinner() {
  return (
    <div className="flex gap-4 justify-start">
      <motion.div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-700 to-red-500 flex items-center justify-center">
        <CircleNotch className="w-5 h-5 text-white animate-spin" />
      </motion.div>
      <div className="p-4 rounded-2xl bg-zinc-800/80 text-white border border-red-900/20">
        <div className="flex gap-2">
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse delay-100" />
          <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
