# AdoPet – Client

Welcome to the **AdoPet** client repository! 🐾  
This is the **frontend** part of the AdoPet adoption system – a platform that helps users find and adopt the perfect pet for them.

## 🌐 Live Demo

- **Client (Netlify):** [https://adopet-client.netlify.app](https://adopet-client.netlify.app)  
- **Server (Render):** [https://adopet-server.onrender.com](https://adopet-server.onrender.com)

> Make sure the Render server is awake (may take a few seconds to load on first visit).

---

## 📁 Project Structure

```
client/
├── assets/             # Images and icons
├── css/                # Stylesheets
├── js/                 # JavaScript files (thanks.js etc.)
├── admin-*.html        # Admin screens (dashboard, stats, requests)
├── client-profile.html # Client area showing submitted requests
├── donate.html         # Donation form
├── login.html          # Login screen
├── pets.html           # Pet filtering and display
├── pet-profile.html    # Detailed pet info
├── questions.html      # Questionnaire
├── register.html       # Sign up screen
├── thanks.html         # Thank-you + donation prompt
└── README.md           # This file
```

---

## 🚀 How It Works

- Users can **register** or **login**
- After answering a **questionnaire**, matching pets are shown
- Clicking a pet opens its **profile**
- Clicking "Take me home!" opens the **adoption form**
- Once submitted, the user is redirected to a **thank-you** page with an option to donate
- Admins can log in and manage **pets**, **requests**, and see **system stats**

---

## 🔗 API

This frontend communicates with the **AdoPet backend**, hosted on Render:

```
Base URL: https://adopet-server.onrender.com
```

All `fetch()` requests are connected to this API.

---

## 🛠️ Tech Stack

- **HTML + CSS** – static structure and styling
- **JavaScript** – client-side logic and API calls
- **LocalStorage** – for storing session/user data
- **Netlify** – for hosting this static frontend
- **Render** – backend server (MongoDB + Express)

---

## 📦 Deployment

This repository is meant to be deployed to **Netlify**:

- Set `client/` as the **publish directory**
- No build command is required (static project)

---

## 👩‍💻 Author

Developed by **Safana D.** as part of a full-stack web project.  
Backend repo: [adopet-server](https://github.com/safana1208/adopet-server)

---

## 📸 Screenshots

![Login](assets/screenshot-login.png)  
![Pets](assets/screenshot-pets.png)  
![Admin Dashboard](assets/screenshot-admin.png)

---

## 📜 License

This project is for educational and non-commercial use.
