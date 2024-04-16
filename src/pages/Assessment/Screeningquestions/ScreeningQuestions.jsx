import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/FirebaseContext";
import { v4 as uuidv4 } from "uuid";

const ScreeningQuestions = ({
  setStepCount,
  setProgress,
  setActiveQuestion,
  setChildQuestions,
  assessmentIdRef,
  setFilteredQuestions,
  filteredQuestions,
  answers,
  setAnswers,
  selectedQuestions,
  setSelectedQuestions,
  selectedDisorders,
  setSelectedDisorders,
  nextClicked,
  setNextClicked,
  focusedQuestion,
  setFocusedQuestion,
}) => {
  const [showChildQuestions, setShowChildQuestions] = useState(false);
  // const [childQuestionsByStep, setChildQuestionsByStep] = useState({}); // State to hold child questions

  const [loading, setLoading] = useState(true);
  const { user } = useFirebase();
  const containerRef = useRef(null);
  const userId = user ? user.uid : null;
  useEffect(() => {
    // Generate a UUID when the component mounts
    assessmentIdRef.current = uuidv4();
  }, []);

  useEffect(() => {
    // Check if an assessmentIdRef exists in local storage
    const storedAssessmentId = localStorage.getItem("assessmentId");

    // If an assessmentIdRef exists, use it, otherwise generate a new one
    assessmentIdRef.current = storedAssessmentId || uuidv4();

    // Store the current assessmentIdRef value in local storage
    localStorage.setItem("assessmentId", assessmentIdRef.current);
  }, []);

  useEffect(() => {
    // Find the index of the first unanswered question
    const nextUnansweredIndex = filteredQuestions.findIndex(
      (question) => !answers.hasOwnProperty(question.id)
    );
    if (nextUnansweredIndex !== -1) {
      setFocusedQuestion(nextUnansweredIndex);
    }
    if (nextUnansweredIndex !== -1) {
      const focusedElement =
        containerRef.current?.children[nextUnansweredIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [answers, filteredQuestions]);

  console.log(answers, "screeninganswers");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filtered = jsonData.filter(
          (question) => question.parentId === null && question.scn_question
        );
        setFilteredQuestions(filtered);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false); // Set loading state to false once questions are loaded
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedDisorders([]);
    setChildQuestions({});
    setAnswers({});
    setSelectedQuestions([]);
    loadUserAnswersFromFirestore();
  }, [userId]);

  useEffect(() => {
    const numQuestions = filteredQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setProgress(Math.min(newProgress, 100));
    console.log(numAnsweredQuestions, "numAnsweredQuestions");
  }, [answers]);

  const storeAnswerToFirestore = async (questionId, answer, buttonState , disorder) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      // Assuming you have an 'assessment' document under the user document
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      const answersRef = collection(assessmentDocRef, "answers_screenings");
      const answerDocRef = doc(answersRef, questionId.toString());
      await setDoc(answerDocRef, {
        questionId: questionId,
        answer: answer,
        buttonState: buttonState,
        type: "screening",
      });
      console.log("Answer stored in Firestore successfully!");

      if (answer === "YES" && disorder) {
        await setDoc(
          assessmentDocRef,
          { [questionId]: { disorder: disorder} },
          { merge: true }
        );
        console.log("Disorder information stored in Firestore successfully!");
      }
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    }
  };

  const loadUserAnswersFromFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const assessmentDocRef = doc(
          userDocRef,
          "assessment",
          assessmentIdRef.current
        );
        const answersRef = collection(assessmentDocRef, "answers_screenings");
        const userAnswersSnapshot = await getDocs(answersRef);
        const loadedAnswers = {};
        userAnswersSnapshot.forEach((doc) => {
          loadedAnswers[doc.id] = doc.data().answer;
        });
        const disordersSnapshot = await getDoc(assessmentDocRef);
        const disordersData = disordersSnapshot.data();
        if (disordersData) {
          const disorders = Object.keys(disordersData)
            .filter((key) => key !== "screeningFormCompleted")
            .map((key) => ({
              questionId: key,
              disorder: disordersData[key].disorder,
            }));
          // Update selectedDisorders state
          setSelectedDisorders(disorders);
        }
        setAnswers(loadedAnswers);
      }
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? null : index);
  };
  const handleYesClick = async (questionId, disorder) => {
    const question = filteredQuestions.find((q) => q.id === questionId);
    if (question && question.disorder) {
      const newDisorder = { id: questionId, disorder: disorder }; // Use the parent ID as the ID for the disorder object
      setSelectedDisorders([...selectedDisorders, newDisorder]); // Add the new disorder to the selected disorders array
    }
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
    setFocusedQuestion(null);
    console.log(selectedDisorders, answers, "selectedDisorderssssssssss");
    await storeAnswerToFirestore(questionId, "YES", true, disorder);

    setNextClicked(false);
  };

  const handleNoClick = async (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "NO", false);
  };

  const handleNextButtonClick = async () => {
    setNextClicked(true);
    const unansweredQuestions = filteredQuestions.filter(
      (question) => !answers.hasOwnProperty(question.id)
    );

    const allNo = filteredQuestions.every(
      (question) => answers[question.id] === "NO"
    );

    const allQuestionsAnswered = unansweredQuestions.length === 0;

    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      await setDoc(
        assessmentDocRef,
        { screeningFormCompleted: true },
        { merge: true }
      );
      console.log("screeningFormCompleted status updated in Firestore!");
    } catch (error) {
      console.error(
        "Error updating screeningFormCompleted status in Firestore: ",
        error
      );
    }

    if (allQuestionsAnswered) {
      setShowChildQuestions(true);
      setStepCount(Object.keys(childQuestionsByStep).length);
      setChildQuestions(childQuestionsByStep);
      setActiveQuestion("indepth");
      setNextClicked(false);
    } else if (allNo) {
      setActiveQuestion("health-history");
    } else {
      if (unansweredQuestions.length > 0) {
        const firstUnansweredQuestion = unansweredQuestions[0];
        const index = filteredQuestions.findIndex(
          (question) => question.id === firstUnansweredQuestion.id
        );
        setFocusedQuestion(index);
        const focusedElement = containerRef.current.children[index];
        if (focusedElement) {
          focusedElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
      setShowChildQuestions(false);
    }
  };

  const isParentQuestionSelected = (parentId) => {
    return selectedQuestions.includes(parentId);
  };

  // const groupChildQuestionsByParentId = () => {
  //   const groupedQuestions = {};

  //   jsonData.forEach((question) => {
  //     if (question.parentId && isParentQuestionSelected(question.parentId)) {
  //       if (!groupedQuestions[question.parentId]) {
  //         groupedQuestions[question.parentId] = [];
  //       }
  //       groupedQuestions[question.parentId].push(question);
  //     }
  //   });
  //   return groupedQuestions;
  // };

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
  console.log(childQuestionsByStep, "childQuestionsByStepppppp");

  return (
    <>
      <div className="container">
        {loading ? ( // Render loader when loading state is true
          <div>Loading...</div>
        ) : (
          <div className="screeningQuestion-template" ref={containerRef}>
            {filteredQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`unanswered-card ${
                  focusedQuestion === index ? "focused-card" : ""
                }
                ${nextClicked && focusedQuestion === index ? "border-red" : ""}
                `}
                onClick={() => handleQuestionClick(index)}
              >
                {/* {focusedQuestion === index && !answers[question.id] && (
                                <div className="unanswered-message">Please answer this question.</div>
                            )} */}
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
                      onClick={() =>
                        handleYesClick(question.id, question.disorder)
                      }
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
        )}
        <div className="buttons">
          <button className="btn" onClick={handleNextButtonClick}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ScreeningQuestions;
