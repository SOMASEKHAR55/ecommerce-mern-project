import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8EQjAtJrjjFIM84WjzkhUNaik_gqOdVo",
  authDomain: "clothing-store-5dbc2.firebaseapp.com",
  projectId: "clothing-store-5dbc2",
  storageBucket: "clothing-store-5dbc2.appspot.com",
  messagingSenderId: "433718608544",
  appId: "1:433718608544:web:df9578d14f80ba8bfa3fc5",
  measurementId: "G-V6KHQ488ZM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

