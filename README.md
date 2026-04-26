<div align="center">

# 🗳️ VoteGuide AI
**India's Smart Election Education & Voter Assistance Platform**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)](#)

*Empowering citizens with AI-driven knowledge about the democratic process, voter registration, and electoral awareness.*

<br />

**[🚀 View Live Demo](https://election-process-app.web.app)** · [Report Bug](https://github.com/asifkhan7060/Election-Process-Website/issues) · [Request Feature](https://github.com/asifkhan7060/Election-Process-Website/issues)

</div>

---

## 🛑 The Problem Statement

India is the world's largest democracy, yet navigating its electoral process remains a significant challenge for millions. 
1. **First-Time Voter Apathy:** Complex bureaucratic jargon and scattered information lead to confusion and lower youth voter turnout.
2. **Misinformation:** Voters frequently fall prey to myths regarding EVMs, voting eligibility, and political processes.
3. **Accessibility Barriers:** Critical election data is often buried in non-intuitive government portals lacking modern, multi-lingual, and mobile-friendly interfaces.

## 🌟 Why This Solution Matters (Real-World Impact)

**VoteGuide AI** bridges the gap between the Election Commission's resources and the everyday citizen. By consolidating fragmented data into a single, intuitive platform powered by Artificial Intelligence, we reduce the friction of democratic participation. 

When citizens are informed—when they know exactly *how*, *where*, and *why* to vote—democracy strengthens. This platform is designed to convert passive observers into active, educated voters.

---

## 💡 Our Solution & Features

VoteGuide AI is an apolitical, highly interactive platform designed to educate and assist voters at every step of their democratic journey.

| Feature | Description |
| :--- | :--- |
| **🤖 AI Assistant** | Powered by Gemini AI. Get instant, conversational, and accurate answers to any election-related queries in real-time. |
| **🗺️ ECI Map & Booth Finder** | Locate your exact polling booth effortlessly using interactive map integrations. |
| **🗳️ EVM Demo Simulator** | A virtual Electronic Voting Machine that demystifies the actual voting process inside the booth. |
| **🧠 Gamified Election Quiz** | Tests civic knowledge and rewards users with achievement badges to encourage active learning. |
| **📖 Structured Educational Modules** | Bite-sized, progressive guides on Voter Registration, the Parliament, the President, and First-Time Voting. |
| **🌐 Multi-lingual Accessibility** | Built-in Google Translate integration instantly converts the platform into 12+ regional Indian languages. |

---

## 🚀 Innovation Points

What makes VoteGuide AI stand out technically and experientially?

* **Zero-Dependency SPA Routing:** We engineered a custom Vanilla JavaScript router. The app functions as a blazing-fast Single Page Application without the overhead or loading times of heavy frameworks like React or Angular.
* **Immersive Visuals:** We integrated a custom `Three.js` WebGL particle background that reacts dynamically to the user's viewport, providing a premium, modern aesthetic rarely seen in civic tech.
* **Absolute Mobile-First Responsiveness:** The platform features a bespoke slide-out mobile drawer, fluid grid typography, and intelligent layout collapsing to ensure a flawless experience on a $50 smartphone or a 4K monitor.
* **Serverless AI Integration:** Our Gemini AI assistant operates securely via Firebase Cloud Functions, protecting API keys while delivering rapid, context-aware responses.

---

## 🏗️ Architecture & How it Works

VoteGuide AI operates on a modern, decoupled serverless architecture:

1. **Frontend Layer:** Native HTML5, CSS3 (with extensive CSS Variables for theme management), and ES6 Modules. 
2. **State & Routing:** A custom JavaScript Engine intercepts URL hash changes (`#/route`) and dynamically injects HTML payloads into the DOM. This ensures instant page transitions.
3. **Authentication:** Firebase Auth handles Google OAuth Sign-In. State listeners globally update the UI (navbars, drawers) to reflect user sessions.
4. **Backend/AI Layer:** A Node.js Firebase HTTP Cloud Function acts as a secure proxy. When a user asks the AI Assistant a question, the frontend securely POSTs to the Cloud Function, which negotiates with the **Google Gemini API** and streams the response back.

---

## 🎯 Project Overview

<details>
  <summary><b>Vertical, Approach & Assumptions (Click to Expand)</b></summary>
  <br>

  ### 🏛️ Chosen Vertical
  **Civic Technology & Election Education**  

  ### 🧠 Approach and Logic
  Our approach prioritizes **progressive disclosure**. Complex topics are hidden behind accordions, quizzes, and modal popups. This prevents cognitive overload, allowing users to consume heavy bureaucratic information at their own pace.

  ### 📌 Assumptions Made
  * **Educational Scope:** The platform is strictly educational and apolitical. It does not replace official ECI portals but acts as a funnel directing educated users to them.
  * **Modern Browser Capabilities:** We assume the user is on a browser that supports CSS Grid, Flexbox, and ES6 Modules, allowing us to omit heavy legacy polyfills.
</details>

---

## 🌍 Deployment & Demo Readiness

This project is **production-ready** and fully deployed using Firebase Hosting. The CI/CD pipeline ensures that the latest commits are instantly reflected in the live environment.

🔗 **Access the Live Platform:** [https://election-process-app.web.app](https://election-process-app.web.app)

---

## 💻 Local Setup Instructions

Want to run the code locally? You only need a modern browser and a local development server.

### Using VS Code (Recommended)
1. Clone or unzip the repository.
2. Open the folder in **Visual Studio Code**.
3. Install the **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** extension.
4. Right-click `index.html` and select **"Open with Live Server"**.

### Using Node.js
1. Open your terminal in the project directory.
2. Run `npx http-server`
3. Navigate to `http://127.0.0.1:8080` in your browser.

*(Note: Opening `index.html` directly via the `file://` protocol will result in CORS errors due to ES6 module imports).*

---

<div align="center">
  <i>© 2026 VoteGuide AI — Built for the Hack2Skill PromptWars Challenge</i><br>
  <b>Made with 🧡 for Indian Democracy</b>
</div>
