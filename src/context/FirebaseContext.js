import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db, fs } from "../config/Firebase";
import { set, ref } from "firebase/database";
import { collection, doc, getDoc, setDoc, updateDoc , addDoc} from "firebase/firestore";

const firebaseContext = createContext();
export const useFirebase = () => useContext(firebaseContext);

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    authChange();
  }, []);

  //   const signUpUser = async (email, password, confirmPassword) => {
  //     try {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //     } catch (error) {
  //       throw error;
  //     }
  //     console.log(user , "user");
  //   };

  const signUpUser = async (email, password, confirmPassword) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential, "userCredential");

      const newUser = userCredential.user;

      await set(ref(db, `users/${newUser.uid}`), {
        email: newUser.email,
      });

      await addDoc(collection(fs, "users"), {
        userId: newUser.uid,
        email: newUser.email,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  const googleSignInUser = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const resetUserPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      throw err;
    }
  };

  const setUpRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "small",
      }
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

  const authChange = () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  };

  return (
    <firebaseContext.Provider
      value={{
        user,
        signUpUser,
        signInUser,
        logOutUser,
        googleSignInUser,
        resetUserPassword,
        setUpRecaptcha,
        authChange,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
