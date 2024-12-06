'use client';

import { useState, useEffect } from 'react';

// NON STREAMING OUTPUT

// export function useChat() {
//   const [messages, setMessages] = useState([]);
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     setMessages([
//       {
//         id: '1',
//         message:
//           "Hello! I'm your banking AI assistant. How can I help you analyze the data?",
//         isBot: true,
//         timestamp: new Date().toLocaleTimeString(),
//       },
//     ]);
//   }, []);

//   const sendMessage = async (message) => {
//     const userMessage = {
//       id: Date.now().toString(),
//       message,
//       isBot: false,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const response = await fetch('http://localhost:8000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           messages: [{ role: 'user', content: message }],
//         }),
//       });

//       const data = await response.json();

//       console.log(data);

//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         message: data.content,
//         isBot: true,
//         timestamp: new Date().toLocaleTimeString(),
//         steps: data.steps,
//       };

//       console.log(botMessage);

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: (Date.now() + 1).toString(),
//           message: `Error: ${error.message}`,
//           isBot: true,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { messages, sendMessage, isClient, isLoading };
// }

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: '1',
        message:
          "Hello! I'm your banking AI assistant. How can I help you analyze the data?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const sendMessage = async (message) => {
    const userMessage = {
      id: Date.now().toString(),
      message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              const messageId = Date.now().toString();

              if (data.type === 'step') {
                const stepMessage = {
                  id: messageId,
                  message: data.message,
                  result: data.result,
                  isBot: true,
                  timestamp: new Date().toLocaleTimeString(),
                  isStep: true,
                  function: data.function,
                };
                setMessages((prev) => [...prev, stepMessage]);
              } else if (data.type === 'final') {
                const finalMessage = {
                  id: messageId,
                  message: data.content,
                  isBot: true,
                  timestamp: new Date().toLocaleTimeString(),
                  isFinal: true,
                };
                setMessages((prev) => [...prev, finalMessage]);
              } else if (data.type === 'error') {
                const errorMessage = {
                  id: messageId,
                  message: data.message,
                  isBot: true,
                  timestamp: new Date().toLocaleTimeString(),
                  error: true,
                };
                setMessages((prev) => [...prev, errorMessage]);
              }
            } catch (e) {
              console.error('Error parsing SSE:', e);
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        message: `Error: ${error.message}`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isClient, isLoading };
}
