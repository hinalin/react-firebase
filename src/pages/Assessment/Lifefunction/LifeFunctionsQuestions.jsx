// import React, { useState } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import NavigationBar from "../../../components/NavigationBar/NavigationBar";
// import Footer from "../../../components/Footer/Footer";
// import AssessmentProgress from "../AssessmentProgress";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { Link } from "react-router-dom";
// import Select from "react-select";

// const LifeFunctionsQuestions = () => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const { user } = useFirebase();

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleNextButtonClick = () => {};
//   const lifeFunctionQuestions = jsonData.filter(
//     (question) => question.life_functions_question
//   );

//   return (
//     <>
//       <div className="StartAssessment-template">
//         <div className="header">
//           <NavigationBar user={user} />
//         </div>
//         <div className="StartAssessmentCard">
//           <div className="row">
//             <div className="col-4">
//               <AssessmentProgress />
//             </div>
//             <div className="col-8">
//               <div className="container">
//                 <div className="Lifefunction-template">
//                   {lifeFunctionQuestions.map((question, index) => (
//                     <div
//                       key={question.id}
//                       className={`unanswered-card ${
//                         focusedQuestion === index ? "focused-card" : ""
//                       }`}
//                       onClick={() => handleQuestionClick(index)}
//                     >
//                       <div className="question">
//                         <p>{question.life_functions_question}</p>
//                         {answers[question.id] && (
//                           <div className="ticked-img-div">
//                             <AiOutlineCheck className="ticked-img" />
//                           </div>
//                         )}
//                       </div>
//                       {focusedQuestion === index && (
//                         <div>
//                           <Select />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="buttons">
//                 <Link to="/LifeFunctionsQuestions">
//                   <button className="btn" onClick={handleNextButtonClick}>
//                     Next
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="footer">
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default LifeFunctionsQuestions;

// import React, { useState } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import NavigationBar from "../../../components/NavigationBar/NavigationBar";
// import Footer from "../../../components/Footer/Footer";
// import AssessmentProgress from "../AssessmentProgress";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import { Range } from "react-range";

// const LifeFunctionsQuestions = () => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const { user } = useFirebase();

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleNextButtonClick = () => {};

//   const lifeFunctionQuestions = jsonData.filter(
//     (question) => question.life_functions_question
//   );

//   return (
//     <>
//       <div className="StartAssessment-template">
//         <div className="header">
//           <NavigationBar user={user} />
//         </div>
//         <div className="StartAssessmentCard">
//           <div className="row">
//             <div className="col-4">
//               <AssessmentProgress />
//             </div>
//             <div className="col-8">
//               <div className="container">
//                 <div className="Lifefunction-template">
//                   {lifeFunctionQuestions.map((question, index) => (
//                     <div
//                       key={question.id}
//                       className={`unanswered-card ${
//                         focusedQuestion === index ? "focused-card" : ""
//                       }`}
//                       onClick={() => handleQuestionClick(index)}
//                     >
//                       <div className="question">
//                         <p>{question.life_functions_question}</p>
//                         {answers[question.id] && (
//                           <div className="ticked-img-div">
//                             <AiOutlineCheck className="ticked-img" />
//                           </div>
//                         )}
//                       </div>
//                       {focusedQuestion === index && (
//                         <div>
//                           {question.dropdown ? (
//                             <Select
//                               options={question.dropdown.map((item) => ({
//                                 value: item,
//                                 label: item,
//                               }))}
//                             />
//                           ) : (
//                             <input type="range" min="0" max="100" className="w-100" />
//                           )}

//                           <button
//                             className="btn submit-btn mt-3"
//                             // onClick={() => handleQuestionSubmit(question.id)}
//                           >
//                             Submit
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="buttons">
//                 <Link to="/LifeFunctionsQuestions">
//                   <button className="btn" onClick={handleNextButtonClick}>
//                     Next
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="footer">
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default LifeFunctionsQuestions;

// import React, { useState, useEffect } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import Select from "react-select";
// import { Slider } from "@mui/material";

// const LifeFunctionsQuestions = ({ setActiveQuestion }) => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [answers, setAnswers] = useState({});

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? index : index);
//   };

//   const handlePreviousPage = () => {
//     setActiveQuestion("health-history");
//   };
//   const handleNextButtonClick = () => {};

//   const lifeFunctionQuestions = jsonData.filter(
//     (question) => question.life_functions_question
//   );

//   const handleQuestionSubmit = (questionId, value , index) => {
//     setFocusedQuestion(index === focusedQuestion ? index : index);
//     setAnswers({ ...answers, [questionId]: value });

//   };
//   const handleDropdownChange = (selectedOption, questionId) => {
//     setAnswers({ ...answers, [questionId]: selectedOption.value });
//   };

//   const handleSliderChange = (value, questionId) => {
//     setAnswers({ ...answers, [questionId]: value });
//   };
//   return (
//     <>
//       <div className="container">
//         <div className="Lifefunction-template">
//           {lifeFunctionQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               }`}
//               onClick={() => handleQuestionClick(index)}
//             >
//               <div className="question">
//                 <p>{question.life_functions_question}</p>
//                 {focusedQuestion !== index && answers[question.id] && (
//                   <div className="ticked-img-div">
//                     <AiOutlineCheck className="ticked-img" />
//                   </div>
//                 )}
//               </div>

//               {focusedQuestion !== index && answers[question.id] && (
//                 <div className="answer">
//                   <span>
//                     {question.dropdown
//                       ? answers[question.id]
//                       : `${answers[question.id]} ${index === 1 ? "Days" : "%"}`}
//                   </span>
//                 </div>
//               )}

