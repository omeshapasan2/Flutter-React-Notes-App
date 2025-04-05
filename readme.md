# HyperNotes 📝

![logo](https://github.com/user-attachments/assets/fbf9b12c-9f81-452f-9da8-b55a2b3744e1)

## 🌐 Demo

Visit our live demo site: [https://notes.omeshapasan.site](https://notes.omeshapasan.site)

## Overview
HyperNotes is a modern, cross-platform note-taking application designed to help you capture, organize, and sync your thoughts seamlessly across devices.

## 🚀 Features

- **Cross-Platform Sync**: Seamless synchronization between mobile and web versions
- **Folder Notes**: Organize notes with custom labels
- **Picture Support**: Embed and attach images to your notes
- **Advanced Search**: Quickly find notes with powerful search functionality
- **Link Support**: Add and track links within your notes
- **To-Do Lists**: Create and manage task lists
- **Note Sharing**: Export notes as .txt or .pdf

## 🛠 Tech Stack

- Frontend: React
- Mobile: Flutter
- Backend: Firebase
- Database: Firestore

## 📦 Installation

### Prerequisites
- npm or Yarn
- Firebase Account

### Clone the Repository
```bash
git clone https://github.com/omeshapasan2/Flutter-React-Notes-App.git
cd hyper-notes-react
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

## 🔥 Setting Up Firebase

### If Your Web App Is Not Set Up  
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.  
2. Click the **+ Add App** button on the Overview page and select **Web**.  
3. Follow the setup instructions, install the Firebase package via `npm`, and copy the provided code into a new file named **`firebase.jsx`**.

### If Your Web App Is Already Set Up  
1. Open the [Firebase Console](https://console.firebase.google.com/) and navigate to your project.  
2. Inside your project directory, create a file at **`hyper-notes/src/firebase/firebase.jsx`**.  
3. Copy and paste the following code into `firebase.jsx`, replacing the placeholders with the actual values from:  
   **Firebase Console → Your Project → Project Settings → Web App (SDK Setup & Configuration).**  

```jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "REACT_APP_FIREBASE_API_KEY",
  authDomain: "REACT_APP_FIREBASE_AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

Make sure to replace the placeholder values with your actual Firebase credentials. 🚀

### Run the Application
```bash
npm start
# or
yarn start
```



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Omesha Pasan - youremail@example.com

Project Link: [https://github.com/omeshapasan2/Flutter-React-Notes-App](https://github.com/omeshapasan2/Flutter-React-Notes-App)

## 🌟 Acknowledgements

- React
- Firebase
- Tailwind CSS
- Flutter