import React, { useState } from "react";
import "../Question.css";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import Footer from "../../../components/Footer/Footer";

const InDepthQuestions = () => {
  const { user } = useFirebase();
  const location = useLocation();
  const childQuestions = location.state.childQuestions;
  const stepCount = Object.keys(childQuestions).length;
  const navigate = useNavigate();

  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // Current page index

  const handleNextPage = () => {
    // setCurrentPage(currentPage + 1); // Increment current page index
    if (currentPage === Object.keys(childQuestions).length - 1) {
      // If it's the last page, navigate to health history page
      navigate("/HelthHistoryQuestions "); // Navigate to the health history page
    } else {
      setCurrentPage(currentPage + 1); // Increment current page index
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1); // Decrement current page index
  };
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

  return (
    <>
      <div className="StartAssessment-template">
        <div className="header">
          <NavigationBar user={user} />
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-4">
              <AssessmentProgress stepCount={stepCount} />
            </div>
            <div className="col-8">
              <p
                className="ms-3"
                style={{ fontWeight: "600", fontSize: "17px" }}
              >
                You mentioned experiencing sustained feelings of excitement or
                anger that others thought you were not your normal self. During
                that time, how often did you feel:
              </p>
              <div className="container">
                <div className="InDepthQuestions-template">
                  {Object.keys(childQuestions).map((parentId, index) =>
                    index === currentPage
                      ? childQuestions[parentId].map(
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
                              onClick={() =>
                                handleQuestionClick(childQuestion.id)
                              }
                            >
                              {/* <h6>step {index + 1} </h6> */}
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
                                        handleAnswerClick(
                                          childQuestion.id,
                                          "Never"
                                        )
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
                      : null
                  )}
                </div>

                <div className="buttons">
                  {/* Previous button */}
                  <button
                    className="btn"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                  {/* Next button */}
                  <button
                    className="btn"
                    onClick={handleNextPage}
                    // disabled={
                    //   currentPage === Object.keys(childQuestions).length - 1
                    // }
                  >
                    Next
                  </button>
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
