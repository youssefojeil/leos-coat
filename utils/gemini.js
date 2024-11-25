// // src/utils/vertexai.js
// import { VertexAI } from "@google-cloud/vertexai";

// const projectId = process.env.GOOGLE_CLOUD_PROJECT;
// const location = "us-central1"; // Specify your region

// const vertexAi = new VertexAI({
//   project: projectId,
//   location: location,
//   credentials: {
//     client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   },
// });

// // Get model and create model instance
// const model = vertexAi.preview.getGenerativeModel({
//   model: "gemini-1.0-pro",
//   generation_config: {
//     temperature: 0.0,
//   },
// });

// // Define function declarations for tools
// const functionDeclarations = [
//   {
//     name: "list_datasets",
//     description:
//       "Get a list of datasets that will help answer the user's question",
//     parameters: {
//       type: "object",
//       properties: {},
//     },
//   },
//   {
//     name: "list_tables",
//     description:
//       "List tables in a dataset that will help answer the user's question",
//     parameters: {
//       type: "object",
//       properties: {
//         dataset_id: {
//           type: "string",
//           description: "Dataset ID to fetch tables from.",
//         },
//       },
//       required: ["dataset_id"],
//     },
//   },
//   {
//     name: "get_table",
//     description:
//       "Get information about a table, including the description, schema, and number of rows",
//     parameters: {
//       type: "object",
//       properties: {
//         table_id: {
//           type: "string",
//           description:
//             "Fully qualified ID of the table to get information about",
//         },
//       },
//       required: ["table_id"],
//     },
//   },
//   {
//     name: "sql_query",
//     description: "Get information from data in BigQuery using SQL queries",
//     parameters: {
//       type: "object",
//       properties: {
//         query: {
//           type: "string",
//           description:
//             "SQL query that will help give quantitative answers to the user's question",
//         },
//       },
//       required: ["query"],
//     },
//   },
// ];

// export async function generateResponse(messages) {
//   try {
//     // Start a chat session
//     const chat = model.startChat({
//       tools: [
//         {
//           functionDeclarations: functionDeclarations,
//         },
//       ],
//     });

//     // Get the last message from the user
//     const lastMessage = messages[messages.length - 1].content;

//     // Generate a response
//     const result = await chat.sendMessage(lastMessage);
//     const response = await result.response;

//     if (response.candidates && response.candidates[0].content) {
//       return response.candidates[0].content;
//     }

//     throw new Error("No response generated");
//   } catch (error) {
//     console.error("Error generating response:", error);
//     throw error;
//   }
// }

// src/utils/vertexai.js
import { VertexAI } from "@google-cloud/vertexai";

// Initialize Vertex AI
const vertexAi = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: "us-central1",
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

// Function Declarations
const functionDeclarations = [
  {
    name: "list_datasets",
    description:
      "Get a list of datasets that will help answer the user's question",
    parameters: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_tables",
    description:
      "List tables in a dataset that will help answer the user's question",
    parameters: {
      type: "object",
      properties: {
        dataset_id: {
          type: "string",
          description: "Dataset ID to fetch tables from.",
        },
      },
      required: ["dataset_id"],
    },
  },
  {
    name: "get_table",
    description:
      "Get information about a table, including the description, schema, and number of rows that will help answer the user's question. Always use the fully qualified dataset and table names.",
    parameters: {
      type: "object",
      properties: {
        table_id: {
          type: "string",
          description:
            "Fully qualified ID of the table to get information about",
        },
      },
      required: ["table_id"],
    },
  },
  {
    name: "sql_query",
    description: "Get information from data in BigQuery using SQL queries",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "SQL query on a single line that will help give quantitative answers to the user's question when run on a BigQuery dataset and table. In the SQL query, always use the fully qualified dataset and table names.",
        },
      },
      required: ["query"],
    },
  },
];

export async function startChat() {
  const model = vertexAi.preview.getGenerativeModel({
    model: "gemini-1.0-pro",
    generation_config: { temperature: 0 },
  });

  return model.startChat({
    tools: [
      {
        functionDeclarations: functionDeclarations,
      },
    ],
  });
}
