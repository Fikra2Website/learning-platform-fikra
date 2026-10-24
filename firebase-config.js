
// ==========================================
// إعدادات قاعدة بيانات Firebase (للتفعيل الحقيقي)
// ==========================================
// 1. قم بإنشاء مشروع على Firebase (firebase.google.com)
// 2. قم بتفعيل Authentication (Email/Password)
// 3. قم بتفعيل Firestore Database
// 4. استبدل المتغيرات أدناه بالقيم الخاصة بمشروعك
// ==========================================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

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
