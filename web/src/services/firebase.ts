import firebase from "firebase";
import { firebaseConfig } from "../keys/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
