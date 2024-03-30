import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import Footer from "../../../components/Footer/Footer";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import Select from "react-select";

const ScreeningQuestions = () => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [newOption, setNewOption] = useState("");
  const [submitClicked, setSubmitClicked] = useState({});
  const { user } = useFirebase();

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index);
  };

  const handleYesClick = (questionId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
  };

  const handleNoClick = (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setSelectedOptions({ ...selectedOptions, [questionId]: null }); // Reset selected options for the question
    setFocusedQuestion(null); // Reset focusedQuestion to close the card
  };

  const handleChange = (selected, questionId) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: selected }); // Update selected options for the question
  };

  const handleAddOption = (questionId) => {
    if (newOption.trim() !== "") {
      const updatedOptions = [
        ...(selectedOptions[questionId] || []),
        { value: newOption, label: newOption },
      ];
      setSelectedOptions({ ...selectedOptions, [questionId]: updatedOptions });
      setNewOption(""); // Clear input field after adding option
    }
  };

  const handleNextButtonClick = () => {};

  const filteredQuestions = jsonData.filter(
    (question) => question.health_history_question
  );

  const handleQuestionSubmit = (questionId) => {
    setSubmitClicked({ ...submitClicked, [questionId]: true });
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
              <AssessmentProgress />
            </div>
            <div className="col-8">
              <div className="container">
                <div className="Helthhostory-template">
                  {filteredQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`unanswered-card ${
                        focusedQuestion === index ? "focused-card" : ""
                      }`}
                      onClick={() => handleQuestionClick(index)}
                    >
                      <div className="question">
                        <p>{question.health_history_question}</p>
                        {answers[question.id] && (
                          <div className="ticked-img-div me-2">
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
                      
                      {focusedQuestion !== index && (
                        <div className="answer">
                          {selectedOptions[question.id] &&
                            submitClicked[question.id] && (
                              <div className="answer">
                                {selectedOptions[question.id].map(
                                  (option, index) => (
                                    <span key={index}>
                                      {index > 0 && " , "}
                                      {option.label}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          {answers[question.id] === "NO" && <div>None</div>}
                        </div>
                      )}

                      {focusedQuestion === index &&
                        answers[question.id] === "YES" && (
                          <div>
                            <Select
                              options={[
                                ...(question.dropdown || []).map(
                                  (item, index) => ({
                                    value: item,
                                    label: item,
                                  })
                                ),
                                ...(selectedOptions[question.id] || []),
                              ]}
                              value={selectedOptions[question.id]}
                              onChange={(selected) =>
                                handleChange(selected, question.id)
                              }
                              className="mt-3 dropdown"
                              isMulti
                            />
                            <div className="input-dropdown d-flex">
                              <input
                                type="text"
                                placeholder="Other (Please type)"
                                className="p-3 mt-3 w-100 dropdown-input"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                              />
                              <button
                                className="btn mt-3 ms-2 add-btn"
                                onClick={() => handleAddOption(question.id)}
                              >
                                Add
                              </button>
                            </div>

                            <div className="submit-button">
                              <button
                                className="btn submit-btn mt-3 text-light"
                                onClick={() =>
                                  handleQuestionSubmit(question.id)
                                }
                              >
                                Submit
                              </button>
                            </div>
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

export default ScreeningQuestions;
