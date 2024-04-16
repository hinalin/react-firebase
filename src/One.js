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



//   {
//     "id": 1,
//     "scn_question": "In the last month, for at least 2 weeks, were you depressed or down, or felt sad, empty of hopeless OR much less interested in most things for most of the day, nearly everyday?",
//     "parentId": null,
//     "in_header_que" : "In the next few questions we want to know if you have experienced certain symptoms for a period of at least two weeks in the last month:"
// },
// {
//     "id": 2,
//     "scn_question": "Have you ever had a period of time when you were feeling “up” or “high” or “hyper” and so active or full of energy or full of yourself that you got into trouble, or that other people thought you were not your usual self for four or more consecutive days? (Do not consider times when you were intoxicated by drugs or alcohol).",
//     "parentId": null,
//     "in_header_que" : "For at least a six month period in the past how often did you:"
// },
// {
//     "id": 3,
//     "scn_question": "In the past year have you used one or more of the following substances in order to get high or change your mood? Alcohol, marijuana, oxycodone, cocaine, heroin, and other drugs.",
//     "parentId": null,
//     "in_header_que" : "In the last six months how often have you:"
// },
// {
//     "id": 4,
//     "scn_question": "Have you on more than one occasion had sudden occurrences or attacks when you felt anxious or scared, even in situations that wouldn’t bother most people?",
//     "parentId": null,
//     "in_header_que" : "In the last year how often:"
// },
// {
//     "id": 5,
//     "scn_question": "In the last month have you felt painfully anxious or afraid in social situations like having a conversation or meeting new people, or felt uncomfortable eating or drinking in front of strangers?",
//     "parentId": null,
//     "in_header_que" : "In the last month how often have you:"
// },
// {
//     "id": 6,
//     "scn_question": "Have you ever witnessed, been threatened with or experienced a physical or sexual assault, or witnessed or experienced a life-threatening event such as a major disaster or fire, combat, or a serious accident?",
//     "parentId": null,
//     "in_header_que" : "In the last three months how often:"
// },
// {
//     "id": 7,
//     "scn_question": "Over the past six months have you been excessively anxious or worried about several routine things almost every day?",
//     "parentId": null,
//     "in_header_que" : "In the last three months how often have you:"
// },
// {
//     "id": 8,
//     "scn_question": "In the last three months have you had a significant problem with food, namely eating too little, being very concerned about your weight, or having significant difficulty with overeating?",
//     "parentId": null,
//     "in_header_que" : "You mentioned experiencing sustained feelings of excitement or anger that others thought you were not your normal self. During that time, how often did you feel:"
// },
// {
//     "id": 9,
//     "scn_question": "For at least a six-month period have you continuously had significant problems with impulsivity, concentration, organization, or fidgeting to the extent that it has negatively affected you at work, at school, or at home?",
//     "parentId": null,
//     "in_header_que" : "An anxiety (or panic) attack is when you suddenly feel very frightened and have sudden physical symptoms that peak within a few minutes. During an attack, did you experience:"
// },
// {
//     "id": 10,
//     "scn_question": "In the last month have you frequently lost control of your temper, got into arguments, yelled at, and/or shouted at others?",
//     "parentId": null,
//     "in_header_que" : "You indicated that you have experienced a traumatic event related to a life-threatening situation or physical or sexual assault. We're going to want to know a bit more about your thoughts and behaviour over the past month. If you are experiencing, triggered or distressed when filling out this section, please remember to take a break, relax and seek support if you need it. Have you:"
// },
// {
//     "id": 11,
//     "scn_question": "In the last three months have you persistently had significant problems with the quality and/or quantity of your sleep such that it has negatively impacted your life?",
//     "parentId": null,
//     "in_header_que" : "In the last month how often have you been painfully nervous or anxious in the following social situations?"
// },
// {
//     "id": 12,
//     "scn_question": "In the past month have you been bothered by recurrent unwanted and distressing thoughts, impulses, or images OR bothered by the need to want to do unwanted repetitive actions like excessive washing or checking?",
//     "parentId": null,
//     "in_header_que" : "In the past month have you been bothered by recurrent unwanted and distressing thought, impulses or images OR bothered by the need to want to do unwanted repetitive actions like excessive washing or checking? For example:"
// },
// {
//     "id": 13,
//     "scn_question": "Within the last three months have you had a major stressful life event that is still causing you major emotional distress?",
//     "parentId": null,
//     "in_header_que" : "In the last year, how often have you:"
// },

