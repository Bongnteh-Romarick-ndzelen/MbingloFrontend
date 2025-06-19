# ⚽ Mbinglo FC - Frontend

> A modern, responsive web application for Mbinglo FC, featuring real-time chat, match tracking, and player engagement.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screens & Routes](#screens--routes)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 Overview

**Mbinglo FC Frontend** is the user interface for a football club platform that allows players and fans to interact, stay updated on matches, and communicate in real time. The app is designed to be clean, user-friendly, and responsive across all devices.

---

## ✨ Features

- **🏠 Home Page:** General overview of the club with latest announcements.
- **ℹ️ About Page:** Mission, vision, and history of Mbinglo FC.
- **📅 Matches Section:**
  - Upcoming Matches
  - Past Matches with results
- **💬 Chat:** Real-time group chat accessible to logged-in users and players.
- **👤 Profile Page:** View and update personal info.
- **🔐 Authentication:** Secure login for players and users (handled via backend).

---

## 🛠 Tech Stack

- **Frontend Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** Context API (or Redux if applicable)
- **Emoji Support:** (If used) `emoji-picker-react` or similar
- **Icons:** React Icons / HeroIcons

---

## 🧭 Screens & Routes

| Route                | Description                    |
| -------------------- | ------------------------------ |
| `/`                  | Home page                      |
| `/about`             | About Mbinglo FC               |
| `/matches`           | Matches overview               |
| `/matches/upcoming`  | Upcoming match fixtures        |
| `/matches/past`      | Past matches and scores        |
| `/chat`              | Group chat for logged-in users |
| `/profile`           | User/player profile page       |
| `/login` / `/signup` | Authentication screens         |

---

## 📁 Folder Structure

mbinglo-frontend/
├── public/
├── src/
│ ├── assets/ # Images, icons, etc.
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-level components (Home, About, Matches, etc.)
│ ├── context/ # Global state providers
│ ├── hooks/ # Custom React hooks
│ ├── services/ # API service helpers
│ ├── styles/ # Tailwind configs or global styles
│ ├── App.jsx # App shell with routing
│ └── main.jsx # React DOM entry point
├── .env # Environment config
├── package.json
└── vite.config.js
