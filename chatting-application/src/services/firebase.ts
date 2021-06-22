import firebase from "firebase";
import { firebaseConfig } from "../keys/firebaseConfig";

firebase.initializeApp(firebaseConfig);

console.log(firebase);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
