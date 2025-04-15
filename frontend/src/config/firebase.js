import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDJbUEXlvsCIS4UjREbKwOuKsq1nEETIjE",
  authDomain: "codequest-d0956.firebaseapp.com",
  projectId: "codequest-d0956",
  storageBucket: "codequest-d0956.firebasestorage.app",
  messagingSenderId: "733755178723",
  appId: "1:733755178723:web:7f0e8a46e850c715d7cfd6",
  measurementId: "G-RMHFJ7CCCG",
};

const app = initializeApp(firebaseConfig);

export default app;