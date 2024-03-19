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
//   const childQuestionsByParent = parentQuestions.reduce((acc, parentQuestion) => {
//     const childQuestions = jsonData.filter(
//       (question) => question.parentId === parentQuestion.id
//     );
//     acc[parentQuestion.id] = childQuestions;
//     return acc;
//   }, {});

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
        {/* {showChildQuestions && (
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
        )} */}
        
        {showChildQuestions && Object.keys(childQuestionsByStep).map((parentId, index) => (
          <div key={index}>
            <h2>Step {index + 1}</h2>
            {childQuestionsByStep[parentId].map((childQuestion) => (
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


