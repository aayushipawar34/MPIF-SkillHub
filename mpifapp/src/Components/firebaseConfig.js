import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-9fuc99_wPimpRsS62YrrE0zq5DF6m3I",
  authDomain: "mpif-skillhub.firebaseapp.com",
  projectId: "mpif-skillhub",
  storageBucket: "mpif-skillhub.firebasestorage.app",
  messagingSenderId: "754157086526",
  appId: "1:754157086526:web:64494108c10c1912ee2e6f",
  measurementId: "G-1TJCQBFGXQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
