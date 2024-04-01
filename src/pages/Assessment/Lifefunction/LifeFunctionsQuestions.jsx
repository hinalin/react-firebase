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

import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import Footer from "../../../components/Footer/Footer";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Range } from "react-range";
import { Slider } from "@mui/material";

const LifeFunctionsQuestions = () => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const { user } = useFirebase();

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? index : index);
  };

  const handleNextButtonClick = () => {};

  const lifeFunctionQuestions = jsonData.filter(
    (question) => question.life_functions_question
  );

  const handleQuestionSubmit = (questionId) => {
    setAnswers({ ...answers, [questionId]: true });
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
                {answers[question.id] && (
                  <div className="ticked-img-div">
                    <AiOutlineCheck className="ticked-img" />
                  </div>
                )}
              </div>

              {focusedQuestion === index && (
                <div>
                  {question.dropdown ? (
                    <Select
                      options={question.dropdown.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                    />
                  ) : (
                    <div>
                      <Slider
                        defaultValue={50}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        style={{ height: "10px", color: "" }}
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <p className="mt-3">Your Response: {7} Days </p>
                  )}
                  {index >= 2 && <p className="mt-3">Your Response: {7} % </p>}

                  <button
                    className="btn submit-btn mt-2"
                    onClick={() => handleQuestionSubmit(question.id)}
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
        <Link to="/LifeFunctionsQuestions">
          <button className="btn" onClick={handleNextButtonClick}>
            Next
          </button>
        </Link>
      </div>
    </>
  );
};

export default LifeFunctionsQuestions;
