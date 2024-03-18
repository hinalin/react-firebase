import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth';
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
    apiKey: "AIzaSyCzNhX7h6x9hohZHxgdI-eI885u9u0oHH4",
    authDomain: "feel-better-now-76ebf.firebaseapp.com",
    projectId: "feel-better-now-76ebf",
    storageBucket: "feel-better-now-76ebf.appspot.com",
    messagingSenderId: "591826824773",
    appId: "1:591826824773:web:54eafc47608986c290bd2c",
    // measurementId: "G-WJFECB14DJ"
    databaseURL : 'https://feel-better-now-76ebf-default-rtdb.firebaseio.com/'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
