import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDPB4R4rNHbDKbdhiRJnLwZ9NiJ3aY9Y0o',
  authDomain: 'crwn-db-bfe3e.firebaseapp.com',
  projectId: 'crwn-db-bfe3e',
  storageBucket: 'crwn-db-bfe3e.appspot.com',
  messagingSenderId: '711246199538',
  appId: '1:711246199538:web:e0834c2008e63813a3ee6b',
  measurementId: 'G-VCB578FREF',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // async API call to query database
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // async API call to add document to database
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
