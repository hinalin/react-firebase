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
import Loader from "../../assets/gif/loader.gif";
import {
  getHealthHistoryQuestions,
  getScreeningQuestions,
} from "../../utils/utils";

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
  selectedDisorders,
  setSelectedDisorders,
  HealthHistoryQuestions,
  lifeFunctionQuestions,

  selectedOptions,
  setSelectedOptions,

  childQuestions,
  setChildQuestions,

  stepCount,
  setStepCount,

  screeningQuestions,
  setScreeningQuestions,
  allNo
  
}) {
  const [activeQuestion, setActiveQuestion] = useState("screening");
  const [progress, setProgress] = useState(0);
  const [indepthProgress, setIndepthProgress] = useState(0);
  const [healthHistoryProgress, setHealthHistoryProgress] = useState(0);
  const [lifeFunctionProgress, setLifeFunctionProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [nextClicked, setNextClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [focusedQuestion, setFocusedQuestion] = useState(null);
  const [previousClicked, setPreviousClicked] = useState(false);
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState(null);

  const { user, loading, setLoading , userId } = useFirebase();

  // const allNo = filteredQuestions.every(
  //   (question) => answers[question.id] === "NO"
  // );
  function filterArrayByParentId(parentId) {
    return jsonData.filter((item) => item.parentId === Number(parentId));
  }
  const loadUserAnswersFromFirestore = async () => {
    setLoading(true);
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const assessmentDocRef = doc(
          userDocRef,
          "assessment",
          assessmentIdRef.current
        );
        const answersRef = collection(assessmentDocRef, "answers_screenings");

        const inDepthAnserRef = collection(assessmentDocRef, "answers_indepth");
        const hhAnserRef = collection(
          assessmentDocRef,
          "answers_health-history"
        );
        const lfAnserRef = collection(
          assessmentDocRef,
          "answers_life-functions"
        );

        const userAnswersSnapshot = await getDocs(answersRef);
        const userInDepthAnswersSnapshot = await getDocs(inDepthAnserRef);
        const userHHAnswersSnapshot = await getDocs(hhAnserRef);
        const userLFAnswersSnapshot = await getDocs(lfAnserRef);

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

        selectedChildQuestion.forEach((parentId) => {
          const filteredArray = filterArrayByParentId(parentId);
          filteredArrays[parentId] = filteredArray;
        });
        setStepCount(Object.keys(filteredArrays).length);
        setChildQuestions(filteredArrays);
        setScreeningQuestions(loadedAnswers);

        const totalInDepthQuestionsCount = Object.keys(filteredArrays).flatMap(
          (key) => filteredArrays[key]
        ).length;

        // LOGIC FOR ACTIVR QUESTION GROUP
        if (
          userLFAnswersSnapshot.size > 0 ||
          getHealthHistoryQuestions().length === userHHAnswersSnapshot.size
        ) {
          setActiveQuestion("life-function");
          setProgress(100);
          setIndepthProgress(100);
          setHealthHistoryProgress(100);
        } else if (
          userHHAnswersSnapshot.size > 0 ||
          (userAnswersSnapshot.size > 0 &&
            totalInDepthQuestionsCount === userInDepthAnswersSnapshot.size)
        ) {
          setActiveQuestion("health-history");
          setProgress(100);
          setIndepthProgress(100);
        } else if (
          userInDepthAnswersSnapshot.size > 0 ||
          (userAnswersSnapshot.size > 0 &&
            userAnswersSnapshot.size === getScreeningQuestions().length)
        ) {
          setActiveQuestion("indepth");
          setProgress(100);
        } else {
          setActiveQuestion("screening");
        }
      }
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    } finally {
      setLoading(false); // Stop loader regardless of success or error
    }
  };

  useEffect(() => {
    if (userId) {
      loadUserAnswersFromFirestore();
    }
  }, [userId]);

  useEffect(() => {
    if (screeningQuestions && Object.keys(screeningQuestions).length > 0) {
      const allNo = Object.values(screeningQuestions).every(
        (question) => question.answer === "NO"
      );
      if (allNo) {
        setActiveQuestion("health-history");
        setProgress(100);
        setIndepthProgress(100);
        setNextClicked(false);
      }
    }
  }, [screeningQuestions]);
  if (loading) {
    return <img className="d-block mx-auto" src={Loader} alt="" />; // Show loading message
  }

  
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
            screeningQuestions={screeningQuestions}
            allNo={allNo}
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
                filteredQuestions={filteredQuestions}
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
                    focusedQuestion={focusedQuestion}
                    setFocusedQuestion={setFocusedQuestion}
                    setScreeningQuestions={setScreeningQuestions}
                    setIndepthProgress={setIndepthProgress}
                    lastAnsweredQuestion={lastAnsweredQuestion}
                    setLastAnsweredQuestion={setLastAnsweredQuestion}
                    allNo={allNo}
                  />
                )}
                {activeQuestion === "indepth" && (
                  <IndepthQuestion
                    setActiveQuestion={setActiveQuestion}
                    childQuestions={childQuestions}
                    setChildQuestions={setChildQuestions}
                    setIndepthProgress={setIndepthProgress}
                    setActiveStep={setActiveStep}
                    activeStep={activeStep}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    answeredQuestions={answeredQuestions}
                    setAnsweredQuestions={setAnsweredQuestions}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                    assessmentIdRef={assessmentIdRef}
                    focusedQuestion={focusedQuestion}
                    setFocusedQuestion={setFocusedQuestion}
                    selectedDisorders={selectedDisorders}
                    setSelectedDisorders={setSelectedDisorders}
                    answers={answers}
                    setAnswers={setAnswers}
                    setStepCount={setStepCount}
                    setScreeningQuestions={setScreeningQuestions}
                    lastAnsweredQuestion={lastAnsweredQuestion}
                    setLastAnsweredQuestion={setLastAnsweredQuestion}
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
                    HealthHistoryQuestions={HealthHistoryQuestions}
                    answers={answers}
                    setAnswers={setAnswers}
                    assessmentIdRef={assessmentIdRef}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    focusedQuestion={focusedQuestion}
                    setFocusedQuestion={setFocusedQuestion}
                    previousClicked={previousClicked}
                    setPreviousClicked={setPreviousClicked}
                    lastAnsweredQuestion={lastAnsweredQuestion}
                    setLastAnsweredQuestion={setLastAnsweredQuestion}
                    screeningQuestions={screeningQuestions}
                  />
                )}
                {activeQuestion === "life-function" && (
                  <LifeFunctionQuestion
                    setActiveQuestion={setActiveQuestion}
                    setLifeFunctionProgress={setLifeFunctionProgress}
                    nextClicked={nextClicked}
                    setNextClicked={setNextClicked}
                    assessmentStatus={assessmentStatus}
                    setAssessmentStatus={setAssessmentStatus}
                    lifeFunctionQuestions={lifeFunctionQuestions}
                    assessmentIdRef={assessmentIdRef}
                    answers={answers}
                    setAnswers={setAnswers}
                    focusedQuestion={focusedQuestion}
                    setFocusedQuestion={setFocusedQuestion}
                    setPreviousClicked={setPreviousClicked}
                    lastAnsweredQuestion={lastAnsweredQuestion}
                    setLastAnsweredQuestion={setLastAnsweredQuestion}
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
