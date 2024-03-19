import React from "react";
import "./Assessment.css";
import 'react-circular-progressbar/dist/styles.css';
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useFirebase } from "../../context/FirebaseContext";
import Footer from "../../components/Footer/Footer";
import AssessmentProgress from "./AssessmentProgress";
import ScreeningQuestions from "./Screening/ScreeningQuestions";

const Assessment = () => {
  const { user } = useFirebase();
  return (
    <>
      <div className="StartAssessment-template">
        <div className="header">
          <NavigationBar user = { user }/>
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-4">
              <AssessmentProgress/>
            </div>
            <div className="col-8">
              <ScreeningQuestions/>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Assessment;
