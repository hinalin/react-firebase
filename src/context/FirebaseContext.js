import { createContext, useContext, useEffect, useId, useState } from "react";
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
import { setDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";

const firebaseContext = createContext();
export const useFirebase = () => useContext(firebaseContext);

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  // const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    authChange();
  }, []);

  const signUpUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential, "userCredential");

      const newUser = userCredential.user;

      await setDoc(doc(fs, "users", newUser.uid), {
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

  const googleSignInUser = async () => {
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleAuthProvider);

      if (result.user) {
        const { uid, email } = result.user;
        const userDocRef = doc(fs, "users", uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          console.log("User exists in Firestore. Logging in...");
        } else {
          console.log(
            "User does not exist in Firestore. Creating a new document..."
          );
          await setDoc(userDocRef, {
            userId: uid,
            email: email,
          });
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
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

  // const fetchHealthHistoryAnswers = async (
  //   userId,
  //   assessmentIdRef,
  //   setAnswers,
  //   setSelectedOptions
  // ) => {
  //   if (!assessmentIdRef.current) {
  //     console.error("Assessment ID is null or undefined");
  //     return;
  //   }
  //   else{
  //     console.log('found');
  //   }
  //   try {
  //     const userDocRef = doc(fs, "users", userId);
  //     const assessmentDocRef = doc(
  //       userDocRef,
  //       "assessment",
  //       assessmentIdRef.current
  //     );
  //     const answersRef = collection(assessmentDocRef, "answers_health-history");
  //     const querySnapshot = await getDocs(answersRef);
  //     const fetchedAnswers = {};
  //     const fetchedSelectedOptions = {};
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       fetchedAnswers[data.questionId] = data.answer;
  //       fetchedSelectedOptions[data.questionId] = data.selectedOptions;
  //     });
  //     setAnswers(fetchedAnswers);
  //     setSelectedOptions(fetchedSelectedOptions);
  //   } catch (error) {
  //     console.error("Error fetching documents: ", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchUserAnswersFromFirestore = async (
  //   userId,
  //   assessmentIdRef,
  //   setAnswers
  // ) => {
  //   try {
  //     const userDocRef = doc(fs, "users", userId);
  //     const assessmentDocRef = doc(
  //       userDocRef,
  //       "assessment",
  //       assessmentIdRef.current
  //     );
  //     const answersRef = collection(assessmentDocRef, "answers-life-functions");
  //     const userAnswersSnapshot = await getDocs(answersRef);
  //     const loadedAnswers = {};
  //     userAnswersSnapshot.forEach((doc) => {
  //       loadedAnswers[doc.id] = doc.data().answer;
  //     });
  //     setAnswers(loadedAnswers); // Set the answers state with fetched answers
  //   } catch (error) {
  //     console.error("Error loading user answers from Firestore: ", error);
  //   }
  // };
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
        loading,
        setLoading,
        // fetchHealthHistoryAnswers,
        // setSelectedOptions,
        // selectedOptions,
        // fetchUserAnswersFromFirestore,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};
