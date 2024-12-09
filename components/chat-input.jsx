'use client';
import React, { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="relative"
    >
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused ? '0 0 20px rgba(239, 68, 68, 0.2)' : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        {/* <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your message..."
          className="w-full px-6 py-4 bg-zinc-800/50 backdrop-blur-lg rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 border border-red-900/20"
        /> */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your message..."
          className="w-full px-6 py-4 bg-zinc-100  rounded-2xl text-zinc-900 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 border"
        />
      </motion.div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-red-700 to-red-500 flex items-center justify-center"
      >
        <PaperPlaneTilt weight="fill" className="w-5 h-5 text-white" />
      </motion.button>
    </motion.form>
  );
}
