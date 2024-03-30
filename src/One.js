// const { user } = useFirebase();

  // const userId = user ? user.uid : null;
  // const [profileData, setProfileData] = useState({
  //   gender: "",
  //   age: "",
  //   languages: "",
  //   location: "",
  //   phoneNumber: "",
  //   doctorEmail: "",
  // });

  // const { gender, age, languages, location, phoneNumber, doctorEmail } =
  //   profileData;

  // const handleUpdate = () => {
  //   Object.keys(profileData).forEach((key) => {
  //     localStorage.setItem(`${userId}_${key}`, profileData[key]);
  //   });
  //   alert("Data updated successfully!");
  // };

  // useEffect(() => {
  //   const storedProfileData = {};
  //   Object.keys(profileData).forEach((key) => {
  //     const storedValue = localStorage.getItem(`${userId}_${key}`);
  //     if (storedValue) storedProfileData[key] = storedValue;
  //   });
  //   // Update profileData state with stored data
  //   setProfileData((prevState) => ({ ...prevState, ...storedProfileData }));
  // }, [userId]);

  // const handleChange = (key, value) => {
  //   setProfileData((prevState) => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };


    // const unansweredQuestions = filteredQuestions.filter(
    //     question => !answers.hasOwnProperty(question.id)
    //   );
    
    //   if (unansweredQuestions.length > 0) {
    //     // Show an alert if there are unanswered questions
    //     alert("Please answer all questions before proceeding.");
    //   } else {
    //     // Proceed to display child questions
    //     setShowChildQuestions(true);
    //   }



           {/* {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              }`}
              onClick={() => handleQuestionClick(index)}
            >
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
          ))} */}







          import React, { useState } from "react";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import Footer from "../../../components/Footer/Footer";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import { AiOutlineCheck } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "../Question.css";

