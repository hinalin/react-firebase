// import React, { useState, useEffect, useRef } from "react";
// import "../Question.css";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { fs } from "../../../config/Firebase";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import { AiOutlineCheck } from "react-icons/ai";

// const InDepthQuestions = ({
//   setActiveQuestion,
//   childQuestions,
//   setActiveStep,
//   currentPage,
//   setCurrentPage,
//   setIndepthProgress,
//   answeredQuestions,
//   setAnsweredQuestions,
//   nextClicked,
//   setNextClicked,
//   activeStep
// }) => {
//   const { user } = useFirebase();
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});

//   const userId = user ? user.uid : null;
//   const focusedQuestionRef = useRef(null);
//   console.log(userId, "userId");

//   useEffect(() => {
//     const parentIds = Object.keys(childQuestions);
//     for (let i = 0; i < parentIds.length; i++) {
//       const parentId = parentIds[i];
//       const unansweredChildIndex = childQuestions[parentId].findIndex(
//         (childQuestion) => !answeredQuestions[childQuestion.id]
//       );
//       if (unansweredChildIndex !== -1) {
//         setFocusedQuestion(childQuestions[parentId][unansweredChildIndex].id);
//         break;
//       }
//     }
//   }, [childQuestions, answeredQuestions]);

//   useEffect(() => {
//     if (focusedQuestionRef.current) {
//       focusedQuestionRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [focusedQuestion]);

//   // useEffect(() => {
//   //   const parentIds = Object.keys(childQuestions);
//   //   for (let i = 0; i < parentIds.length; i++) {
//   //     const parentId = parentIds[i];
//   //     const unansweredChildIndex = childQuestions[parentId].findIndex(
//   //       (childQuestion) => !answeredQuestions[childQuestion.id]
//   //     );
//   //     if (unansweredChildIndex !== -1) {
//   //       setFocusedQuestion(childQuestions[parentId][unansweredChildIndex].id);
//   //       break;
//   //     }
//   //   }

//   //   // Scroll to the focused question
//   //   if (focusedQuestionRef.current) {
//   //     focusedQuestionRef.current.scrollIntoView({
//   //       behavior: "smooth",
//   //       block: "center",
//   //     });
//   //   }
//   // }, [childQuestions, answeredQuestions, currentPage]);

//   useEffect(() => {
//     const fetchUserAnswers = async () => {
//       if (userId) {
//         try {
//           const userDocRef = doc(fs, "users", userId);
//           const userAnswersRef = collection(userDocRef, "answers-in-depth");
//           const userAnswersSnapshot = await getDocs(userAnswersRef);
//           userAnswersSnapshot.forEach((doc) => {
//             const { answer } = doc.data();
//             setSelectedAnswers((prevSelectedAnswers) => ({
//               ...prevSelectedAnswers,
//               [doc.id]: answer,
//             }));
//             setAnsweredQuestions((prevAnsweredQuestions) => ({
//               ...prevAnsweredQuestions,
//               [doc.id]: true,
//             }));
//           });
//         } catch (error) {
//           console.error("Error fetching user answers from Firestore: ", error);
//         }
//       }
//     };
//     fetchUserAnswers();
//   }, [userId]);

//   const handleNextPage = () => {
//     // if (currentPage === Object.keys(childQuestions).length - 1) {
//     //   setActiveQuestion("health-history");
//     // } else {
//     //   setCurrentPage(currentPage + 1);
//     //   setActiveStep(currentPage + 2);
//     // }
//     let hasUnansweredQuestion = false;

//     // Get the child questions of the current active step
//     const activeStepQuestions =
//       childQuestions[Object.keys(childQuestions)[currentPage]];

//     // Check if there are any unanswered questions in the current active step
//     const unansweredQuestion = activeStepQuestions.find(
//       (childQuestion) => !answeredQuestions[childQuestion.id]
//     );

//     // If an unanswered question is found, focus on it and set the flag to true
//     if (unansweredQuestion) {
//       hasUnansweredQuestion = true;
//       setFocusedQuestion(unansweredQuestion.id);
//     }

