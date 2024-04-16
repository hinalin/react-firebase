import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import Select from "react-select";
import { useFirebase } from "../../../context/FirebaseContext";
import { fs } from "../../../config/Firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const HealthHistoryQuestions = ({
  setActiveQuestion,
  setHealthHistoryProgress,
  setCurrentPage,
  setActiveStep,
  childQuestions,
  nextClicked,
  setNextClicked,
  assessmentIdRef,
  HealthHistoryQuestions,
  answers,
  setAnswers,
  selectedOptions,
  setSelectedOptions,
  focusedQuestion,
  setFocusedQuestion,
  previousClicked,
}) => {
  const [newOption, setNewOption] = useState("");
  const [submitClicked, setSubmitClicked] = useState({});

  const { user, loading, setLoading } = useFirebase();
  const userId = user ? user.uid : null;
  const containerRef = useRef(null);

  useEffect(() => {
    // Find the index of the first unanswered question
    const firstUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question) => !answers[question.id]
    );

    // If there's a first unanswered question, focus on it
    if (firstUnansweredIndex !== -1 && previousClicked === false) {
      setFocusedQuestion(firstUnansweredIndex);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchHealthHistoryAnswers(
        userId,
        assessmentIdRef,
        setAnswers,
        setSelectedOptions
      );
    }
  }, [userId]);
  const fetchHealthHistoryAnswers = async (
    userId,
    assessmentIdRef,
    setAnswers,
    setSelectedOptions
  ) => {
    if (!assessmentIdRef.current) {
      console.error("Assessment ID is null or undefined");
      return;
    } else {
      console.log("found");
    }
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      const answersRef = collection(assessmentDocRef, "answers_health-history");
      const querySnapshot = await getDocs(answersRef);
      const fetchedAnswers = {};
      const fetchedSelectedOptions = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedAnswers[data.questionId] = data.answer;
        fetchedSelectedOptions[data.questionId] = data.selectedOptions;
      });
      setAnswers(fetchedAnswers);
      setSelectedOptions(fetchedSelectedOptions);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (index) => {
    // setFocusedQuestion(index === focusedQuestion ? index : index);
    if (focusedQuestion !== index) {
      setFocusedQuestion(index);
    }
  };

  const handleYesClick = async (questionId) => {
    setAnswers({ ...answers, [questionId]: "YES" });
    setSelectedOptions({ ...selectedOptions, [questionId]: null }); // Reset selected options for the question
    setSubmitClicked({ ...submitClicked, [questionId]: true });
    await saveToFirestore(questionId, "YES");
  };

  const handleNoClick = async (questionId) => {
    // updateProgress();
    setAnswers({ ...answers, [questionId]: "None" });
    setSelectedOptions({ ...selectedOptions, [questionId]: null }); // Reset selected options for the question
    setSubmitClicked({ ...submitClicked, [questionId]: true });
    await saveToFirestore(questionId, "None");
    setFocusedQuestion(null);
    setNextClicked(false);

    const nextUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question, index) => !answers[question.id] && index > focusedQuestion
    );
    console.log(nextUnansweredIndex, "nextUnansweredIndex");
    if (nextUnansweredIndex !== 0) {
      setFocusedQuestion(nextUnansweredIndex);
      console.log(focusedQuestion, "focusedQuestionnow");
    }
  };

  const handleChange = (selected, questionId) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: selected });
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

  const handlePreviousPage = () => {
    setActiveQuestion("indepth");
    setCurrentPage(Object.keys(childQuestions).length - 1);
    setActiveStep(Object.keys(childQuestions).length);
    setFocusedQuestion(null);
    setNextClicked(false);
  };

  const handleNextButtonClick = async () => {
    setNextClicked(true); // Set nextClicked to true when next button is clicked
    const firstUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question) => !answers[question.id]
    );
    if (firstUnansweredIndex !== -1) {
      setFocusedQuestion(firstUnansweredIndex);
    } else {
      setActiveQuestion("life-function");
      setNextClicked(false);
    }
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
        "Error updating inDepthFormCompleted status in Firestore: ",
        error
      );
    }
  };

  const handleQuestionSubmit = async (questionId) => {
    setSubmitClicked({ ...submitClicked, [questionId]: true });
    // Check if the answer is "YES" and no options are selected
    if (
      answers[questionId] === "YES" &&
      (!selectedOptions[questionId] || selectedOptions[questionId].length === 0)
    ) {
      alert("Please select at least one option.");
      return; // Prevent further execution of the function
    }
    setNextClicked(false);
    await saveToFirestore(questionId, answers[questionId]);
    const nextUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question, index) => !answers[question.id] && index > focusedQuestion
    );
    console.log(nextUnansweredIndex, "nextUnansweredIndex");
    if (nextUnansweredIndex !== 0) {
      setFocusedQuestion(nextUnansweredIndex);
      console.log(focusedQuestion, "focusedQuestion now");
    }
    setNextClicked(false);
  };

  // const saveToFirestore = async (questionId, answer) => {
  //   try {
  //     const userDocRef = doc(fs, "users", userId);
  //     const assessmentDocRef = doc(
  //       userDocRef,
  //       "assessment",
  //       assessmentIdRef.current
  //     );
  //     const answersRef = collection(assessmentDocRef, "answers_health-history");
  //     const answerDocRef = doc(answersRef, questionId.toString());

  //     // Define data object to be written to Firestore
  //     let data = {
  //       userId: userId,
  //       questionId: questionId,
  //       answer: answer,
  //       type: "health-history",
  //     };

  //     // Check if answer is "YES" or "None"
  //     if (answer === "YES") {
  //       // If answer is "YES", include selectedOptions in the data object
  //       data.selectedOptions = selectedOptions[questionId];
  //     } else {
  //       // If answer is "None", remove selectedOptions from the data object
  //       data.selectedOptions = null;
  //     }

  //     await setDoc(answerDocRef, data);
  //     console.log("Document successfully written!");
  //   } catch (error) {
  //     console.error("Error writing document: ", error);
  //   }
  // };
  const saveToFirestore = async (questionId, answer) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      const answersRef = collection(assessmentDocRef, "answers_health-history");
      const answerDocRef = doc(answersRef, questionId.toString());

      // Define data object to be written to Firestore
      let data = {
        userId: userId,
        questionId: questionId,
        answer: answer,
        type: "health-history",
      };

      // Check if answer is "YES" or "None"
      if (answer === "YES") {
        // If answer is "YES", include selectedOptions in the data object if it's defined
        if (selectedOptions[questionId]) {
          data.selectedOptions = selectedOptions[questionId];
        }
      } else {
        // If answer is "None", remove selectedOptions from the data object
        data.selectedOptions = null;
      }

      await setDoc(answerDocRef, data);
      console.log("Document successfully writtennnnnnn!");
    } catch (error) {
      console.error("Error writing documenttttt: ", error);
    }
  };

  useEffect(() => {
    const numQuestions = HealthHistoryQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setHealthHistoryProgress(Math.min(newProgress, 100));
  }, [answers, selectedOptions]);

  return (
    <>
      <div className="container-fluid">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="Helthhostory-template">
            {HealthHistoryQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`unanswered-card ${
                  focusedQuestion === index ? "focused-card" : ""
                } ${
                  nextClicked === true && focusedQuestion === index
                    ? "border-red"
                    : ""
                }
                `}
                onClick={() => handleQuestionClick(index)}
              >
                <div className="question">
                  <p>{question.health_history_question}</p>

                  {(answers[question.id] === "None" ||
                    selectedOptions[question.id] ||
                    submitClicked[question.id]) &&
                    focusedQuestion !== index && (
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
                      type="button"
                      className={`no_btn ${
                        answers[question.id] === "None" ? "green" : ""
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
                      selectedOptions[question.id].length > 0 && ( // Check if selectedOptions exist and it's not an empty array
                        <div className="answer">
                          {selectedOptions[question.id].map((option, index) => (
                            <span key={index}>
                              {index > 0 && " , "}
                              {option.label}
                            </span>
                          ))}
                        </div>
                      )}
                    {answers[question.id] === "None" && <div>None</div>}
                  </div>
                )}
                {focusedQuestion === index &&
                  answers[question.id] === "YES" && (
                    <div>
                      <Select
                        options={[
                          ...(question.dropdown || []).map((item, index) => ({
                            value: item,
                            label: item,
                          })),
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
                          onClick={() => handleQuestionSubmit(question.id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="buttons">
        <button className="btn" onClick={handlePreviousPage}>
          Previous
        </button>
        <button className="btn" onClick={handleNextButtonClick}>
          Next
        </button>
      </div>
    </>
  );
};

export default HealthHistoryQuestions;
