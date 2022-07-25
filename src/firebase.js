import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth"



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const initFirebase = initializeApp(firebaseConfig)
const db = getFirestore(initFirebase)
const auth = getAuth()

const FireBase = {
    db: db,
    auth: auth,


    signup: function (email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    },

    login: function(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    },

    updateProfile: function(user, obj) {
        return updateProfile(user, obj)
    }

}

export default FireBase

export {addDoc, collection, getDocs}
