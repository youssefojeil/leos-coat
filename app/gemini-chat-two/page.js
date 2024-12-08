'use client';

import React from 'react';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { QuickSuggestions } from '@/components/quick-suggestions';
import { useChat } from '../hooks/useChat';
import { Sparkle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/components/loading-spinner';

// import ChatMessage from '@/components/chat-message';

const ChatbotPage = () => {
  const { messages, sendMessage, isClient, isLoading } = useChat();

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
      },
    },
  };

  const handleSuggestionSelect = (suggestion) => {
    sendMessage(suggestion);
  };

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white mt-20"
    >
      <motion.div
        variants={itemVariants}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkle weight="duotone" className="w-6 h-6 text-red-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-300 text-transparent bg-clip-text">
              AI Assistant
            </h1>
          </motion.div>
          <motion.p variants={itemVariants} className="text-zinc-400">
            Experience the future of conversation
          </motion.p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-6 mb-4 border border-red-900/20"
        >
          <motion.div
            variants={itemVariants}
            className="space-y-6 mb-6 max-h-[60vh] overflow-y-auto"
          >
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && <LoadingSpinner />}
          </motion.div>
          <QuickSuggestions onSelectSuggestion={handleSuggestionSelect} />
          <ChatInput onSendMessage={sendMessage} />
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-zinc-500"
        >
          Powered by Gemini
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default ChatbotPage;
