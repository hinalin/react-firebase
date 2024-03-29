import { React } from "react";
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
import AssessmentProgress from "../pages/Assessment/AssessmentProgress";
import ScreeningQuestions from "../pages/Assessment/Screeningquestions/ScreeningQuestions";
import InDepthQuestions from "../pages/Assessment/Indepth/InDepthQuestions";
import HelthHistoryQuestions from "../pages/Assessment/Helthhistory/HelthHistoryQuestions";
import LifeFunctionsQuestions from "../pages/Assessment/Lifefunction/LifeFunctionsQuestions";

const Main = () => {
  return (
    <>
      <Router>
        <FirebaseContextProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
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
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/AssessmentProgress"
              element={<AssessmentProgress />}
            ></Route>
            <Route
              path="/ScreeningQuestions"
              element={<ScreeningQuestions />}
            ></Route>

            <Route
              path="/InDepthQuestions"
              element={<InDepthQuestions />}
            ></Route>

            <Route
              path="/HelthHistoryQuestions"
              element={<HelthHistoryQuestions />}
            ></Route>
            <Route
              path="/LifeFunctionsQuestions"
              element={<LifeFunctionsQuestions />}
            ></Route>
          </Routes>
        </FirebaseContextProvider>
      </Router>
    </>
  );
};

export default Main;
