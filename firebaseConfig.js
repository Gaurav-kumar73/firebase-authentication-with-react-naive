// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, GoogleAuthProvider, initializeAuth, signInWithCredential } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDySChiB_LRKOWDZ1Btftt-nqHiIllxISk",
  authDomain: "assessment-8d38d.firebaseapp.com",
  projectId: "assessment-8d38d",
  storageBucket: "assessment-8d38d.firebasestorage.app",
  messagingSenderId: "253725383536",
  appId: "1:253725383536:web:95a9f669bba204947e4db5",
  measurementId: "G-JZHBYL7GFW"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, GoogleAuthProvider, signInWithCredential };

