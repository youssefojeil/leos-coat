// // src/app/page.js
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { samplePrompts } from "@/constants/sample_prompts";

// export default function Home() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     setIsLoading(true);
//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           messages: [...messages, userMessage],
//         }),
//       });

//       const data = await response.json();

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: data.result,
//         },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Sorry, I encountered an error processing your request.",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="mt-24 min-h-screen bg-[#1C1C1C] text-white">
//       <div className="container mx-auto p-4 max-w-7xl">
//         <div className="flex items-center justify-between mb-8">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl font-bold text-white"
//           >
//             Banking Relationship Assistant
//           </motion.h1>
//           <img src="/vertex-ai.png" alt="Vertex AI" className="h-12 w-12" />
//         </div>

//         <h2 className="text-xl mb-4 text-gray-300">Powered by Vertex AI</h2>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="mb-8 p-6 bg-[#2D2D2D] rounded-lg border border-[#333333]"
//         >
//           <h3 className="font-semibold mb-4 text-gray-200">Sample Questions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {samplePrompts.map((prompt, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.02 }}
//                 className="p-3 bg-[#363636] rounded-lg border border-[#444444] cursor-pointer hover:border-[#FF8C69] transition-colors"
//                 onClick={() => setInput(prompt)}
//               >
//                 {prompt}
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <div className="h-[600px] bg-[#2D2D2D] rounded-lg border border-[#333333] p-4 mb-4 overflow-y-auto">
//           {messages.map((message, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`mb-4 p-4 rounded-lg ${
//                 message.role === "user"
//                   ? "bg-[#363636] ml-auto max-w-[80%] border border-[#444444]"
//                   : "bg-[#2D2D2D] mr-auto max-w-[80%] border border-[#333333]"
//               }`}
//             >
//               {message.content}
//             </motion.div>
//           ))}
//           {isLoading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex items-center justify-center p-4"
//             >
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8C69]"></div>
//             </motion.div>
//           )}
//         </div>

//         <form onSubmit={handleSubmit} className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask me about your banking relationships..."
//             className="flex-1 p-4 bg-[#2D2D2D] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C69] focus:border-transparent"
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-6 py-4 bg-[#FF8C69] text-white rounded-lg hover:bg-[#FF7F57] transition-colors disabled:opacity-50"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }

// src/app/page.js
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    "What kind of information is in this database?",
    "What percentage of orders are returned?",
    "How is inventory distributed across our regional distribution centers?",
    "Do customers typically place more than one order?",
    "Which product categories have the highest profit margins?",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          backend_details: data.backend_details,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mt-24 min-h-screen bg-[#1C1C1C] text-white">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            SQL Talk with BigQuery
          </motion.h1>
          <img
            src="/images/leo-logo.png"
            alt="Vertex AI"
            className="h-12 w-12"
          />
        </div>

        <h2 className="text-xl mb-4">Powered by Function Calling in Gemini</h2>

        {/* Sample Prompts */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 p-4 bg-[#2D2D2D] rounded-lg border border-[#333333]"
        >
          <h3 className="font-semibold mb-2">Sample prompts</h3>
          <ul className="space-y-2">
            {samplePrompts.map((prompt, index) => (
              <li
                key={index}
                className="text-gray-400 hover:text-[#FF8C69] cursor-pointer transition-colors"
                onClick={() => setInput(prompt)}
              >
                {prompt}
              </li>
            ))}
          </ul>
        </motion.div> */}

        {/* Chat Messages */}
        <div className="h-[600px] bg-[#2D2D2D] rounded-lg border border-[#333333] p-4 mb-4 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 ${
                message.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-[#363636] border border-[#444444]"
                    : "bg-[#2D2D2D] border border-[#333333]"
                }`}
              >
                {message.content}
              </div>
              {message.backend_details && (
                <details className="mt-2 p-2 bg-[#363636] rounded-lg">
                  <summary className="cursor-pointer text-[#FF8C69]">
                    Function calls, parameters, and responses
                  </summary>
                  <pre className="mt-2 p-2 text-sm overflow-x-auto whitespace-pre-wrap">
                    {message.backend_details}
                  </pre>
                </details>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8C69]"></div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 p-4 bg-[#2D2D2D] rounded-lg border border-[#333333]"
        >
          <h3 className="font-semibold mb-2">Sample prompts</h3>
          <ul className="space-y-2">
            {samplePrompts.map((prompt, index) => (
              <li
                key={index}
                className="text-gray-400 hover:text-[#FF8C69] cursor-pointer transition-colors"
                onClick={() => setInput(prompt)}
              >
                {prompt}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about information in the database..."
            className="flex-1 p-2 bg-[#2D2D2D] border border-[#333333] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C69]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#FF8C69] text-white rounded-lg hover:bg-[#FF7F57] transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
