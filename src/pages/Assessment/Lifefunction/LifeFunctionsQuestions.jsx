import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import Footer from "../../../components/Footer/Footer";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import { Link } from "react-router-dom";

const LifeFunctionsQuestions = () => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const { user } = useFirebase();

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? null : index);
  };

  const handleYesClick = (questionId, parentId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
    setFocusedQuestion(null);
  };

  const handleNoClick = (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setFocusedQuestion(null);
  };

  const handleNextButtonClick = () => {};
  const filteredQuestions = jsonData.filter(
    (question) => question.life_functions_question
  );

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
              <div className="container">
              <div className="Lifefunction-template">
              {filteredQuestions.map((question, index) => (
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
              </div>
              <div className="buttons">
                <Link to='/LifeFunctionsQuestions'>
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

      
    </>
  );
};

export default LifeFunctionsQuestions;
