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

const InDepthQuestions = ({ setActiveQuestion, childQuestions , setIndepthProgress }) => {
  const { user } = useFirebase();
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [currentParentId, setCurrentParentId] = useState(null);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const userId = user ? user.uid : null;
  const focusedQuestionRef = useRef(null);

  useEffect(() => {
    const parentIds = Object.keys(childQuestions);
    for (let i = 0; i < parentIds.length; i++) {
      const parentId = parentIds[i];
      const unansweredChildIndex = childQuestions[parentId].findIndex(
        (childQuestion) => !answeredQuestions[childQuestion.id]
      );
      if (unansweredChildIndex !== -1) {
        setCurrentParentId(parentId);
        setCurrentChildIndex(unansweredChildIndex);
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
    }
  };

  const handlePreviousPage = () => {
    if(currentPage === 0) {
      alert("You can not go")
    }
    else {
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

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
    setFocusedQuestion(null);
    storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
  };

  const storeAnswerToFirestore = async (questionId, answer) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-in-depth");
      const answerDocRef = doc(userAnswersRef, questionId.toString());
      await setDoc(answerDocRef, {
        answer: answer,
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  const calculateProgress = () => {
    const numQuestions = Object.keys(childQuestions).length;
    const numAnsweredQuestions = Object.keys(selectedAnswers).length;
    return (numAnsweredQuestions / numQuestions) * 100;
  };
 

  return (
    <>
      <p className="ms-3" style={{ fontWeight: "600", fontSize: "17px" }}>
        You mentioned experiencing sustained feelings of excitement or anger
        that others thought you were not your normal self. During that time, how
        often did you feel:
      </p>
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
          <button
            className="btn"
            onClick={handlePreviousPage}
          >
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
