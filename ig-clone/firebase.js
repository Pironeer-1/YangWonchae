import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAr2T7mFH5QQ961cqDQvOqDrd_Rdg_bYvw",
    authDomain: "ig-clone-6ad9d.firebaseapp.com",
    projectId: "ig-clone-6ad9d",
    storageBucket: "ig-clone-6ad9d.appspot.com",
    messagingSenderId: "310714635633",
    appId: "1:310714635633:web:fcace78607fd0da63152d0"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };