// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });



const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// ⚠️ We use the API key directly here for the hackathon/demo. 
// In production, this should ideally be in Firebase Secret Manager or config.
const GEMINI_API_KEY = "AIzaSyDFNijZl1Sjh3gmL7Y7Pfcu2FFrOPFBMLM";

exports.askGemini = functions.https.onRequest((req, res) => {
  // Wrap with CORS middleware to allow frontend to access
  cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      // Expecting { contents: [...] } matching Gemini API format or { prompt: "..." }
      // To maintain compatibility with existing ai-assistant.js payload
      const body = req.body;

      // Ensure we have a payload to send
      if (!body) {
        return res.status(400).json({ error: "Missing request body" });
      }

      // Default model mapping matching frontend options
      const model = "gemini-2.5-flash"; 
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        body,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // Return the direct response data back to the frontend
      // which ai-assistant.js expects
      res.json(response.data);

    } catch (error) {
      console.error("Gemini API Error:", error.response ? error.response.data : error.message);
      res.status(500).json({
        error: {
          message: error.response?.data?.error?.message || "Internal Server Error from Gemini API"
        }
      });
    }
  });
});