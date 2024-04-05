import React, { useEffect, useState } from "react";
import "./Assessment.css";
import "react-circular-progressbar/dist/styles.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import AssessmentProgress from "./AssessmentProgress";
import ScreeningQuestion from "./Screeningquestions/ScreeningQuestions";
import IndepthQuestion from "./Indepth/InDepthQuestions";
import HealthHistoryQuestion from "./Helthhistory/HelthHistoryQuestions";
import LifeFunctionQuestion from "./Lifefunction/LifeFunctionsQuestions";
import { useFirebase } from "../../context/FirebaseContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { fs } from "../../config/Firebase";
import jsonData from "../../data/QuestionsData.json";

function Assessment() {
  const [activeQuestion, setActiveQuestion] = useState("screening");
  const [stepCount, setStepCount] = useState(0);
  const [childQuestions, setChildQuestions] = useState(null);
  const [progress, setProgress] = useState(0);
  const [healthHistoryProgress, setHealthHistoryProgress] = useState(0);
  const [indepthProgress, setIndepthProgress] = useState(0);
  const [lifeFunctionProgress, setLifeFunctionProgress] = useState(0);
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [nextClicked, setNextClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useFirebase();
  const userId = user ? user.uid : null;

  function filterArrayByParentId(parentId) {
    return jsonData.filter((item) => item.parentId === Number(parentId));
  }

  const loadUserAnswersFromFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const userAnswersRef = collection(userDocRef, "answers-screenings");
        const userAnswersSnapshot = await getDocs(userAnswersRef);
        const loadedAnswers = [];
        const answer = {};
        userAnswersSnapshot.forEach((doc) => {
          loadedAnswers.push(doc.data());
          answer[doc.id] = doc.data().answer;
        });
        const selectedChildQuestion = Object.keys(answer).filter(
          (key) => answer[key] === "YES"
        );
        const filteredArrays = {};
        console.log(selectedChildQuestion);
        selectedChildQuestion.forEach((parentId) => {
          const filteredArray = filterArrayByParentId(parentId);
          filteredArrays[parentId] = filteredArray;
          console.log(filteredArray, "fffffffffffffffff");
        });
        setStepCount(Object.keys(filteredArrays).length);
        setChildQuestions(filteredArrays);
        console.log(selectedChildQuestion, "sssssssssssssssssssssssssss");
        setScreeningQuestions(loadedAnswers);
        console.log(setScreeningQuestions, "scrrrrrrrrrrrrrrrr");
      }
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };

  // AHIYAA filteredArray PARTHI KADACH HEALTHHISTORY LAVI SKASSEEEEE JO INDEPTH MA ANS APAII GYA HSE TOOOOO

  useEffect(() => {
    if (userId) {
      loadUserAnswersFromFirestore();
    }
  }, [userId]);

  useEffect(() => {
    if (screeningQuestions.length === 13) {
      setActiveQuestion("indepth");
    }
  }, [screeningQuestions]);

  // useEffect(() => {
  //   const areAllInDepthQuestionsAnswered = Object.keys(answeredQuestions).every(
  //     (questionId) => answeredQuestions[questionId]
  //   );

  //   if (areAllInDepthQuestionsAnswered) {
  //     setActiveQuestion("health-history");
  //   }
  // }, [answeredQuestions]);

  // useEffect(() => {
  //   const areAllInDepthQuestionsAnswered = Object.values(answeredQuestions).every(answered => answered);

  //   if (areAllInDepthQuestionsAnswered && activeQuestion === "indepth") {
  //     setActiveQuestion("health-history");
  //   }
  // }, [answeredQuestions, activeQuestion]);

  // useEffect(() => {
  //   const areAllScreeningQuestionsAnswered = Object.keys(screeningQuestions).every(
  //     questionId => screeningQuestions[questionId] === "YES"
  //   );

  //   if (areAllScreeningQuestionsAnswered && activeQuestion === "screening") {
  //     setActiveQuestion("indepth");
  //   }
  // }, [screeningQuestions, activeQuestion]);

  // useEffect(() => {
  //   const areAllInDepthQuestionsAnswered = Object.values(answeredQuestions).every(
  //     answered => answered
  //   );

  //   if (areAllInDepthQuestionsAnswered && activeQuestion === "indepth") {
  //     setActiveQuestion("health-history");
  //   }
  // }, [answeredQuestions, activeQuestion]);

  return (
    <>
      <div className="StartAssessment-template">
        <div className="header me-5 ms-2">
          <NavigationBar user={user} />
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-4">
              <AssessmentProgress
                stepCount={stepCount}
                activeQuestion={activeQuestion}
                progress={progress}
                healthHistoryProgress={healthHistoryProgress}
                indepthProgress={indepthProgress}
                activeStep={activeStep}
                setIndepthProgress={setIndepthProgress}
                setProgress={setProgress}
                setHealthHistoryProgress={setHealthHistoryProgress}
                lifeFunctionProgress={lifeFunctionProgress}
              />
            </div>
            <div className="col-8">
              <div className="questions-part">
                {activeQuestion === "screening" && (
                  <ScreeningQuestion
                    setActiveQuestion={setActiveQuestion}
                    setStepCount={setStepCount}
                    setChildQuestions={setChildQuestions}
                    setProgress={setProgress}
                    setScreeningQuestions={setScreeningQuestions}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                  />
                )}
                {activeQuestion === "indepth" && (
                  <IndepthQuestion
                    setActiveQuestion={setActiveQuestion}
                    childQuestions={childQuestions}
                    setIndepthProgress={setIndepthProgress}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    answeredQuestions={answeredQuestions}
                    setAnsweredQuestions={setAnsweredQuestions}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                  />
                )}
                {activeQuestion === "health-history" && (
                  <HealthHistoryQuestion
                    setActiveQuestion={setActiveQuestion}
                    setHealthHistoryProgress={setHealthHistoryProgress}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setActiveStep={setActiveStep}
                    childQuestions={childQuestions}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                  />
                )}
                {activeQuestion === "life-function" && (
                  <LifeFunctionQuestion
                    setActiveQuestion={setActiveQuestion}
                    setLifeFunctionProgress={setLifeFunctionProgress}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                  />
                )}
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
}

export default Assessment;
