// 'use client';

// import { useState, useEffect } from 'react';

// // NON STREAMING OUTPUT

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

//     console.log({ message });

//     try {
//       const response = await fetch('http://localhost:8000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           messages: [{ role: 'user', content: message }],
//         }),
//       });

//       const data = await response.json();

//       console.log({ data });

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

//   return { messages, setMessages, sendMessage, isClient, isLoading };
// }

'use client';

import { useState, useEffect } from 'react';

export function useChat(sessionId = null) {
  const [messages, setMessages] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(!!sessionId);
  const [sessionTitle, setSessionTitle] = useState('');

  useEffect(() => {
    setIsClient(true);

    if (sessionId && sessionId !== 'new') {
      loadSessionMessages(sessionId);
    } else {
      // Default welcome message for new chats
      setMessages([
        {
          id: '1',
          message:
            "Hello! I'm your banking AI assistant. How can I help you analyze the data?",
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [sessionId]);

  const loadSessionMessages = async (sid) => {
    setSessionLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/sessions/${sid}`);
      if (!response.ok) throw new Error('Failed to load session messages');

      const sessionData = await response.json();
      setSessionTitle(sessionData.title);

      // Transform the history array into our message format
      if (sessionData.history && Array.isArray(sessionData.history)) {
        const formattedMessages = sessionData.history.map((msg, index) => ({
          id: `${sessionData.session_id}-${index}`,
          message: msg.content,
          isBot: msg.role === 'assistant',
          timestamp: new Date(
            sessionData.timestamp.replace('_', 'T')
          ).toLocaleTimeString(),
          steps: msg.steps || [],
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading session messages:', error);
      setMessages([
        {
          id: Date.now().toString(),
          message: 'Error loading chat history. Please try again.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setSessionLoading(false);
    }
  };

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

      const data = await response.json();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        message: data.content,
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
        steps: data.steps,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          message: `Error: ${error.message}`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    sendMessage,
    isClient,
    isLoading,
    sessionLoading,
    sessionTitle, // Added sessionTitle to return values
  };
}
