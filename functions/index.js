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
const API_KEYS = [
  "AIzaSyBC3YKGA-p41UxeIlb4XvQCwFP1DxGF2C8", // Primary
  "AIzaSyAfufF-7dVKFFYfjrgk92tm4om2uL3Wm88"  // Backup
];
let currentKeyIndex = 0;

exports.askGemini = functions.https.onRequest((req, res) => {
  // Wrap with CORS middleware to allow frontend to access
  cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const body = req.body;

      if (!body) {
        return res.status(400).json({ error: "Missing request body" });
      }

      const model = "gemini-2.5-flash"; 
      let response;
      let success = false;
      let lastError;

      // Try available keys
      for (let i = 0; i < API_KEYS.length; i++) {
        try {
          response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEYS[currentKeyIndex]}`,
            body,
            {
              headers: { "Content-Type": "application/json" }
            }
          );
          
          success = true;
          break; // Request succeeded, break the retry loop
          
        } catch (error) {
          lastError = error;
          
          // If Quota Exceeded (429), rotate key and retry
          if (error.response && error.response.status === 429) {
            console.warn(`Key index ${currentKeyIndex} hit 429 limit. Switching to backup key.`);
            currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
            continue;
          }
          
          // For other errors, break out
          break;
        }
      }

      if (success) {
        res.json(response.data);
      } else {
        throw lastError; // Throw the last captured error to the main catch block
      }

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