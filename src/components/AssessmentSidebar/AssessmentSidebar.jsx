import React, { useEffect, useState, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import "./AssessmentSidebar.css";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { fs } from "../../config/Firebase";

function AssessmentSidebar({
  isSideDrawerOpen,
  closeSidebarDrawer,
  assessmentIdRef,
  remainingTime,
  assessmentStatus,
  setAssessmentStatus,
  filteredQuestions,
  answers,
  selectedDisorders,
  setSelectedDisorders,
}) {
  const { user, loading, setLoading } = useFirebase();
  const [previousAssessments, setPreviousAssessments] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const [startTime, setStartTime] = useState(null); // State to store the start time
  const userId = user ? user.uid : null;

  useEffect(() => {
    const loadStartTimeFromFirestore = async () => {
      try {
        if (userId) {
          const userDocRef = doc(fs, "users", userId);
          const assessmentDocRef = doc(
            userDocRef,
            "assessment",
            assessmentIdRef.current
          );
          const docSnapshot = await getDoc(assessmentDocRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.startTime) {
              setStartTime(new Date(data.startTime));
              setAssessmentStatus(data.assessmentStatus || "In Progress");
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching start time from Firestore: ", error);
      }
    };

    loadStartTimeFromFirestore();
  }, [userId, assessmentIdRef]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return null;
    const dateObj = new Date(dateTime);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = days[dateObj.getDay()];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate().toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const formattedTime = `${dayOfWeek}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${period}`;

    return formattedTime;
  };

  const allNo = filteredQuestions.every(
    (question) => answers[question.id] === "NO"
  );

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
  useEffect(() => {
    const fetchPreviousAssessments = async () => {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const assessmentsRef = collection(userDocRef, "assessment");
        const snapshot = await getDocs(assessmentsRef);
        const assessmentsData = [];
        snapshot.forEach((doc) => {
          const assessmentData = doc.data();
          assessmentData.id = doc.id;
          // Only update the assessment status if it's not already "Completed"
          // if (assessmentData.assessmentStatus !== "Completed") {
          //   assessmentData.assessmentStatus = "In Progress";
          // }
          assessmentsData.push(assessmentData);
        });
        setPreviousAssessments(assessmentsData);
      }
    };

    fetchPreviousAssessments();
  }, [userId]);

  return (
    <Drawer anchor="left" open={isSideDrawerOpen} onClose={closeSidebarDrawer}>
      <d iv className="assessment-sidebar">
        <div className="assessment-sidebar-heading">
          <h4>Assessment History</h4>
          <img
            src="https://fbn3staging.ca/static/media/white-x.4df22b826b2f2633acc2e0c433cacb5c.svg"
            alt="close"
            onClick={closeSidebarDrawer}
          />
        </div>
        <div className="date-status">
          <div className="date">
            <span>Date</span>
          </div>
          <div className="status">
            <span>status</span>
          </div>
        </div>
        {loading ? ( // Render loading indicator if loading is true
          <h2>Loading...</h2>
        ) : (
            <div className="assessment-accordions">
              <div className="accordion" id="accordionPanelsStayOpenExample">
                {previousAssessments
                  .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                  .map((assessment, index) => (
                    <div key={assessment.id} className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          onClick={() =>
                            setOpenAccordionIndex(
                              openAccordionIndex === index ? null : index
                            )
                          }
                          aria-expanded={openAccordionIndex === index}
                          style={{ height: "50px" }}
                        >
                          <div className="assessment-accordion-header mt-4">
                            <div
                              key={assessment.id}
                              className="assessment-item"
                            >
                              {/* <p>{assessment.startTime}</p> */}
                              {startTime
                                ? formatDateTime(assessment.startTime)
                                : "Loading..."}
                            </div>
                            <p>
                              {(remainingTime === 0 &&
                                assessment.assessmentStatus !== "Completed") ||
                              assessment.assessmentStatus === "Incomplete" ? (
                                <p className="ms-5">❗Incompleted</p>
                              ) : (
                                // <p>{assessment.assessmentStatus}</p>
                                <p>
                                  {assessment.assessmentStatus ===
                                  "Completed" ? (
                                    <p>
                                      <img
                                        src="https://fbn3staging.ca/static/media/green-checkmark.a8534cec4bcc6e2cdf3ed8ff9a2d8af2.svg"
                                        alt=""
                                        style={{ height: "18px" }}
                                        className="me-2 ms-1"
                                      />
                                      Completed
                                      {/* {assessment.assessmentStatus} */}
                                    </p>
                                  ) : (
                                    <p>
                                      <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABWUlEQVQ4T62VMU4CQRiF31tHO2sLg4U3IHgA2NrWGiXqUugNTGy8ARSOMSitttiuHEDCCTRRQ0ErnQz8ZiDAumHJbNhJJtnMP/Pt2/xv3xBLxpsubOaxXRmLdwhKHsAugBGBTwE6hLyooN1cdpbxRaP9U4HcANhZdmC2RuAbwmtVDR+i+/4BjfZrArlYBYrXBFLfCtqXkRdNH391sUYwFWwBYV0F4QQ6UWhu/ROhNNIoi+8leKaC8H4K1KUvAXJJQK9Qhp3jTnMyE0Zf4SdHo4tlAR9XqVPn4bxs7vzErR6kyqEuPQE4ygIIYYtGl94F2M8ECPSsQgNgIyMgsgaOnD7ZscvWgx9OTUnhz2cn27grlGMnY7v40IaFCl73nH49F4UUVmzyzNNmnXCIJs7a8UUskmaeNtEuugYsgD7BK5swiQE7KyRcAbbcg7DrcdzqYtA4CDrDuKX+ADkUsG6njmGhAAAAAElFTkSuQmCC"
                                        alt="not"
                                        className="me-2 ms-5"
                                      />
                                      {/* {assessment.assessmentStatus} */}
                                      In Progress
                                    </p>
                                  )}
                                </p>
                              )}
                            </p>
                            {assessment.assessmentStatus !== "Completed" ? (
                              <>
                                {remainingTime === 0 ||
                                assessment.assessmentStatus === "Incomplete" ? (
                                  <span className="text-danger">
                                    Time's Up!!
                                  </span>
                                ) : (
                                  <div>
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
                                  </div>
                                )}
                              </>
                            ) : (
                              <p>✅</p>
                            )}
                          </div>
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        // className="accordion-collapse collapse"
                        className={`accordion-collapse collapse ${
                          openAccordionIndex === index ? "show" : ""
                        }`}
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div className="accordion-body">
                          <div className="assessment-data w-100 ms-4">
                            {remainingTime === 0 ||
                            assessment.assessmentStatus === "Incomplete" ? (
                              <p className="text-danger">
                                Your session was expired
                              </p>
                            ) : allNo &&
                              assessment.assessmentStatus === "Completed" ? (
                              "You are not at risk for any disorders"
                            ) :
                            remainingTime !== 0 && assessment.assessmentStatus !== 'Completed' ?(<p className="text-warning">Please Complete your assessment</p>) :
                             (
                              <>
                                <div className="disorder-div w-100">
                                  {assessment.selectedDisorders &&
                                    assessment.selectedDisorders.map(
                                      (disorder, index) => (
                                        <div
                                          key={index}
                                          className="disorder d-flex justify-content-between p-2 bg-light w-100"
                                        >
                                          <div> {disorder.disorder}</div>
                                          <div className="d-flex">
                                            <div
                                              className={`dot mt-2 ${getDotColor(
                                                disorder.risk
                                              )}`}
                                            ></div>
                                            <div className="ms-3">
                                              {" "}
                                              {disorder.risk}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )
                                    }
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
        )}
      </d>
    </Drawer>
  );
}

export default AssessmentSidebar;
