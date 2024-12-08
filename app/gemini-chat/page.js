"use client";

import React from "react";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { QuickSuggestions } from "@/components/quick-suggestions";
import { useChat } from "../hooks/useChat";
import { Sparkle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/loading-spinner";
import { BackgroundGrids } from "@/components/hero-section";

// import ChatMessage from '@/components/chat-message';

const ChatbotPage = () => {
  const { messages, sendMessage, isClient, isLoading } = useChat();

  const handleSuggestionSelect = (suggestion) => {
    sendMessage(suggestion);
  };

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen text-black mt-20">
      <BackgroundGrids />
      <div className="max-w-7xl mx-auto  py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle weight="duotone" className="w-6 h-6" />
            <h1 className="text-3xl font-bold  bg-clip-text">AI Assistant</h1>
          </div>
          <p className="">Experience the future of conversation</p>
        </div>

        {/* Chat Container */}
        <div className="backdrop-blur-xl rounded-3xl p-6 mb-4">
          <div className="space-y-6 mb-6 max-h-[60vh] overflow-y-auto">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && <LoadingSpinner />}
          </div>
          <QuickSuggestions onSelectSuggestion={handleSuggestionSelect} />
          <ChatInput onSendMessage={sendMessage} />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500">Powered by Gemini</p>
      </div>
    </div>
  );
};

export default ChatbotPage;
