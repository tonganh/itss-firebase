import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDE0ZRKjIjWUn9JfCcT-WGjOYJEgFpINXM",
    authDomain: "itss-training-firebase.firebaseapp.com",
    projectId: "itss-training-firebase",
    storageBucket: "itss-training-firebase.appspot.com",
    messagingSenderId: "355192140055",
    appId: "1:355192140055:web:a860f5dbec305f68e9c752"
};

firebase.initializeApp(firebaseConfig)