//     // If there are no unanswered questions, navigate to the next page
//     if (!hasUnansweredQuestion) {
//       if (currentPage === Object.keys(childQuestions).length - 1) {
//         setActiveQuestion("health-history");
//       } else {
//         setCurrentPage(currentPage + 1);
//         setActiveStep(currentPage + 2);
//       }

//       // Reset nextClicked state
//       setNextClicked(false);
//     } else {
//       // Set nextClicked state to trigger focus and border change
//       setNextClicked(true);
      
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage === 0) {
//       alert("You can not go");
//     } else {
//       setCurrentPage(currentPage - 1);
//       setActiveStep(activeStep-1)
//     }
//   };

//   const handleQuestionClick = (index) => {
//     if (index === focusedQuestion) {
//       setFocusedQuestion(null);
//     } else if (answeredQuestions[index]) {
//       setAnsweredQuestions({ ...answeredQuestions, [index]: false });
//       setFocusedQuestion(index === focusedQuestion ? null : index);
//     } else {
//       setFocusedQuestion(index === focusedQuestion ? null : index);
//     }
//   };

//   // const handleAnswerClick = (questionId, answer) => {
//   //   setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
//   //   setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
//   //   storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
//   //   // updateProgress();
//   // };

//   const handleAnswerClick = (questionId, answer) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
//     setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
//     setNextClicked(false);

//     // Calculate the total number of questions
//     const numQuestions = Object.keys(childQuestions).reduce(
//       (total, parentId) => total + childQuestions[parentId].length,
//       0
//     );

//     // Calculate the number of answered questions
//     const numAnsweredQuestions = Object.keys(answeredQuestions).length + 1;
//     console.log(numAnsweredQuestions, "numAnsweredQuestions");
//     const newProgress = (numAnsweredQuestions / numQuestions) * 100;
//     setIndepthProgress(Math.min(newProgress, 100));

//     storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
//   };

//   const storeAnswerToFirestore = async (questionId, answer, type) => {
//     try {
//       const userDocRef = doc(fs, "users", userId);
//       const userAnswersRef = collection(userDocRef, "answers-in-depth");
//       const answerDocRef = doc(userAnswersRef, questionId.toString());
//       await setDoc(answerDocRef, {
//         questionId: questionId,
//         answer: answer,
//         type: "indepth",
//       });
//       console.log("Answer stored in Firestore successfully!");
//     } catch (error) {
//       console.error("Error storing answer in Firestore: ", error);
//     }
//   };

//   return (
//     <>
//       {/* <p className="ms-3" style={{ fontWeight: "600", fontSize: "17px" }}>
//         {jsonData.map((question) => (
//           <React.Fragment key={question.id}>
//             {question.parentId === null && question.in_header_que && (
//               <p>{question.in_header_que}</p>
//             )}
//           </React.Fragment>
//         ))}
//         </p> */}
//       <div className="container">
//         <div className="InDepthQuestions-template">
//           {Object.keys(childQuestions).map((parentId, index) =>
//             index === currentPage
//               ? childQuestions[parentId].map((childQuestion, questionIndex) => (
//                   <div
//                     key={childQuestion.id}
//                     className={`unanswered-card ${
//                       focusedQuestion === childQuestion.id ? "focused-card" : ""
//                     } ${
//                       answeredQuestions[childQuestion.id] ? "answered-card" : ""
//                     }
//                     ${
//                       nextClicked === true &&
//                       focusedQuestion === childQuestion.id
//                         ? "border-red"
//                         : ""
//                     }
//                     `}
//                     onClick={() => handleQuestionClick(childQuestion.id)}
//                     ref={
//                       focusedQuestion === childQuestion.id
//                         ? focusedQuestionRef
//                         : null
//                     }
//                   >
//                     <div className="question">
//                       <p>{childQuestion.in_depth_question}</p>
//                     </div>
//                     {(answeredQuestions[childQuestion.id] ||
//                       selectedAnswers[childQuestion.id]) && (
//                       <div className="answer">
//                         <p>{selectedAnswers[childQuestion.id]}</p>
//                         {selectedAnswers[childQuestion.id] && (
//                           <div className="ticked-img-div">
//                             <AiOutlineCheck className="ticked-img" />
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     <div className="buttons">
//                       {focusedQuestion === childQuestion.id && (
//                         <div>
//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] === "Never" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Never")
//                             }
//                           >
//                             Never
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] === "Rarely" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Rarely")
//                             }
//                           >
//                             Rarely
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] ===
//                                 "Sometimes" && selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Sometimes")
//                             }
//                           >
//                             Sometimes
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] ===
//                                 "Frequently" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Frequently")
//                             }
//                           >
//                             Frequently
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] ===
//                                 "All the time" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(
//                                 childQuestion.id,
//                                 "All the time"
//                               )
//                             }
//                           >
//                             All the time
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               : null
//           )}
//         </div>

