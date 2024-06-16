import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
  
} from "firebase/auth";
import { RegisterProps } from "./types/registerProps";
import { addDoc, collection, getFirestore, } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const register = async ({
  email,
  password,
}: RegisterProps): Promise<UserCredential> => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const login = async ({
  email,
  password,
}: RegisterProps): Promise<UserCredential> => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addTodoToDb = async (data: any) => {
  const result = await addDoc(collection(db, "todos"), data);
  console.log(result);
};

// onSnapshot(collection(db, "todos"), (doc) => {
//   console.log(
//     doc.docs.map(todo => todo.id)
//   )
//   console.log("Current data: ", doc.docs);
// });