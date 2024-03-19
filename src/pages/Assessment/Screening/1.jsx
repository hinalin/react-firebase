// import React from 'react';
// import jsonData from '../../data/QuestionsData.json';

// const ScreeningQuestions = () => {
//   return (
//     <>
//       <div className="screeningQuestion-template">
//         {jsonData.map(question => (
//           <div key={question.id}>
//             <p>{question.scn_question}</p>
//             <button className='btn'>Yes</button>
//             <button className='btn'>No</button>
//           </div>
//         ))}
//         <button className='btn'>next</button>
//       </div>
//     </>
//   )
// }

// export default ScreeningQuestions;

// import React, { useState } from 'react';
// import jsonData from '../../../data/QuestionsData.json';
// import './ScreeningQuestions.css';

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

//   return (
//     <>
//       <div className="screeningQuestion-template">
//         {jsonData.map(question => (
//           <div key={question.id}>
//             <p>{question.scn_question}</p>
//             <button className='btn screening-yes-btn yes-no-btn me-3' onClick={() => handleButtonClick(question.id)}>Yes</button>
//             <button className='btn screening-no-btn yes-no-btn'>No</button>
//           </div>
//         ))}
//         <button className='btn' onClick={handleNextButtonClick}>Next</button>
//         {showChildQuestions && (
//           <div>
//             {jsonData.filter(question => question.parentId && isParentQuestionSelected(question.parentId)).map(childQuestion => (
//               <div key={childQuestion.id} className="child-question">
//                 <p>{childQuestion.sub}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default ScreeningQuestions;

import React, { useState } from "react";
import jsonData from "../../../data/QuestionsData.json";
import "./ScreeningQuestions.css";

const ScreeningQuestions = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showChildQuestions, setShowChildQuestions] = useState(false);

  const handleButtonClick = (questionId) => {
    setSelectedQuestions([...selectedQuestions, questionId]);
  };

  const isParentQuestionSelected = (parentId) => {
    return selectedQuestions.includes(parentId);
  };

  const handleNextButtonClick = () => {
    setShowChildQuestions(true);
  };

  const parentQuestions = jsonData.filter(
    (question) => question.scn_question && question.parentId === null
  );

  return (
    <>
      <div className="screeningQuestion-template">
        {parentQuestions.map((question) => (
          <div key={question.id}>
            <div id="accordion">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button
                      class="btn"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <p>{question.scn_question}</p>
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <button
                      className="btn screening-yes-btn yes-no-btn me-3"
                      onClick={() => handleButtonClick(question.id)}
                    >
                      Yes
                    </button>
                    <button className="btn screening-no-btn yes-no-btn">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button className="btn" onClick={handleNextButtonClick}>
          Next
        </button>
        {showChildQuestions && (
          <div>
            {jsonData
              .filter(
                (question) =>
                  question.parentId &&
                  isParentQuestionSelected(question.parentId)
              )
              .map((childQuestion) => (
                <div key={childQuestion.id} className="child-question">
                  <p>{childQuestion.in_depth_question}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ScreeningQuestions;



