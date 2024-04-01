// // import { React , useState }  from "react";
// // import "./Assessment.css";
// // import 'react-circular-progressbar/dist/styles.css';
// // import NavigationBar from "../../components/NavigationBar/NavigationBar";
// // import { useFirebase } from "../../context/FirebaseContext";
// // import Footer from "../../components/Footer/Footer";
// // import AssessmentProgress from "./AssessmentProgress";
// // import ScreeningQuestions from "./Screeningquestions/ScreeningQuestions";
// // import { Outlet } from "react-router-dom";

// // const Assessment = () => {
// //   const { user } = useFirebase();
// //   const [stepCount, setStepCount] = useState(0);
// //   const [answers, setAnswers] = useState({});
// //   const [userId, setUserId] = useState("");
// //   return (
// //     <>
// //       <div className="StartAssessment-template">
// //         <div className="header">
// //           <NavigationBar user = { user }/>
// //         </div>
// //         <div className="StartAssessmentCard">
// //           <div className="row">
// //             <div className="col-4"  >
// //               <AssessmentProgress stepCount={stepCount} answers={answers}/>
// //             </div>
// //             <div className="col-8"> 
// //               <ScreeningQuestions setStepCount={setStepCount}  setAnswers={setAnswers} userId={userId}/>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="footer">
// //           <Footer/>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Assessment;

// // import { React, useState } from "react";
// // import "./Assessment.css";
// // import "react-circular-progressbar/dist/styles.css";
// // import NavigationBar from "../../components/NavigationBar/NavigationBar";
// // import { useFirebase } from "../../context/FirebaseContext";
// // import Footer from "../../components/Footer/Footer";
// // import AssessmentProgress from "./AssessmentProgress";
// // import ScreeningQuestions from "./Screeningquestions/ScreeningQuestions";

// // const Assessment = ({screeningprogress , setScreeningProgress , userId , indepthprogress}) => {
// //   const { user } = useFirebase();
// //   const [stepCount, setStepCount] = useState(0);
 
// //   return (
// //     <>
// //       <div className="StartAssessment-template">
// //         <div className="header">
// //           <NavigationBar user={user} />
// //         </div>
// //         <div className="StartAssessmentCard">
// //           <div className="row">
// //             <div className="col-4">
// //               <AssessmentProgress stepCount={stepCount} screeningprogress={screeningprogress}/>
// //             </div>
// //             <div className="col-8">
// //               <ScreeningQuestions
// //                 setStepCount={setStepCount}
// //                 userId={userId}
// //                 setScreeningProgress={setScreeningProgress}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //         <div className="footer">
// //           <Footer />
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Assessment;


// import { React, useState } from "react";
// import "./Assessment.css";
// import "react-circular-progressbar/dist/styles.css";
// import NavigationBar from "../../components/NavigationBar/NavigationBar";
// import { useFirebase } from "../../context/FirebaseContext";
// import Footer from "../../components/Footer/Footer";
// import AssessmentProgress from "./AssessmentProgress";
// import ScreeningQuestions from "./Screeningquestions/ScreeningQuestions";
// import { Outlet } from "react-router-dom";

// const Assessment = () => {
//   const { user } = useFirebase();
//   const [stepCount, setStepCount] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [userId, setUserId] = useState("");
//   const [progress, setProgress] = useState(0);
//   return (
//     <>
//       <div className="StartAssessment-template">
//         <div className="header">
//           <NavigationBar user={user} />
//         </div>
//         <div className="StartAssessmentCard">
//           <div className="row">
//             <div className="col-4">
//               <AssessmentProgress stepCount={stepCount} answers={answers} progress={progress}/>
//             </div>
//             <div className="col-8">
//               <ScreeningQuestions
//                 setStepCount={setStepCount}
//                 setAnswers={setAnswers}
//                 userId={userId}
//                 setProgress={setProgress}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Assessment;

import React, { useState } from "react";
import "./Assessment.css";
import 'react-circular-progressbar/dist/styles.css';
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import AssessmentProgress from "./AssessmentProgress";
import ScreeningQuestion from './Screeningquestions/ScreeningQuestions';
import IndepthQuestion from './Indepth/InDepthQuestions';
import HealthHistoryQuestion from './Helthhistory/HelthHistoryQuestions';
import LifeFunctionQuestion from './Lifefunction/LifeFunctionsQuestions';
import { useFirebase } from "../../context/FirebaseContext";

function Assessment( ) {
    
    const [activeQuestion , setActiveQuestion] = useState('screening');
    const [stepCount, setStepCount] = useState(0);
    const [childQuestions, setChildQuestions] = useState(null);
    const [progress, setProgress] = useState(0);
    const [ healthHistoryProgress , setHealthHistoryProgress] = useState(0);
    const [ indepthProgress , setIndepthProgress ] = useState(0);
    const { user } = useFirebase();

    return (
        <>
            <div className="StartAssessment-template">
                <div className="header container">
                    <NavigationBar user={user}/>
                </div>
                <div className="StartAssessmentCard">
                    <div className="row">
                        <div className="col-4">
                            <AssessmentProgress stepCount={stepCount} activeQuestion={activeQuestion} progress={progress} healthHistoryProgress={healthHistoryProgress} indepthProgress={indepthProgress} />
                        </div>
                        <div className="col-8">
                            <div className="questions-part">
                                {activeQuestion === 'screening' && <ScreeningQuestion setActiveQuestion={setActiveQuestion} setStepCount={setStepCount} setChildQuestions={setChildQuestions} setProgress={setProgress} />}
                                {activeQuestion === 'indepth' && <IndepthQuestion setActiveQuestion={setActiveQuestion}  childQuestions={childQuestions} setIndepthProgress={setIndepthProgress} />}
                                {activeQuestion === 'health-history' && <HealthHistoryQuestion setActiveQuestion={setActiveQuestion} setHealthHistoryProgress={setHealthHistoryProgress}/>}
                                {activeQuestion === 'life-function' && <LifeFunctionQuestion setActiveQuestion={setActiveQuestion} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Assessment;


