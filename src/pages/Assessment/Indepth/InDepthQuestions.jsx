import React from 'react';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import AssessmentProgress from '../AssessmentProgress'
import { useFirebase } from '../../../context/FirebaseContext';

const InDepthQuestions = () => {
    const { user } = useFirebase;
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
              <div className="InDepthQuestions-template">
             
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default InDepthQuestions;


