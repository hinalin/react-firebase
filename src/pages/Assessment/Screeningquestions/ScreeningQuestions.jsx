// import React, { useState , useEffect } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "./ScreeningQuestions.css";
// import jsonData from "../../../data/QuestionsData.json";

// const ScreeningQuestions = () => {
//     const [focusedQuestion, setFocusedQuestion] = useState(null);
//     const [answeredOptions, setAnsweredOptions] = useState({});
//     const [showChildQuestions, setShowChildQuestions] = useState(false);
//     const [selectedQuestions, setSelectedQuestions] = useState([]);

//     const handleQuestionClick = (index) => {
//         if (answeredOptions[index]) {
//             setAnsweredOptions(prevState => ({ ...prevState, [index]: null }));
//             setFocusedQuestion(index);
//         } else {
//             setFocusedQuestion(index === focusedQuestion ? null : index);
//         }
//     };

//     const handleOptionClick = (index, option, questionId) => {
//         console.log("Before state update:", answeredOptions);
//         setAnsweredOptions(prevState => ({ ...prevState, [index]: option }));
//         console.log("After state update:", answeredOptions);
//         setSelectedQuestions(prevState => [...prevState, questionId]);
//         setFocusedQuestion(null);
//     };

//     const handleNextButtonClick = () => {
//       setShowChildQuestions(true);
//     };

//     const isParentQuestionSelected = (parentId) => {
//         return selectedQuestions.includes(parentId);
//     };

//     const groupChildQuestionsByParentId = () => {
//         const groupedQuestions = {};

//         jsonData.forEach((question) => {
//             if (question.parentId && isParentQuestionSelected(question.parentId)) {
//                 if (!groupedQuestions[question.parentId]) {
//                     groupedQuestions[question.parentId] = [];
//                 }
//                 groupedQuestions[question.parentId].push(question);
//             }
//         });

//         return groupedQuestions;
//     };

//     const childQuestionsByStep = groupChildQuestionsByParentId();
//     const filteredQuestions = jsonData.filter(question => question.parentId === null && question.scn_question);

//     return (
//         <>
//             <div className="screeningQuestion-template">
//                 {filteredQuestions.map((question, index) => (
//                     <div key={question.id} className={`unanswered-card ${focusedQuestion === index && !answeredOptions[index] ? 'focused-card' : ''} ${answeredOptions[index] ? 'answered-card' : ''}`} onClick={() => handleQuestionClick(index)}>
//                         <div className="question">
//                             <p>{question.scn_question}</p>
//                             {answeredOptions[index] && (
//                                 <div className="ticked-img-div">
//                                     <AiOutlineCheck className="ticked-img" />
//                                 </div>
//                             )}
//                         </div>
//                         {focusedQuestion === index && !answeredOptions[index] && (
//                             <div className="buttons">
//                                 <button  onClick={() => handleOptionClick(index, "YES", question.id)}>YES</button>
//                                 <button  onClick={() => handleOptionClick(index, "NO")}>NO</button>
//                             </div>
//                         )}
//                         {answeredOptions[index] && (
//                             <div className="answer">
//                                 <span>{answeredOptions[index]}</span>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <button className="btn" onClick={handleNextButtonClick}>
//                 Next
//             </button>

//             {showChildQuestions && Object.keys(childQuestionsByStep).map((parentId, index) => (
//                 <div key={index}>
//                     <h2>Step {index + 1}</h2>
//                     {childQuestionsByStep[parentId].map((childQuestion) => (
//                         <div key={childQuestion.id} className="child-question">
//                             <p>{childQuestion.in_depth_question}</p>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </>
//     );
// };

// export default ScreeningQuestions;

// import React, { useState } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "./ScreeningQuestions.css";
// import jsonData from "../../../data/QuestionsData.json";

// const ScreeningQuestions = () => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [showChildQuestions, setShowChildQuestions] = useState(false);
//   const [answers, setAnswers] = useState({});

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? null : index);
//   };

//   const handleYesClick = (questionId) => {
//     setAnswers({ ...answers, [questionId]: "YES" });
//     setSelectedQuestions([...selectedQuestions, questionId]);
//     setFocusedQuestion(null);
//   };

//   const handleNoClick = (questionId) => {
//     setAnswers({ ...answers, [questionId]: "NO" });
//     setFocusedQuestion(null);
//   };

//   const handleNextButtonClick = () => {
//     setShowChildQuestions(true);
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
//   ); // Filter out questions with parentId null and scn_question not null

//   return (
//     <>
//       <div className="container">
//         <div className="screeningQuestion-template">
//           {filteredQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               }`}
//               onClick={() => handleQuestionClick(index)}
//             >
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
//         <button className="btn" onClick={handleNextButtonClick}>
//           Next
//         </button>

//         {showChildQuestions &&
//           Object.keys(childQuestionsByStep).map((parentId, index) => (
//             <div key={index}>
//               <h2>Step {index + 1}</h2>
//               {childQuestionsByStep[parentId].map((childQuestion) => (
//                 <div key={childQuestion.id} className="child-question">
//                   <p>{childQuestion.in_depth_question}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default ScreeningQuestions;

import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { useNavigate } from "react-router-dom";


const ScreeningQuestions = ({setStepCount}) => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showChildQuestions, setShowChildQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? null : index);
  };

  const handleYesClick = (questionId , parentId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
    setFocusedQuestion(null);
  };

  const handleNoClick = (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setFocusedQuestion(null);
  };

  const handleNextButtonClick = () => {
    const unansweredQuestions = filteredQuestions.filter(
        question => !answers.hasOwnProperty(question.id)
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
               {focusedQuestion === question.id && !answers[question.id] && !showChildQuestions && (
      <div className="unanswered-message">Please answer this question.</div>
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
        <p className="mt-3 ms-3" style={{fontWeight:"500", fontSize:"17px"}}>You can change your answers by clicking on the question</p>
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

