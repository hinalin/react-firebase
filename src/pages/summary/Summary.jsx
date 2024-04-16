import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import ResultPart from "./ResultPart";
import TopicsPart from "./TopicsPart";
import "./Summary.css";
import Drawer from "../../components/drawer/Drawer";
import { useFirebase } from "../../context/FirebaseContext";
import { fs } from "../../config/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Summary({
  isSidebarOpen,
  setSidebarOpen,
  HealthHistoryQuestions,
  lifeFunctionQuestions,
  setAnswers,
  answers,
  filteredQuestions,
  remainingTime,
  assessmentIdRef,
  assessmentStatus,
  setRemainingTime,
  setAssessmentStatus,
  setFilteredQuestions,
  selectedOptions,
  selectedDisorders,
  setSelectedDisorders,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user, setLoading } = useFirebase();
  const userId = user ? user.uid : null;
  console.log(userId, "useerrriDDDDDD");

  useEffect(() => {
    setDrawerOpen(true);
  }, []);

  const getDotColor = (risk) => {
    switch (risk) {
      case "High Risk":
        return "red";
      case "Moderate Risk":
        return "yellow";
      case "Low Risk":
        return "green";
      default:
        return "black"; // Default color for unknown risk levels
    }
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className="summary-section">
        <div className="navigationbar container">
          <NavigationBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
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
            selectedDisorders={selectedDisorders}
          />
        </div>
        <div className="summary-card">
          <div className="summary-container">
            <div className="summary-heading">
              <h4>Assessment Outcomes</h4>
            </div>
          </div>
          <ResultPart />
          <div className="disorder-div pb-5 p-5">
            {/* {selectedDisorders.map((disorder, index) => (
              <div key={index} className="disorder summary-que-ans p-4">
                {disorder}
              </div>
            ))} */}
            {/* {selectedDisorders.map((disorder, index) => (
              <div key={index} className="d-flex justify-content-between disorder summary-que-ans p-4">
                <div className="disorder-name">{disorder.disorder}</div>
                <div className="disorder-risk">{disorder.risk}</div>
              </div>
            ))} */}
            {selectedDisorders.map((disorder, index) => (
              <div
                key={index}
                className="d-flex justify-content-between disorder summary-que-ans p-4"
              >
                <div className="disorder-name">{disorder.disorder}</div>
                {/* <div className="disorder-risk">{disorder.risk}</div> */}
                <div className="d-flex">
                  <div
                    className={`dot mt-2 ${getDotColor(disorder.risk)}`}
                  ></div>
                  <div className="ms-3"> {disorder.risk}</div>
                </div>
              </div>
            ))}
          </div>
          <TopicsPart />
          <div className="show-answers row">
            <div className="show-answers-health-history col-6 pb-5 p-5">
              <h3>Health History</h3>
              {HealthHistoryQuestions.map((question, index) => (
                <div className="summary-que-ans" key={question.id}>
                  <p style={{ fontWeight: "600" }}>
                    {question.health_history_question}
                  </p>
                  {selectedOptions[question.id] && (
                    <p>
                      {selectedOptions[question.id]
                        .map((option) => option.label)
                        .join(", ")}
                    </p>
                  )}
                  {/* If selected options don't exist, display "None" */}
                  {!selectedOptions[question.id] && <p>None</p>}
                </div>
              ))}
            </div>
            <div className="show-answers-life-function col-6 pb-5 p-5">
              <h3>Health History</h3>
              {lifeFunctionQuestions.map((question, index) => (
                <div className="summary-que-ans" key={question.id}>
                  <p>{question.life_functions_question}</p>
                  <p>
                    {" "}
                    {question.dropdown
                      ? answers[question.id]
                      : `${answers[question.id]} ${index === 1 ? "Days" : "%"}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Drawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
      />
    </>
  );
}

export default Summary;
