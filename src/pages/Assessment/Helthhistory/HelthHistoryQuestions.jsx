// import React, { useState, useEffect } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import Select from "react-select";
// import { useFirebase } from "../../../context/FirebaseContext";
// import { fs } from "../../../config/Firebase";
// import { collection, doc, getDocs, setDoc } from "firebase/firestore";

// const HelthHistoryQuestions = ({
//   setActiveQuestion,
//   setHealthHistoryProgress,
//   setCurrentPage,
//   setActiveStep,
//   childQuestions,
// }) => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [newOption, setNewOption] = useState("");
//   const [submitClicked, setSubmitClicked] = useState({});

//   const { user } = useFirebase();
//   const userId = user ? user.uid : null;

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index);
//   };

//   const handleYesClick = async (questionId) => {
//     setAnswers({ ...answers, [questionId]: "YES" });
//     setSelectedQuestions([...selectedQuestions, questionId]);
//   };

//   const handleNoClick = async (questionId) => {
//     setAnswers({ ...answers, [questionId]: "None" });
//     setSelectedOptions({ ...selectedOptions, [questionId]: null }); // Reset selected options for the question
//     setFocusedQuestion(null); // Reset focusedQuestion to close the card
//     updateProgress();
//   };

//   const handleChange = (selected, questionId) => {
//     setSelectedOptions({ ...selectedOptions, [questionId]: selected }); // Update selected options for the question
//   };

//   const handleAddOption = (questionId) => {
//     if (newOption.trim() !== "") {
//       const updatedOptions = [
//         ...(selectedOptions[questionId] || []),
//         { value: newOption, label: newOption },
//       ];
//       setSelectedOptions({ ...selectedOptions, [questionId]: updatedOptions });
//       setNewOption(""); // Clear input field after adding option
//     }
//   };

//   const handlePreviousPage = () => {
//     setActiveQuestion("indepth"); // Navigate to the InDepthQuestions page
//     setCurrentPage(Object.keys(childQuestions).length - 1); // Set the currentPage to the last step of the InDepthQuestions
//     setActiveStep(Object.keys(childQuestions).length);
//   };

//   const handleNextButtonClick = () => {
//     setActiveQuestion("life-function");
//   };
//   const HealthHistoryQuestions = jsonData.filter(
//     (question) => question.health_history_question
//   );

//   const handleQuestionSubmit = async (questionId) => {
//     setSubmitClicked({ ...submitClicked, [questionId]: true });
//     setFocusedQuestion(null);
//     updateProgress();
//   };

//   const updateProgress = () => {
//     const numQuestions = HealthHistoryQuestions.length;
//     const numAnsweredQuestions = Object.keys(answers).length;
//     const newProgress = (numAnsweredQuestions / numQuestions) * 100;
//     setHealthHistoryProgress(newProgress);
//   };
//   console.log(answers, "answers");

//   return (
//     <>
//       <div className="container">
//         <div className="Helthhostory-template">
//           {HealthHistoryQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               }`}
//               onClick={() => handleQuestionClick(index)}
//             >
//               <div className="question">
//                 <p>{question.health_history_question}</p>

//                 {(answers[question.id] === "None" ||
//                   submitClicked[question.id]) && (
//                   <div className="ticked-img-div me-2">
//                     <AiOutlineCheck className="ticked-img" />
//                   </div>
//                 )}
//               </div>
//               {focusedQuestion === index && (
//                 <div className="buttons">
//                   <button
//                     className={`yes_btn ${
//                       answers[question.id] === "YES" ? "green" : ""
//                     }`}
//                     onClick={() => handleYesClick(question.id)}
//                   >
//                     YES
//                   </button>
//                   <button
//                     type="button"
//                     className={`no_btn ${
//                       answers[question.id] === "None" ? "green" : ""
//                     }`}
//                     onClick={() => handleNoClick(question.id)}
//                   >
//                     NO
//                   </button>
//                 </div>
//               )}

//               {focusedQuestion !== index && (
//                 <div className="answer">
//                   {selectedOptions[question.id] &&
//                     submitClicked[question.id] && (
//                       <div className="answer">
//                         {selectedOptions[question.id].map((option, index) => (
//                           <span key={index}>
//                             {index > 0 && " , "}
//                             {option.label}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   {answers[question.id] === "None" && <div>None</div>}
//                 </div>
//               )}

//               {focusedQuestion === index && answers[question.id] === "YES" && (
//                 <div>
//                   <Select
//                     options={[
//                       ...(question.dropdown || []).map((item, index) => ({
//                         value: item,
//                         label: item,
//                       })),
//                       ...(selectedOptions[question.id] || []),
//                     ]}
//                     value={selectedOptions[question.id]}
//                     onChange={(selected) => handleChange(selected, question.id)}
//                     className="mt-3 dropdown"
//                     isMulti
//                   />
//                   <div className="input-dropdown d-flex">
//                     <input
//                       type="text"
//                       placeholder="Other (Please type)"
//                       className="p-3 mt-3 w-100 dropdown-input"
//                       value={newOption}
//                       onChange={(e) => setNewOption(e.target.value)}
//                     />
//                     <button
//                       className="btn mt-3 ms-2 add-btn"
//                       onClick={() => handleAddOption(question.id)}
//                     >
//                       Add
//                     </button>
//                   </div>

