import firebase from "firebase";

if (firebase.apps.length === 0) {
  const myFirebase = firebase.initializeApp({
    apiKey: "AIzaSyDNjju0KPvyfK4xuumMSI772Wac3THdC1c",
    authDomain: "cynefin-7e404.firebaseapp.com",
    projectId: "cynefin-7e404",
    storageBucket: "cynefin-7e404.appspot.com",
    messagingSenderId: "101694009905",
    appId: "1:101694009905:web:4f2cc7245f1527f47e5b10",
    measurementId: "G-6KPKQ89F9W",
  });
}

const myFirestore = firebase.firestore();
const myFireauth = firebase.auth();

export { myFireauth, myFirestore };
