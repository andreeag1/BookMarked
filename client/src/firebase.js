import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASgfBXY2yxd9ZI_qKgHYEgpdwLWi3f_lA",
  authDomain: "bookmarked-390716.firebaseapp.com",
  projectId: "bookmarked-390716",
  storageBucket: "bookmarked-390716.appspot.com",
  messagingSenderId: "607661674317",
  appId: "1:607661674317:web:90c1a6238db98b8969f104",
  measurementId: "G-4ZCEYQJQ05",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