const InDepthQuestions = () => {
  const { user } = useFirebase();
  const location = useLocation();
  const childQuestions = location.state.childQuestions;
  console.log(childQuestions , 'childquestons');

  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // const stepCount = Object.keys(childQuestions).length;
  // console.log(stepCount);

  const handleQuestionClick = (questionId) => {
    setFocusedQuestion(questionId);
  };

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
    setFocusedQuestion(null);
  };

  const handleNextButtonClick = () => {
    const unansweredQuestions = Object.keys(selectedAnswers).filter(
      (questionId) => !selectedAnswers[questionId]
    );
    if (unansweredQuestions.length === 0) {
        console.log("Navigate to next step");
    } else {
      setFocusedQuestion(unansweredQuestions[0]);
    }
  };

  return (
    <>
      <div className="StartAssessment-template">
        <div className="header">
          <NavigationBar user={user} />
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-4">
              <AssessmentProgress />
            </div>
            <div className="col-8">
              <p>
                In the next few questions we want to know if you have
                experienced certain symptoms for a period of at least two weeks
                in the last month:
              </p>
              <div className="InDepthQuestions-template">
                {Object.keys(childQuestions).map((parentId , index) => (
                  childQuestions[parentId].map((childQuestion) => (
                    <div
                      key={childQuestion.id}
                      className={`unanswered-card ${
                        focusedQuestion === childQuestion.id
                          ? "focused-card"
                          : ""
                      } ${
                        answeredQuestions[childQuestion.id]
                          ? "answered-card"
                          : ""
                      }`}
                      onClick={() => handleQuestionClick(childQuestion.id)}
                    >
                      <h6>Step {currentStep}</h6>
                      <div className="question">
                        <p>{childQuestion.in_depth_question}</p>
                      </div>
                      {(selectedAnswers[childQuestion.id] ||
                        answeredQuestions[childQuestion.id]) && (
                        <div className="ticked-img-div">
                          <AiOutlineCheck className="ticked-img" />
                        </div>
                      )}
                      {(selectedAnswers[childQuestion.id] ||
                        answeredQuestions[childQuestion.id]) && (
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
                              never
                            </button>
                            <button
                                className={`${
                                  selectedAnswers[childQuestion.id] ===
                                    "Rarely" &&
                                  selectedAnswers[childQuestion.id]
                                    ? "green"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleAnswerClick(childQuestion.id, "Rarely")
                                }
                              >
                                rarely
                              </button>
                              <button
                                className={`${
                                  selectedAnswers[childQuestion.id] ===
                                    "Sometimes" &&
                                  selectedAnswers[childQuestion.id]
                                    ? "green"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleAnswerClick(
                                    childQuestion.id,
                                    "Sometimes"
                                  )
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
                                  handleAnswerClick(
                                    childQuestion.id,
                                    "Frequently"
                                  )
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
                ))}
                <div className="buttons">
                  {currentStep > 1 && (
                    <button
                      className="btn"
                      // onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      prev
                    </button>
                  )}
                  <button className="btn" onClick={handleNextButtonClick}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default InDepthQuestions;


{/* {showChildQuestions &&
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
          ))} */}





          import React, { useState , useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { useFetcher, useNavigate } from "react-router-dom";
// import { fs , db } from "../../../config/Firebase";
import { setDoc, doc, getDoc , getFirestore } from "firebase/firestore";
import { useFirebase } from "../../../context/FirebaseContext";

const ScreeningQuestions = ({ setStepCount }) => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showChildQuestions, setShowChildQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const db = getFirestore()
  const { user } = useFirebase();
  const userId = user ? user.uid : null;
  
  const [ screeningData , setScreeningData] = useState({
    
  });

  useEffect(() => {
    const fetchScreeningData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    if (userId) {
      fetchScreeningData();
    }
  }, [userId]);
  
  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? null : index);
  };

  const handleYesClick = async(questionId, parentId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "YES");
    console.log(typeof(questionId) , 'question');
  };

  const handleNoClick = async (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "NO");
  };

  const storeAnswerToFirestore = async (questionId, answer) => {
    // try {
    //     const answerDocRef = doc(fs, "users", questionId.toString()); // Convert number to string
    //     await setDoc(answerDocRef, {
    //         answer: answer,
    //     });
    //     console.log("Answer stored in Firestore successfully!");
    // } catch (error) {
    //     console.error("Error storing answer in Firestore: ", error);
    // }
  //   const answerDocRef = doc(fs, "users", user.uid, "answers" , questionId.toString());
  //   await setDoc(answerDocRef, {
  //     answer: answer,
  //     userId: user.uid, // Include user's UID in the document
  //   });
  //   console.log("Answer stored in Firestore successfully!");
  // } catch (error) {
  //   console.error("Error storing answer in Firestore: ", error);
  // }
  try {
    const answerDocRef = doc(db , 'users' , userId , "answers" , questionId.toString())
    await setDoc(answerDocRef , {
      answer : answer,
      userId: userId,
    });
    alert("Answer stored in Firestore successfully!");
  } catch (error) {
    console.error("Error storing answer in Firestore: ", error);
  }
};


  const handleNextButtonClick = () => {
    const unansweredQuestions = filteredQuestions.filter(
      (question) => !answers.hasOwnProperty(question.id)
    );
    if (unansweredQuestions.length > 0) {
      setFocusedQuestion(unansweredQuestions[0].id);
      setShowChildQuestions(false);
    } else {
      // Update the step count when proceeding to display child questions
      setShowChildQuestions(true);
      setStepCount(Object.keys(childQuestionsByStep).length); // Update the step count
      navigate("/InDepthQuestions", {
        state: { childQuestions: childQuestionsByStep },
      });
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
  const filteredQuestions = jsonData.filter(
    (question) => question.parentId === null && question.scn_question
  );
  return (
    <>
      <div className="container">
        <div className="screeningQuestion-template">
          {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              } `}
              onClick={() => handleQuestionClick(index)}
            >
              {focusedQuestion === question.id &&
                !answers[question.id] &&
                !showChildQuestions && (
                  <div className="unanswered-message">
                    Please answer this question.
                  </div>
                )}
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
        <div className="buttons d-flex">
          <button className="btn" onClick={handleNextButtonClick}>
            Next
          </button>
          <p
            className="mt-3 ms-3"
            style={{ fontWeight: "500", fontSize: "17px" }}
          >
            You can change your answers by clicking on the question
          </p>
        </div>
      </div>
    </>
  );
};

export default ScreeningQuestions;

// import React, { useState } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import { useFetcher, useNavigate } from "react-router-dom";
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

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleYesClick = (questionId, parentId) => {
//     setAnswers({ ...answers, [questionId]: "YES" });
//     setSelectedQuestions([...selectedQuestions, questionId]);
//     setFocusedQuestion(null);
//     // Store the answer in Firestore
//     storeAnswer(user.uid, questionId, "YES");
//   };

//   const handleNoClick = (questionId) => {
//     setAnswers({ ...answers, [questionId]: "NO" });
//     setFocusedQuestion(null);
//     // Store the answer in Firestore
//     storeAnswer(user.uid, questionId, "NO");
//   };

//   const handleNextButtonClick = () => {
//     const unansweredQuestions = filteredQuestions.filter(
//       (question) => !answers.hasOwnProperty(question.id)
//     );
//     if (unansweredQuestions.length > 0) {
//       setFocusedQuestion(unansweredQuestions[0].id);
//       setShowChildQuestions(false);
//     } else {
//       // Update the step count when proceeding to display child questions
//       setShowChildQuestions(true);
//       setStepCount(Object.keys(childQuestionsByStep).length); // Update the step count
//       navigate("/InDepthQuestions", {
//         state: { childQuestions: childQuestionsByStep },
//       });
//     }
//   };

//   // Function to store answer in Firestore
//   const storeAnswer = async (userId, questionId, answer) => {
//     try {
//       // Construct the document reference for the user
//       const userRef = doc(fs, "users", userId);
//       // Construct the subcollection reference for the user's screening questions
//       const screeningQuestionsRef = doc(userRef, "screeningQuestions", questionId);
  
//       // Set the document with the answer
//       await setDoc(screeningQuestionsRef, { answer });
//     } catch (error) {
//       console.error("Error storing answer:", error);
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



// const [focusedQuestion, setFocusedQuestion] = useState(null);
  // const [selectedQuestions, setSelectedQuestions] = useState([]);
  // const [showChildQuestions, setShowChildQuestions] = useState(false);
  // const [answers, setAnswers] = useState({});
  // const navigate = useNavigate();
  // const { user } = useFirebase();
  // const userId = user ? user.uid : null;

  // const handleQuestionClick = (index) => {
  //   setFocusedQuestion(index === focusedQuestion ? null : index);
  // };

  // const handleYesClick = async (questionId, parentId) => {
  //   setAnswers({ ...answers, [questionId]: "YES" });
  //   setSelectedQuestions([...selectedQuestions, questionId]);
  //   setFocusedQuestion(null);
  //   await storeAnswerToFirestore(questionId, "YES");
  //   console.log(typeof questionId, "question");
  // };

  // const handleNoClick = async (questionId) => {
  //   setAnswers({ ...answers, [questionId]: "NO" });
  //   setFocusedQuestion(null);
  //   await storeAnswerToFirestore(questionId, "NO");
  // };

  // const storeAnswerToFirestore = async (questionId, answer) => {
  //   try {
  //     const answerDocRef = doc(
  //       fs,
  //       "users",
  //       user.uid,
  //       "answers",
  //       questionId.toString()
  //     );
  //     await setDoc(answerDocRef, {
  //       answer: answer,
  //       userId: user.uid, // Include user's UID in the document
  //     });
  //     console.log("Answer stored in Firestore successfully!");
  //   } catch (error) {
  //     console.error("Error storing answer in Firestore: ", error);
  //   }
  // };

  // const handleNextButtonClick = () => {
  //   const unansweredQuestions = filteredQuestions.filter(
  //     (question) => !answers.hasOwnProperty(question.id)
  //   );
  //   if (unansweredQuestions.length > 0) {
  //     setFocusedQuestion(unansweredQuestions[0].id);
  //     setShowChildQuestions(false);
  //   } else {
  //     // Update the step count when proceeding to display child questions
  //     setShowChildQuestions(true);
  //     setStepCount(Object.keys(childQuestionsByStep).length); // Update the step count
  //     navigate("/InDepthQuestions", {
  //       state: { childQuestions: childQuestionsByStep },
  //     });
  //   }
  // };

  // const isParentQuestionSelected = (parentId) => {
  //   return selectedQuestions.includes(parentId);
  // };

  // const groupChildQuestionsByParentId = () => {
  //   const groupedQuestions = {};

  //   jsonData.forEach((question) => {
  //     if (question.parentId && isParentQuestionSelected(question.parentId)) {
  //       if (!groupedQuestions[question.parentId]) {
  //         groupedQuestions[question.parentId] = [];
  //       }
  //       groupedQuestions[question.parentId].push(question);
  //     }
  //   });

  //   return groupedQuestions;
  // };

  // const childQuestionsByStep = groupChildQuestionsByParentId();
  // const filteredQuestions = jsonData.filter(
  //   (question) => question.parentId === null && question.scn_question
  // );