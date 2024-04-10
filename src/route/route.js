// import { React } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "../pages/Home/Home";
// import TermsOfServices from "../components/Tnc/TermsOfServices/TermsOfServices";
// import PrivacyPolicy from "../components/Tnc/PrivacyPolicy/PrivacyPolicy";
// import SignIn from "../components/Authentication/SignIn/SignIn";
// import SignUp from "../components/Authentication/SignUp/SignUp";
// import { FirebaseContextProvider } from "../context/FirebaseContext";
// import ProtectedRoute from "../protectedroute/ProtectedRoute";
// import Assessment from "../pages/Assessment/Assessment";
// import SignUpwithNumber from "../components/Authentication/SignUp/SignUpwithNumber";
// import ForgotPassword from "../components/Authentication/ForgotPassword/ForgotPassword";
// import Profile from "../pages/Profile/Profile";
// import AssessmentProgress from "../pages/Assessment/AssessmentProgress";
// import ScreeningQuestions from "../pages/Assessment/Screeningquestions/ScreeningQuestions";
// import InDepthQuestions from "../pages/Assessment/Indepth/InDepthQuestions";
// import HelthHistoryQuestions from "../pages/Assessment/Helthhistory/HelthHistoryQuestions";
// import LifeFunctionsQuestions from "../pages/Assessment/Lifefunction/LifeFunctionsQuestions";

// const Main = () => {
//   return (
//     <>
//       <Router>
//         <FirebaseContextProvider>
//           <Routes>
//             <Route path="/" element={<Home />}/>
//             <Route path="/TermsOfServices" element={<TermsOfServices />}/>
//             <Route path="/PrivacyPolicy" element={<PrivacyPolicy />}/>
//             <Route path="/SignIn" element={<SignIn />}/>
//             <Route path="/SignUp" element={<SignUp />}/>
//             <Route path="/SignUpwithNumber" element={<SignUpwithNumber />} />
//             <Route path="/ForgotPassword" element={<ForgotPassword />}/>
//             <Route path="/Profile" element={<Profile />}/>
//             <Route path="/Assessment"
//               element={
//                 <ProtectedRoute>
//                   <Assessment />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<ScreeningQuestions />} />
//               <Route path="InDepthQuestions" element={<InDepthQuestions />}/>
//               <Route path="HelthHistoryQuestions" element={<HelthHistoryQuestions />}/>
//               <Route path="LifeFunctionsQuestions" element={<LifeFunctionsQuestions />} />
//             </Route>
//           </Routes>
//         </FirebaseContextProvider>
//       </Router>
//     </>
//   );
// };

// export default Main;

import { React, useState , useRef } from "react";
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

const Main = () => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [assessmentStatus, setAssessmentStatus] = useState("");
  const [answers, setAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const assessmentIdRef = useRef(null);

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
                />
                // </ProtectedRoute>
              }
            ></Route>
            <Route path='/Summary' element={<Summary/>}></Route>
          </Routes>
        </FirebaseContextProvider>
      </Router>
    </>
  );
};

export default Main;
