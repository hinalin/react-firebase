// import React from "react";
// import "./Assessment.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useFirebase } from "../../context/FirebaseContext";
// import jsonData from '../../data/QuestionsData.json'

// const AssessmentProgress = ({stepCount  , answers}) => {
//   const { user } = useFirebase();
//   // const answeredQuestionsCount = Object.keys(answers).length;
//   // const totalQuestionsCount = jsonData.filter(question => question.parentId === null && question.scn_question).length;
//   // const progress = (answeredQuestionsCount / totalQuestionsCount) * 100;
//   return (
//     <>
//       <div style={{
//             transform: "translateZ(0px)",
//             top: "90px",
//             width: "450px",
//             position: "sticky",
//           }}>
//         <div
//           className="sticky"

//         >
//           <div>
//             <h2 className="StartAssessmentTitle mb-4 mt-5">
//               Mental Health Assessment
//             </h2>
//           </div>

//           <div className="mt-5">
//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className='StartAssessment-title'>
//                 <i className="fas fa-laptop me-3"></i>
//                 <span>Screening Questions</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">0%</span>
//                 <CircularProgressbar
//                   value={10}
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
//                 <i className={`fas fa-comments me-3`}></i>
//                 <span>In-Depth Questions</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">54%</span>
//                 <CircularProgressbar
//                   value={54}
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

//             {[...Array(stepCount).keys()].map((stepIndex) => (
//               <div key={stepIndex} className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//                 <div className="StartAssessment-title ms-3">
//                   <span>Step { stepIndex + 1 }</span>
//                 </div>
//               </div>
//             ))}

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i className="fas fa-redo  me-3"></i>
//                 <span>Health History</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">0%</span>
//                 <CircularProgressbar
//                   value={0}
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
//                 <i className="fas fa-podcast me-3"></i>
//                 <span>Life Functions</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">0%</span>
//                 <CircularProgressbar
//                   value={0}
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
//               <div style={{ display: "inline-flex" }}>0:0:0</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssessmentProgress;

// import React from "react";
// import "./Assessment.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useFirebase } from "../../context/FirebaseContext";
// import jsonData from "../../data/QuestionsData.json";

// const AssessmentProgress = ({ stepCount , screeningprogress, indepthProgress , healthHistoryProgress , lifeFunctionProgress }) => {
//   const { user } = useFirebase();

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
//           </div>

//           <div className="mt-5">
//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i className="fas fa-laptop me-3"></i>
//                 <span>Screening Questions</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${parseInt(screeningprogress)}%`}</span>
//                 <CircularProgressbar
//                   value={parseInt(screeningprogress)}
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
//                 <i className='fas fa-comments me-3'></i>
//                 <span>In-Depth Questions</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${parseInt(indepthProgress)}%`}</span>
//                 <CircularProgressbar
//                   value={parseInt(indepthProgress)}
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

//             {[...Array(stepCount).keys()].map((stepIndex) => (
//               <div
//                 key={stepIndex}
//                 className="d-flex justify-content-between align-items-center mt-3 flex-wrap"
//               >
//                 <div className="StartAssessment-title ms-3">
//                   <span>Step {stepIndex + 1}</span>
//                 </div>
//               </div>
//             ))}

//             <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
//               <div className="StartAssessment-title">
//                 <i className="fas fa-redo  me-3"></i>
//                 <span>Health History</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${parseInt(healthHistoryProgress)}%`}</span>
//                 <CircularProgressbar
//                   value={parseInt(healthHistoryProgress)}
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
//                 <i className="fas fa-podcast me-3"></i>
//                 <span>Life Functions</span>
//               </div>
//               <div className="d-flex align-items-center">
//                 <span className="percent">{`${parseInt(lifeFunctionProgress)}%`}</span>
//                 <CircularProgressbar
//                   value={parseInt(lifeFunctionProgress)}
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
//               <div style={{ display: "inline-flex" }}>0:0:0</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssessmentProgress;

import { React, useEffect } from "react";
import "./Assessment.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFirebase } from "../../context/FirebaseContext";
import ProgressBar from "react-bootstrap/ProgressBar";
import { doc, setDoc } from "firebase/firestore";
import { fs } from "../../config/Firebase";

const AssessmentProgress = ({
  stepCount,
  progress,
  activeQuestion,
  healthHistoryProgress,
  indepthProgress
}) => {
  const { user } = useFirebase();
  const progressValue = isNaN(parseInt(progress)) ? 0 : parseInt(progress);
  const healthhistory = isNaN(parseInt(healthHistoryProgress))
    ? 0
    : parseInt(healthHistoryProgress);

  const indepthValue = isNaN(parseInt(indepthProgress)) ? 0 : parseInt(indepthProgress)

  const now = 20;
  const userId = user ? user.uid : null;
  const storeProgressToFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        await setDoc(
          userDocRef,
          { screeningProgress: progressValue },
          { merge: true }
        );
        console.log("Screening progress stored in Firestore successfully!");
      }
    } catch (error) {
      console.error("Error storing screening progress in Firestore: ", error);
    }
  };
  useEffect(() => {
    storeProgressToFirestore();
  }, [userId, progressValue]);

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
              <ProgressBar now={now} variant="success" />
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
                <span className="percent">{`${indepthValue}%`}</span>
                <CircularProgressbar
                  value={indepthValue}
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
                <span className="percent">{`${healthhistory}%`}</span>
                <CircularProgressbar
                  value={healthhistory}
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
                <span className="percent">0%</span>
                <CircularProgressbar
                  value={0}
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
              <div style={{ display: "inline-flex" }}>0:0:0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentProgress;
