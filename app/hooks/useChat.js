// "use client";

// import { useState } from "react";

// export function useChat() {
//   const [messages, setMessages] = useState([
//     {
//       id: "1",
//       message: "Hello! I'm your AI assistant. How can I help you today?",
//       isBot: true,
//       timestamp: new Date().toLocaleTimeString(),
//     },
//   ]);

//   const sendMessage = (message) => {
//     const userMessage = {
//       id: Date.now().toString(),
//       message,
//       isBot: false,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setMessages((prev) => [...prev, userMessage]);

//     // Simulate bot response
//     setTimeout(() => {
//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         message:
//           "I'm a demo bot. This is a simulated response to your message.",
//         isBot: true,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     }, 1000);
//   };

//   return { messages, sendMessage };
// }

"use client";

import { useState, useEffect } from "react";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize messages only on client-side
    setMessages([
      {
        id: "1",
        message: "Hello! I'm your AI assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const sendMessage = (message) => {
    const userMessage = {
      id: Date.now().toString(),
      message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        message:
          "I'm a demo bot. This is a simulated response to your message.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return { messages, sendMessage, isClient };
}
