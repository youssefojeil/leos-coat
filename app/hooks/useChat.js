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

  // useEffect(() => {
  //   setIsClient(true);
  //   setMessages([
  //     {
  //       id: '1',
  //       message:
  //         "Hello! I'm your banking AI assistant. How can I help you analyze the data?",
  //       isBot: true,
  //       timestamp: new Date().toLocaleTimeString(),
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: '1',
        message:
          "Hello! I'm your banking AI assistant. How can I help you analyze your financial data?",
        isBot: true,
        timestamp: '10:00 AM',
      },
      {
        id: '2',
        message:
          'Can you help me understand my spending patterns for the last month?',
        isBot: false,
        timestamp: '10:01 AM',
      },
      {
        id: '3',
        message: 'Analyzing your monthly transactions...',
        isBot: true,
        timestamp: '10:01 AM',
        isStep: true,
        function: 'analyzeTransactions',
        result: {
          total: '$2,450',
          categories: {
            food: '$800',
            transport: '$400',
            utilities: '$350',
          },
        },
      },
      {
        id: '4',
        message:
          'Based on your transaction history, your largest expense category was food ($800), followed by transportation ($400). I notice your utility bills ($350) were higher than usual this month. Would you like me to break down these categories further?',
        isBot: true,
        timestamp: '10:01 AM',
        isFinal: true,
      },
      {
        id: '5',
        message: 'Yes, please break down my food expenses.',
        isBot: false,
        timestamp: '10:02 AM',
      },
      {
        id: '6',
        message: 'Categorizing food expenses...',
        isBot: true,
        timestamp: '10:02 AM',
        isStep: true,
        function: 'categorizeFoodExpenses',
        result: {
          restaurants: '$500',
          groceries: '$250',
          delivery: '$50',
        },
      },
      {
        id: '7',
        message:
          "Here's your food expense breakdown:\n- Restaurants: $500 (62.5%)\n- Groceries: $250 (31.25%)\n- Food delivery: $50 (6.25%)\n\nYou could save money by cooking more meals at home. Would you like some budget-friendly meal planning tips?",
        isBot: true,
        timestamp: '10:02 AM',
        isFinal: true,
      },
      {
        id: '8',
        message: 'Can you check my savings rate?',
        isBot: false,
        timestamp: '10:03 AM',
      },
      {
        id: '9',
        message:
          'Sorry, I encountered an error accessing your savings data. Please try again later or contact support.',
        isBot: true,
        timestamp: '10:03 AM',
        error: true,
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
