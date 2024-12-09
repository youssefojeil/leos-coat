'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChatCenteredText } from '@phosphor-icons/react';
import { quickSuggestions } from '@/constants/suggestions';

export function QuickSuggestions({ onSelectSuggestion }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // return (
  //   <motion.div
  //     initial="hidden"
  //     animate="visible"
  //     variants={containerVariants}
  //     className="mb-6"
  //   >
  //     <motion.div
  //       variants={itemVariants}
  //       className="flex items-center gap-2 mb-3"
  //     >
  //       <ChatCenteredText weight="duotone" className="w-4 h-4 text-red-500" />
  //       <span className="text-sm text-zinc-400">Quick Questions</span>
  //     </motion.div>
  //     <motion.div className="flex flex-wrap gap-2">
  //       {quickSuggestions.map((suggestion) => (
  //         <motion.button
  //           key={suggestion.id}
  //           variants={itemVariants}
  //           whileHover={{ scale: 1.02 }}
  //           whileTap={{ scale: 0.98 }}
  //           onClick={() => onSelectSuggestion(suggestion.text)}
  //           className="px-4 py-2 text-sm bg-zinc-800/50 hover:bg-zinc-800/80 text-zinc-300 rounded-xl border border-red-900/20 transition-colors"
  //         >
  //           {suggestion.text}
  //         </motion.button>
  //       ))}
  //     </motion.div>
  //   </motion.div>
  // );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 mb-3"
      >
        <ChatCenteredText weight="duotone" className="w-4 h-4 text-red-500" />
        <span className="text-sm text-zinc-400">Quick Questions</span>
      </motion.div>
      <motion.div className="flex flex-wrap gap-2">
        {quickSuggestions.map((suggestion) => (
          <motion.button
            key={suggestion.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectSuggestion(suggestion.text)}
            className="px-4 py-2 text-sm bg-zinc-100/50 hover:bg-zinc-200 text-zinc-800 rounded-xl border border-red-100 transition-colors"
          >
            {suggestion.text}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
