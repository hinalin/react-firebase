// import React, { useState } from "react";
// import "../Question.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import NavigationBar from "../../../components/NavigationBar/NavigationBar";
// import AssessmentProgress from "../AssessmentProgress";
// import { useFirebase } from "../../../context/FirebaseContext";
// import Footer from "../../../components/Footer/Footer";

// const InDepthQuestions = () => {
//   const { user } = useFirebase();
//   const location = useLocation();
//   const childQuestions = location.state.childQuestions;
//   const stepCount = Object.keys(childQuestions).length;
//   const navigate = useNavigate();

//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [answeredQuestions, setAnsweredQuestions] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);

//   const handleNextPage = () => {
//     if (currentPage === Object.keys(childQuestions).length - 1) {
//       navigate("/HelthHistoryQuestions ");
//     } else {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage(currentPage - 1);
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
//     setFocusedQuestion(null);
//   };

//   return (
//     <>
//       <div className="StartAssessment-template">
//         <div className="header">
//           <NavigationBar user={user} />
//         </div>
//         <div className="StartAssessmentCard">
//           <div className="row">
//             <div className="col-4">
//               <AssessmentProgress stepCount={stepCount} />
//             </div>
//             <div className="col-8">
//               <p
//                 className="ms-3"
//                 style={{ fontWeight: "600", fontSize: "17px" }}
//               >
//                 You mentioned experiencing sustained feelings of excitement or
//                 anger that others thought you were not your normal self. During
//                 that time, how often did you feel:
//               </p>
//               <div className="container">
//                 <div className="InDepthQuestions-template">
//                   {Object.keys(childQuestions).map((parentId, index) =>
//                     index === currentPage
//                       ? childQuestions[parentId].map(
//                           (childQuestion, questionIndex) => (
//                             <div
//                               key={childQuestion.id}
//                               className={`unanswered-card ${
//                                 focusedQuestion === childQuestion.id
//                                   ? "focused-card"
//                                   : ""
//                               } ${
//                                 answeredQuestions[childQuestion.id]
//                                   ? "answered-card"
//                                   : ""
//                               }`}
//                               onClick={() =>
//                                 handleQuestionClick(childQuestion.id)
//                               }
//                             >
//                               {/* <h6>step {index + 1} </h6> */}
//                               <div className="question">
//                                 <p>{childQuestion.in_depth_question}</p>
//                               </div>
//                               {(answeredQuestions[childQuestion.id] ||
//                                 selectedAnswers[childQuestion.id]) && (
//                                 <div className="answer">
//                                   <p>{selectedAnswers[childQuestion.id]}</p>
//                                 </div>
//                               )}
//                               <div className="buttons">
//                                 {focusedQuestion === childQuestion.id && (
//                                   <div>
//                                     <button
//                                       className={`${
//                                         selectedAnswers[childQuestion.id] ===
//                                           "Never" &&
//                                         selectedAnswers[childQuestion.id]
//                                           ? "green"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         handleAnswerClick(
//                                           childQuestion.id,
//                                           "Never"
//                                         )
//                                       }
//                                     >
//                                       Never
//                                     </button>

//                                     <button
//                                       className={`${
//                                         selectedAnswers[childQuestion.id] ===
//                                           "Rarely" &&
//                                         selectedAnswers[childQuestion.id]
//                                           ? "green"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         handleAnswerClick(
//                                           childQuestion.id,
//                                           "Rarely"
//                                         )
//                                       }
//                                     >
//                                       Rarely
//                                     </button>

//                                     <button
//                                       className={`${
//                                         selectedAnswers[childQuestion.id] ===
//                                           "Sometimes" &&
//                                         selectedAnswers[childQuestion.id]
//                                           ? "green"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         handleAnswerClick(
//                                           childQuestion.id,
//                                           "Sometimes"
//                                         )
//                                       }
//                                     >
//                                       Sometimes
//                                     </button>

//                                     <button
//                                       className={`${
//                                         selectedAnswers[childQuestion.id] ===
//                                           "Frequently" &&
//                                         selectedAnswers[childQuestion.id]
//                                           ? "green"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         handleAnswerClick(
//                                           childQuestion.id,
//                                           "Frequently"
//                                         )
//                                       }
//                                     >
//                                       Frequently
//                                     </button>

