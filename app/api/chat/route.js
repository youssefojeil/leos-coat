// // src/app/api/chat/route.js
// import { NextResponse } from 'next/server';
// import { BigQuery } from '@google-cloud/bigquery';
// import { systemPrompt } from '@/utils/prompts';
// import { generateResponse } from '@/utils/gemini';

// // Initialize BigQuery client
// const bigquery = new BigQuery({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT,
//   credentials: {
//     client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   },
// });

// async function handleBigQueryOperation(functionCall) {
//   console.log('Handling BigQuery operation:', functionCall.name);
//   console.log('Function parameters:', functionCall.args);

//   const { name, args } = functionCall;

//   try {
//     switch (name) {
//       case 'list_datasets':
//         console.log('Listing datasets...');
//         return "tekmout.gemini_bq_test"; // Return our specific dataset

//       case 'list_tables':
//         console.log('Listing tables for dataset:', args.dataset_id);
//         return [
//           "relationship_managers",
//           "clients",
//           "products",
//           "client_products",
//           "transactions"
//         ];

//       case 'get_table':
//         console.log('Getting table info for:', args.table_id);
//         const [table] = await bigquery.dataset('gemini_bq_test').table(args.table_id).get();
//         const [metadata] = await table.getMetadata();
//         return {
//           description: metadata.description || '',
//           schema: metadata.schema.fields.map(field => field.name)
//         };

//       case 'sql_query':
//         console.log('Executing SQL query:', args.query);
//         const [job] = await bigquery.createQueryJob({
//           query: args.query,
//           location: 'US',
//           maximumBytesBilled: "100000000"
//         });
//         console.log('Query job created:', job.id);
//         const [rows] = await job.getQueryResults();
//         console.log('Query results received, row count:', rows.length);
//         return rows;

//       default:
//         throw new Error(`Unknown function: ${name}`);
//     }
//   } catch (error) {
//     console.error('BigQuery operation error:', error);
//     throw error;
//   }
// }

// export async function POST(request) {
//   console.log('Received chat request');

//   try {
//     const { messages } = await request.json();
//     console.log('User messages:', messages);

//     // Combine system prompt with user's question
//     const fullPrompt = `${systemPrompt}\n\nUser Question: ${messages[messages.length - 1].content}`;
//     console.log('Full prompt prepared');

//     // Generate response using Vertex AI
//     const response = await generateResponse([...messages, { role: 'user', content: fullPrompt }]);
//     console.log('Vertex AI response received:', response);

//     // Check for function calls
//     if (response.candidates?.[0]?.content?.parts?.[0]?.functionCall) {
//       console.log('Function call detected');
//       const functionCall = response.candidates[0].content.parts[0].functionCall;
//       console.log('Function call details:', functionCall);

//       const result = await handleBigQueryOperation(functionCall);
//       console.log('Function call result:', result);

//       return NextResponse.json({
//         result: {
//           type: 'functionResult',
//           function: functionCall.name,
//           data: result
//         }
//       });
//     }

//     // Return text response if no function call
//     console.log('Returning text response');
//     return NextResponse.json({
//       result: {
//         type: 'text',
//         content: response.text
//       }
//     });

//   } catch (error) {
//     console.error('API Error:', error);
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import { BigQuery } from "@google-cloud/bigquery";
import { startChat } from "@/utils/gemini";

const BIGQUERY_DATASET_ID = "tekmout.gemini_bq_test";

const bigquery = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

