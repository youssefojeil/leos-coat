// 'use client';

// import React from 'react';
// import { ChatMessage } from '@/components/chat-message';
// import { ChatInput } from '@/components/chat-input';
// import { QuickSuggestions } from '@/components/quick-suggestions';
// import { useChat } from '../hooks/useChat';
// import { Sparkle } from '@phosphor-icons/react';
// import { motion } from 'framer-motion';
// import LoadingSpinner from '@/components/loading-spinner';
// import { BackgroundGrids } from '@/components/hero-section';

// // import ChatMessage from '@/components/chat-message';

// const ChatbotPage = () => {
//   const { messages, sendMessage, isClient, isLoading } = useChat();

//   const handleSuggestionSelect = (suggestion) => {
//     sendMessage(suggestion);
//   };

//   if (!isClient) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="min-h-screen text-black mt-20">
//       <BackgroundGrids />

//       <div className="max-w-7xl mx-auto  py-10">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 mb-4">
//             <Sparkle weight="duotone" className="w-6 h-6" />
//             <h1 className="text-3xl font-bold  bg-clip-text z-10">
//               AI Assistant
//             </h1>
//           </div>
//           <p className="">Experience the future of conversation</p>
//         </div>

//         {/* Chat Container */}
//         <div className="backdrop-blur-xl rounded-3xl p-6 mb-4">
//           {/* <div className="space-y-6 mb-6 max-h-[60vh] overflow-y-auto"> */}
//           <div className="space-y-6 mb-6  overflow-y-auto">
//             {messages.map((msg) => (
//               <ChatMessage
//                 key={msg.id}
//                 message={msg.message}
//                 isBot={msg.isBot}
//                 timestamp={msg.timestamp}
//               />
//             ))}
//             {isLoading && <LoadingSpinner />}
//           </div>
//           <QuickSuggestions onSelectSuggestion={handleSuggestionSelect} />
//           <ChatInput onSendMessage={sendMessage} />
//         </div>

//         {/* Footer */}
//         <p className="text-center text-sm text-zinc-500">Powered by Gemini</p>
//       </div>
//     </div>
//   );
// };

// export default ChatbotPage;

"use client";

import React, { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { QuickSuggestions } from "@/components/quick-suggestions";
import { useChat } from "../hooks/useChat";
import { Sparkle } from "@phosphor-icons/react";
import LoadingSpinner from "@/components/loading-spinner";
import { BackgroundGrids } from "@/components/hero-section";
import { SidebarDemo } from "@/components/sidebardemo";

const ChatbotPage = () => {
  const { messages, sendMessage, isClient, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isClient) return <LoadingSpinner />;

  console.log(messages);

  return (
    <div className="min-h-screen bg-white flex">
      {/* <BackgroundGrids /> */}
      <SidebarDemo />

      <div className="max-w-7xl mx-auto pt-20 pb-4 px-4 text-zinc-800">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkle weight="duotone" className="w-6 h-6" />
            <h1 className="text-3xl font-bold">AI Assistant</h1>
          </div>
          <p>Experience the future of conversation</p>
        </div>

        <div className="backdrop-blur-xl rounded-3xl p-6 mb-64">
          <div className="space-y-6 ">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && <LoadingSpinner />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <QuickSuggestions onSelectSuggestion={sendMessage} />
            <ChatInput onSendMessage={sendMessage} />
            <p className="text-center text-sm text-zinc-500 mt-2">
              Powered by Gemini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
