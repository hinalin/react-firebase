import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { useNavigate } from "react-router-dom";
import { fs } from "../../../config/Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/FirebaseContext";

const ScreeningQuestions = ({ setStepCount }) => {
  
    const [focusedQuestion, setFocusedQuestion] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [showChildQuestions, setShowChildQuestions] = useState(false);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const { user } = useFirebase();
    const userId = user ? user.uid : null;
  
    const handleQuestionClick = (index) => {
      setFocusedQuestion(index === focusedQuestion ? null : index);
    };
  
    const handleYesClick = async (questionId) => {
      setAnswers({ ...answers, [questionId]: "YES" });
      setSelectedQuestions([...selectedQuestions, questionId]);
      setFocusedQuestion(null);
      await storeAnswerToFirestore(questionId, "YES" , true);
    };
  
    const handleNoClick = async (questionId) => {
      setAnswers({ ...answers, [questionId]: "NO" });
      setFocusedQuestion(null);
      await storeAnswerToFirestore(questionId, "NO" , false);
    };
  
    const storeAnswerToFirestore = async (questionId, answer , buttonState) => {
      try {
        const answerDocRef = doc(fs, "users", userId, "answers-screenings", questionId.toString());
        await setDoc(answerDocRef, {
          answer: answer,
          buttonState: buttonState
        });
        console.log("Answer stored in Firestore successfully!");
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
        setShowChildQuestions(true);
        setStepCount(Object.keys(childQuestionsByStep).length);
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

