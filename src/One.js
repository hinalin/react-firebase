// const { user } = useFirebase();

  // const userId = user ? user.uid : null;
  // const [profileData, setProfileData] = useState({
  //   gender: "",
  //   age: "",
  //   languages: "",
  //   location: "",
  //   phoneNumber: "",
  //   doctorEmail: "",
  // });

  // const { gender, age, languages, location, phoneNumber, doctorEmail } =
  //   profileData;

  // const handleUpdate = () => {
  //   Object.keys(profileData).forEach((key) => {
  //     localStorage.setItem(`${userId}_${key}`, profileData[key]);
  //   });
  //   alert("Data updated successfully!");
  // };

  // useEffect(() => {
  //   const storedProfileData = {};
  //   Object.keys(profileData).forEach((key) => {
  //     const storedValue = localStorage.getItem(`${userId}_${key}`);
  //     if (storedValue) storedProfileData[key] = storedValue;
  //   });
  //   // Update profileData state with stored data
  //   setProfileData((prevState) => ({ ...prevState, ...storedProfileData }));
  // }, [userId]);

  // const handleChange = (key, value) => {
  //   setProfileData((prevState) => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };


    // const unansweredQuestions = filteredQuestions.filter(
    //     question => !answers.hasOwnProperty(question.id)
    //   );
    
    //   if (unansweredQuestions.length > 0) {
    //     // Show an alert if there are unanswered questions
    //     alert("Please answer all questions before proceeding.");
    //   } else {
    //     // Proceed to display child questions
    //     setShowChildQuestions(true);
    //   }



           {/* {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              }`}
              onClick={() => handleQuestionClick(index)}
            >
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
          ))} */}







          import React, { useState } from "react";
import NavigationBar from "../../../components/NavigationBar/NavigationBar";
import Footer from "../../../components/Footer/Footer";
import AssessmentProgress from "../AssessmentProgress";
import { useFirebase } from "../../../context/FirebaseContext";
import { AiOutlineCheck } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "../Question.css";

const InDepthQuestions = () => {
  const { user } = useFirebase();
  const location = useLocation();
  const childQuestions = location.state.childQuestions;
  console.log(childQuestions , 'childquestons');

  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // const stepCount = Object.keys(childQuestions).length;
  // console.log(stepCount);

  const handleQuestionClick = (questionId) => {
    setFocusedQuestion(questionId);
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
              <AssessmentProgress />
            </div>
            <div className="col-8">
              <p>
                In the next few questions we want to know if you have
                experienced certain symptoms for a period of at least two weeks
                in the last month:
              </p>
              <div className="InDepthQuestions-template">
                {Object.keys(childQuestions).map((parentId , index) => (
                  childQuestions[parentId].map((childQuestion) => (
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
                      <h6>Step {currentStep}</h6>
                      <div className="question">
                        <p>{childQuestion.in_depth_question}</p>
                      </div>
                      {(selectedAnswers[childQuestion.id] ||
                        answeredQuestions[childQuestion.id]) && (
                        <div className="ticked-img-div">
                          <AiOutlineCheck className="ticked-img" />
                        </div>
                      )}
                      {(selectedAnswers[childQuestion.id] ||
                        answeredQuestions[childQuestion.id]) && (
                        <div className="answer">
                          <p>{selectedAnswers[childQuestion.id]}</p>
                        </div>
                      )}
                      <div className="buttons">
                        {focusedQuestion === childQuestion.id && (
                          <div>
                            <button
                              className={`${
                                selectedAnswers[childQuestion.id] === "Never" &&
                                selectedAnswers[childQuestion.id]
                                  ? "green"
                                  : ""
                              }`}
                              onClick={() =>
                                handleAnswerClick(childQuestion.id, "Never")
                              }
                            >
                              never
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
                                  handleAnswerClick(childQuestion.id, "Rarely")
                                }
                              >
                                rarely
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
                  ))
                ))}
                <div className="buttons">
                  {currentStep > 1 && (
                    <button
                      className="btn"
                      // onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      prev
                    </button>
                  )}
                  <button className="btn" onClick={handleNextButtonClick}>
                    Next
                  </button>
                </div>
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

export default InDepthQuestions;


