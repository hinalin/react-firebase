import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import Select from "react-select";
import { Slider } from "@mui/material";
import { useFirebase } from "../../../context/FirebaseContext";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const LifeFunctionsQuestions = ({
  setActiveQuestion,
  setLifeFunctionProgress,
  nextClicked,
  setNextClicked,
  assessmentIdRef,
  setAssessmentStatus,
  answers,
  setAnswers,
  lifeFunctionQuestions,
  focusedQuestion,
  setFocusedQuestion,
  setPreviousClicked
}) => {
  const { user } = useFirebase();
  const userId = user ? user.uid : null;
  const navigate = useNavigate();

  useEffect(() => {
    const firstUnansweredIndex = lifeFunctionQuestions.findIndex(
      (question) => !answers[question.id]
    );
    if (firstUnansweredIndex !== -1) {
      setFocusedQuestion(firstUnansweredIndex);
    }
  }, []);

  useEffect(() => {
    const numQuestions = lifeFunctionQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setLifeFunctionProgress(Math.min(newProgress, 100));
  }, [answers]);

  useEffect(() => {
    if (userId) {
      fetchUserAnswersFromFirestore(userId, assessmentIdRef, setAnswers);
    }
  }, [userId]);

  const fetchUserAnswersFromFirestore = async (
    userId,
    assessmentIdRef,
    setAnswers
  ) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      const answersRef = collection(assessmentDocRef, "answers-life-functions");
      const userAnswersSnapshot = await getDocs(answersRef);
      const loadedAnswers = {};
      userAnswersSnapshot.forEach((doc) => {
        loadedAnswers[doc.id] = doc.data().answer;
      });
      setAnswers(loadedAnswers); // Set the answers state with fetched answers
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };
  const handleQuestionClick = (index) => {
    if (focusedQuestion !== index) {
      setFocusedQuestion(index);
    }
  };

  const handlePreviousPage = () => {
    setActiveQuestion("health-history");
    setNextClicked(false);
    setPreviousClicked(true);
  };

  const handleFinishButtonClick = async () => {
    setNextClicked(true);
    const firstUnansweredIndex = lifeFunctionQuestions.findIndex(
      (question) => !answers[question.id]
    );
    if (firstUnansweredIndex !== -1) {
      setFocusedQuestion(firstUnansweredIndex);
    } else {
      console.log("All questions answered. Proceed to finish.");
      setNextClicked(false);
      setAssessmentStatus("Completed");
      navigate("/Summary");

    }
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      await setDoc(
        assessmentDocRef,
        {
          assessmentStatus: "Completed",
        },
        { merge: true }
      ); // Merge with existing data if any
      console.log("Start time and assessment status stored in Firestore!");
    } catch (error) {
      console.error("Error storing start time and assessment status: ", error);
    }
    const newAssessmentId = uuidv4();
  
    // Store the new assessment ID in local storage
    localStorage.setItem("assessmentId", newAssessmentId);
  
    // Store the new assessment start time in Firestore
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(userDocRef, "assessment", newAssessmentId);
      console.log("New assessment data stored in Firestore!");
    } catch (error) {
      console.error("Error storing new assessment data: ", error);
    }
  
  };
  
  const handleQuestionSubmit = async (questionId, value) => {
    if (value === undefined || value === null || value === "") {
      // Display an alert if the user hasn't provided an answer
      alert("Please answer the question before submitting.");
      return;
    }

    setAnswers({ ...answers, [questionId]: value });
    await storeAnswerToFirestore(questionId, value);
    setFocusedQuestion(null);
    const nextUnansweredIndex = lifeFunctionQuestions.findIndex(
      (question, index) => !answers[question.id] && index > focusedQuestion
    );
    if (nextUnansweredIndex !== -1) {
      setFocusedQuestion(nextUnansweredIndex);
      setNextClicked(false);
    }
  };

  const handleDropdownChange = (selectedOption, questionId) => {
    setAnswers({ ...answers, [questionId]: selectedOption.value });
  };

  const handleSliderChange = (value, questionId) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const storeAnswerToFirestore = async (questionId, value) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      const answersRef = collection(assessmentDocRef, "answers-life-functions");
      const answerDocRef = doc(answersRef, questionId.toString());
      await setDoc(answerDocRef, {
        questionId: questionId,
        answer: value,
        type: "life-function",
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="Lifefunction-template">
          {lifeFunctionQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              }  ${
                nextClicked && focusedQuestion === index ? "border-red" : ""
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              <div className="question">
                <p>{question.life_functions_question}</p>
                {focusedQuestion !== index && answers[question.id] && (
                  <div className="ticked-img-div">
                    <AiOutlineCheck className="ticked-img" />
                  </div>
                )}
              </div>

              {focusedQuestion !== index && answers[question.id] && (
                <div className="answer">
                  <span>
                    {question.dropdown
                      ? answers[question.id]
                      : `${answers[question.id]} ${index === 1 ? "Days" : "%"}`}
                  </span>
                </div>
              )}

              {focusedQuestion === index && (
                <div>
                  {question.dropdown ? (
                    <Select
                      options={question.dropdown.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      onChange={(selectedOption) =>
                        handleDropdownChange(selectedOption, question.id)
                      }
                    />
                  ) : (
                    <div>
                      <Slider
                        value={answers[question.id] || 0}
                        onChange={(event, value) =>
                          handleSliderChange(value, question.id)
                        }
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        style={{ height: "10px", color: "#33ca8f" }}
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <p className="mt-3">
                      Your Response: {answers[question.id]} Days{" "}
                    </p>
                  )}
                  {index >= 2 && (
                    <p className="mt-3">
                      Your Response: {answers[question.id]} %{" "}
                    </p>
                  )}

                  <button
                    className="btn submit-btn mt-2"
                    onClick={() =>
                      handleQuestionSubmit(question.id, answers[question.id])
                    }
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
        <button className="btn" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="btn" onClick={handleFinishButtonClick}>
          Finish
        </button>
      </div>
    </>
  );
};

export default LifeFunctionsQuestions;
