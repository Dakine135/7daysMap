import { createApp } from "vue";
import { createPinia } from "pinia";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB7tRHEl6hE6OW_tEG4RqP5w3T4UoBuFG4",
//   authDomain: "daysmap-f3b25.firebaseapp.com",
//   projectId: "daysmap-f3b25",
//   storageBucket: "daysmap-f3b25.appspot.com",
//   messagingSenderId: "878576659959",
//   appId: "1:878576659959:web:f44fdc4c096627db6192f2",
//   measurementId: "G-YST5MR0LQ2",
// };

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