//         <div className="buttons">
//           <button className="btn" onClick={handlePreviousPage}>
//             Previous
//           </button>
//           <button className="btn" onClick={handleNextPage}>
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InDepthQuestions;


// import React, { useState, useEffect, useRef } from "react";
// import "../Question.css";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { fs } from "../../../config/Firebase";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import { AiOutlineCheck } from "react-icons/ai";

// const InDepthQuestions = ({
//   setActiveQuestion,
//   childQuestions,
//   setActiveStep,
//   currentPage,
//   setCurrentPage,
//   setIndepthProgress,
//   answeredQuestions,
//   setAnsweredQuestions,
//   nextClicked,
//   setNextClicked,
//   activeStep
// }) => {
//   const { user } = useFirebase();
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [assessmentId, setAssessmentId] = useState(null); // State to store assessment ID


//   const userId = user ? user.uid : null;
//   const focusedQuestionRef = useRef(null);
//   console.log(userId, "userId");
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const parentIds = Object.keys(childQuestions);
//     for (let i = 0; i < parentIds.length; i++) {
//       const parentId = parentIds[i];
//       const unansweredChildIndex = childQuestions[parentId].findIndex(
//         (childQuestion) => !answeredQuestions[childQuestion.id]
//       );
//       if (unansweredChildIndex !== -1) {
//         setFocusedQuestion(childQuestions[parentId][unansweredChildIndex].id);
//         break;
//       }
//     }
//   }, [childQuestions, answeredQuestions]);

//   useEffect(() => {
//     if (focusedQuestionRef.current) {
//       focusedQuestionRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [focusedQuestion]);

//   useEffect(() => {
//     const fetchUserAnswers = async () => {
//       if (userId) {
//         try {
//           const userDocRef = doc(fs, "users", userId);
//           const userAnswersRef = collection(userDocRef, "answers-in-depth");
//           const userAnswersSnapshot = await getDocs(userAnswersRef);
//           userAnswersSnapshot.forEach((doc) => {
//             const { answer } = doc.data();
//             setSelectedAnswers((prevSelectedAnswers) => ({
//               ...prevSelectedAnswers,
//               [doc.id]: answer,
//             }));
//             setAnsweredQuestions((prevAnsweredQuestions) => ({
//               ...prevAnsweredQuestions,
//               [doc.id]: true,
//             }));
//           });
//         } catch (error) {
//           console.error("Error fetching user answers from Firestore: ", error);
//         }
//       }
//     };
//     fetchUserAnswers();
//   }, [userId]);

//   const handleNextPage = () => {
//     let hasUnansweredQuestion = false;

//     // Get the child questions of the current active step
//     const activeStepQuestions =
//       childQuestions[Object.keys(childQuestions)[currentPage]];

//     // Check if there are any unanswered questions in the current active step
//     const unansweredQuestion = activeStepQuestions.find(
//       (childQuestion) => !answeredQuestions[childQuestion.id]
//     );

//     // If an unanswered question is found, focus on it and set the flag to true
//     if (unansweredQuestion) {
//       hasUnansweredQuestion = true;
//       setFocusedQuestion(unansweredQuestion.id);
//     }

//     // If there are no unanswered questions, navigate to the next page
//     if (!hasUnansweredQuestion) {
//       if (currentPage === Object.keys(childQuestions).length - 1) {
//         setActiveQuestion("health-history");
//       } else {
//         setCurrentPage(currentPage + 1);
//         setActiveStep(currentPage + 2);
//       }