//                                     <button
//                                       className={`${
//                                         selectedAnswers[childQuestion.id] ===
//                                           "All the time" &&
//                                         selectedAnswers[childQuestion.id]
//                                           ? "green"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         handleAnswerClick(
//                                           childQuestion.id,
//                                           "All the time"
//                                         )
//                                       }
//                                     >
//                                       All the time
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           )
//                         )
//                       : null
//                   )}
//                 </div>

//                 <div className="buttons">
//                   <button
//                     className="btn"
//                     onClick={handlePreviousPage}
//                     disabled={currentPage === 0}
//                   >
//                     Previous
//                   </button>
//                   <button
//                     className="btn"
//                     onClick={handleNextPage}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <Footer />
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


const InDepthQuestions = ({ setActiveQuestion, childQuestions , setActiveStep , currentPage, setCurrentPage , setIndepthProgress , answeredQuestions , setAnsweredQuestions  }) => {
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

  useEffect(() => {
    const fetchUserAnswers = async () => {
      if (userId) {
        try {
          const userDocRef = doc(fs, "users", userId);
          const userAnswersRef = collection(userDocRef, "answers-in-depth");
          const userAnswersSnapshot = await getDocs(userAnswersRef);
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

  const handleNextPage = () => {
    if (currentPage === Object.keys(childQuestions).length - 1) {
      setActiveQuestion("health-history");
    } else {
      setCurrentPage(currentPage + 1);
      setActiveStep(currentPage + 2);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage === 0) {
      alert("You can not go");
    } else {
      setCurrentPage(currentPage - 1);
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

  // const handleAnswerClick = (questionId, answer) => {
  //   setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  //   setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
  //   storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
  //   // updateProgress();
  // };

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
  
    // Calculate the total number of questions
    const numQuestions = Object.keys(childQuestions).reduce(
      (total, parentId) => total + childQuestions[parentId].length,
      0
    );
  
    // Calculate the number of answered questions
    const numAnsweredQuestions = Object.keys(answeredQuestions).length + 1;
    console.log(numAnsweredQuestions , 'numAnsweredQuestions');
      const newProgress = (numAnsweredQuestions / numQuestions) * 100;  
    setIndepthProgress(Math.min(newProgress , 100));
  
    storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
  };
  

  const storeAnswerToFirestore = async (questionId, answer, type) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-in-depth");
      const answerDocRef = doc(userAnswersRef, questionId.toString());
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

  const updateProgress = () => {
    // const numQuestions = Object.keys(childQuestions).reduce(
    //   (total, parentId) => total + childQuestions[parentId].length,
    //   0
    //   );
    //   const numAnsweredQuestions = Object.keys(answeredQuestions).length;
    //   const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    //   setIndepthProgress(newProgress);
    //   console.log(numQuestions , 'question number');
    };

 
  return (
    <>
      {/* <p className="ms-3" style={{ fontWeight: "600", fontSize: "17px" }}>
        {jsonData.map((question) => (
          <React.Fragment key={question.id}>
            {question.parentId === null && question.in_header_que && (
              <p>{question.in_header_que}</p>
            )}
          </React.Fragment>
        ))}
        </p> */}
      <div className="container">
        <div className="InDepthQuestions-template">
          {Object.keys(childQuestions).map((parentId, index) =>
            index === currentPage
              ? childQuestions[parentId].map((childQuestion, questionIndex) => (
                  <div
                    key={childQuestion.id}
                    className={`unanswered-card ${
                      focusedQuestion === childQuestion.id ? "focused-card" : ""
                    } ${
                      answeredQuestions[childQuestion.id] ? "answered-card" : ""
                    }`}
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

// import React, { useState, useEffect, useRef } from "react";
// import "../Question.css";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { fs } from "../../../config/Firebase";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import jsonData from '../../../data/QuestionsData.json';

// const InDepthQuestions = ({ setActiveQuestion, childQuestions , setIndepthProgress }) => {
//   const { user } = useFirebase();
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [answeredQuestions, setAnsweredQuestions] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);
//   const [currentParentId, setCurrentParentId] = useState(null);
//   const [currentChildIndex, setCurrentChildIndex] = useState(0);
//   const userId = user ? user.uid : null;
//   const focusedQuestionRef = useRef(null);

//   useEffect(() => {
//     const parentIds = Object.keys(childQuestions);
//     for (let i = 0; i < parentIds.length; i++) {
//       const parentId = parentIds[i];
//       const unansweredChildIndex = childQuestions[parentId].findIndex(
//         (childQuestion) => !answeredQuestions[childQuestion.id]
//       );
//       if (unansweredChildIndex !== -1) {
//         setCurrentParentId(parentId);
//         setCurrentChildIndex(unansweredChildIndex);
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
//     if (currentPage === Object.keys(childQuestions).length - 1) {
//       setActiveQuestion("health-history");
//     } else {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if(currentPage === 0) {
//       alert("You can not go")
//     }
//     else {
//     setCurrentPage(currentPage - 1);
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
//     setFocusedQuestion(null);
//     storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
//   };

//   const storeAnswerToFirestore = async (questionId, answer) => {
//     try {
//       const userDocRef = doc(fs, "users", userId);
//       const userAnswersRef = collection(userDocRef, "answers-in-depth");
//       const answerDocRef = doc(userAnswersRef, questionId.toString());
//       await setDoc(answerDocRef, {
//         answer: answer,
//       });
//       console.log("Answer stored in Firestore successfully!");
//     } catch (error) {
//       console.error("Error storing answer in Firestore: ", error);
//     }
//   };

//   const calculateProgress = () => {
//     const numQuestions = Object.keys(childQuestions).length;
//     const numAnsweredQuestions = Object.keys(selectedAnswers).length;
//     return (numAnsweredQuestions / numQuestions) * 100;
//   };

//   const getCurrentStepHeader = () => {
//     const parentIds = Object.keys(childQuestions);
//     console.log("parentIds:", parentIds); // Log parentIds
//     const currentParentId = parentIds[currentPage];
//     console.log("currentParentId:", currentParentId); // Log currentParentId
//     const currentParentQuestion = jsonData.find(question => question.id === currentParentId);
//     console.log("currentParentQuestion:", currentParentQuestion); // Log currentParentQuestion
//     return currentParentQuestion ? currentParentQuestion.in_header_que : 'nooo';
//   };

//   return (
//     <>
//       <p className="ms-3" style={{ fontWeight: "600", fontSize: "17px" }}>
//         {getCurrentStepHeader()}
//       </p>
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
//                     }`}
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
//           <button
//             className="btn"
//             onClick={handlePreviousPage}
//           >
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
// import jsonData from "../../../data/QuestionsData.json";

// const IndepthQuestions = ({
//   setActiveQuestion,
//   childQuestions,
//   setIndepthProgress,
//   selectedAnswers,
//   setSelectedAnswers,
//   currentPage,
//   setCurrentPage,
// }) => {
//   const { user } = useFirebase();
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [answeredQuestions, setAnsweredQuestions] = useState({});
//   const userId = user ? user.uid : null;
//   const focusedQuestionRef = useRef(null);

//   useEffect(() => {
//     const parentIds = Object.keys(childQuestions);
//     for (let i = 0; i < parentIds.length; i++) {
//       const parentId = parentIds[i];
//       const unansweredChildIndex = childQuestions[parentId].findIndex(
//         (childQuestion) => !answeredQuestions[childQuestion.id]
//       );
//       if (unansweredChildIndex !== -1) {
//         setCurrentPage(i);
//         setFocusedQuestion(childQuestions[parentId][unansweredChildIndex].id);
//         break;
//       }
//     }
//   }, [childQuestions, answeredQuestions, currentPage, setCurrentPage]);

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
//   }, [userId, setSelectedAnswers]);

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
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
//     setFocusedQuestion(null);
//     storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
//   };

//   const storeAnswerToFirestore = async (questionId, answer) => {
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
//       <div className="container">
//         <div className="InDepthQuestions-template">
//           {Object.keys(childQuestions).map((parentId, index) =>
//             index === currentPage
//               ? childQuestions[parentId].map((childQuestion) => (
//                   <div
//                     key={childQuestion.id}
//                     className={`unanswered-card ${
//                       focusedQuestion === childQuestion.id ? "focused-card" : ""
//                     } ${
//                       answeredQuestions[childQuestion.id] ? "answered-card" : ""
//                     }`}
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

// export default IndepthQuestions;
