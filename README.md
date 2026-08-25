# Smart-trip 🚀

[![React](https://img.shields.io/badge/React-17.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-purple?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

**Smart-trip** is an AI-powered trip planner that helps you generate, manage, and view personalized trips easily. Built with **React**, **TypeScript**, **Firebase Firestore**, and **Gemini**, it offers a seamless travel planning experience.

---

## 🌟 Features

- **One-Click Login** – Quick authentication via Firebase.
- **Generate Trip** – AI-powered travel itinerary generation.
- **View Trip** – Browse and manage all your planned trips.
- **Responsive Design** – Works smoothly on desktop and mobile.
- **Realtime Database** – Firestore integration for secure data storage.

---

## 📸 Screenshots

![Login Screen](https://github.com/Sharkyyyx28/Smart-trip/raw/main/public/1.png)
![Generate Trip](https://github.com/Sharkyyyx28/Smart-trip/raw/main/public/3.png)
![View Trip](https://github.com/Sharkyyyx28/Smart-trip/raw/main/public/4.png)
![Another Feature](https://github.com/Sharkyyyx28/Smart-trip/raw/main/public/5.png)
![Dashboard](https://github.com/Sharkyyyx28/Smart-trip/raw/main/public/2.png)

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend/Database:** Firebase Firestore
- **AI Integration:** Gemini
- **Package Manager:** PNPM

---

## 📁 Project Structure

```
Smart-trip/
├─ public/                 # Static assets
├─ src/                    # React source code
│  ├─ components/          # Reusable UI components
│  ├─ pages/               # Application pages
│  └─ service/             # Firebase & API services
├─ package.json             # Project dependencies
├─ tsconfig.json            # TypeScript config
├─ vite.config.ts           # Vite config
└─ README.md
```

---

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sharkyyyx28/Smart-trip.git
cd Smart-trip
```

### 2. Install Dependencies

```bash
npm install -g pnpm       # Install pnpm globally if needed
pnpm install              # Install project dependencies
```

### 3. Configure Environment Variables

Create a local env file from the example and add your real keys:

```bash
# macOS/Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

Required variables:

- `VITE_GEMINI_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔗 Usage

1. Click **Login** to sign in using Firebase authentication.
2. Use **Generate Trip** to create a personalized trip plan.
3. Go to **View Trip** to see all saved trips.

---

## 📄 License

This project currently has no specified license. Contact the repository owner for usage permissions.

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

---

## 📧 Contact

For questions, suggestions, or feedback, reach out via GitHub: [Sharkyyyx28](https://github.com/Sharkyyyx28)

---