//       // Reset nextClicked state
//       setNextClicked(false);
//     } else {
//       // Set nextClicked state to trigger focus and border change
//       setNextClicked(true);
      
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage === 0) {
//       alert("You can not go");
//     } else {
//       setCurrentPage(currentPage - 1);
//       setActiveStep(activeStep-1)
//     }
//   };

//   const handleQuestionClick = (index) => {
//     if (index === focusedQuestion) {
//       setFocusedQuestion(null);
//     } else if (answeredQuestions[index]) {
//       setAnsweredQuestions({ ...answeredQuestions, [index]: false });
//       setFocusedQuestion(index === focusedQuestion ? null : index);
//     } else {
//       setFocusedQuestion(index === focusedQuestion ? null : index);
//     }
//   };

//   const handleAnswerClick = (questionId, answer) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
//     setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
//     setNextClicked(false);

//     // Calculate the total number of questions
//     const numQuestions = Object.keys(childQuestions).reduce(
//       (total, parentId) => total + childQuestions[parentId].length,
//       0
//     );

//     // Calculate the number of answered questions
//     const numAnsweredQuestions = Object.keys(answeredQuestions).length + 1;
//     console.log(numAnsweredQuestions, "numAnsweredQuestions");
//     const newProgress = (numAnsweredQuestions / numQuestions) * 100;
//     setIndepthProgress(Math.min(newProgress, 100));

//     storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
//   };

//   const storeAnswerToFirestore = async (questionId, answer, type) => {
//     try {
//       const userDocRef = doc(fs, "users", userId);
//       const userAnswersRef = collection(userDocRef, "answers-in-depth");
//       const answerDocRef = doc(userAnswersRef, questionId.toString());
//       await setDoc(answerDocRef, {
//         questionId: questionId,
//         answer: answer,
//         type: "indepth",
//       });
//       console.log("Answer stored in Firestore successfully!");
//     } catch (error) {
//       console.error("Error storing answer in Firestore: ", error);
//     }
//   };

//   return (
//     <>
//       {/* <p className="ms-3" style={{ fontWeight: "600", fontSize: "17px" }}>
//         {jsonData.map((question) => (
//           <React.Fragment key={question.id}>
//             {question.parentId === null && question.in_header_que && (
//               <p>{question.in_header_que}</p>
//             )}
//           </React.Fragment>
//         ))}
//         </p> */}
//       <div className="container-fluid">
//         <div className="InDepthQuestions-template">
//           {Object.keys(childQuestions).map((parentId, index) =>
//             index === currentPage
//               ? childQuestions[parentId].map((childQuestion, questionIndex) => (
//                   <div
//                     key={childQuestion.id}
//                     className={`unanswered-card ${
//                       focusedQuestion === childQuestion.id ? "focused-card" : ""
//                     } ${
//                       answeredQuestions[childQuestion.id] ? "answered-card" : ""
//                     }
//                     ${
//                       nextClicked === true &&
//                       focusedQuestion === childQuestion.id
//                         ? "border-red"
//                         : ""
//                     }
//                     `}
//                     onClick={() => handleQuestionClick(childQuestion.id)}
//                     ref={
//                       focusedQuestion === childQuestion.id
//                         ? focusedQuestionRef
//                         : null
//                     }
//                   >
//                     <div className="question">
//                       <p>{childQuestion.in_depth_question}</p>
//                     </div>
//                     {(answeredQuestions[childQuestion.id] ||
//                       selectedAnswers[childQuestion.id]) && (
//                       <div className="answer">
//                         <p>{selectedAnswers[childQuestion.id]}</p>
//                         {selectedAnswers[childQuestion.id] && (
//                           <div className="ticked-img-div">
//                             <AiOutlineCheck className="ticked-img" />
//                           </div>
//                         )}
//                       </div>
//                     )}
//                     <div className="buttons">
//                       {focusedQuestion === childQuestion.id && (
//                         <div>
//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] === "Never" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Never")
//                             }
//                           >
//                             Never
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] === "Rarely" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Rarely")
//                             }
//                           >
//                             Rarely
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] ===
//                                 "Sometimes" && selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Sometimes")
//                             }
//                           >
//                             Sometimes
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] ===
//                                 "Frequently" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(childQuestion.id, "Frequently")
//                             }
//                           >
//                             Frequently
//                           </button>