async function handleBigQueryOperation(functionCall) {
  const { name, args } = functionCall;
  console.log("Function call:", name);
  console.log("Arguments:", args);

  try {
    let api_response;

    if (name === "list_datasets") {
      api_response = BIGQUERY_DATASET_ID;
      console.log("Dataset ID:", api_response);
    }

    if (name === "list_tables") {
      console.log("Getting tables for dataset:", args.dataset_id);
      const [tables] = await bigquery.dataset(args.dataset_id).getTables();
      api_response = JSON.stringify(tables.map((table) => table.id));
      console.log("Tables found:", api_response);
    }

    return api_response;
  } catch (error) {
    console.error("BigQuery operation error:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { messages } = await request.json();
    console.log("Received messages:", JSON.stringify(messages, null, 2));

    const chat = await startChat();

    const lastMessage =
      messages[messages.length - 1].content +
      `
        Please give a concise, high-level summary followed by detail in
        plain language about where the information in your response is
        coming from in the database. Only use information that you learn
        from BigQuery, do not make up information.
      `;

    // Send initial message and log detailed response
    const chatResponse = await chat.sendMessage(lastMessage);

    // Detailed logging of the chat response
    console.log("Full chat response:", JSON.stringify(chatResponse, null, 2));
    console.log("Response type:", typeof chatResponse);
    console.log("Response keys:", Object.keys(chatResponse));

    if (chatResponse.candidates) {
      console.log(
        "Candidates array:",
        JSON.stringify(chatResponse.candidates, null, 2)
      );
      console.log("Number of candidates:", chatResponse.candidates.length);
    } else {
      console.log("No candidates found in response");
    }

    // Safety check before accessing properties
    if (!chatResponse?.candidates?.length) {
      throw new Error(
        "No valid response received from the model. Response: " +
          JSON.stringify(chatResponse, null, 2)
      );
    }

    const firstCandidate = chatResponse.candidates[0];
    console.log("First candidate:", JSON.stringify(firstCandidate, null, 2));

    if (!firstCandidate?.content?.parts?.length) {
      throw new Error(
        "Invalid candidate structure. Candidate: " +
          JSON.stringify(firstCandidate, null, 2)
      );
    }

    let response = firstCandidate.content.parts[0];
    console.log("Parsed response part:", JSON.stringify(response, null, 2));

    const api_requests_and_responses = [];
    let backend_details = "";
    let full_response = "";

    // Handle function calling loop
    let function_calling_in_process = true;
    while (function_calling_in_process) {
      try {
        // Check if we have a function call
        if (!response?.function_call) {
          function_calling_in_process = false;
          full_response = response.text || "No response text available";
          continue;
        }

        const functionCall = response.function_call;
        console.log("Processing function call:", functionCall);

        // Execute BigQuery operation
        const api_response = await handleBigQueryOperation(functionCall);
        console.log("API response:", api_response);

        // Store request and response details
        api_requests_and_responses.push([
          functionCall.name,
          functionCall.args,
          api_response,
        ]);

        // Update backend details string
        backend_details += "- Function call:\n";
        backend_details += `   - Function name: \`\`\`${functionCall.name}\`\`\`\n\n`;
        backend_details += `   - Function parameters: \`\`\`${JSON.stringify(
          functionCall.args
        )}\`\`\`\n\n`;
        backend_details += `   - API response: \`\`\`${api_response}\`\`\`\n\n`;

        // Send function response back to model
        const modelResponse = await chat.sendMessage({
          function_call: functionCall.name,
          response: { content: api_response },
        });

        if (!modelResponse?.candidates?.length) {
          throw new Error(
            "No response received from model after function call"
          );
        }

        response = modelResponse.candidates[0].content.parts[0];
        console.log("Model response after function call:", response);
      } catch (error) {
        console.error("Error in function calling loop:", error);

        if (error instanceof TypeError && error.message.includes("undefined")) {
          // Handle case where response structure is unexpected
          function_calling_in_process = false;
          full_response =
            response?.text || "An error occurred processing the response";
        } else {
          throw error;
        }
      }
    }

    console.log("Final response:", full_response);
    console.log("Backend details:", backend_details);

    return NextResponse.json({
      role: "assistant",
      content: full_response,
      backend_details: backend_details,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: `Something went wrong! Please try rephrasing your question. Details: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
