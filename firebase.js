import firebase from 'firebase'
import * as firebaseConfig from './firebase.config.json';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = !firebase.apps.length ?
    firebase.initializeApp(firebaseConfig) :
    firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {db, auth, googleAuthProvider};
