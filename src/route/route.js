import { React, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import TermsOfServices from "../components/Tnc/TermsOfServices/TermsOfServices";
import PrivacyPolicy from "../components/Tnc/PrivacyPolicy/PrivacyPolicy";
import SignIn from "../components/Authentication/SignIn/SignIn";
import SignUp from "../components/Authentication/SignUp/SignUp";
import { FirebaseContextProvider } from "../context/FirebaseContext";
import ProtectedRoute from "../protectedroute/ProtectedRoute";
import Assessment from "../pages/Assessment/Assessment";
import SignUpwithNumber from "../components/Authentication/SignUp/SignUpwithNumber";
import ForgotPassword from "../components/Authentication/ForgotPassword/ForgotPassword";
import Profile from "../pages/Profile/Profile";
import Summary from "../pages/summary/Summary";
import {
  getHealthHistoryQuestions,
  getScreeningQuestions,
  getLifeFunctionQuestions
} from '../utils/utils';

const Main = () => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [assessmentStatus, setAssessmentStatus] = useState("");
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedDisorders, setSelectedDisorders] = useState([]);
  const [screeningQuestions, setScreeningQuestions] = useState([])
  const assessmentIdRef = useRef(null);

  const HealthHistoryQuestions = getHealthHistoryQuestions()
  const lifeFunctionQuestions = getLifeFunctionQuestions()

  const getAssessmentCounter = () => {
    const storedAssessmentCounter = localStorage.getItem("assessmentCounter");
    return storedAssessmentCounter ? parseInt(storedAssessmentCounter) : 1;
  };

  const assessmentCounter = getAssessmentCounter();


  return (
    <>
      <Router>
        <FirebaseContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  remainingTime={remainingTime}
                  setRemainingTime={setRemainingTime}
                  assessmentStatus={assessmentStatus}
                  setAssessmentStatus={setAssessmentStatus}
                  filteredQuestions={filteredQuestions}
                  setFilteredQuestions={setFilteredQuestions}
                  answers={answers}
                  setAnswers={setAnswers}
                  assessmentIdRef={assessmentIdRef}

                  selectedDisorders={selectedDisorders}
                  setSelectedDisorders={setSelectedDisorders}
                  screeningQuestions={screeningQuestions}

                />
              }
            ></Route>
            <Route
              path="/TermsOfServices"
              element={<TermsOfServices />}
            ></Route>
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route
              path="/SignUpwithNumber"
              element={<SignUpwithNumber />}
            ></Route>
            <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route
              path="/Assessment"
              element={
                // <ProtectedRoute>
                <Assessment
                  filteredQuestions={filteredQuestions}
                  setFilteredQuestions={setFilteredQuestions}
                  remainingTime={remainingTime}
                  setRemainingTime={setRemainingTime}
                  assessmentStatus={assessmentStatus}
                  setAssessmentStatus={setAssessmentStatus}
                  answers={answers}
                  setAnswers={setAnswers}
                  assessmentIdRef={assessmentIdRef}
                  selectedQuestions={selectedQuestions}
                  setSelectedQuestions={setSelectedQuestions}
                  HealthHistoryQuestions={HealthHistoryQuestions}
                  lifeFunctionQuestions={lifeFunctionQuestions}
                  assessmentCounter={assessmentCounter}
                  selectedDisorders={selectedDisorders}
                  setSelectedDisorders={setSelectedDisorders}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  screeningQuestions={screeningQuestions}
                  setScreeningQuestions={setScreeningQuestions}
                />
              }
            ></Route>
            <Route
              path="/Summary"
              element={
                <Summary
                  HealthHistoryQuestions={HealthHistoryQuestions}
                  lifeFunctionQuestions={lifeFunctionQuestions}
                  answers={answers}
                  setAnswers={setAnswers}
                  filteredQuestions={filteredQuestions}
                  setFilteredQuestions={setFilteredQuestions}
                  remainingTime={remainingTime}
                  setRemainingTime={setRemainingTime}
                  assessmentStatus={assessmentStatus}
                  setAssessmentStatus={setAssessmentStatus}
                  assessmentIdRef={assessmentIdRef}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  selectedDisorders={selectedDisorders}
                  setSelectedDisorders={setSelectedDisorders}
                  screeningQuestions={screeningQuestions}
                />
              }
            ></Route>
          </Routes>
        </FirebaseContextProvider>
      </Router>
    </>
  );
};

export default Main;
