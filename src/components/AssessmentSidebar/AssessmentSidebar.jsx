import React, { useEffect, useState, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import "./AssessmentSidebar.css";
import { useFirebase } from "../../context/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";
import { fs } from "../../config/Firebase";

function AssessmentSidebar({
  isSideDrawerOpen,
  closeSidebarDrawer,
  assessmentIdRef,
  remainingTime,
  assessmentStatus,
  filteredQuestions,
  answers,
  setRemainingTime,
}) {
  const { user } = useFirebase();
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
            }
          }
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
  useEffect(() => {
    fetchStartTime();
  }, [userId]);

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

  const allNo = filteredQuestions.every(
    (question) => answers[question.id] === "NO"
  );
  return (
    <Drawer anchor="left" open={isSideDrawerOpen} onClose={closeSidebarDrawer}>
      <div className="assessment-sidebar">
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
        <div className="assessment-accordions">
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                  style={{ height: "50px" }}
                >
                  <div className="assessment-accordion-header mt-4">
                    <span>
                      {startTime ? formatDateTime(startTime) : "Loading..."}
                    </span>
                    <p>
                      {remainingTime === 0 ? (
                        <p>❗Incompleted</p>
                      ) : (
                        <p>
                          {assessmentStatus === "Completed" ? (
                            <p>
                              <img
                                src="https://fbn3staging.ca/static/media/green-checkmark.a8534cec4bcc6e2cdf3ed8ff9a2d8af2.svg"
                                alt=""
                                style={{ height: "18px" }}
                                className="me-2"
                              />
                              Completed
                            </p>
                          ) : (
                            <p>
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABWUlEQVQ4T62VMU4CQRiF31tHO2sLg4U3IHgA2NrWGiXqUugNTGy8ARSOMSitttiuHEDCCTRRQ0ErnQz8ZiDAumHJbNhJJtnMP/Pt2/xv3xBLxpsubOaxXRmLdwhKHsAugBGBTwE6hLyooN1cdpbxRaP9U4HcANhZdmC2RuAbwmtVDR+i+/4BjfZrArlYBYrXBFLfCtqXkRdNH391sUYwFWwBYV0F4QQ6UWhu/ROhNNIoi+8leKaC8H4K1KUvAXJJQK9Qhp3jTnMyE0Zf4SdHo4tlAR9XqVPn4bxs7vzErR6kyqEuPQE4ygIIYYtGl94F2M8ECPSsQgNgIyMgsgaOnD7ZscvWgx9OTUnhz2cn27grlGMnY7v40IaFCl73nH49F4UUVmzyzNNmnXCIJs7a8UUskmaeNtEuugYsgD7BK5swiQE7KyRcAbbcg7DrcdzqYtA4CDrDuKX+ADkUsG6njmGhAAAAAElFTkSuQmCC"
                                alt="not"
                                className="me-2"
                              />
                              In Progress
                            </p>
                          )}
                        </p>
                      )}
                    </p>
                    {assessmentStatus !== "Completed" ? (
                      <>
                        {remainingTime === 0 ? (
                          <span className="text-danger">Time's Up!!</span>
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
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body">
                  <div className="assessment-data">
                    {remainingTime === 0 ? (
                      <p className="text-danger">Your session was expired</p>
                    ) : allNo && assessmentStatus === "completed" ? (
                      "You are not at risk for any disorders"
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default AssessmentSidebar;
