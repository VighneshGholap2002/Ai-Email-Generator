# 💌 AI Email Reply Generator (Gmail Chrome Extension)

## 🚀 Overview
This project is an **AI-powered Chrome Extension** that enhances Gmail by adding an **"AI Response"** button directly inside the reply section.  
When a user clicks this button, it automatically generates a **context-aware email reply** using **Gemini AI** — saving time and improving productivity.  

---

## 🧠 Features
- 📨 Seamless integration with **Gmail UI** (via DOM manipulation)
- ⚡ One-click **AI-generated replies** using **Gemini API**
- 🌐 Built with **React**, **Spring Boot**, and **Gemini AI**
- 🔐 Secure communication between **frontend, backend**, and **AI model**
- 🧩 Fully functional **Chrome Extension** that blends AI + Web Dev + Automation

---

## 🏗️ Tech Stack
| Component | Technology |
|------------|-------------|
| **Frontend** | React +  Chrome Extension UI |
| **Backend** | Spring Boot |
| **AI Engine** | Gemini AI |
| **Language** | JavaScript, Java |
| **Others** | HTML, CSS, Gmail DOM Integration |

---

## ⚙️ How It Works
1. Open Gmail and click on **Reply**.
2. You’ll see a new button added by the extension — **“AI Response”**.
3. When clicked, it sends the email content to the backend.
4. The backend (Spring Boot) communicates with **Gemini AI** to generate a response.
5. The generated reply is then displayed instantly inside Gmail for quick review and send.

---

## 🧩 Project Structure

AI_Email/
│
├── backend/ # Spring Boot backend
│ ├── src/main/java/... # Java source files
│ └── pom.xml # Maven dependencies
│
├── frontend/ # React frontend (Chrome extension UI)
│ ├── public/
│ ├── src/
│ └── package.json
│
├── extension/ # Chrome extension logic
│ ├── manifest.json
│ └── content.js
│
└── README.md # Project documentation
