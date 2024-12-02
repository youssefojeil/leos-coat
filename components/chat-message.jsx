"use client";

import React from "react";
import { Robot, User } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export function ChatMessage({ message, isBot, timestamp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isBot ? "justify-start" : "justify-end"} mr-2`}
    >
      {isBot && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-red-700 to-red-500 flex items-center justify-center"
        >
          <Robot weight="duotone" className="w-5 h-5 text-white" />
        </motion.div>
      )}
      <motion.div
        initial={{ x: isBot ? -50 : 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className={`max-w-[70%] ${isBot ? "order-2" : "order-1"}`}
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`p-4 rounded-2xl backdrop-blur-lg ${
            isBot
              ? "bg-zinc-800/80 text-white border border-red-900/20"
              : "bg-gradient-to-r from-red-700 to-red-500 text-white"
          }`}
        >
          <p className="text-sm">{message}</p>
        </motion.div>
        <span className="text-xs text-zinc-500 mt-1 block">{timestamp}</span>
      </motion.div>
      {!isBot && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-red-700 to-red-500 flex items-center justify-center order-3"
        >
          <User weight="duotone" className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}
