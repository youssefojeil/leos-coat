// export function ChatMessage({ message, isBot, timestamp, steps }) {
// const renderSteps = () => {
//   console.log(steps);
//   if (!steps?.length) return null;

//   return (
//     <div className="mt-4 space-y-3">
//       <p className="text-sm text-zinc-400">Thought Process:</p>
//       {steps.map((step, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           className="p-3 bg-zinc-800/50 rounded-lg border border-red-900/20"
//         >
//           <div className="flex items-center gap-2 mb-2">
//             <div className="w-2 h-2 rounded-full bg-red-500" />
//             <p className="text-sm text-red-400">{step.name}</p>
//           </div>

//           <div className="text-xs text-zinc-400">
//             <div className="mb-2">
//               <span className="text-zinc-500">Input:</span>
//               <pre className="mt-1 p-2 bg-black/20 rounded overflow-x-auto">
//                 {JSON.stringify(step.params, null, 2)}
//               </pre>
//             </div>

//             <div>
//               <span className="text-zinc-500">Output:</span>
//               <pre className="mt-1 p-2 bg-black/20 rounded overflow-x-auto">
//                 {typeof step.response === 'object'
//                   ? JSON.stringify(step.response, null, 2)
//                   : step.response}
//               </pre>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

'use client';

import React from 'react';
import { User, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

import { Robot } from '@phosphor-icons/react';

export function ChatMessage({
  message,
  isBot,
  timestamp,
  result,
  isStep,
  isFinal,
}) {
  return (
    // bg-zinc-100  rounded-2xl text-zinc-900
    <motion.div
      className={`flex gap-4 ${isBot ? 'justify-start' : 'justify-end'} mr-2`}
    >
      {isBot && (
        // <motion.div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-zinc-700 to-zinc-600 flex items-center justify-center">
        <motion.div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 flex items-center justify-center">
          <Robot weight="duotone" className="w-5 h-5 text-white" />
        </motion.div>
      )}
      <motion.div className={`max-w-[70%] ${isBot ? 'order-2' : 'order-1'}`}>
        <motion.div
          className={`p-4 rounded-2xl backdrop-blur-lg break-words ${
            isBot
              ? isStep
                ? 'bg-zinc-800/50 text-zinc-300'
                : isFinal
                ? 'bg-zinc-800/80 text-white'
                : 'bg-zinc-800/80 text-white'
              : 'bg-gradient-to-r from-red-700 to-red-500 text-white'
          } ${isBot ? 'border border-zinc-700' : ''}`}
        >
          <p className="text-sm">{message}</p>
          {isStep && result && (
            <pre className="mt-2 text-xs text-zinc-400 p-2 bg-black/20 rounded overflow-x-auto">
              {typeof result === 'object'
                ? JSON.stringify(result, null, 2)
                : result}
            </pre>
          )}
        </motion.div>
        <span className="text-xs text-zinc-500 mt-1 block">{timestamp}</span>
      </motion.div>
      {!isBot && (
        <motion.div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-red-700 to-red-500 flex items-center justify-center order-3">
          <User weight="duotone" className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}