//               {focusedQuestion === index && (
//                 <div>
//                   {question.dropdown ? (
//                     <Select
//                       options={question.dropdown.map((item) => ({
//                         value: item,
//                         label: item,
//                       }))}
//                       onChange={(selectedOption) =>
//                         handleDropdownChange(selectedOption, question.id)
//                       }
//                     />
//                   ) : (
//                     <div>
//                       <Slider
//                         defaultValue={0}
//                         aria-label="Default"
//                         valueLabelDisplay="auto"
//                         style={{ height: "10px", color: "#33ca8f" }}
//                         onChange={(event, value) =>
//                           handleSliderChange(value, question.id)
//                         }
//                       />
//                     </div>
//                   )}
//                   {index === 1 && (
//                     <p className="mt-3">
//                       Your Response: {answers[question.id]} Days{" "}
//                     </p>
//                   )}
//                   {index >= 2 && (
//                     <p className="mt-3">
//                       Your Response: {answers[question.id]} %{" "}
//                     </p>
//                   )}

//                   <button
//                     className="btn submit-btn mt-2"
//                     onClick={() =>
//                       handleQuestionSubmit(question.id, answers[question.id])
//                     }
//                   >
//                     Submit
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="buttons">
//         <button className="btn" onClick={handlePreviousPage}>
//           Previous
//         </button>
//         <button className="btn" onClick={handleNextButtonClick}>
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default LifeFunctionsQuestions;

import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import Select from "react-select";
import { Slider } from "@mui/material";
import { useFirebase } from "../../../context/FirebaseContext";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const LifeFunctionsQuestions = ({
  setActiveQuestion,
  setLifeFunctionProgress,
}) => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});

  const { user } = useFirebase();
  const userId = user ? user.uid : null;

  useEffect(() => {
    // Find the index of the first unanswered question
    const firstUnansweredIndex = lifeFunctionQuestions.findIndex(
      (question) => !answers[question.id]
    );

    // If there's a first unanswered question, focus on it
    if (firstUnansweredIndex !== -1) {
      setFocusedQuestion(firstUnansweredIndex);
    }
  }, []);

  const updateProgress = () => {
    const numQuestions = lifeFunctionQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setLifeFunctionProgress(newProgress);
  };
  console.log(answers, "answers");

  useEffect(() => {
    if (userId) {
      fetchUserAnswersFromFirestore(userId);
    }
  }, [userId]);

  const fetchUserAnswersFromFirestore = async (userId) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-life-functions");
      const userAnswersSnapshot = await getDocs(userAnswersRef);
      const loadedAnswers = {};
      userAnswersSnapshot.forEach((doc) => {
        loadedAnswers[doc.id] = doc.data().answer;
      });
      setAnswers(loadedAnswers);
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };

  const handleQuestionClick = (index) => {
    // setFocusedQuestion(index === focusedQuestion ? index : index);
    if (focusedQuestion !== index) {
      setFocusedQuestion(index);
    }
  };

  const handlePreviousPage = () => {
    setActiveQuestion("health-history");
  };

  const handleFinishButtonClick = () => {};

  const lifeFunctionQuestions = jsonData.filter(
    (question) => question.life_functions_question
  );

  const handleQuestionSubmit = async (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    await storeAnswerToFirestore(questionId, value);
    updateProgress();
    setFocusedQuestion(null);
    const nextUnansweredIndex = lifeFunctionQuestions.findIndex(
      (question, index) => !answers[question.id] && index > focusedQuestion
    );
    console.log(nextUnansweredIndex, "nextUnansweredIndex");
    if (nextUnansweredIndex !== 0) {
      setFocusedQuestion(nextUnansweredIndex);
      console.log(focusedQuestion, "focusedQuestion now");
    }
  };

  const handleDropdownChange = (selectedOption, questionId) => {
    setAnswers({ ...answers, [questionId]: selectedOption.value });
  };

  const handleSliderChange = (value, questionId) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const storeAnswerToFirestore = async (questionId, value) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-life-functions");
      const answerDocRef = doc(userAnswersRef, questionId.toString());
      await setDoc(answerDocRef, {
        questionId: questionId,
        answer: value,
        type: "life-function",
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="Lifefunction-template">
          {lifeFunctionQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              <div className="question">
                <p>{question.life_functions_question}</p>
                {focusedQuestion !== index && answers[question.id] && (
                  <div className="ticked-img-div">
                    <AiOutlineCheck className="ticked-img" />
                  </div>
                )}
              </div>

              {focusedQuestion !== index && answers[question.id] && (
                <div className="answer">
                  <span>
                    {question.dropdown
                      ? answers[question.id]
                      : `${answers[question.id]} ${index === 1 ? "Days" : "%"}`}
                  </span>
                </div>
              )}

              {focusedQuestion === index && (
                <div>
                  {question.dropdown ? (
                    <Select
                      options={question.dropdown.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      onChange={(selectedOption) =>
                        handleDropdownChange(selectedOption, question.id)
                      }
                    />
                  ) : (
                    <div>
                      <Slider
                        defaultValue={answers[question.id] || 0}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        style={{ height: "10px", color: "#33ca8f" }}
                        onChange={(event, value) =>
                          handleSliderChange(value, question.id)
                        }
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <p className="mt-3">
                      Your Response: {answers[question.id]} Days{" "}
                    </p>
                  )}
                  {index >= 2 && (
                    <p className="mt-3">
                      Your Response: {answers[question.id]} %{" "}
                    </p>
                  )}

                  <button
                    className="btn submit-btn mt-2"
                    onClick={() =>
                      handleQuestionSubmit(question.id, answers[question.id])
                    }
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        <button className="btn" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="btn" onClick={handleFinishButtonClick}>
          Finish
        </button>
      </div>
    </>
  );
};

export default LifeFunctionsQuestions;
