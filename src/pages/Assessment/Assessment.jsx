import React, { useEffect, useState, useRef } from "react";
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

function Assessment({
  filteredQuestions,
  setFilteredQuestions,
  remainingTime,
  setRemainingTime,
  assessmentStatus,
  setAssessmentStatus,
  answers,
  setAnswers,
  assessmentIdRef,
  selectedQuestions,
  setSelectedQuestions,
  setSelectedDisorders,
  selectedDisorders,
}) {
  const [activeQuestion, setActiveQuestion] = useState("screening");
  const [stepCount, setStepCount] = useState(0);
  const [childQuestions, setChildQuestions] = useState(null);
  const [progress, setProgress] = useState(0);
  const [indepthProgress, setIndepthProgress] = useState(0);
  const [healthHistoryProgress, setHealthHistoryProgress] = useState(0);
  const [lifeFunctionProgress, setLifeFunctionProgress] = useState(0);
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [nextClicked, setNextClicked] = useState(false);
  // const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  // const [remainingTime, setRemainingTime] = useState(0);

  // const [assessmentStatus, setAssessmentStatus] = useState("");
  // const [answers, setAnswers] = useState({});

  const { user } = useFirebase();
  const userId = user ? user.uid : null;
  // const assessmentIdRef = useRef(null);
  function filterArrayByParentId(parentId) {
    return jsonData.filter((item) => item.parentId === Number(parentId));
  }

  const getAssessmentCounter = () => {
    const storedAssessmentCounter = localStorage.getItem("assessmentCounter");
    return storedAssessmentCounter ? parseInt(storedAssessmentCounter) : 1;
  };

  const assessmentCounter = getAssessmentCounter();

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
  console.log(screeningQuestions.length, "lengthhhhhhhhh");

  
  return (
    <>
      <div className="StartAssessment-template">
        <div className="header me-5 ms-2">
          <NavigationBar
            user={user}
            assessmentIdRef={assessmentIdRef}
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
            assessmentStatus={assessmentStatus}
            setAssessmentStatus={setAssessmentStatus}
            filteredQuestions={filteredQuestions}
            setFilteredQuestions={setFilteredQuestions}
            answers={answers}
            setAnswers={setAnswers}
            selectedQuestions={selectedQuestions}
            setSelectedQuestions={setSelectedQuestions}
            selectedDisorders={selectedDisorders}
            setSelectedDisorders={setSelectedDisorders}
          />
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12">
              <AssessmentProgress
                stepCount={stepCount}
                activeQuestion={activeQuestion}
                progress={progress}
                indepthProgress={indepthProgress}
                healthHistoryProgress={healthHistoryProgress}
                lifeFunctionProgress={lifeFunctionProgress}
                activeStep={activeStep}
                assessmentIdRef={assessmentIdRef}
                remainingTime={remainingTime}
                setRemainingTime={setRemainingTime}
                answers={answers}
              />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12">
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
                    assessmentIdRef={assessmentIdRef}
                    filteredQuestions={filteredQuestions}
                    setFilteredQuestions={setFilteredQuestions}
                    answers={answers}
                    setAnswers={setAnswers}
                    selectedQuestions={selectedQuestions}
                    setSelectedQuestions={setSelectedQuestions}
                    selectedDisorders={selectedDisorders}
                    setSelectedDisorders={setSelectedDisorders}
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
                    assessmentCounter={assessmentCounter}
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
                    assessmentCounter={assessmentCounter}
                  />
                )}
                {activeQuestion === "life-function" && (
                  <LifeFunctionQuestion
                    setActiveQuestion={setActiveQuestion}
                    setLifeFunctionProgress={setLifeFunctionProgress}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                    assessmentCounter={assessmentCounter}
                    assessmentStatus={assessmentStatus}
                    setAssessmentStatus={setAssessmentStatus}
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
