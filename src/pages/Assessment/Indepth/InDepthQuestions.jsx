// import React, { useState } from "react";
// import NavigationBar from "../../../components/NavigationBar/NavigationBar";
// import Footer from "../../../components/Footer/Footer";
// import AssessmentProgress from "../AssessmentProgress";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { AiOutlineCheck } from "react-icons/ai";
// import { Link, useLocation } from "react-router-dom";
// import "../Question.css";

// const InDepthQuestions = () => {
//   const { user } = useFirebase();
//   const location = useLocation();
//   const childQuestions = location.state.childQuestions;
//   console.log(childQuestions , 'childquestons');

//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [answeredQuestions, setAnsweredQuestions] = useState({});
//   const [currentStep, setCurrentStep] = useState(1);

//   // const stepCount = Object.keys(childQuestions).length;
//   // console.log(stepCount);

//   const handleQuestionClick = (questionId) => {
//     setFocusedQuestion(questionId);
//   };

//   const handleAnswerClick = (questionId, answer) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
//     setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
//     setFocusedQuestion(null);
//   };

//   const handleNextButtonClick = () => {
//     const unansweredQuestions = Object.keys(selectedAnswers).filter(
//       (questionId) => !selectedAnswers[questionId]
//     );
//     if (unansweredQuestions.length === 0) {
//         console.log("Navigate to next step");
//     } else {
//       setFocusedQuestion(unansweredQuestions[0]);
//     }
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
//               <AssessmentProgress />
//             </div>
//             <div className="col-8">
//               <p>
//                 In the next few questions we want to know if you have
//                 experienced certain symptoms for a period of at least two weeks
//                 in the last month:
//               </p>
//               <div className="InDepthQuestions-template">
//                 {Object.keys(childQuestions).map((parentId , index) => (
//                   childQuestions[parentId].map((childQuestion) => (
//                     <div
//                       key={childQuestion.id}
//                       className={`unanswered-card ${
//                         focusedQuestion === childQuestion.id
//                           ? "focused-card"
//                           : ""
//                       } ${
//                         answeredQuestions[childQuestion.id]
//                           ? "answered-card"
//                           : ""
//                       }`}
//                       onClick={() => handleQuestionClick(childQuestion.id)}
//                     >
//                       <h6>Step {currentStep}</h6>
//                       <div className="question">
//                         <p>{childQuestion.in_depth_question}</p>
//                       </div>
//                       {(selectedAnswers[childQuestion.id] ||
//                         answeredQuestions[childQuestion.id]) && (
//                         <div className="ticked-img-div">
//                           <AiOutlineCheck className="ticked-img" />
//                         </div>
//                       )}
//                       {(selectedAnswers[childQuestion.id] ||
//                         answeredQuestions[childQuestion.id]) && (
//                         <div className="answer">
//                           <p>{selectedAnswers[childQuestion.id]}</p>
//                         </div>
//                       )}
//                       <div className="buttons">
//                         {focusedQuestion === childQuestion.id && (
//                           <div>
//                             <button
//                               className={`${
//                                 selectedAnswers[childQuestion.id] === "Never" &&
//                                 selectedAnswers[childQuestion.id]
//                                   ? "green"
//                                   : ""
//                               }`}
//                               onClick={() =>
//                                 handleAnswerClick(childQuestion.id, "Never")
//                               }
//                             >
//                               never
//                             </button>
//                             <button
//                                 className={`${
//                                   selectedAnswers[childQuestion.id] ===
//                                     "Rarely" &&
//                                   selectedAnswers[childQuestion.id]
//                                     ? "green"
//                                     : ""
//                                 }`}
//                                 onClick={() =>
//                                   handleAnswerClick(childQuestion.id, "Rarely")
//                                 }
//                               >
//                                 rarely
//                               </button>
//                               <button
//                                 className={`${
//                                   selectedAnswers[childQuestion.id] ===
//                                     "Sometimes" &&
//                                   selectedAnswers[childQuestion.id]
//                                     ? "green"
//                                     : ""
//                                 }`}
//                                 onClick={() =>
//                                   handleAnswerClick(
//                                     childQuestion.id,
//                                     "Sometimes"
//                                   )
//                                 }
//                               >
//                                 Sometimes
//                               </button>

//                               <button
//                                 className={`${
//                                   selectedAnswers[childQuestion.id] ===
//                                     "Frequently" &&
//                                   selectedAnswers[childQuestion.id]
//                                     ? "green"
//                                     : ""
//                                 }`}
//                                 onClick={() =>
//                                   handleAnswerClick(
//                                     childQuestion.id,
//                                     "Frequently"
//                                   )
//                                 }
//                               >
//                                 Frequently
//                               </button>

//                               <button
//                                 className={`${
//                                   selectedAnswers[childQuestion.id] ===
//                                     "All the time" &&
//                                   selectedAnswers[childQuestion.id]
//                                     ? "green"
//                                     : ""
//                                 }`}
//                                 onClick={() =>
//                                   handleAnswerClick(
//                                     childQuestion.id,
//                                     "All the time"
//                                   )
//                                 }
//                               >
//                                 All the time
//                               </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ))}
//                 <div className="buttons">
//                   {currentStep > 1 && (
//                     <button
//                       className="btn"
//                       // onClick={() => setCurrentStep(currentStep - 1)}
//                     >
//                       prev
//                     </button>
//                   )}
//                   <button className="btn" onClick={handleNextButtonClick}>
//                     Next
//                   </button>
//                 </div>
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

// export default InDepthQuestions;

import React, { useState } from "react";
import "../Question.css";
import { useLocation } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import { Link } from "react-router-dom";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import Footer from '../../../components/Footer/Footer'

const InDepthQuestions = () => {

  const { user } = useFirebase();
  const location = useLocation();
  const childQuestions = location.state.childQuestions;
  const stepCount = Object.keys(childQuestions).length;
  
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});

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
              <AssessmentProgress stepCount={stepCount}/>
            </div>
            <div className="col-8">
              <p className="ms-3" style={{fontWeight:"600" , fontSize:"17px"}}>You mentioned experiencing sustained feelings of excitement or anger that others thought you were not your normal self. During that time, how often did you feel:</p>
              <div className="container">
                <div className="InDepthQuestions-template">
                  {Object.keys(childQuestions).map((parentId, index) =>
                    childQuestions[parentId].map(
                      (childQuestion, questionIndex) => (
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
                          <h6>step {index + 1 } </h6>
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
                                    selectedAnswers[childQuestion.id] ===
                                      "Never" &&
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
                                    selectedAnswers[childQuestion.id] ===
                                      "Rarely" &&
                                    selectedAnswers[childQuestion.id]
                                      ? "green"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleAnswerClick(
                                      childQuestion.id,
                                      "Rarely"
                                    )
                                  }
                                >
                                  Rarely
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
                      )
                    )
                  )}
                </div>
                <div className="buttons">
            <Link to="/LifeFunctionsQuestions">
              <button className="btn" onClick={handleNextButtonClick}>
                Next
              </button>
            </Link>
          </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="footer">
        <Footer />
      </div>
      </div>
      
      
    </>
  );
};

export default InDepthQuestions;