//                   <div className="submit-button">
//                     <button
//                       className="btn submit-btn mt-3 text-light"
//                       onClick={() => handleQuestionSubmit(question.id)}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="buttons">
//         <button className="btn" onClick={handlePreviousPage}>
//           Previous
//         </button>
//         <button className="btn" onClick={handleNextButtonClick}>
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default HelthHistoryQuestions;

import React, { useState, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "../Question.css";
import jsonData from "../../../data/QuestionsData.json";
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
}) => {
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [newOption, setNewOption] = useState("");
  const [submitClicked, setSubmitClicked] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useFirebase();
  const userId = user ? user.uid : null;
  useEffect(() => {
    // Find the index of the first unanswered question
    const firstUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question) => !answers[question.id]
    );

    // If there's a first unanswered question, focus on it
    if (firstUnansweredIndex !== -1) {
      setFocusedQuestion(firstUnansweredIndex);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(fs, "users", userId);
        const userAnswersRef = collection(userDocRef, "answers-health-history");
        const querySnapshot = await getDocs(userAnswersRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [data.questionId]: data.answer,
          }));
          setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [data.questionId]: data.selectedOptions,
          }));
        });
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false); // Set loading state to false once data fetching is complete
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

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
    setAnswers({ ...answers, [questionId]: "None" });
    setSelectedOptions({ ...selectedOptions, [questionId]: null }); // Reset selected options for the question
    setSubmitClicked({ ...submitClicked, [questionId]: true });
    await saveToFirestore(questionId, "None");
    updateProgress();
    setFocusedQuestion(null);
    const nextUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question, index) => !answers[question.id] && index > focusedQuestion
    );
    console.log(nextUnansweredIndex, "nextUnansweredIndex");
    if (nextUnansweredIndex !== 0) {
      setFocusedQuestion(nextUnansweredIndex);
      console.log(focusedQuestion, "focusedQuestion now");
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
  };

  const handleNextButtonClick = () => {
    setActiveQuestion("life-function");
  };

  const HealthHistoryQuestions = jsonData.filter(
    (question) => question.health_history_question
  );

  const handleQuestionSubmit = async (questionId) => {
    setSubmitClicked({ ...submitClicked, [questionId]: true });
    setFocusedQuestion(null);
    updateProgress();
    await saveToFirestore(questionId, answers[questionId]);
    const nextUnansweredIndex = HealthHistoryQuestions.findIndex(
      (question, index) => !answers[question.id] && index > focusedQuestion
    );
    console.log(nextUnansweredIndex, "nextUnansweredIndex");
    if (nextUnansweredIndex !== 0) {
      setFocusedQuestion(nextUnansweredIndex);
      console.log(focusedQuestion, "focusedQuestion now");
    }
  };

  const saveToFirestore = async (questionId, answer) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const userAnswersRef = collection(userDocRef, "answers-health-history");
      const docRef = doc(userAnswersRef, questionId.toString());

      // Define data object to be written to Firestore
      let data = {
        userId: userId,
        questionId: questionId,
        answer: answer,
        type: "health-history",
      };

      // Check if answer is "YES" or "None"
      if (answer === "YES") {
        // If answer is "YES", include selectedOptions in the data object
        data.selectedOptions = selectedOptions[questionId];
      } else {
        // If answer is "None", remove selectedOptions from the data object
        data.selectedOptions = null;
      }

      await setDoc(docRef, data);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const updateProgress = () => {
    const numQuestions = HealthHistoryQuestions.length;
    const numAnsweredQuestions = Object.keys(answers).length + 1;
    const newProgress = (numAnsweredQuestions / numQuestions) * 100;
    setHealthHistoryProgress(Math.min(newProgress , 100));
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="Helthhostory-template">
            {HealthHistoryQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`unanswered-card ${
                  focusedQuestion === index ? "focused-card" : ""
                }`}
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

                {/* {focusedQuestion !== index && (
                  <div className="answer">
                    {selectedOptions[question.id] &&
                      submitClicked[question.id] && (
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
                )} */}

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

// import React, { useState, useEffect } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import "../Question.css";
// import jsonData from "../../../data/QuestionsData.json";
// import Select from "react-select";

// const HelthHistoryQuestions = ({
//   setActiveQuestion,
//   setHealthHistoryProgress,
//   childQuestions,
//   setCurrentPage,
//   setActiveStep,
// }) => {
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [newOption, setNewOption] = useState("");
//   const [submitClicked, setSubmitClicked] = useState({});

//   const handleQuestionClick = (index) => {
//     setFocusedQuestion(index === focusedQuestion ? index : index);
//   };

//   const handleYesClick = (questionId) => {
//     setAnswers({ ...answers, [questionId]: "YES" });
//     setSelectedQuestions([...selectedQuestions, questionId]);
//   };

//   const handleNoClick = (questionId) => {
//     setAnswers({ ...answers, [questionId]: "NO" });
//     setSelectedOptions({ ...selectedOptions, [questionId]: null }); // Reset selected options for the question
//     setFocusedQuestion(null); // Reset focusedQuestion to close the card
//     updateProgress();
//   };

//   const handleChange = (selected, questionId) => {
//     setSelectedOptions({ ...selectedOptions, [questionId]: selected }); // Update selected options for the question
//   };

//   const handleAddOption = (questionId) => {
//     if (newOption.trim() !== "") {
//       const updatedOptions = [
//         ...(selectedOptions[questionId] || []),
//         { value: newOption, label: newOption },
//       ];
//       setSelectedOptions({ ...selectedOptions, [questionId]: updatedOptions });
//       setNewOption(""); // Clear input field after adding option
//     }
//   };
//   const handlePreviousPage = () => {
//         setActiveQuestion("indepth"); // Navigate to the InDepthQuestions page
//         setCurrentPage(Object.keys(childQuestions).length - 1); // Set the currentPage to the last step of the InDepthQuestions
//         setActiveStep(Object.keys(childQuestions).length);
//       };
//   const handleNextButtonClick = () => {
//     setActiveQuestion("life-function");
//   };
//   const HealthHistoryQuestions = jsonData.filter(
//     (question) => question.health_history_question
//   );
//   const handleQuestionSubmit = (questionId) => {
//     setSubmitClicked({ ...submitClicked, [questionId]: true });
//     setFocusedQuestion(null);
//     updateProgress();
//   };

//   const updateProgress = () => {
//     const numQuestions = HealthHistoryQuestions.length;
//     const numAnsweredQuestions = Object.keys(answers).length;
//     const newProgress = (numAnsweredQuestions / numQuestions) * 100;
//     setHealthHistoryProgress(newProgress);
//   };
//   return (
//     <>
//       <div className="container">
//         <div className="Helthhostory-template">
//           {HealthHistoryQuestions.map((question, index) => (
//             <div
//               key={question.id}
//               className={`unanswered-card ${
//                 focusedQuestion === index ? "focused-card" : ""
//               }`}
//               onClick={() => handleQuestionClick(index)}
//             >
//               <div className="question">
//                 <p>{question.health_history_question}</p>
//                 {(answers[question.id] === "NO" ||
//                   submitClicked[question.id]) && (
//                   <div className="ticked-img-div me-2">
//                     <AiOutlineCheck className="ticked-img" />
//                   </div>
//                 )}
//               </div>
//               {focusedQuestion === index && (
//                 <div className="buttons">
//                   <button
//                     className={`yes_btn ${
//                       answers[question.id] === "YES" ? "green" : ""
//                     }`}
//                     onClick={() => handleYesClick(question.id)}
//                   >
//                     YES
//                   </button>
//                   <button
//                     type="button"
//                     className={`no_btn ${
//                       answers[question.id] === "NO" ? "green" : ""
//                     }`}
//                     onClick={() => handleNoClick(question.id)}
//                   >
//                     NO
//                   </button>
//                 </div>
//               )}

//               {focusedQuestion !== index && (
//                 <div className="answer">
//                   {selectedOptions[question.id] &&
//                     submitClicked[question.id] && (
//                       <div className="answer">
//                         {selectedOptions[question.id].map((option, index) => (
//                           <span key={index}>
//                             {index > 0 && " , "}
//                             {option.label}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   {answers[question.id] === "NO" && <div>None</div>}
//                 </div>
//               )}

//               {focusedQuestion === index && answers[question.id] === "YES" && (
//                 <div>
//                   <Select
//                     options={[
//                       ...(question.dropdown || []).map((item, index) => ({
//                         value: item,
//                         label: item,
//                       })),
//                       ...(selectedOptions[question.id] || []),
//                     ]}
//                     value={selectedOptions[question.id]}
//                     onChange={(selected) => handleChange(selected, question.id)}
//                     className="mt-3 dropdown"
//                     isMulti
//                   />
//                   <div className="input-dropdown d-flex">
//                     <input
//                       type="text"
//                       placeholder="Other (Please type)"
//                       className="p-3 mt-3 w-100 dropdown-input"
//                       value={newOption}
//                       onChange={(e) => setNewOption(e.target.value)}
//                     />
//                     <button
//                       className="btn mt-3 ms-2 add-btn"
//                       onClick={() => handleAddOption(question.id)}
//                     >
//                       Add
//                     </button>
//                   </div>

//                   <div className="submit-button">
//                     <button
//                       className="btn submit-btn mt-3 text-light"
//                       onClick={() => handleQuestionSubmit(question.id)}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="buttons">
//         <button className="btn" onClick={handlePreviousPage}>
//           Previous
//         </button>
//         <button className="btn" onClick={handleNextButtonClick}>
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default HelthHistoryQuestions;
