import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB_Uo_bVL4OjhI5t_hrH2lKgFJjRSf0eIQ",
  authDomain: "meriendas-app.firebaseapp.com",
  projectId: "meriendas-app",
  storageBucket: "meriendas-app.appspot.com",
  messagingSenderId: "331012338912",
  appId: "1:331012338912:web:22707be1dd3bb3b272cc85",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
