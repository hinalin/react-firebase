// import React, { useEffect, useState } from "react";
// import "./Assessment.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useFirebase } from "../../context/FirebaseContext";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { fs } from "../../config/Firebase";

// const AssessmentProgress = ({
//   stepCount,
//   progress,
//   activeQuestion,
//   activeStep,
//   healthHistoryProgress,
//   indepthProgress,
//   lifeFunctionProgress,
// }) => {
//   const { user } = useFirebase();
//   const [progressValue, setProgressValue] = useState(0);
//   const [healthHistoryProgressValue, setHealthHistoryProgressValue] =
//     useState(0);
//   const [indepthProgressValue, setIndepthProgressValue] = useState(0);
//   const [lifeFunctionProgressValue, setLifeFunctionProgressValue] = useState(0);
//   const [timer, setTimer] = useState(12 * 60 * 60);
//   const [startTime, setStartTime] = useState(new Date());
//   const userId = user ? user.uid : null;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     setStartTime(new Date()); // Update start time when component mounts
//   }, []);

//   // Convert timer to hours, minutes, and seconds
//   const hours = Math.floor(timer / 3600);
//   const minutes = Math.floor((timer % 3600) / 60);
//   const seconds = timer % 60;

//   // Update state values when props change
//   useEffect(() => {
//     setProgressValue(isNaN(parseInt(progress)) ? 0 : parseInt(progress));
//     setHealthHistoryProgressValue(
//       isNaN(parseInt(healthHistoryProgress))
//         ? 0
//         : parseInt(healthHistoryProgress)
//     );
//     setIndepthProgressValue(
//       isNaN(parseInt(indepthProgress)) ? 0 : parseInt(indepthProgress)
//     );
//     setLifeFunctionProgressValue(
//       isNaN(parseInt(lifeFunctionProgress)) ? 0 : parseInt(lifeFunctionProgress)
//     );
//   }, [progress, healthHistoryProgress, indepthProgress, lifeFunctionProgress]);

//   const formatDateTime = (dateTime) => {
//     return dateTime.toLocaleString('en-GB', { // Customize the locale and options as needed
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     });
//   };