//                           <button
//                             className={`${
//                               selectedAnswers[childQuestion.id] ===
//                                 "All the time" &&
//                               selectedAnswers[childQuestion.id]
//                                 ? "green"
//                                 : ""
//                             }`}
//                             onClick={() =>
//                               handleAnswerClick(
//                                 childQuestion.id,
//                                 "All the time"
//                               )
//                             }
//                           >
//                             All the time
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               : null
//           )}
//         </div>

//         <div className="buttons">
//           <button className="btn" onClick={handlePreviousPage}>
//             Previous
//           </button>
//           <button className="btn" onClick={handleNextPage}>
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InDepthQuestions;


import React, { useState, useEffect, useRef } from "react";
import "../Question.css";
import { useFirebase } from "../../../context/FirebaseContext";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AiOutlineCheck } from "react-icons/ai";

const InDepthQuestions = ({
  setActiveQuestion,
  childQuestions,
  setActiveStep,
  currentPage,
  setCurrentPage,
  setIndepthProgress,
  answeredQuestions,
  setAnsweredQuestions,
  nextClicked,
  setNextClicked,
  activeStep,
  assessmentCounter
}) => {
  const { user } = useFirebase();
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const userId = user ? user.uid : null;
  const focusedQuestionRef = useRef(null);
  console.log(userId, "userId");
  useEffect(() => {
    const parentIds = Object.keys(childQuestions);
    for (let i = 0; i < parentIds.length; i++) {
      const parentId = parentIds[i];
      const unansweredChildIndex = childQuestions[parentId].findIndex(
        (childQuestion) => !answeredQuestions[childQuestion.id]
      );
      if (unansweredChildIndex !== -1) {
        setFocusedQuestion(childQuestions[parentId][unansweredChildIndex].id);
        break;
      }
    }
  }, [childQuestions, answeredQuestions]);

  useEffect(() => {
    if (focusedQuestionRef.current) {
      focusedQuestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedQuestion]);


  const handleNextPage = () => {
    let hasUnansweredQuestion = false;

    // Get the child questions of the current active step
    const activeStepQuestions =
      childQuestions[Object.keys(childQuestions)[currentPage]];

    // Check if there are any unanswered questions in the current active step
    const unansweredQuestion = activeStepQuestions.find(
      (childQuestion) => !answeredQuestions[childQuestion.id]
    );

    // If an unanswered question is found, focus on it and set the flag to true
    if (unansweredQuestion) {
      hasUnansweredQuestion = true;
      setFocusedQuestion(unansweredQuestion.id);
    }

    // If there are no unanswered questions, navigate to the next page
    if (!hasUnansweredQuestion) {
      if (currentPage === Object.keys(childQuestions).length - 1) {
        setActiveQuestion("health-history");
      } else {
        setCurrentPage(currentPage + 1);
        setActiveStep(currentPage + 2);
      }

      // Reset nextClicked state
      setNextClicked(false);
    } else {
      // Set nextClicked state to trigger focus and border change
      setNextClicked(true);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage === 0) {
      alert("You can not go");
    } else {
      setCurrentPage(currentPage - 1);
      setActiveStep(activeStep - 1);
    }
  };

  const handleQuestionClick = (index) => {
    if (index === focusedQuestion) {
      setFocusedQuestion(null);
    } else if (answeredQuestions[index]) {
      setAnsweredQuestions({ ...answeredQuestions, [index]: false });
      setFocusedQuestion(index === focusedQuestion ? null : index);
    } else {
      setFocusedQuestion(index === focusedQuestion ? null : index);
    }
  };

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
    setNextClicked(false);
    storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
  };
  
  useEffect(() => {
    // updateProgress()
    const numQuestions = Object.keys(childQuestions).reduce(
      (total, parentId) => total + childQuestions[parentId].length,
      0
    );

    // Calculate the number of answered questions
    const numAnsweredQuestions = Object.keys(answeredQuestions).length ;
    console.log(numAnsweredQuestions, "numAnsweredQuestions");
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setIndepthProgress(Math.min(newProgress, 100));
  }, [answeredQuestions])

  const storeAnswerToFirestore = async (questionId, answer) => {
    try {
      // Retrieve assessment counter from local storage
      // const assessmentCounter = getAssessmentCounter();

      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentCounter.toString()
      );
      const answersRef = collection(assessmentDocRef, "answers_indepth");
      const answerDocRef = doc(answersRef, questionId.toString());
      await setDoc(answerDocRef, {
        questionId: questionId,
        answer: answer,
        type: "indepth",
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  
  useEffect(() => {
    const fetchUserAnswers = async () => {
      if (userId) {
        try {
          const userDocRef = doc(fs, "users", userId);
          const assessmentDocRef = doc(
            userDocRef,
            "assessment",
            assessmentCounter.toString()
          );
          const answersRef = collection(assessmentDocRef, "answers_indepth");
          const userAnswersSnapshot = await getDocs(answersRef);
          userAnswersSnapshot.forEach((doc) => {
            const { answer } = doc.data();
            setSelectedAnswers((prevSelectedAnswers) => ({
              ...prevSelectedAnswers,
              [doc.id]: answer,
            }));
            setAnsweredQuestions((prevAnsweredQuestions) => ({
              ...prevAnsweredQuestions,
              [doc.id]: true,
            }));
          });
        } catch (error) {
          console.error("Error fetching user answers from Firestore: ", error);
        }
      }
    };
    fetchUserAnswers();
  }, [userId]);

  return (
    <>
      <div className="container-fluid">
        <div className="InDepthQuestions-template">
          {Object.keys(childQuestions).map((parentId, index) =>
            index === currentPage
              ? childQuestions[parentId].map((childQuestion, questionIndex) => (
                  <div
                    key={childQuestion.id}
                    className={`unanswered-card ${
                      focusedQuestion === childQuestion.id ? "focused-card" : ""
                    } ${
                      answeredQuestions[childQuestion.id]
                        ? "answered-card"
                        : ""
                    }
                    ${
                      nextClicked === true &&
                      focusedQuestion === childQuestion.id
                        ? "border-red"
                        : ""
                    }
                    `}
                    onClick={() => handleQuestionClick(childQuestion.id)}
                    ref={
                      focusedQuestion === childQuestion.id
                        ? focusedQuestionRef
                        : null
                    }
                  >
                    <div className="question">
                      <p>{childQuestion.in_depth_question}</p>
                    </div>
                    {(answeredQuestions[childQuestion.id] ||
                      selectedAnswers[childQuestion.id]) && (
                      <div className="answer">
                        <p>{selectedAnswers[childQuestion.id]}</p>
                        {selectedAnswers[childQuestion.id] && (
                          <div className="ticked-img-div">
                            <AiOutlineCheck className="ticked-img" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="buttons">
                      {focusedQuestion === childQuestion.id && (
                        <div>
                          <button
                            className={`${
                              selectedAnswers[childQuestion.id] === "Never" &&
                              selectedAnswers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Never")
                            }
                          >
                            Never
                          </button>

                          <button
                            className={`${
                              selectedAnswers[childQuestion.id] === "Rarely" &&
                              selectedAnswers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Rarely")
                            }
                          >
                            Rarely
                          </button>

                          <button
                            className={`${
                              selectedAnswers[childQuestion.id] ===
                                "Sometimes" && selectedAnswers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Sometimes")
                            }
                          >
                            Sometimes
                          </button>

                          <button
                            className={`${
                              selectedAnswers[childQuestion.id] ===
                                "Frequently" &&
                              selectedAnswers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Frequently")
                            }
                          >
                            Frequently
                          </button>

                          <button
                            className={`${
                              selectedAnswers[childQuestion.id] ===
                                "All the time" &&
                              selectedAnswers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(
                                childQuestion.id,
                                "All the time"
                              )
                            }
                          >
                            All the time
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : null
          )}
        </div>

        <div className="buttons">
          <button className="btn" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="btn" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default InDepthQuestions;
