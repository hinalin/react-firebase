import React, { useState, useEffect, useRef } from "react";
import "../Question.css";
import { useFirebase } from "../../../context/FirebaseContext";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AiOutlineCheck } from "react-icons/ai";

const InDepthQuestions = ({
  setActiveQuestion,
  childQuestions,
  setActiveStep,
  currentPage,
  setCurrentPage,
  setIndepthProgress,
  answeredQuestions,
  setAnsweredQuestions,
  nextClicked,
  setNextClicked,
  activeStep,
  assessmentIdRef,
  focusedQuestion,
  setFocusedQuestion,
  selectedDisorders,
  setSelectedDisorders,

  answers,
  setAnswers,
}) => {
  const { user } = useFirebase();
  const userId = user ? user.uid : null;
  const focusedQuestionRef = useRef(null);

  
  useEffect(() => {
    const parentIds = Object.keys(childQuestions);
    for (let i = 0; i < parentIds.length; i++) {
      const parentId = parentIds[i];
      const unansweredChildIndex = childQuestions[parentId].findIndex(
        (childQuestion) => !answeredQuestions[childQuestion.id]
      );
      if (unansweredChildIndex !== -1) {
        setFocusedQuestion(childQuestions[parentId][unansweredChildIndex].id);
        setCurrentPage(i); // Set current page based on the active step
        break;
      }
    }
  }, [childQuestions, answeredQuestions]);

  useEffect(() => {
    // Determine the active step dynamically based on the completion status of previous steps
    const determineActiveStep = () => {
      const stepKeys = Object.keys(childQuestions);
      for (let i = 0; i < stepKeys.length; i++) {
        const stepKey = stepKeys[i];
        const stepQuestions = childQuestions[stepKey];
        const allQuestionsAnswered = stepQuestions.every(
          (question) => answeredQuestions[question.id]
        );
        if (!allQuestionsAnswered) {
          return i + 1; // Active step is 1-indexed
        }
      }
      // return stepKeys.length + 1; // If all steps are completed, set active step to the next step
    };
    const activeStep = determineActiveStep();
    setActiveStep(activeStep);
  }, [childQuestions, answeredQuestions]);
  
  useEffect(() => {
    if (focusedQuestionRef.current) {
      focusedQuestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedQuestion]);

  console.log(childQuestions , 'childQuestions');
  const totalChildQuestionsLength = Object.values(childQuestions).reduce(
    (total, questions) => total + questions.length,
    0
  );
  console.log(totalChildQuestionsLength, "totalChildQuestionsLength");

  const groupAnswersByParentId = (answers, childQuestions) => {
    const groupedAnswers = {};

    // Ensure childQuestions is defined
    if (!childQuestions) {
      return groupedAnswers; // Return an empty object if childQuestions is undefined
    }

    // Iterate over selected answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      // Find the parent ID of the current question
      const parentId = Object.keys(childQuestions).find((parentId) =>
        childQuestions[parentId].some(
          (childQuestion) => childQuestion.id === parseInt(questionId)
        )
      );

      // Add answer to the corresponding parent ID group
      if (parentId) {
        if (!groupedAnswers[parentId]) {
          groupedAnswers[parentId] = {};
        }
        groupedAnswers[parentId][questionId] = answer;
      }
    });

    return groupedAnswers;
  };

  // Call the function to group answers by parent ID
  const groupedAnswers = groupAnswersByParentId(answers, childQuestions);
  // console.log(groupedAnswers);

  const calculateRiskCategory = (answers) => {
    let lowRiskCount = 0;
    let moderateRiskCount = 0;
    let highRiskCount = 0;

    // Count the occurrences of each answer category
    Object.values(answers).forEach((answer) => {
      if (answer === "Never" || answer === "Rarely") {
        lowRiskCount++;
      } else if (answer === "Sometimes") {
        moderateRiskCount++;
      } else if (answer === "Frequently" || answer === "All the time") {
        highRiskCount++;
      }
    });
    if (highRiskCount >= moderateRiskCount && highRiskCount >= lowRiskCount) {
      return "High Risk";
    } else if (
      moderateRiskCount >= highRiskCount &&
      moderateRiskCount >= lowRiskCount
    ) {
      return "Moderate Risk";
    } else {
      return "Low Risk";
    }
  };

  console.log(answers, "indepthhhhanswerssss");
  console.log(answeredQuestions, "answeredQuestions t-f");

  const calculateRiskCategories = (groupedAnswers) => {
    const riskCategories = {};

    // Iterate over grouped answers
    Object.entries(groupedAnswers).forEach(([parentId, answers]) => {
      // Calculate risk category for each parent ID
      const riskCategory = calculateRiskCategory(answers);
      riskCategories[parentId] = riskCategory;
    });

    return riskCategories;
  };

  // Call the function to calculate risk categories
  const riskCategories = calculateRiskCategories(groupedAnswers);
  // console.log(riskCategories, "risk categories");

  const addRiskCategoryToDisorders = () => {
    const updatedSelectedDisorders = selectedDisorders.map((disorder) => {
      // Check if risk category exists for the disorder ID
      const riskCategory = riskCategories[disorder.id] || "Low Risk"; // Default to "Low Risk" if risk category is not available
      // Add risk category to disorder object
      return { ...disorder, risk: riskCategory };
    });
    // Update selected disorders state with risk categories
    setSelectedDisorders(updatedSelectedDisorders);
    console.log(selectedDisorders, "disorders");
  };

  const handleNextPage = async () => {
    let hasUnansweredQuestion = false;

    const activeStepQuestions =
      childQuestions[Object.keys(childQuestions)[currentPage]];

    const unansweredQuestion = activeStepQuestions.find(
      (childQuestion) => !answeredQuestions[childQuestion.id]
    );

    if (unansweredQuestion) {
      hasUnansweredQuestion = true;
      setFocusedQuestion(unansweredQuestion.id);

    }

    if (!hasUnansweredQuestion) {
      if (currentPage === Object.keys(childQuestions).length - 1) {
        // If it's the last page, set the active question to "health-history"
        setActiveQuestion("health-history");

        // Update Firestore document to indicate that the "InDepth" form is completed
        try {
          const userDocRef = doc(fs, "users", userId);
          const assessmentDocRef = doc(
            userDocRef,
            "assessment",
            assessmentIdRef.current // Use the same assessmentIdRef
          );
          await setDoc(
            assessmentDocRef,
            {
              inDepthFormCompleted: true,
            },
            { merge: true }
          );
          console.log("InDepth form completed status updated in Firestore!");
        } catch (error) {
          console.error(
            "Error in selected orders is stored in Firestore: ",
            error
          );
        }
      } else {
        setCurrentPage(currentPage + 1);
        setActiveStep(currentPage + 2);
      }

      setNextClicked(false);
    } else {
      setNextClicked(true);
    }
  };


  const handlePreviousPage = () => {
    if (currentPage === 0) {
      alert("You can not go");
    } else {
      setCurrentPage(currentPage - 1);
      setActiveStep(activeStep - 1);
      setFocusedQuestion(null);
      setNextClicked(false);
    }
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
    setAnswers({ ...answers, [questionId]: answer });
    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
    setNextClicked(false);
    storeAnswerToFirestore(questionId, answer); // Store answer to Firestore
    addRiskCategoryToDisorders();
  };

  useEffect(() => {
    const numQuestions = Object.keys(childQuestions).reduce(
      (total, parentId) => total + childQuestions[parentId].length,
      0
    );

    const numAnsweredQuestions = Object.keys(answeredQuestions).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setIndepthProgress(Math.min(newProgress, 100));
  }, [answeredQuestions]);

  const storeAnswerToFirestore = async (questionId, answer) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current // Use the same assessmentIdRef
      );
      const answersRef = collection(assessmentDocRef, "answers_indepth");
      const answerDocRef = doc(answersRef, questionId.toString());
      await setDoc(answerDocRef, {
        questionId: questionId,
        answer: answer,
        type: "indepth",
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  useEffect(() => {
    const fetchUserAnswers = async () => {
      if (userId) {
        try {
          const userDocRef = doc(fs, "users", userId);
          const assessmentDocRef = doc(
            userDocRef,
            "assessment",
            assessmentIdRef.current // Use the same assessmentIdRef
          );
          const answersRef = collection(assessmentDocRef, "answers_indepth");
          const userAnswersSnapshot = await getDocs(answersRef);
          userAnswersSnapshot.forEach((doc) => {
            const { answer } = doc.data();
            setAnswers((prevSelectedAnswers) => ({
              ...prevSelectedAnswers,
              [doc.id]: answer,
            }));
            setAnsweredQuestions((prevAnsweredQuestions) => ({
              ...prevAnsweredQuestions,
              [doc.id]: true,
            }));
          });
        } catch (error) {
          console.error("Error fetching user answers from Firestore: ", error);
        }
      }
    };
    fetchUserAnswers();
  }, [userId, assessmentIdRef]); // Include assessmentIdRef in the dependency array

  return (
    <>
      <div className="container-fluid">
        <div className="InDepthQuestions-template">
          
          {Object.keys(childQuestions).map((parentId, index) =>
            index === currentPage
              ? childQuestions[parentId].map((childQuestion, questionIndex) => (
                  <div
                    key={childQuestion.id}
                    className={`unanswered-card ${
                      focusedQuestion === childQuestion.id ? "focused-card" : ""
                    } ${
                      answeredQuestions[childQuestion.id] ? "answered-card" : ""
                    }
                    ${
                      nextClicked === true &&
                      focusedQuestion === childQuestion.id
                        ? "border-red"
                        : ""
                    }
                    `}
                    onClick={() => handleQuestionClick(childQuestion.id)}
                    ref={
                      focusedQuestion === childQuestion.id
                        ? focusedQuestionRef
                        : null
                    }
                  >
                    <div className="question">
                      <p>{childQuestion.in_depth_question}</p>
                    </div>
                    {(answeredQuestions[childQuestion.id] ||
                      answers[childQuestion.id]) && (
                      <div className="answer">
                        <p>{answers[childQuestion.id]}</p>
                        {answers[childQuestion.id] && (
                          <div className="ticked-img-div">
                            <AiOutlineCheck className="ticked-img" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="buttons">
                      {focusedQuestion === childQuestion.id && (
                        <div>
                          <button
                            className={`${
                              answers[childQuestion.id] === "Never" &&
                              answers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Never")
                            }
                          >
                            Never
                          </button>

                          <button
                            className={`${
                              answers[childQuestion.id] === "Rarely" &&
                              answers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Rarely")
                            }
                          >
                            Rarely
                          </button>

                          <button
                            className={`${
                              answers[childQuestion.id] === "Sometimes" &&
                              answers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Sometimes")
                            }
                          >
                            Sometimes
                          </button>

                          <button
                            className={`${
                              answers[childQuestion.id] === "Frequently" &&
                              answers[childQuestion.id]
                                ? "green"
                                : ""
                            }`}
                            onClick={() =>
                              handleAnswerClick(childQuestion.id, "Frequently")
                            }
                          >
                            Frequently
                          </button>

                          <button
                            className={`${
                              answers[childQuestion.id] === "All the time" &&
                              answers[childQuestion.id]
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
              : null
          )}
        </div>

        <div className="buttons">
          <button className="btn" onClick={handlePreviousPage}>
            Previous
          </button>
          <button className="btn" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default InDepthQuestions;