//   const storeProgressToFirestore = async () => {
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         await setDoc(
//           userDocRef,
//           {
//             screeningProgress: progressValue,
//             indepthProgress: indepthProgressValue,
//             healthHistoryProgress: healthHistoryProgressValue,
//             lifeFunctionProgress: lifeFunctionProgressValue,
//             startTime: formatDateTime(startTime), // Convert to ISO string for Firestore
//           },
//           { merge: true }
//         );
//         console.log("Progress stored in Firestore successfully!");
//       }
//     } catch (error) {
//       console.error("Error storing progress in Firestore: ", error);
//     }
//   };

//   useEffect(() => {
//     storeProgressToFirestore();
//   }, [
//     userId,
//     progressValue,
//     indepthProgressValue,
//     healthHistoryProgressValue,
//     lifeFunctionProgressValue,
//     startTime
//   ]);

//   return (
//     <>
//       <div
//         style={{
//           transform: "translateZ(0px)",
//           top: "90px",
//           width: "450px",
//           position: "sticky",
//         }}
//       >
//         <div className="sticky">
//           <div>
//             <h2 className="StartAssessmentTitle mb-4 mt-5">
//               Mental Health Assessment
//             </h2>
//             <div className="main-progress">
//               <div className="progress-text d-flex justify-content-between">
//                 <p>Assessment Progress</p>
//                 <p>0%</p>
//               </div>
//               <div class="progress">
//                 <div
//                   class="progress-bar"
//                   role="progressbar"
//                   aria-valuenow="50"
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                   style={{
//                     width: "50%",
//                     backgroundColor: "#33ca8f",
//                     borderRadius: "20px",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5">
//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-laptop me-3 ${
//                     activeQuestion === "screening" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "screening" ? "text-black" : ""
//                   }`}
//                 >
//                   Screening Questions
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${progressValue}%`}</span>
//                 <CircularProgressbar
//                   value={progressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-comments me-3 ${
//                     activeQuestion === "indepth" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "indepth" ? "text-black" : ""
//                   }`}
//                 >
//                   In-Depth Questions
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${indepthProgressValue}%`}</span>
//                 <CircularProgressbar
//                   value={indepthProgressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             {activeQuestion === "indepth" && (
//               <div>
//                 {[...Array(stepCount).keys()].map((stepIndex) => (
//                   <div
//                     key={stepIndex}
//                     className="d-flex justify-content-between align-items-center mt-3 flex-wrap"
//                   >
//                     <div className="StartAssessment-title ms-3">
//                       <span
//                         className={`${
//                           activeStep === stepIndex + 1 ? "text-black" : ""
//                         }`}
//                       >
//                         Step {stepIndex + 1}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-redo  me-3 ${
//                     activeQuestion === "health-history" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "health-history" ? "text-black" : ""
//                   }`}
//                 >
//                   Health History
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${healthHistoryProgressValue}%`}</span>
//                 <CircularProgressbar
//                   value={healthHistoryProgressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-podcast me-3 ${
//                     activeQuestion === "life-function" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "life-function" ? "text-black" : ""
//                   }`}
//                 >
//                   Life Functions
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${lifeFunctionProgressValue}%`}</span>
//                 <CircularProgressbar
//                   value={lifeFunctionProgressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="StartAssessment-session-timer mt-3">
//               <span style={{ fontWeight: "500" }}>Time Left : &nbsp;</span>
//               <div style={{ display: "inline-flex" }}>
//                 {hours}:{minutes}:{seconds}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssessmentProgress;

// import React, { useEffect, useState } from "react";
// import "./Assessment.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useFirebase } from "../../context/FirebaseContext";
// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { fs } from "../../config/Firebase";

// const AssessmentProgress = ({
//   stepCount,
//   progress,
//   activeQuestion,
//   activeStep,
//   healthHistoryProgress,
//   indepthProgress,
//   lifeFunctionProgress,
// }) => {
//   const { user } = useFirebase();
//   const [progressValue, setProgressValue] = useState(0);
//   const [healthHistoryProgressValue, setHealthHistoryProgressValue] =
//     useState(0);
//   const [indepthProgressValue, setIndepthProgressValue] = useState(0);
//   const [lifeFunctionProgressValue, setLifeFunctionProgressValue] = useState(0);
//   const [timer, setTimer] = useState(12 * 60 * 60);
//   const [startTime, setStartTime] = useState(() => {
//     const storedStartTime = localStorage.getItem("startTime");
//     return storedStartTime ? new Date(storedStartTime) : new Date();
//   });
//   const userId = user ? user.uid : null;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("startTime", startTime.toISOString()); // Store start time in local storage
//   }, [startTime]);

//   // Convert timer to hours, minutes, and seconds
//   const hours = Math.floor(timer / 3600);
//   const minutes = Math.floor((timer % 3600) / 60);
//   const seconds = timer % 60;

//   // Remaining time calculation
//   const elapsedTime = (new Date() - startTime) / 1000; // Elapsed time in seconds
//   const remainingTime = Math.max(12 * 60 * 60 - elapsedTime, 0); // Remaining time in seconds

//   // Update state values when props change
//   useEffect(() => {
//     setProgressValue(isNaN(parseInt(progress)) ? 0 : parseInt(progress));
//     setHealthHistoryProgressValue(
//       isNaN(parseInt(healthHistoryProgress))
//         ? 0
//         : parseInt(healthHistoryProgress)
//     );
//     setIndepthProgressValue(
//       isNaN(parseInt(indepthProgress)) ? 0 : parseInt(indepthProgress)
//     );
//     setLifeFunctionProgressValue(
//       isNaN(parseInt(lifeFunctionProgress)) ? 0 : parseInt(lifeFunctionProgress)
//     );
//   }, [progress, healthHistoryProgress, indepthProgress, lifeFunctionProgress]);

//   const formatDateTime = (dateTime) => {
//     return dateTime.toLocaleString("en-GB", {
//       // Customize the locale and options as needed
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     });
//   };

//   const storeProgressToFirestore = async () => {
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         await setDoc(
//           userDocRef,
//           {
//             screeningProgress: progressValue,
//             indepthProgress: indepthProgressValue,
//             healthHistoryProgress: healthHistoryProgressValue,
//             lifeFunctionProgress: lifeFunctionProgressValue,
//             startTime: formatDateTime(startTime), // Convert to ISO string for Firestore
//           },
//           { merge: true }
//         );
//         console.log("Progress stored in Firestore successfully!");
//       }
//     } catch (error) {
//       console.error("Error storing progress in Firestore: ", error);
//     }
//   };

//   useEffect(() => {
//     storeProgressToFirestore();
//   }, [
//     userId,
//     progressValue,
//     indepthProgressValue,
//     healthHistoryProgressValue,
//     lifeFunctionProgressValue,
//     startTime,
//   ]);

//   return (
//     <>
//       <div
//         style={{
//           transform: "translateZ(0px)",
//           top: "90px",
//           width: "450px",
//           position: "sticky",
//         }}
//       >
//         <div className="sticky">
//           <div>
//             <h2 className="StartAssessmentTitle mb-4 mt-5">
//               Mental Health Assessment
//             </h2>
//             <div className="main-progress">
//               <div className="progress-text d-flex justify-content-between">
//                 <p>Assessment Progress</p>
//                 <p>0%</p>
//               </div>
//               <div class="progress">
//                 <div
//                   class="progress-bar"
//                   role="progressbar"
//                   aria-valuenow="50"
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                   style={{
//                     width: "50%",
//                     backgroundColor: "#33ca8f",
//                     borderRadius: "20px",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5">
//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-laptop me-3 ${
//                     activeQuestion === "screening" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "screening" ? "text-black" : ""
//                   }`}
//                 >
//                   Screening Questions
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${progressValue}%`}</span>
//                 <CircularProgressbar
//                   value={progressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-comments me-3 ${
//                     activeQuestion === "indepth" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "indepth" ? "text-black" : ""
//                   }`}
//                 >
//                   In-Depth Questions
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${indepthProgressValue}%`}</span>
//                 <CircularProgressbar
//                   value={indepthProgressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             {activeQuestion === "indepth" && (
//               <div>
//                 {[...Array(stepCount).keys()].map((stepIndex) => (
//                   <div
//                     key={stepIndex}
//                     className="d-flex justify-content-between align-items-center mt-3 flex-wrap"
//                   >
//                     <div className="StartAssessment-title ms-3">
//                       <span
//                         className={`${
//                           activeStep === stepIndex + 1 ? "text-black" : ""
//                         }`}
//                       >
//                         Step {stepIndex + 1}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-redo  me-3 ${
//                     activeQuestion === "health-history" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "health-history" ? "text-black" : ""
//                   }`}
//                 >
//                   Health History
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${healthHistoryProgressValue}%`}</span>
//                 <CircularProgressbar
//                   value={healthHistoryProgressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i
//                   className={`fas fa-podcast me-3 ${
//                     activeQuestion === "life-function" ? "icon-green" : ""
//                   }`}
//                 ></i>
//                 <span
//                   className={`${
//                     activeQuestion === "life-function" ? "text-black" : ""
//                   }`}
//                 >
//                   Life Functions
//                 </span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${lifeFunctionProgressValue}%`}</span>
//                 <CircularProgressbar
//                   value={lifeFunctionProgressValue}
//                   strokeWidth={10}
//                   styles={{
//                     root: { width: "30px", height: "20px" },
//                     path: { stroke: "rgb(51, 202, 143)" },
//                     text: { fill: "rgb(51, 202, 143)" },
//                     trail: { stroke: "#d6d6d6" },
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="StartAssessment-session-timer mt-3">
//               <span style={{ fontWeight: "500" }}>Time Left : &nbsp;</span>
//               <div style={{ display: "inline-flex" }}>
//                 {Math.floor(remainingTime / 3600)
//                   .toString()
//                   .padStart(2, "0")}
//                 :
//                 {Math.floor((remainingTime % 3600) / 60)
//                   .toString()
//                   .padStart(2, "0")}
//                 :
//                 {Math.floor(remainingTime % 60)
//                   .toString()
//                   .padStart(2, "0")}{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssessmentProgress;

import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";
import { fs } from "../../config/Firebase";

const AssessmentProgress = ({
  stepCount,
  progress,
  activeQuestion,
  activeStep,
  healthHistoryProgress,
  indepthProgress,
  lifeFunctionProgress,
}) => {
  const { user } = useFirebase();
  const [progressValue, setProgressValue] = useState(0);
  const [healthHistoryProgressValue, setHealthHistoryProgressValue] =
    useState(0);
  const [indepthProgressValue, setIndepthProgressValue] = useState(0);
  const [lifeFunctionProgressValue, setLifeFunctionProgressValue] = useState(0);
  const [timer, setTimer] = useState(12 * 60 * 60);
  const [startTime, setStartTime] = useState(() => {
    const storedStartTime = localStorage.getItem("startTime");
    return storedStartTime ? new Date(storedStartTime) : new Date();
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const userId = user ? user.uid : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("startTime", startTime.toISOString()); // Store start time in local storage
  }, [startTime]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimeUp(true);
    }
  }, [timer]);

  const handleModalClose = () => {
    setIsTimeUp(false);
  };

  // Remaining time calculation
  const elapsedTime = (new Date() - startTime) / 1000; // Elapsed time in seconds
  const remainingTime = Math.max(12 * 60 * 60 - elapsedTime, 0); // Remaining time in seconds

  // Update state values when props change
  useEffect(() => {
    setProgressValue(isNaN(parseInt(progress)) ? 0 : parseInt(progress));
    setHealthHistoryProgressValue(
      isNaN(parseInt(healthHistoryProgress))
        ? 0
        : parseInt(healthHistoryProgress)
    );
    setIndepthProgressValue(
      isNaN(parseInt(indepthProgress)) ? 0 : parseInt(indepthProgress)
    );
    setLifeFunctionProgressValue(
      isNaN(parseInt(lifeFunctionProgress)) ? 0 : parseInt(lifeFunctionProgress)
    );
  }, [progress, healthHistoryProgress, indepthProgress, lifeFunctionProgress]);

  const formatDateTime = (dateTime) => {
    return dateTime.toLocaleString("en-GB", {
      // Customize the locale and options as needed
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const storeProgressToFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        await setDoc(
          userDocRef,
          {
            screeningProgress: progressValue,
            indepthProgress: indepthProgressValue,
            healthHistoryProgress: healthHistoryProgressValue,
            lifeFunctionProgress: lifeFunctionProgressValue,
            startTime: formatDateTime(startTime), // Convert to ISO string for Firestore
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
  }, [
    userId,
    progressValue,
    indepthProgressValue,
    healthHistoryProgressValue,
    lifeFunctionProgressValue,
    startTime,
  ]);

  return (
    <>
      <div
        style={{
          transform: "translateZ(0px)",
          top: "90px",
          width: "450px",
          position: "sticky",
        }}
      >
        <div className="sticky">
          <div>
            <h2 className="StartAssessmentTitle mb-4 mt-5">
              Mental Health Assessment
            </h2>
            <div className="main-progress">
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

            {/* <div className="StartAssessment-session-timer mt-3">
              <span style={{ fontWeight: "500" }}>Time Left : &nbsp;</span>
              <div style={{ display: "inline-flex" }}>
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
                {isTimeUp && <span>Time's Up!</span>}
              </div>
            </div> */}

            <div className="StartAssessment-session-timer mt-3">
              <span style={{ fontWeight: "500" }}>Time Left : &nbsp;</span>
              <div style={{ display: "inline-flex" }}>
                {remainingTime > 0 && (
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
                      .padStart(2, "0")}
                  </>
                )}
                {remainingTime <= 0 && <span style={{color:"red"}}> Time's Up!</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTimeUp && (
        <div className="modal" onClick={handleModalClose}>
          <div className="modal-content">
            <p>Time's Up!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentProgress;
