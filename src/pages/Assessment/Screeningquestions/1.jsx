// import React, { useState } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "./ScreeningQuestions.css";
// import jsonData from "../../../data/QuestionsData.json";

// const ScreeningQuestions = () => {
//     const [focusedQuestion, setFocusedQuestion] = useState(null);
//     const [answeredOption, setAnsweredOption] = useState(null);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [showChildQuestions, setShowChildQuestions] = useState(false);
//     const [selectedQuestions, setSelectedQuestions] = useState([]);



//     const handleQuestionClick = (index) => {
//         if (answeredOption) {
//             setAnsweredOption(null);
//             setFocusedQuestion(index);
//         } else {
//             setFocusedQuestion(index === focusedQuestion ? null : index);
//         }
//     };

//     const handleYesClick = (questionId) => {
//         setAnsweredOption("YES");
//         setSelectedOption("YES");
//         setFocusedQuestion(null);
//         setSelectedQuestions([...selectedQuestions, questionId])
//     };

//     const handleNoClick = () => {
//         setAnsweredOption("NO");
//         setSelectedOption("NO");
//         setFocusedQuestion(null);
//     };
//     const handleNextButtonClick = () => {
//       setShowChildQuestions(true);
//     };

//     const isParentQuestionSelected = (parentId) => {
//       return selectedQuestions.includes(parentId);
//     };
//     const groupChildQuestionsByParentId = () => {
//       const groupedQuestions = {};
  
//       jsonData.forEach((question) => {
//         if (question.parentId && isParentQuestionSelected(question.parentId)) {
//           if (!groupedQuestions[question.parentId]) {
//             groupedQuestions[question.parentId] = [];
//           }
//           groupedQuestions[question.parentId].push(question);
//         }
//       });
  
//       return groupedQuestions;
//     };
  
//     const childQuestionsByStep = groupChildQuestionsByParentId();
//     const filteredQuestions = jsonData.filter(question => question.parentId === null && question.scn_question); // Filter out questions with parentId null and scn_question not null

//     return (
//         <>
//             <div className="screeningQuestion-template">
//                 {filteredQuestions.map((question, index) => (
//                     <div key={question.id} className={`unanswered-card ${focusedQuestion === index && !answeredOption ? 'focused-card' : ''} ${answeredOption ? 'answered-card' : ''}`} onClick={() => handleQuestionClick(index)}>
//                         <div className="question">
//                             <p>{question.scn_question}</p>
//                             {answeredOption && (
//                                 <div className="ticked-img-div">
//                                     <AiOutlineCheck className="ticked-img" />
//                                 </div>
//                             )}
//                         </div>
//                         {focusedQuestion === index && !answeredOption && (
//                             <div className="buttons">
//                                 <button className={`yes_btn ${selectedOption === "YES" ? 'green' : ''}`} onClick={() => handleYesClick(question.id)}>YES</button>
//                                 <button className={`no_btn ${selectedOption === "NO" ? 'green' : ''}`} onClick={handleNoClick}>NO</button>
//                             </div>
//                         )}
//                         {answeredOption && (
//                             <div className="answer">
//                                 <span>{answeredOption}</span>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <button className="btn" onClick={handleNextButtonClick}>
//           Next
//         </button>

//         {showChildQuestions && Object.keys(childQuestionsByStep).map((parentId, index) => (
//           <div key={index}>
//             <h2>Step {index + 1}</h2>
//             {childQuestionsByStep[parentId].map((childQuestion) => (
//               <div key={childQuestion.id} className="child-question">
//                 <p>{childQuestion.in_depth_question}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//         </>
//     );
// };

// export default ScreeningQuestions;






// import React, { useState } from "react";
// import jsonData from "../../../data/QuestionsData.json";
// import "./ScreeningQuestions.css";

// const ScreeningQuestions = () => {
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [showChildQuestions, setShowChildQuestions] = useState(false);

//   const handleButtonClick = (questionId) => {
//     setSelectedQuestions([...selectedQuestions, questionId]);
//   };

//   const isParentQuestionSelected = (parentId) => {
//     return selectedQuestions.includes(parentId);
//   };

//   const handleNextButtonClick = () => {
//     setShowChildQuestions(true);
//   };

//   const parentQuestions = jsonData.filter(
//     (question) => question.scn_question && question.parentId === null
//   );
// //   const childQuestionsByParent = parentQuestions.reduce((acc, parentQuestion) => {
// //     const childQuestions = jsonData.filter(
// //       (question) => question.parentId === parentQuestion.id
// //     );
// //     acc[parentQuestion.id] = childQuestions;
// //     return acc;
// //   }, {});

// const groupChildQuestionsByParentId = () => {
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
//   return (
//     <>
//       <div className="screeningQuestion-template">
//         {parentQuestions.map((question) => (
//           <div key={question.id}>
//             <div id="accordion">
//               <div class="card">
//                 <div class="card-header" id="headingOne">
//                   <h5 class="mb-0">
//                     <button
//                       class="btn"
//                       data-toggle="collapse"
//                       data-target="#collapseOne"
//                       aria-expanded="true"
//                       aria-controls="collapseOne"
//                     >
//                       <p>{question.scn_question}</p>
//                     </button>
//                   </h5>
//                 </div>

//                 <div
//                   id="collapseOne"
//                   class="collapse show"
//                   aria-labelledby="headingOne"
//                   data-parent="#accordion"
//                 >
//                   <div class="card-body">
//                     <button
//                       className="btn screening-yes-btn yes-no-btn me-3"
//                       onClick={() => handleButtonClick(question.id)}
//                     >
//                       Yes
//                     </button>
//                     <button className="btn screening-no-btn yes-no-btn">
//                       No
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//         <button className="btn" onClick={handleNextButtonClick}>
//           Next
//         </button>
//         {/* {showChildQuestions && (
//           <div>
//             {jsonData
//               .filter(
//                 (question) =>
//                   question.parentId &&
//                   isParentQuestionSelected(question.parentId)
//               )
//               .map((childQuestion) => (
//                 <div key={childQuestion.id} className="child-question">
//                   <p>{childQuestion.in_depth_question}</p>
//                 </div>
//               ))}
//           </div>
//         )} */}
        
//         {showChildQuestions && Object.keys(childQuestionsByStep).map((parentId, index) => (
//           <div key={index}>
//             <h2>Step {index + 1}</h2>
//             {childQuestionsByStep[parentId].map((childQuestion) => (
//               <div key={childQuestion.id} className="child-question">
//                 <p>{childQuestion.in_depth_question}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ScreeningQuestions;