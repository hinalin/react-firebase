import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import ResultPart from "./ResultPart";
import TopicsPart from "./TopicsPart";
import "./Summary.css";
import Drawer from "../../components/drawer/Drawer";
import { useFirebase } from "../../context/FirebaseContext";
import { useParams } from "react-router-dom";
import { fs } from "../../config/Firebase";
import { collection, doc, getDocs , getDoc } from "firebase/firestore";
import Loader from "../../assets/gif/loader.gif";

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
  screeningQuestions,
  selectedDisorders,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user, previousAssessments, fetchPreviousAssessments, userId } =
    useFirebase();
  const [fetchedHealthHistoryAnswers, setFetchedHealthHistoryAnswers] =
    useState({});
  const [fetchedLifeFunctionAnswers, setFetchedLifeFunctionAnswers] = useState(
    {}
  );
  const [fetchedSelectedDisorders, setFetchedSelectedDisorders] = useState([]);

  const [loading, setLoading] = useState(true);

  const param = useParams();

  const fetchHealthHistoryAnswers = async (userId, assessmentId) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(userDocRef, "assessment", assessmentId);
      const answersRef = collection(assessmentDocRef, "answers_health-history");
      const querySnapshot = await getDocs(answersRef);
      const fetchedAnswers = {};
      const fetchedSelectedOptions = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedAnswers[data.questionId] = data.answer;
        fetchedSelectedOptions[data.questionId] = data.selectedOptions;
      });
      setFetchedHealthHistoryAnswers(fetchedAnswers);
    } catch (error) {
      console.error("Error fetching health history answers: ", error);
    }
  };

  const fetchLifeFunctionAnswers = async (userId, assessmentId) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(userDocRef, "assessment", assessmentId);
      const answersRef = collection(assessmentDocRef, "answers-life-functions");
      const querySnapshot = await getDocs(answersRef);
      const fetchedAnswers = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedAnswers[data.questionId] = data.answer;
      });
      setFetchedLifeFunctionAnswers(fetchedAnswers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching life Function answers: ", error);
    }
  };

  const fetchSelectedDisorders = async (userId, assessmentId) => {
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(userDocRef, "assessment", assessmentId);
      const docSnapshot = await getDoc(assessmentDocRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const selectedDisorders = data.selectedDisorders || []; // Default to empty array if selectedDisorders is not present
        setFetchedSelectedDisorders(selectedDisorders);
      } else {
        console.log("No assessment document found with the provided ID");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching disordersss: ", error);
    }
  };
  

  useEffect(() => {
    if (user && param.id) {
      fetchHealthHistoryAnswers(user.uid, param.id);
      fetchLifeFunctionAnswers(user.uid, param.id);
      fetchSelectedDisorders(user.uid , param.id)
    }
  }, [user, param.id]);

  const data = previousAssessments.filter((assessment) => {
    return assessment.id === param.id;
  });
  // console.log(previousAssessments, "previousAssessments");

  console.log(data.length, "dataaaaaa");
  
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
        return "black";
    }
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    fetchPreviousAssessments();
  }, [userId]);
  return (
    <>
      {loading ? ( // Show loader if loading is true
        <div>
          <img src={Loader} alt="" className="d-block mx-auto" />
        </div>
      ) : (
        // Render summary page if loading is false
        <>
          {data.length > 0 ? (
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
                    screeningQuestions={screeningQuestions}
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
                    {fetchedSelectedDisorders.map((disorder, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between disorder summary-que-ans p-4"
                      >
                        <div className="disorder-name">{disorder.disorder}</div>
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
                          {fetchedHealthHistoryAnswers[question.id] ===
                          "YES" ? (
                            <p>
                              {selectedOptions[question.id] &&
                                selectedOptions[question.id]
                                  .map((option) => option.label)
                                  .join(", ")}
                            </p>
                          ) : (
                            <p>{fetchedHealthHistoryAnswers[question.id]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="show-answers-life-function col-6 pb-5 p-5">
                      <h3>Life Function</h3>
                      {lifeFunctionQuestions.map((question, index) => (
                        <div className="summary-que-ans" key={question.id}>
                          <p>{question.life_functions_question}</p>
                          {fetchedLifeFunctionAnswers[question.id] !==
                          undefined ? (
                            <p>
                              {question.dropdown
                                ? fetchedLifeFunctionAnswers[question.id]
                                : `${fetchedLifeFunctionAnswers[question.id]} ${
                                    index === 1 ? "Days" : "%"
                                  }`}
                            </p>
                          ) : (
                            <p>None</p>
                          )}
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
          ) : (
            <p>No assessment found for the given ID</p>
          )}
        </>
      )}
    </>
  );
}

export default Summary;
