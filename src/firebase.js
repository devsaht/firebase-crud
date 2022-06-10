import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDWT0N5tekPxF_Rk87kBPO36zP7O4S8M6M",
    authDomain: "crud-example-838b5.firebaseapp.com",
    projectId: "crud-example-838b5",
    storageBucket: "crud-example-838b5.appspot.com",
    messagingSenderId: "579036357087",
    appId: "1:579036357087:web:7fbdb75bf5d8af854be46a",
    measurementId: "G-GCYR7R72C3"
};

// Initialize Firebase

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore()

//   firebase.analytics();