// {answers[question.id] === "YES"
//                       ? selectedOptions[question.id]
//                         ? selectedOptions[question.id]
//                             .map((option) => option.label)
//                             .join(", ")
//                         : "None"
//                       : "None"}


// useEffect(() => {
  //   const checkScreeningCompleted = async () => {
  //     try {
  //       if (userId) {
  //         const userDocRef = doc(fs, "users", userId);
  //         const assessmentDocRef = doc(
  //           userDocRef,
  //           "assessment",
  //           assessmentIdRef.current
  //         );

  //         const assessmentSnapshot = await getDoc(assessmentDocRef);
  //         const assessmentData = assessmentSnapshot.data();

  //         if (assessmentData && assessmentData.screeningFormCompleted) {
  //           // If screening form is completed, set activeQuestion to "indepth"
  //           setActiveQuestion("indepth");
  //         }
  //       }
  //       console.log('fetcheddd');
  //     } catch (error) {
  //       console.error("Error checking screening form completion: ", error);
  //     }
  //   };

  //   checkScreeningCompleted();
  // }, [userId]);

  // useEffect(() => {
  //   const checkScreeningCompleted = async () => {
  //     try {
  //       if (userId) {
  //         const userDocRef = doc(fs, "users", userId);
  //         const assessmentDocRef = doc(
  //           userDocRef,
  //           "assessment",
  //           assessmentIdRef.current
  //         );

  //         const assessmentSnapshot = await getDoc(assessmentDocRef);
  //         console.log("Assessment Snapshot:", assessmentSnapshot.data());

  //         const assessmentData = assessmentSnapshot.data();
  //         console.log("Assessment Data:", assessmentData);

  //         if (assessmentData && assessmentData.screeningFormCompleted) {
  //           // If screening form is completed, set activeQuestion to "indepth"
  //           console.log("Setting active question to 'indepth'");
  //           setActiveQuestion("indepth");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking screening form completion: ", error);
  //     }
  //   };

  //   checkScreeningCompleted();
  // }, [userId]);
  // useEffect(() => {
  //   const checkAssessmentCompleted = async () => {
  //     try {
  //       if (userId) {
  //         const userDocRef = doc(fs, "users", userId);
  //         const assessmentDocRef = doc(
  //           userDocRef,
  //           "assessment",
  //           assessmentIdRef.current
  //         );

  //         const assessmentSnapshot = await getDoc(assessmentDocRef);
  //         const assessmentData = assessmentSnapshot.data();
  //         console.log(assessmentData , 'assessmentData');

  //         if (assessmentData) {
  //           if (assessmentData.screeningFormCompleted && !assessmentData.indepthFormCompleted) {
  //             setActiveQuestion("indepth");
  //             console.log('indepthhhh');
  //           } else if (assessmentData.screeningFormCompleted && assessmentData.indepthFormCompleted) {
  //             setActiveQuestion("health-history");
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error checking assessment completion: ", error);
  //     }
  //   };

  //   checkAssessmentCompleted();
  // }, [userId]);

  
  // const loadUserAnswersFromFirestore = async () => {
  //   try {
  //     if (userId) {
  //       const userDocRef = doc(fs, "users", userId);
  //       const assessmentDocRef = doc(
  //         userDocRef,
  //         "assessment",
  //         assessmentIdRef.current
  //       );
  //       const answersRef = collection(assessmentDocRef, "answers_screenings");
  //       const userAnswersSnapshot = await getDocs(answersRef);
  //       const loadedAnswers = [];
  //       const answer = {};
  //       userAnswersSnapshot.forEach((doc) => {
  //         loadedAnswers.push(doc.data());
  //         answer[doc.id] = doc.data().answer;
  //       });
  //       const selectedChildQuestion = Object.keys(answer).filter(
  //         (key) => answer[key] === "YES"
  //       );
  //       const filteredArrays = {};
  //       console.log(selectedChildQuestion);
  //       selectedChildQuestion.forEach((parentId) => {
  //         const filteredArray = filterArrayByParentId(parentId);
  //         filteredArrays[parentId] = filteredArray;
  //       });
  //       setStepCount(Object.keys(filteredArrays).length);
  //       setChildQuestions(filteredArrays);
  //       setScreeningQuestions(loadedAnswers);
  //     }
  //   } catch (error) {
  //     console.error("Error loading user answers from Firestore: ", error);
  //   }
  // };

  // // // AHIYAA filteredArray PARTHI KADACH HEALTHHISTORY LAVI SKASSEEEEE JO INDEPTH MA ANS APAII GYA HSE TOOOOO

  // useEffect(() => {
  //   if (userId) {
  //     loadUserAnswersFromFirestore();
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (screeningQuestions.length === 13) {
  //     setActiveQuestion("indepth");
  //   }
  // }, [screeningQuestions]);
  // function filterArrayByParentId(parentId) {
  //   return jsonData.filter((item) => item.parentId === Number(parentId));
  // }



  const setActiveQuestionBasedOnLastAnswer = () => {
    // Check if answers is not undefined or null
    if (answers && Object.keys(answers).length > 0) {
      const lastAnswerId = Object.keys(answers).reduce(
        (maxId, answerId) => Math.max(maxId, parseInt(answerId)),
        0
      );
      console.log(lastAnswerId, "lastanswered Id");

      if (lastAnswerId >= 1 && lastAnswerId <= 13) {
        setActiveQuestion("screening");
        // } else if (lastAnswerId >= 14 && lastAnswerId < 118) {
        //   setActiveQuestion("indepth");
      } else if (lastAnswerId > 118 && lastAnswerId < 122) {
        setActiveQuestion("health-history");
        setProgress(100);
        setIndepthProgress(100);
      } else if (lastAnswerId >= 122 && lastAnswerId < 126) {
        setActiveQuestion("life-function");
        setProgress(100);
        setIndepthProgress(100);
        setHealthHistoryProgress(100);
      }

      if (userId && assessmentIdRef.current) {
        const userDocRef = doc(fs, "users", userId);
        const assessmentDocRef = doc(
          userDocRef,
          "assessment",
          assessmentIdRef.current
        );
        setDoc(
          assessmentDocRef,
          { lastAnswerId: lastAnswerId },
          { merge: true }
        )
          .then(() => {
            console.log("lastAnswerId stored in Firestore successfully!");
          })
          .catch((error) => {
            console.error("Error storing lastAnswerId in Firestore: ", error);
          });
      }
    } else {
      console.log("No answers found.");
      // Handle the case where answers is undefined or empty
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    setActiveQuestionBasedOnLastAnswer();
  }, [answers, userId, assessmentIdRef.current]);

  useEffect(() => {
    // Define an async function to fetch lastAnswerId from Firestore
    const fetchLastAnswerId = async () => {
      try {
        // Check if userId and assessmentIdRef.current are available
        if (userId && assessmentIdRef.current) {
          // Construct Firestore document reference
          const userDocRef = doc(fs, "users", userId);
          const assessmentDocRef = doc(
            userDocRef,
            "assessment",
            assessmentIdRef.current
          );

          // Fetch document data
          const docSnap = await getDoc(assessmentDocRef);
          if (docSnap.exists()) {
            // Extract lastAnswerId from document data
            const lastAnswerId = docSnap.data().lastAnswerId;

            // Set active question based on lastAnswerId
            if (lastAnswerId >= 1 && lastAnswerId < 13) {
              setActiveQuestion("screening");
              // } else if (lastAnswerId >= 14 && lastAnswerId < 118) {
              //   setActiveQuestion("indepth");
            } else if (lastAnswerId > 119 && lastAnswerId <= 122) {
              setActiveQuestion("health-history");
              setProgress(100);
              setIndepthProgress(100);
            } else if (lastAnswerId >= 122 && lastAnswerId < 126) {
              setActiveQuestion("life-function");
              setProgress(100);
              setIndepthProgress(100);
              setHealthHistoryProgress(100);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching lastAnswerId from Firestore: ", error);
      }
    };

    // Call the async function
    fetchLastAnswerId();
  }, [userId, assessmentIdRef.current, answers]);