# MERN Music Player (Music Cloud)
A modern full-stack music cloud application built with the MERN stack, featuring React and Tailwind CSS on the frontend, Redux Toolkit for efficient state management, and a Node.js + Express backend secured with JWT authentication. This project demonstrates scalable RESTful API design, audio file management, protected routes, and seamless integration between frontend and backend for streaming and managing music content.

## Features
- 🔐 User registration and login with JWT authentication
- 📂 Music upload functionality (MP3)
- 🎵 Audio streaming directly from the cloud
- 🎧 Playlist creation and management

## Technologies Used
- React
- Express 
- Node Js (v22.12.0)
- MongoDB
- NPM
- TailwindCSS

## Installation
1.  **Clone the repository:**

    ```bash
    git clone <repository-url> MERN-Music-Cloud
    cd MERN-Music-Cloud
    ```

2.  **Install Dependencies:**
    
    ```bash
    cd backend;
    npm install
    cd ../frontend;
    npm install
    ```

## Configuration
1. **Database Setup:** `Open backend/.env.example`, copy to `.env`, and configure your MongoDB database connection details:

    ```bash
    # Database Configuration
    PORT=2000
    DB_CONNECTION=mongodb://127.0.0.1:27017/user_db_name  # Replace 'user_db_name' with your actual database name
    SECRET_ACCESS_TOKEN=<generate_token>
    SECRET_REFRESH_TOKEN=<generate_token>
    SAME_SITE=Lax
    ENV_SECURE=false
    ```

## Run
If you want to use dev mode, run both backend and frontend:

    ```bash
    // MERN-Music-Cloud/backend
    npm run dev
    // MERN-Music-Cloud/frontend
    npm run dev
    ```

If you want to use build mode, run both backend and frontend:

    ```bash
    // MERN-Music-Cloud/backend
    npm run dev
    // MERN-Music-Cloud/frontend
    npm run build
    npm run preview  # or use `npm start` if preview is not valid
    ```

> ⚠️ **Warning:** Be careful when you change the backend PORT as it might affect your server's accessibility.
