// import React, { useState, useEffect } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import { useNavigate } from "react-router-dom";
// import { fs } from "../../../config/Firebase";
// import { setDoc, doc, getDoc } from "firebase/firestore";
// import { useFirebase } from "../../../context/FirebaseContext";

// const ScreeningQuestions = ({ setStepCount }) => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [showChildQuestions, setShowChildQuestions] = useState(false);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();
//   const { user } = useFirebase();
//   const userId = user ? user.uid : null;

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleYesClick = async (questionId) => {
//     setAnswers({ ...answers, [questionId]: "YES" });
//     setSelectedQuestions([...selectedQuestions, questionId]);
//     setFocusedQuestion(null);
//     await storeAnswerToFirestore(questionId, "YES", true);
//   };

//   const handleNoClick = async (questionId) => {
//     setAnswers({ ...answers, [questionId]: "NO" });
//     setFocusedQuestion(null);
//     await storeAnswerToFirestore(questionId, "NO", false);
//   };

//   const storeAnswerToFirestore = async (questionId, answer, buttonState) => {
//     try {
//       const answerDocRef = doc(
//         fs,
//         "users",
//         userId,
//         "answers-screenings",
//         questionId.toString()
//       );
//       await setDoc(answerDocRef, {
//         answer: answer,
//         buttonState: buttonState,
//       });
//       console.log("Answer stored in Firestore successfully!");
//     } catch (error) {
//       console.error("Error storing answer in Firestore: ", error);
//     }
//   };

//   const handleNextButtonClick = () => {
//     const unansweredQuestions = screeningQuestions.filter(
//       (question) => !answers.hasOwnProperty(question.id)
//     );
//     if (unansweredQuestions.length > 0) {
//       setFocusedQuestion(unansweredQuestions[0].id);
//       setShowChildQuestions(false);
//     } else {
//       setShowChildQuestions(true);
//       setStepCount(Object.keys(childQuestionsByStep).length);
//       navigate("/InDepthQuestions", {
//         state: { childQuestions: childQuestionsByStep },
//       });
//     }
//   };

//   const isParentQuestionSelected = (parentId) => {
//     return selectedQuestions.includes(parentId);
//   };

//   const groupChildQuestionsByParentId = () => {
//     const groupedQuestions = {};

//     jsonData.forEach((question) => {
//       if (question.parentId && isParentQuestionSelected(question.parentId)) {
//         if (!groupedQuestions[question.parentId]) {
//           groupedQuestions[question.parentId] = [];
//         }
//         groupedQuestions[question.parentId].push(question);
//       }
//     });

//     return groupedQuestions;
//   };

//   const childQuestionsByStep = groupChildQuestionsByParentId();
//   const screeningQuestions = jsonData.filter(
//     (question) => question.parentId === null && question.scn_question
//   );

//   return (
//     <>
//       <div className="container">
//         <div className="screeningQuestion-template">
//           {screeningQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               } `}
//               onClick={() => handleQuestionClick(index)}
//             >
//               {focusedQuestion === question.id &&
//                 !answers[question.id] &&
//                 !showChildQuestions && (
//                   <div className="unanswered-message">
//                     Please answer this question.
//                   </div>
//                 )}
//               <div className="question">
//                 <p>{question.scn_question}</p>
//                 {answers[question.id] && (
//                   <div className="ticked-img-div">
//                     <AiOutlineCheck className="ticked-img" />
//                   </div>
//                 )}
//               </div>
//               {focusedQuestion === index && (
//                 <div className="buttons">
//                   <button
//                     className={`yes_btn ${
//                       answers[question.id] === "YES" ? "green" : ""
//                     }`}
//                     onClick={() => handleYesClick(question.id)}
//                   >
//                     YES
//                   </button>
//                   <button
//                     className={`no_btn ${
//                       answers[question.id] === "NO" ? "green" : ""
//                     }`}
//                     onClick={() => handleNoClick(question.id)}
//                   >
//                     NO
//                   </button>
//                 </div>
//               )}

//               {focusedQuestion !== index && answers[question.id] && (
//                 <div className="answer">
//                   <span>{answers[question.id]}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="buttons d-flex">
//           <button className="btn" onClick={handleNextButtonClick}>
//             Next
//           </button>
//           <p
//             className="mt-3 ms-3"
//             style={{ fontWeight: "500", fontSize: "17px" }}
//           >
//             You can change your answers by clicking on the question
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ScreeningQuestions;

// import React, { useState, useEffect } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import { useNavigate } from "react-router-dom";
// import { fs } from "../../../config/Firebase";
// import { setDoc, doc, getDoc } from "firebase/firestore";
// import { useFirebase } from "../../../context/FirebaseContext";

// const ScreeningQuestions = ({ setStepCount, setScreeningProgress }) => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [showChildQuestions, setShowChildQuestions] = useState(false);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();
//   const { user } = useFirebase();
//   const userId = user ? user.uid : null;

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleYesClick = async (questionId) => {
//     setAnswers({ ...answers, [questionId]: "YES" });
//     setSelectedQuestions([...selectedQuestions, questionId]);
//     setFocusedQuestion(null);
//     await storeAnswerToFirestore(questionId, "YES", true);
//   };

//   const handleNoClick = async (questionId) => {
//     setAnswers({ ...answers, [questionId]: "NO" });
//     setFocusedQuestion(null);
//     await storeAnswerToFirestore(questionId, "NO", false);
//   };

//   const storeAnswerToFirestore = async (questionId, answer, buttonState) => {
//     try {
//       const answerDocRef = doc(
//         fs,
//         "users",
//         userId,
//         "answers-screenings",
//         questionId.toString()
//       );
//       await setDoc(answerDocRef, {
//         answer: answer,
//         buttonState: buttonState,
//       });
//       console.log("Answer stored in Firestore successfully!");
//     } catch (error) {
//       console.error("Error storing answer in Firestore: ", error);
//     }
//   };

//   const handleNextButtonClick = () => {
//     const unansweredQuestions = screeningQuestions.filter(
//       (question) => !answers.hasOwnProperty(question.id)
//     );
//     if (unansweredQuestions.length > 0) {
//       setFocusedQuestion(unansweredQuestions[0].id);
//       setShowChildQuestions(false);
//     } else {
//       setShowChildQuestions(true);
//       setStepCount(Object.keys(childQuestionsByStep).length);
//       navigate("/InDepthQuestions", {
//         state: { childQuestions: childQuestionsByStep },
//       });
//     }
//   };

//   const isParentQuestionSelected = (parentId) => {
//     return selectedQuestions.includes(parentId);
//   };

//   const groupChildQuestionsByParentId = () => {
//     const groupedQuestions = {};

//     jsonData.forEach((question) => {
//       if (question.parentId && isParentQuestionSelected(question.parentId)) {
//         if (!groupedQuestions[question.parentId]) {
//           groupedQuestions[question.parentId] = [];
//         }
//         groupedQuestions[question.parentId].push(question);
//       }
//     });

//     return groupedQuestions;
//   };

//   const childQuestionsByStep = groupChildQuestionsByParentId();
//   const screeningQuestions = jsonData.filter(
//     (question) => question.parentId === null && question.scn_question
//   );

//   useEffect(() => {
//     const numQuestions = screeningQuestions.length;
//     const numAnsweredQuestions = Object.keys(answers).length;
//     const newProgress = (numAnsweredQuestions / numQuestions) * 100;
//     setScreeningProgress(newProgress);
//   }, [answers]);

//   return (
//     <>
//       <div className="container">
//         <div className="screeningQuestion-template">
//           {screeningQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               } `}
//               onClick={() => handleQuestionClick(index)}
//             >
//               {focusedQuestion === question.id &&
//                 !answers[question.id] &&
//                 !showChildQuestions && (
//                   <div className="unanswered-message">
//                     Please answer this question.
//                   </div>
//                 )}
//               <div className="question">
//                 <p>{question.scn_question}</p>
//                 {answers[question.id] && (
//                   <div className="ticked-img-div">
//                     <AiOutlineCheck className="ticked-img" />
//                   </div>
//                 )}
//               </div>
//               {focusedQuestion === index && (
//                 <div className="buttons">
//                   <button
//                     className={`yes_btn ${
//                       answers[question.id] === "YES" ? "green" : ""
//                     }`}
//                     onClick={() => handleYesClick(question.id)}
//                   >
//                     YES
//                   </button>
//                   <button
//                     className={`no_btn ${
//                       answers[question.id] === "NO" ? "green" : ""
//                     }`}
//                     onClick={() => handleNoClick(question.id)}
//                   >
//                     NO
//                   </button>
//                 </div>
//               )}

//               {focusedQuestion !== index && answers[question.id] && (
//                 <div className="answer">
//                   <span>{answers[question.id]}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="buttons d-flex">
//           <button className="btn" onClick={handleNextButtonClick}>
//             Next
//           </button>
//           <p
//             className="mt-3 ms-3"
//             style={{ fontWeight: "500", fontSize: "17px" }}
//           >
//             You can change your answers by clicking on the question
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ScreeningQuestions;

// import React, { useState, useEffect , useRef } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import { useNavigate } from "react-router-dom";
// import { fs } from "../../../config/Firebase";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";
// import { useFirebase } from "../../../context/FirebaseContext";

// const ScreeningQuestions = ({ setStepCount, setProgress , setActiveQuestion , setChildQuestions }) => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [showChildQuestions, setShowChildQuestions] = useState(false);
//   const [answers, setAnswers] = useState({});

//   const navigate = useNavigate();
//   const { user } = useFirebase();
//   const userId = user ? user.uid : null;

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleYesClick = async (questionId) => {
//     const newAnswers = { ...answers, [questionId]: "YES" };
//     setAnswers(newAnswers);
//     setSelectedQuestions([...selectedQuestions, questionId]);
//     setFocusedQuestion(null);
//     await storeAnswerToFirestore(questionId, "YES", true);
//   };

//   const handleNoClick = async (questionId) => {
//     const newAnswers = { ...answers, [questionId]: "NO" };
//     setAnswers(newAnswers);
//     setFocusedQuestion(null);
//     await storeAnswerToFirestore(questionId, "NO", false);
//   };

//   const storeAnswerToFirestore = async (questionId, answer, buttonState) => {
//     try {
//       const userDocRef = doc(fs, "users", userId);
//       const userAnswersRef = collection(userDocRef, "answers-screenings");
//       const answerDocRef = doc(userAnswersRef, questionId.toString());
//       await setDoc(answerDocRef, {
//         answer: answer,
//         buttonState: buttonState,
//       });
//       console.log("Answer stored in Firestore successfully!");
//     } catch (error) {
//       console.error("Error storing answer in Firestore: ", error);
//     }
//   };

//   const loadUserAnswersFromFirestore = async () => {
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         const userAnswersRef = collection(userDocRef, "answers-screenings");
//         const userAnswersSnapshot = await getDocs(userAnswersRef);
//         const loadedAnswers = {};
//         userAnswersSnapshot.forEach((doc) => {
//           loadedAnswers[doc.id] = doc.data().answer;
//         });
//         setAnswers(loadedAnswers);
//       }
//     } catch (error) {
//       console.error("Error loading user answers from Firestore: ", error);
//     }
//   };

//   useEffect(() => {
//     loadUserAnswersFromFirestore();
//   }, [userId]);

//   const handleNextButtonClick = () => {
//     const unansweredQuestions = screeningQuestions.filter(
//       (question) => !answers.hasOwnProperty(question.id)
//     );
//     if (unansweredQuestions.length > 0) {
//       setFocusedQuestion(unansweredQuestions[0].id);
//       setShowChildQuestions(false);
//     } else {
//       setShowChildQuestions(true);
//       setStepCount(Object.keys(childQuestionsByStep).length);
//       // navigate("/InDepthQuestions", {
//       //   state: { childQuestions: childQuestionsByStep },
//       // });
//       setChildQuestions(childQuestionsByStep);
//             setActiveQuestion('indepth');
//     }
//   };

//   const isParentQuestionSelected = (parentId) => {
//     return selectedQuestions.includes(parentId);
//   };

//   const groupChildQuestionsByParentId = () => {
//     const groupedQuestions = {};

//     jsonData.forEach((question) => {
//       if (question.parentId && isParentQuestionSelected(question.parentId)) {
//         if (!groupedQuestions[question.parentId]) {
//           groupedQuestions[question.parentId] = [];
//         }
//         groupedQuestions[question.parentId].push(question);
//       }
//     });

//     return groupedQuestions;
//   };

//   const childQuestionsByStep = groupChildQuestionsByParentId();
//   const filteredQuestions = jsonData.filter(
//     (question) => question.parentId === null && question.scn_question
//   );

//   // useEffect(() => {
//   //   const numQuestions = filteredQuestions.length;
//   //   const numAnsweredQuestions = Object.keys(answers).length;
//   //   const newProgress = (numAnsweredQuestions / numQuestions) * 100;
//   //   setProgress(newProgress);
//   // }, [answers]);

//   return (
//     <>
//       <div className="container">
//         <div className="screeningQuestion-template">
//           {filteredQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               } `}
//               onClick={() => handleQuestionClick(index)}
//             >
//               {focusedQuestion === question.id &&
//                 !answers[question.id] &&
//                 !showChildQuestions && (
//                   <div className="unanswered-message">
//                     Please answer this question.
//                   </div>
//                 )}
//               <div className="question">
//                 <p>{question.scn_question}</p>
//                 {answers[question.id] && (
//                   <div className="ticked-img-div">
//                     <AiOutlineCheck className="ticked-img" />
//                   </div>
//                 )}
//               </div>
//               {focusedQuestion === index && (
//                 <div className="buttons">
//                   <button
//                     className={`yes_btn ${
//                       answers[question.id] === "YES" ? "green" : ""
//                     }`}
//                     onClick={() => handleYesClick(question.id)}
//                   >
//                     YES
//                   </button>
//                   <button
//                     className={`no_btn ${
//                       answers[question.id] === "NO" ? "green" : ""
//                     }`}
//                     onClick={() => handleNoClick(question.id)}
//                   >
//                     NO
//                   </button>
//                 </div>
//               )}

//               {focusedQuestion !== index && answers[question.id] && (
//                 <div className="answer">
//                   <span>{answers[question.id]}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="buttons d-flex">
//           <button className="btn" onClick={handleNextButtonClick}>
//             Next
//           </button>
//           <p
//             className="mt-3 ms-3"
//             style={{ fontWeight: "500", fontSize: "17px" }}
//           >
//             You can change your answers by clicking on the question
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ScreeningQuestions;

import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/FirebaseContext";

const ScreeningQuestions = ({
  setStepCount,
  setProgress,
  setActiveQuestion,
  setChildQuestions,
}) => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showChildQuestions, setShowChildQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const { user } = useFirebase();
  const containerRef = useRef(null);
  const userId = user ? user.uid : null;

  useEffect(() => {
    // Find the index of the first unanswered question
    const index = filteredQuestions.findIndex(
      (question) => !answers.hasOwnProperty(question.id)
    );
    if (index !== -1) {
      setFocusedQuestion(index);
    }
  }, [answers, filteredQuestions]);

  useEffect(() => {
    // Filter out questions with parentId null and scn_question not null
    const filtered = jsonData.filter(
      (question) => question.parentId === null && question.scn_question
    );
    setFilteredQuestions(filtered);
  }, []);

  useEffect(() => {
    // Find the index of the next unanswered question
    const nextUnansweredIndex = filteredQuestions.findIndex(
      (question) => !answers.hasOwnProperty(question.id)
    );

    // If there's a next unanswered question, scroll to it
    if (nextUnansweredIndex !== -1) {
      const focusedElement = containerRef.current.children[nextUnansweredIndex];
      console.log(focusedElement);
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [answers, filteredQuestions]);
  
  useEffect(() => {
    const numQuestions = filteredQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setProgress(newProgress);
  }, [answers]);

  const storeAnswerToFirestore = async (questionId, answer, buttonState) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-screenings");
      const answerDocRef = doc(userAnswersRef, questionId.toString());
      await setDoc(answerDocRef, {
        answer: answer,
        buttonState: buttonState,
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  const loadUserAnswersFromFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const userAnswersRef = collection(userDocRef, "answers-screenings");
        const userAnswersSnapshot = await getDocs(userAnswersRef);
        const loadedAnswers = {};
        userAnswersSnapshot.forEach((doc) => {
          loadedAnswers[doc.id] = doc.data().answer;
        });
        setAnswers(loadedAnswers);
      }
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };

  useEffect(() => {
    loadUserAnswersFromFirestore();
  }, [userId]);

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? null : index);
  };

  const handleYesClick = async (questionId, parentId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "YES", true);
  };

  const handleNoClick = async (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "NO", false)
  };

  const handleNextButtonClick = () => {
    const unansweredQuestions = filteredQuestions.filter(
      (question) => !answers.hasOwnProperty(question.id)
    );

    const allNo = filteredQuestions.every(
      (question) => answers[question.id] === "NO"
    );

    if (unansweredQuestions.length > 0) {
      // Focus on the first unanswered question
      const firstUnansweredQuestion = unansweredQuestions[0];
      const index = filteredQuestions.findIndex(
        (question) => question.id === firstUnansweredQuestion.id
      );
      setFocusedQuestion(index);
      setShowChildQuestions(false);
    } else if (allNo) {
      setActiveQuestion("health-history");
    } else {
      // Proceed to display child questions
      setShowChildQuestions(true);
      setStepCount(Object.keys(childQuestionsByStep).length);
      // navigate("InDepthQuestions", { state: { childQuestions: childQuestionsByStep } });
      setChildQuestions(childQuestionsByStep);
      setActiveQuestion("indepth");
    }
  };

  const isParentQuestionSelected = (parentId) => {
    return selectedQuestions.includes(parentId);
  };

  const groupChildQuestionsByParentId = () => {
    const groupedQuestions = {};

    jsonData.forEach((question) => {
      if (question.parentId && isParentQuestionSelected(question.parentId)) {
        if (!groupedQuestions[question.parentId]) {
          groupedQuestions[question.parentId] = [];
        }
        groupedQuestions[question.parentId].push(question);
      }
    });

    return groupedQuestions;
  };

  const childQuestionsByStep = groupChildQuestionsByParentId();

  return (
    <>
      <div className="container">
        <div className="screeningQuestion-template" ref={containerRef}>
          {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              {/* {focusedQuestion === index && !answers[question.id] && (
                                <div className="unanswered-message">Please answer this question.</div>
                            )} */}
              <div className="question">
                <p>{question.scn_question}</p>
                {answers[question.id] && (
                  <div className="ticked-img-div">
                    <AiOutlineCheck className="ticked-img" />
                  </div>
                )}
              </div>
              {focusedQuestion === index && (
                <div className="buttons">
                  <button
                    className={`yes_btn ${
                      answers[question.id] === "YES" ? "green" : ""
                    }`}
                    onClick={() => handleYesClick(question.id)}
                  >
                    YES
                  </button>
                  <button
                    className={`no_btn ${
                      answers[question.id] === "NO" ? "green" : ""
                    }`}
                    onClick={() => handleNoClick(question.id)}
                  >
                    NO
                  </button>
                </div>
              )}

              {focusedQuestion !== index && answers[question.id] && (
                <div className="answer">
                  <span>{answers[question.id]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="btn" onClick={handleNextButtonClick}>
            Next
          </button>
        </div>

        {showChildQuestions &&
          Object.keys(childQuestionsByStep).map((parentId, index) => (
            <div key={index}>
              <h2>Step {index + 1}</h2>
              {answers[parentId] === "YES" &&
                childQuestionsByStep[parentId].map((childQuestion) => (
                  <div key={childQuestion.id} className="child-question">
                    <p>{childQuestion.in_depth_question}</p>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default ScreeningQuestions;
