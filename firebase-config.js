
// ==========================================
// إعدادات قاعدة بيانات Firebase (للتفعيل الحقيقي)
// ==========================================
// 1. قم بإنشاء مشروع على Firebase (firebase.google.com)
// 2. قم بتفعيل Authentication (Email/Password)
// 3. قم بتفعيل Firestore Database
// 4. استبدل المتغيرات أدناه بالقيم الخاصة بمشروعك
// ==========================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD45c4LVv6Z3xxfx3uHZWEaEJLOSsdhAY",
  authDomain: "e-learning-3eb30.firebaseapp.com",
  projectId: "e-learning-3eb30",
  storageBucket: "e-learning-3eb30.firebasestorage.app",
  messagingSenderId: "767236265094",
  appId: "1:767236265094:web:8ea58b94ffd114313fad07",
  measurementId: "G-93CXZRVCR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// فحص بسيط إذا كان المستخدم قد أضاف الـ API Key الحقيقي
if (firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
    // تهيئة Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    
    // حفظ الكائن في المتغير العام لكي يتعرف عليه ملف script-main.js
    window.firebaseApp = app;
    console.log("🔥 Firebase is successfully initialized!");
} else {
    console.warn("⚠️ Firebase is NOT initialized. Please update firebase-config.js. App is running in Local Mock Mode.");
    window.firebaseApp = null;
}
