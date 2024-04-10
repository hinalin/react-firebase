import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";
import { fs } from "../../config/Firebase";
import TimeupModal from "./TimeupModal/TimeupModal";

const AssessmentProgress = ({
  stepCount,
  progress,
  activeQuestion,
  activeStep,
  healthHistoryProgress,
  indepthProgress,
  lifeFunctionProgress,
  assessmentIdRef,
  remainingTime,
  setRemainingTime,
  answers,
}) => {
  const { user } = useFirebase();
  const userId = user ? user.uid : null;

  const [progressValue, setProgressValue] = useState(0);
  const [healthHistoryProgressValue, setHealthHistoryProgressValue] =
    useState(0);
  const [indepthProgressValue, setIndepthProgressValue] = useState(0);
  const [lifeFunctionProgressValue, setLifeFunctionProgressValue] = useState(0);
  // const [remainingTime, setRemainingTime] = useState(0);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Track whether modal should be open
  // let startTime = localStorage.getItem(`startTime_${userId}`);

  const mainProgressValue = Math.round(
    (progressValue +
      indepthProgressValue +
      healthHistoryProgressValue +
      lifeFunctionProgressValue) /
      4
  );
  let startTime = localStorage.getItem(`startTime_${userId}`);

  const fetchStartTime = async () => {
    try {
      if (!startTime) {
        startTime = new Date().toISOString();
        localStorage.setItem(`startTime_${userId}`, startTime);
      }
      startTime = new Date(startTime);
      const elapsedTime = (new Date() - startTime) / 1000;
      const newRemainingTime = Math.max(12 * 60 * 60 - elapsedTime, 0);
      setRemainingTime(newRemainingTime);
    } catch (error) {
      console.error("Error fetching start time:", error);
    }
  };
  useEffect(() => {
    fetchStartTime();
  }, [userId]);
  // Update remaining time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevRemainingTime) =>
        Math.max(prevRemainingTime - 1, 0)
      );
    }, 1000);
    setTimeout(() => {
      setInitialRenderComplete(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [setRemainingTime]);

  useEffect(() => {
    if (initialRenderComplete && remainingTime === 0) {
      setIsTimeUp(true);
      setModalIsOpen(true); // Open modal when time is up
    }
  }, [remainingTime, initialRenderComplete]);
  const formatDateTime = (dateTime) => {
    if (!dateTime) return null;
    const year = dateTime.getFullYear().toString().padStart(4, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Update state values when props change
  useEffect(() => {
    setProgressValue(isNaN(parseInt(progress)) ? 0 : parseInt(progress));
    setIndepthProgressValue(
      isNaN(parseInt(indepthProgress)) ? 0 : parseInt(indepthProgress)
    );
    setHealthHistoryProgressValue(
      isNaN(parseInt(healthHistoryProgress))
        ? 0
        : parseInt(healthHistoryProgress)
    );

    setLifeFunctionProgressValue(
      isNaN(parseInt(lifeFunctionProgress)) ? 0 : parseInt(lifeFunctionProgress)
    );
  }, [progress, healthHistoryProgress, indepthProgress, lifeFunctionProgress]);

  // Format date time

  const storeProgressToFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const assessmentDocRef = doc(
          userDocRef,
          "assessment",
          assessmentIdRef.current
        );

        await setDoc(
          assessmentDocRef,
          {
            startTime: formatDateTime(startTime),
          },
          { merge: true }
        );
        console.log("Progress stored in Firestore successfully!");
      }
    } catch (error) {
      console.error("Error storing progress in Firestore: ", error);
    }
  };

  useEffect(() => {
    storeProgressToFirestore();
  }, [userId, startTime]);

  return (
    <>
      <TimeupModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        userId={userId}
        assessmentIdRef={assessmentIdRef}
        answers={answers}
      />
      <div
        style={{
          transform: "translateZ(0px)",
          top: "90px",
          width: "90%",
          position: "sticky",
        }}
      >
        <div className="sticky">
          <div>
            <h2 className="StartAssessmentTitle mb-4 mt-5">
              Mental Health Assessment
            </h2>
            {/* <div className="main-progress">
              <div className="progress-text d-flex justify-content-between">
                <p>Assessment Progress</p>
                <p>0%</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width: "50%",
                    backgroundColor: "#33ca8f",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
            </div> */}
            <div className="main-progress">
              <div className="progress-text d-flex justify-content-between">
                <p>Assessment Progress</p>
                <p>{`${mainProgressValue}%`}</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={mainProgressValue}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width: `${mainProgressValue}%`,
                    backgroundColor: "#33ca8f",
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i
                  className={`fas fa-laptop me-3 ${
                    activeQuestion === "screening" ? "icon-green" : ""
                  }`}
                ></i>
                <span
                  className={`${
                    activeQuestion === "screening" ? "text-black" : ""
                  }`}
                >
                  Screening Questions
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">{`${progressValue}%`}</span>
                <CircularProgressbar
                  value={progressValue}
                  strokeWidth={10}
                  styles={{
                    root: { width: "30px", height: "20px" },
                    path: { stroke: "rgb(51, 202, 143)" },
                    text: { fill: "rgb(51, 202, 143)" },
                    trail: { stroke: "#d6d6d6" },
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i
                  className={`fas fa-comments me-3 ${
                    activeQuestion === "indepth" ? "icon-green" : ""
                  }`}
                ></i>
                <span
                  className={`${
                    activeQuestion === "indepth" ? "text-black" : ""
                  }`}
                >
                  In-Depth Questions
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">{`${indepthProgressValue}%`}</span>
                <CircularProgressbar
                  value={indepthProgressValue}
                  strokeWidth={10}
                  styles={{
                    root: { width: "30px", height: "20px" },
                    path: { stroke: "rgb(51, 202, 143)" },
                    text: { fill: "rgb(51, 202, 143)" },
                    trail: { stroke: "#d6d6d6" },
                  }}
                />
              </div>
            </div>

            {activeQuestion === "indepth" && (
              <div>
                {[...Array(stepCount).keys()].map((stepIndex) => (
                  <div
                    key={stepIndex}
                    className="d-flex justify-content-between align-items-center mt-3 flex-wrap"
                  >
                    <div className="StartAssessment-title ms-3">
                      <span
                        className={`${
                          activeStep === stepIndex + 1 ? "text-black" : ""
                        }`}
                      >
                        Step {stepIndex + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i
                  className={`fas fa-redo  me-3 ${
                    activeQuestion === "health-history" ? "icon-green" : ""
                  }`}
                ></i>
                <span
                  className={`${
                    activeQuestion === "health-history" ? "text-black" : ""
                  }`}
                >
                  Health History
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">{`${healthHistoryProgressValue}%`}</span>
                <CircularProgressbar
                  value={healthHistoryProgressValue}
                  strokeWidth={10}
                  styles={{
                    root: { width: "30px", height: "20px" },
                    path: { stroke: "rgb(51, 202, 143)" },
                    text: { fill: "rgb(51, 202, 143)" },
                    trail: { stroke: "#d6d6d6" },
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i
                  className={`fas fa-podcast me-3 ${
                    activeQuestion === "life-function" ? "icon-green" : ""
                  }`}
                ></i>
                <span
                  className={`${
                    activeQuestion === "life-function" ? "text-black" : ""
                  }`}
                >
                  Life Functions
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">{`${lifeFunctionProgressValue}%`}</span>
                <CircularProgressbar
                  value={lifeFunctionProgressValue}
                  strokeWidth={10}
                  styles={{
                    root: { width: "30px", height: "20px" },
                    path: { stroke: "rgb(51, 202, 143)" },
                    text: { fill: "rgb(51, 202, 143)" },
                    trail: { stroke: "#d6d6d6" },
                  }}
                />
              </div>
            </div>

            <div className="StartAssessment-session-timer mt-3">
              <span style={{ fontWeight: "500" }}>Time Left : &nbsp;</span>
              <div style={{ display: "inline-flex" }}>
                {remainingTime === 0 ? (
                  <span className="text-danger">Time's Up!!</span>
                ) : (
                  <>
                    {Math.floor(remainingTime / 3600)
                      .toString()
                      .padStart(2, "0")}
                    :
                    {Math.floor((remainingTime % 3600) / 60)
                      .toString()
                      .padStart(2, "0")}
                    :
                    {Math.floor(remainingTime % 60)
                      .toString()
                      .padStart(2, "0")}{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentProgress;
