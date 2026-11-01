# 🩺 DermaLens AI – AI-Powered Skin Assessment & Care Assistant

DermaLens AI is an AI-powered web application that helps users understand skin conditions through image-based analysis and symptom assessment. By leveraging **Google Gemini AI**, the application analyzes uploaded skin images along with user-provided symptoms and generates AI-assisted observations, possible causes, severity levels, urgency recommendations, and personalized self-care guidelines.

It also features an AI-powered chatbot that allows users to ask follow-up questions and receive additional guidance based on their assessment.

> **Disclaimer:** DermaLens AI is an informational tool, not a medical diagnostic system. Its AI-generated results should not replace professional medical advice, diagnosis, or treatment.

---

## 🚀 Features

### 🔍 AI-Powered Skin Assessment
- Upload skin images for AI-assisted analysis.
- Provide additional information such as symptoms, duration, body location, and pain level.
- Analyze images and symptoms using Google Gemini AI.
- Generate structured assessment results.

### 🧠 Intelligent AI Analysis
- AI-generated skin observations.
- Possible causes with supporting explanations.
- Severity classification:
  - Mild
  - Moderate
  - Severe
  - Unclear
- Urgency recommendations:
  - Routine
  - Soon
  - Urgent
  - Emergency
  - Unclear

### 💬 AI Healthcare Chatbot
- Ask follow-up questions about assessment results.
- Receive context-aware AI responses.
- Get additional skin-care information and general guidance.
- Maintain conversation history.

### 📋 Assessment Management
- Store uploaded images and assessment results in MongoDB.
- Retrieve previous assessments using unique assessment IDs.
- Maintain chat sessions associated with individual assessments.

### 🎨 Modern User Interface
- Responsive and user-friendly interface.
- Built with React and Tailwind CSS.
- Smooth interactions and intuitive navigation.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Tailwind CSS | UI styling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database modeling |
| Google Gemini AI | Image analysis and AI chatbot |
| Axios | API communication |
| Multer | Image upload handling |
| React Router | Frontend navigation |

---

## 🏗️ Application Architecture

```text
                ┌──────────────────────┐
                │       User           │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   React Frontend     │
                │   Tailwind CSS       │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Express Backend    │
                │   REST APIs          │
                └──────────┬───────────┘
                           │
                 ┌─────────┴──────────┐
                 ▼                    ▼
       ┌──────────────────┐  ┌──────────────────┐
       │  Google Gemini   │  │    MongoDB       │
       │  AI Integration  │  │  Data Storage    │
       └──────────────────┘  └──────────────────┘
```

---

## 📂 Project Structure

```text
DermaLens-AI/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── Assessment/
│       ├── ChatBot/
│       ├── LandingPage/
│       ├── Result/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── app.js
│   └── server.js
│
└── README.md
```







## 🔄 Application Workflow

1. **User Visits:** The user accesses the DermaLens AI web application.
2. **Image Upload:** The user uploads an image of the affected skin area.
3. **Symptom Input:** The user provides symptoms, duration, body location, and pain level.
4. **AI Processing:** The backend sends the image and symptom information to Google Gemini AI.
5. **Assessment Generation:** The AI generates observations, possible causes, severity, urgency, and self-care guidelines.
6. **Data Storage:** The uploaded image and AI-generated assessment are stored in MongoDB.
7. **Results Display:** The frontend displays the assessment results.
8. **AI Chatbot:** The user can ask follow-up questions using the assessment context.









