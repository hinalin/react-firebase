import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
import { fs } from "../../../config/Firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useFirebase } from "../../../context/FirebaseContext";

const ScreeningQuestions = ({
  setStepCount,
  setProgress,
  setActiveQuestion,
  setChildQuestions,
  nextClicked,
  setNextClicked,
}) => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [showChildQuestions, setShowChildQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useFirebase();
  const containerRef = useRef(null);
  const userId = user ? user.uid : null;

  useEffect(() => {
    // Find the index of the first unanswered question
    const nextUnansweredIndex = filteredQuestions.findIndex(
      (question) => !answers.hasOwnProperty(question.id)
    );
    if (nextUnansweredIndex !== -1) {
      setFocusedQuestion(nextUnansweredIndex);
    }
    if (nextUnansweredIndex !== -1) {
      const focusedElement = containerRef.current.children[nextUnansweredIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [answers, filteredQuestions]);

  // useEffect(() => {
  //   // Filter out questions with parentId null and scn_question not null
  //   const filtered = jsonData.filter(
  //     (question) => question.parentId === null && question.scn_question
  //   );
  //   setFilteredQuestions(filtered);
  // }, []);
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
    loadUserAnswersFromFirestore();
  }, [userId]);

  useEffect(() => {
    const numQuestions = filteredQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setProgress(newProgress);
  }, [answers]);

  const storeAnswerToFirestore = async (questionId, answer, buttonState) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-screenings");
      const answerDocRef = doc(userAnswersRef, questionId.toString());
      await setDoc(answerDocRef, {
        questionId: questionId,
        answer: answer,
        buttonState: buttonState,
        type: "screening",
      });
      console.log("Answer stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing answer in Firestore: ", error);
    } finally {
      setLoading(false); // Set loading state to false once answer is stored
    }
  };

  const loadUserAnswersFromFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const userAnswersRef = collection(userDocRef, "answers-screenings");
        const userAnswersSnapshot = await getDocs(userAnswersRef);
        const loadedAnswers = {};
        userAnswersSnapshot.forEach((doc) => {
          loadedAnswers[doc.id] = doc.data().answer;
        });
        setAnswers(loadedAnswers);
      }
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };

  const handleQuestionClick = (index) => {
    setFocusedQuestion(index === focusedQuestion ? null : index);
  };

  const handleYesClick = async (questionId, parentId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedQuestions([...selectedQuestions, questionId]);
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "YES", true);
    setNextClicked(false);
  };

  const handleNoClick = async (questionId) => {
    setAnswers({ ...answers, [questionId]: "NO" });
    setFocusedQuestion(null);
    await storeAnswerToFirestore(questionId, "NO", false);
    setNextClicked(false);
  };

  const handleNextButtonClick = () => {
    const unansweredQuestions = filteredQuestions.filter(
      (question) => !answers.hasOwnProperty(question.id)
    );

    const allNo = filteredQuestions.every(
      (question) => answers[question.id] === "NO"
    );

    if (unansweredQuestions.length > 0) {
      // Focus on the first unanswered question
      const firstUnansweredQuestion = unansweredQuestions[0];
      const index = filteredQuestions.findIndex(
        (question) => question.id === firstUnansweredQuestion.id
      );
      setFocusedQuestion(index);
      setShowChildQuestions(false);
      setNextClicked(true);
      const focusedElement = containerRef.current.children[index];
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else if (allNo) {
      setActiveQuestion("health-history");
    } else {
      setShowChildQuestions(true);
      setStepCount(Object.keys(childQuestionsByStep).length);
      setChildQuestions(childQuestionsByStep);
      setActiveQuestion("indepth");
      setNextClicked(false);
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

  console.log(childQuestionsByStep, "childQuestionsByStep");

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
                } ${
                  nextClicked && focusedQuestion === index ? "border-red" : ""
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
