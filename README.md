<div align="center">

# 🗳️ VoteGuide AI

**India's Smart Election Education & Voter Assistance Platform**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#)

*Empowering citizens with knowledge about the democratic process, voter registration, and electoral awareness.*

<br />

[Explore the Platform](#our-solution) · [Report Bug](https://github.com/asifkhan7060/Election-Process-Website/issues) · [Request Feature](https://github.com/asifkhan7060/Election-Process-Website/issues)

</div>

---

## 📑 Table of Contents
<details open>
  <summary><b>Click to Expand/Collapse</b></summary>
  
  1. [🛑 The Problem](#-the-problem)
  2. [💡 Our Solution](#-our-solution)
  3. [🛠️ Tech Stack](#-tech-stack)
  4. [📋 Initial Requirements](#-initial-installation-requirements)
  5. [🚀 How to Run](#-how-to-run-the-project-after-unzipping)
</details>

---

## 🛑 The Problem

<details>
  <summary><b>View the challenges voters face today (Click to expand)</b></summary>
  <br>
  Navigating the electoral process can be daunting, particularly for first-time voters. There is a lack of accessible, centralized, and engaging platforms that simplify the complexities of:
  
  * Voter registration and documentation
  * EVM (Electronic Voting Machine) and VVPAT usage
  * Locating polling booths
  * General civic education regarding the Parliament and President
  
  This often leads to confusion, reliance on misinformation, and ultimately, voter apathy.
</details>

---

## 💡 Our Solution

<details open>
  <summary><b>Discover what VoteGuide AI brings to the table (Click to collapse)</b></summary>
  <br>
  
  **VoteGuide AI** bridges this knowledge gap by providing an apolitical, highly interactive, and user-friendly platform. It consolidates crucial election information and presents it in an engaging manner.

  | Feature | Description |
  | :--- | :--- |
  | **🤖 AI Assistant** | Get instant, accurate, and conversational answers to your election-related queries. |
  | **🗺️ ECI Map & Booth Finder** | Locate your polling booth effortlessly using interactive maps and local data. |
  | **🗳️ EVM Demo** | Experience a virtual Electronic Voting Machine to understand the exact voting process at the booth. |
  | **🧠 Election Quiz** | Test your knowledge about Indian democracy and earn achievement badges. |
  | **📖 Educational Modules** | Step-by-step guides on voter registration, first-time voting, the Parliament, and the President. |
  | **🌐 Multi-lingual Support** | Built-in Google Translate integration for accessibility across various Indian regional languages. |
  | **🌗 Dynamic UI** | A seamless, modern UI with dynamic Dark/Light theme switching for a comfortable reading experience. |
  
</details>

---

## 🛠️ Tech Stack

<details>
  <summary><b>View the technologies used under the hood (Click to expand)</b></summary>
  <br>
  
  VoteGuide AI is built using a modern, lightweight, and robust technology stack:

  * **Frontend Core**: HTML5, CSS3 (Vanilla, Custom Variables/Properties), JavaScript (Vanilla ES6 Modules)
  * **Visuals & Animations**: `Three.js` (for immersive 3D background effects), Custom CSS micro-animations
  * **Backend & Hosting Services**: `Firebase` (Authentication, Hosting configured via `.firebaserc`)
  * **External APIs/Services**: Google Translate API, UI Vector Graphics
</details>

---

## 📋 Initial Installation Requirements

<details open>
  <summary><b>Check what you need before starting (Click to collapse)</b></summary>
  <br>

  To run this project locally, you only need the following prerequisites:

  1. 🌐 A **modern web browser** (Google Chrome, Mozilla Firefox, Safari, or Microsoft Edge).
  2. 📶 An **active internet connection** (required to load Three.js via CDN, the Google Translate widget, and connect to Firebase services).
  3. 💻 A **local development server**. Since the project uses modern JavaScript ES6 modules (`<script type="module">`), opening the `index.html` file directly from your file manager (using the `file://` protocol) will result in CORS (Cross-Origin Resource Sharing) errors.
</details>

---

## 🚀 How to Run the Project (After Unzipping)

<details open>
  <summary><b>Step-by-Step Execution Guide (Click to collapse)</b></summary>
  <br>

  Follow these simple steps to get the project running on your local machine:

  ### Method 1: Using VS Code (Recommended)
  1. Unzip the downloaded project folder.
  2. Open the extracted folder in **Visual Studio Code**.
  3. Install the **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** extension from the VS Code Marketplace if you haven't already.
  4. Right-click on the `index.html` file in the VS Code explorer pane and select **"Open with Live Server"**.
  5. The application will automatically open in your default browser (usually at `http://127.0.0.1:5500`).

  ### Method 2: Using Node.js (http-server)
  1. Unzip the downloaded project folder.
  2. Open your terminal or command prompt and navigate to the extracted project directory:
     ```bash
     cd path/to/unzipped/folder
     ```
  3. If you have [Node.js](https://nodejs.org/) installed, run the following command to start a local server:
     ```bash
     npx http-server
     ```
  4. Open your web browser and navigate to the local URL provided in the terminal (typically `http://127.0.0.1:8080`).

</details>

---

<div align="center">
  <i>© 2026 VoteGuide AI — Built for Hack2Skill PromptWars Challenge</i><br>
  <b>Made with 🧡 for Indian Democracy</b>
</div>
