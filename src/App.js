import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Todo from './components/Todo';
import Upload from './components/Upload'
import './styles/main.css';
import { saveUserInformation, updateUserInformation } from './lib/firebase'
/* スタイルシート */

const firebaseConfig = {
  apiKey: "AIzaSyDE0ZRKjIjWUn9JfCcT-WGjOYJEgFpINXM",
  authDomain: "itss-training-firebase.firebaseapp.com",
  projectId: "itss-training-firebase",
  storageBucket: "itss-training-firebase.appspot.com",
  messagingSenderId: "355192140055",
  appId: "1:355192140055:web:a860f5dbec305f68e9c752"
};

firebase.initializeApp(firebaseConfig)

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

/* コンポーネント */

function App() {

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [userAfterLogin, setUserAfterLogin] = useState(null)

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      const dataUserAfterLogin = await saveUserInformation(user)
      setUserAfterLogin(dataUserAfterLogin)
      setIsSignedIn(!!dataUserAfterLogin);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleImageChanged = async imgUrl => {
    await updateUserInformation(userAfterLogin, imgUrl);
  }


  if (!isSignedIn) {
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }

  return (
    <div className="container is-fluid">

      <p>{firebase.auth().currentUser.displayName}</p>
      <div class="navbar-item">
        <Upload userImage={userAfterLogin.image} onSelectedImage={handleImageChanged} userAfterLogin={userAfterLogin} />
        {userAfterLogin.name}
      </div>

      <a onClick={() => firebase.auth().signOut()}>Logout</a>
      <Todo />
    </div>
  );
}

export default App;
