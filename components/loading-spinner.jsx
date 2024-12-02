"use client";

import React from "react";
import { CircleNotch } from "@phosphor-icons/react";
import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <CircleNotch weight="bold" className="w-12 h-12 text-red-500" />
      </motion.div>
    </motion.div>
  );
}

export default LoadingSpinner;
