import { React , useState }  from "react";
import "./Assessment.css";
import 'react-circular-progressbar/dist/styles.css';
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useFirebase } from "../../context/FirebaseContext";
import Footer from "../../components/Footer/Footer";
import AssessmentProgress from "./AssessmentProgress";
import ScreeningQuestions from "./Screeningquestions/ScreeningQuestions";
import { Outlet } from "react-router-dom";

const Assessment = () => {
  const { user } = useFirebase();
  const [stepCount, setStepCount] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userId, setUserId] = useState("");
  return (
    <>
      <div className="StartAssessment-template">
        <div className="header">
          <NavigationBar user = { user }/>
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-4"  >
              <AssessmentProgress stepCount={stepCount} answers={answers}/>
            </div>
            <div className="col-8"> 
              <ScreeningQuestions setStepCount={setStepCount}  setAnswers={setAnswers} userId={userId}/>
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
