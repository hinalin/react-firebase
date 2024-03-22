import React from "react";
import "./Assessment.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFirebase } from "../../context/FirebaseContext";

const AssessmentProgress = ({stepCount}) => {
  const { user } = useFirebase();
  
  return (
    <>
      <div style={{ minHeight: "469px" }}>
        <div
          className="sticky"
          style={{
            transform: "translateZ(0px)",
            top: "90px",
            width: "450px",
            position: "fixed",
          }}
        >
          <div>
            <h2 className="StartAssessmentTitle mb-4 mt-5">
              Mental Health Assessment
            </h2>
          </div>

          <div className="d-flex justify-content-between">
            <p className="mb-0 StartAssessment-progress-heading">
              Assessment Progress
            </p>
            <p className="mb-0 StartAssessment-progress-percent">10%</p>
          </div>

          <div className="StartAssessement-progressbar mt-2 mb-4">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "100px", height: "10px" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div className="StartAssessment-title">
                <i className="fas fa-laptop activeIcon me-3"></i>
                <span>Screening Questions</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">100%</span>
                <CircularProgressbar
                className="screening-question-circle progressBar"
                  value={10}
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
                <i className="fas fa-comments  me-3"></i>
                <span>In-Depth Questions</span>
                <p>{'step : ' + stepCount}</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">0%</span>
                <CircularProgressbar
                  value={10}
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
                <i className="fas fa-redo  me-3"></i>
                <span>Health History</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="percent">0%</span>
                <CircularProgressbar
                  value={10}
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
                  value={10}
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
