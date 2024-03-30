import React from "react";
import "./Assessment.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFirebase } from "../../context/FirebaseContext";
import jsonData from '../../data/QuestionsData.json'

const AssessmentProgress = ({stepCount  , answers}) => {
  const { user } = useFirebase();
  // const answeredQuestionsCount = Object.keys(answers).length;
  // const totalQuestionsCount = jsonData.filter(question => question.parentId === null && question.scn_question).length;
  // const progress = (answeredQuestionsCount / totalQuestionsCount) * 100;
  return (
    <>
      <div style={{
            transform: "translateZ(0px)",
            top: "90px",
            width: "450px",
            position: "sticky",
          }}>
        <div
          className="sticky"
          
        >
          <div>
            <h2 className="StartAssessmentTitle mb-4 mt-5">
              Mental Health Assessment
            </h2>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className='StartAssessment-title'>
                <i className="fas fa-laptop me-3"></i>
                <span>Screening Questions</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent"></span>
                <CircularProgressbar
                  value={100}
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
                <i className={`fas fa-comments me-3`}></i>
                <span>In-Depth Questions</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">54%</span>
                <CircularProgressbar
                  value={54}
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

            {[...Array(stepCount).keys()].map((stepIndex) => (
              <div key={stepIndex} className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                <div className="StartAssessment-title ms-3">
                  <span>Step { stepIndex + 1 }</span>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i className="fas fa-redo  me-3"></i>
                <span>Health History</span>
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

            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i className="fas fa-podcast me-3"></i>
                <span>Life Functions</span>
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
