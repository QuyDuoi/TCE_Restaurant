// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBjev1aJF2rQ6dn76nAa1bYv2dTYI5A5hE",
    authDomain: "tce-firebase-main-74c1b.firebaseapp.com",
    projectId: "tce-firebase-main-74c1b",
    messagingSenderId: "290015602869",
    appId: "1:290015602869:android:2a02d99d84a73ad8f7f6fc",
};

const app = initializeApp(firebaseConfig);
const authcn = getAuth(app);

export { authcn };
