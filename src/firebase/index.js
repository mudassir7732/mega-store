import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwll7kFNQln02GPEeNdkU3IVhMDYZWEaQ",
  authDomain: "todo-app-6ddc5.firebaseapp.com",
  projectId: "todo-app-6ddc5",
  storageBucket: "gs://todo-app-6ddc5.appspot.com",
  messagingSenderId: "300954881762",
  appId: "1:300954881762:web:b68fa2f45869ab81e758bb"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export {db};