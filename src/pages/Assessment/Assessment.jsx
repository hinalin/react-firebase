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

// import React, { useState } from "react";
// import "./Assessment.css";
// import 'react-circular-progressbar/dist/styles.css';
// import NavigationBar from "../../components/NavigationBar/NavigationBar";
// import Footer from "../../components/Footer/Footer";
// import AssessmentProgress from "./AssessmentProgress";
// import ScreeningQuestion from './Screeningquestions/ScreeningQuestions';
// import IndepthQuestion from './Indepth/InDepthQuestions';
// import HealthHistoryQuestion from './Helthhistory/HelthHistoryQuestions';
// import LifeFunctionQuestion from './Lifefunction/LifeFunctionsQuestions';
// import { useFirebase } from "../../context/FirebaseContext";

// function Assessment( ) {

//     const [activeQuestion , setActiveQuestion] = useState('screening');
//     const [stepCount, setStepCount] = useState(0);
//     const [childQuestions, setChildQuestions] = useState(null);
//     const [progress, setProgress] = useState(0);
//     const [ healthHistoryProgress , setHealthHistoryProgress] = useState(0);
//     const [ indepthProgress , setIndepthProgress ] = useState(0);
//     const { user } = useFirebase();

//     return (
//         <>
//             <div className="StartAssessment-template">
//                 <div className="header container">
//                     <NavigationBar user={user}/>
//                 </div>
//                 <div className="StartAssessmentCard">
//                     <div className="row">
//                         <div className="col-4">
//                             <AssessmentProgress user={user} stepCount={stepCount} activeQuestion={activeQuestion} progress={progress} healthHistoryProgress={healthHistoryProgress} indepthProgress={indepthProgress} />
//                         </div>
//                         <div className="col-8">
//                             <div className="questions-part">
//                                 {activeQuestion === 'screening' && <ScreeningQuestion setActiveQuestion={setActiveQuestion} setStepCount={setStepCount} setChildQuestions={setChildQuestions} setProgress={setProgress} />}
//                                 {activeQuestion === 'indepth' && <IndepthQuestion setActiveQuestion={setActiveQuestion}  childQuestions={childQuestions} setIndepthProgress={setIndepthProgress} />}
//                                 {activeQuestion === 'health-history' && <HealthHistoryQuestion setActiveQuestion={setActiveQuestion} setHealthHistoryProgress={setHealthHistoryProgress}/>}
//                                 {activeQuestion === 'life-function' && <LifeFunctionQuestion setActiveQuestion={setActiveQuestion} />}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer">
//                     <Footer />
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Assessment;

// import React, { useEffect, useState } from "react";
// import "./Assessment.css";
// import "react-circular-progressbar/dist/styles.css";
// import NavigationBar from "../../components/NavigationBar/NavigationBar";
// import Footer from "../../components/Footer/Footer";
// import AssessmentProgress from "./AssessmentProgress";
// import ScreeningQuestion from "./Screeningquestions/ScreeningQuestions";
// import IndepthQuestion from "./Indepth/InDepthQuestions";
// import HealthHistoryQuestion from "./Helthhistory/HelthHistoryQuestions";
// import LifeFunctionQuestion from "./Lifefunction/LifeFunctionsQuestions";
// import { useFirebase } from "../../context/FirebaseContext";
// import { collection, doc, getDocs } from "firebase/firestore";
// import { fs } from "../../config/Firebase";
// import jsonData from "../../data/QuestionsData.json";

// function Assessment() {
//   const [activeQuestion, setActiveQuestion] = useState("screening");
//   const [stepCount, setStepCount] = useState(0);
//   const [childQuestions, setChildQuestions] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [healthHistoryProgress, setHealthHistoryProgress] = useState(0);
//   const [indepthProgress, setIndepthProgress] = useState(0);
//   const [screeningQuestions, setScreeningQuestions] = useState([]);

//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);

//   const { user } = useFirebase();
//   const userId = user ? user.uid : null;

//   function filterArrayByParentId(parentId) {
//     return jsonData.filter((item) => item.parentId === Number(parentId));
//   }

//   const loadUserAnswersFromFirestore = async () => {
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         const userAnswersRef = collection(userDocRef, "answers-screenings");
//         const userAnswersSnapshot = await getDocs(userAnswersRef);
//         const loadedAnswers = [];
//         const answer = {};
//         userAnswersSnapshot.forEach((doc) => {
//           loadedAnswers.push(doc.data());
//           answer[doc.id] = doc.data().answer;
//         });
//         const selectedChildQuestion = Object.keys(answer).filter(
//           (key) => answer[key] === "YES"
//         );
//         const filteredArrays = {};
//         console.log(selectedChildQuestion);
//         selectedChildQuestion.forEach((parentId) => {
//           const filteredArray = filterArrayByParentId(parentId);
//           filteredArrays[parentId] = filteredArray;
//         });
//         setStepCount(Object.keys(filteredArrays).length);
//         setChildQuestions(filteredArrays);
//         setScreeningQuestions(loadedAnswers);
//       }
//     } catch (error) {
//       console.error("Error loading user answers from Firestore: ", error);
//     }
//   };
//   useEffect(() => {
//     if (userId) {
//       loadUserAnswersFromFirestore();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (screeningQuestions.length > 0) {
//       const totalQuestions = screeningQuestions.filter(question => question.answer !== "").length;
//       const totalSteps = Object.keys(childQuestions || {}).length;
//       if (totalQuestions >= totalSteps) {
//         setActiveQuestion("indepth");
//       }
//     }
//   }, [screeningQuestions, childQuestions]);
//   console.log(childQuestions);

//   useEffect(() => {
//     if (childQuestions && Object.keys(childQuestions).length > 0) {
//       const answeredQuestionsCount = Object.keys(childQuestions).reduce((count, parentId) => {
//         return count + childQuestions[parentId].filter(childQuestion => selectedAnswers[childQuestion.id]).length;
//       }, 0);
      
//       if (answeredQuestionsCount > 0) {
//         setActiveQuestion("indepth");
//         setCurrentPage(answeredQuestionsCount - 1);
//       }
//     }
//   }, [childQuestions, selectedAnswers]);
//   return (
//     <>
//       <div className="StartAssessment-template">
//         <div className="header container">
//           <NavigationBar user={user} />
//         </div>
//         <div className="StartAssessmentCard">
//           <div className="row">
//             <div className="col-4">
//               <AssessmentProgress
//                 stepCount={stepCount}
//                 activeQuestion={activeQuestion}
//                 progress={progress}
//                 healthHistoryProgress={healthHistoryProgress}
//                 indepthProgress={indepthProgress}
//               />
//             </div>
//             <div className="col-8">
//               <div className="questions-part">
//                 {activeQuestion === "screening" && (
//                   <ScreeningQuestion
//                     setActiveQuestion={setActiveQuestion}
//                     setStepCount={setStepCount}
//                     setChildQuestions={setChildQuestions}
//                     setProgress={setProgress}
//                   />
//                 )}
//                 {activeQuestion === "indepth" && (
//                   <IndepthQuestion
//                     setActiveQuestion={setActiveQuestion}
//                     childQuestions={childQuestions}
//                     setIndepthProgress={setIndepthProgress}
//                     selectedAnswers={selectedAnswers} // Pass selectedAnswers to InDepthQuestions
//                     setSelectedAnswers={setSelectedAnswers} // Pass setSelectedAnswers to InDepthQuestions
//                     currentPage={currentPage} // Pass currentPage to InDepthQuestions
//                     setCurrentPage={setCurrentPage}
//                   />
//                 )}
//                 {activeQuestion === "health-history" && (
//                   <HealthHistoryQuestion
//                     setActiveQuestion={setActiveQuestion}
//                     setHealthHistoryProgress={setHealthHistoryProgress}
//                   />
//                 )}
//                 {activeQuestion === "life-function" && (
//                   <LifeFunctionQuestion setActiveQuestion={setActiveQuestion} />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }
// export default Assessment;


// import React, { useEffect, useState } from "react";
// import "./Assessment.css";
// import "react-circular-progressbar/dist/styles.css";
// import NavigationBar from "../../components/NavigationBar/NavigationBar";
// import Footer from "../../components/Footer/Footer";
// import AssessmentProgress from "./AssessmentProgress";
// import ScreeningQuestion from "./Screeningquestions/ScreeningQuestions";
// import IndepthQuestion from "./Indepth/InDepthQuestions";
// import HealthHistoryQuestion from "./Helthhistory/HelthHistoryQuestions";
// import LifeFunctionQuestion from "./Lifefunction/LifeFunctionsQuestions";
// import { useFirebase } from "../../context/FirebaseContext";
// import { collection, doc, getDocs} from "firebase/firestore";
// import { fs } from "../../config/Firebase";
// import jsonData from "../../data/QuestionsData.json";

// function Assessment() {
//   const [activeQuestion, setActiveQuestion] = useState("screening");
//   const [stepCount, setStepCount] = useState(0);
//   const [childQuestions, setChildQuestions] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [healthHistoryProgress, setHealthHistoryProgress] = useState(0);
//   const [indepthProgress, setIndepthProgress] = useState(0);
//   const [screeningQuestions, setScreeningQuestions] = useState([]);
//   const [activeStep, setActiveStep] = useState(1);
//   const [answeredQuestions, setAnsweredQuestions] = useState({});


//   const [currentPage, setCurrentPage] = useState(0);

//   const { user } = useFirebase();
//   const userId = user ? user.uid : null;

//   function filterArrayByParentId(parentId) {
//     return jsonData.filter((item) => item.parentId === Number(parentId));
//   }

//   const loadUserAnswersFromFirestore = async () => {
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         const userAnswersRef = collection(userDocRef, "answers-screenings");
//         const userAnswersSnapshot = await getDocs(userAnswersRef);
//         const loadedAnswers = [];
//         const answer = {};
//         userAnswersSnapshot.forEach((doc) => {
//           loadedAnswers.push(doc.data());
//           answer[doc.id] = doc.data().answer;
//         });
//         const selectedChildQuestion = Object.keys(answer).filter(
//           (key) => answer[key] === "YES"
//         );
//         const filteredArrays = {};
//         console.log(selectedChildQuestion);
//         selectedChildQuestion.forEach((parentId) => {
//           const filteredArray = filterArrayByParentId(parentId);
//           filteredArrays[parentId] = filteredArray;
//         });
//         setStepCount(Object.keys(filteredArrays).length);
//         setChildQuestions(filteredArrays);
//         setScreeningQuestions(loadedAnswers);
//       }
//     } catch (error) {
//       console.error("Error loading user answers from Firestore: ", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       loadUserAnswersFromFirestore();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (screeningQuestions.length === 13) {
//       setActiveQuestion("indepth");
//     }
//   }, [screeningQuestions]);

//   useEffect(() => {
//     const areAllQuestionsAnswered = Object.values(answeredQuestions).every(answered => answered);
  
//     if (areAllQuestionsAnswered) {
//       setActiveQuestion("health-history");
//     }
//   }, [answeredQuestions]);

//   console.log(childQuestions);

//   return (
//     <>
//       <div className="StartAssessment-template">
//         <div className="header container">
//           <NavigationBar user={user} />
//         </div>
//         <div className="StartAssessmentCard">
//           <div className="row">
//             <div className="col-4">
//               <AssessmentProgress
//                 stepCount={stepCount}
//                 activeQuestion={activeQuestion}
//                 progress={progress}
//                 healthHistoryProgress={healthHistoryProgress}
//                 indepthProgress={indepthProgress}
//                 activeStep={activeStep}
//                 setIndepthProgress={setIndepthProgress}
//                 setProgress={setProgress}
//                 setHealthHistoryProgress={setHealthHistoryProgress}
//               />
//             </div>
//             <div className="col-8">
//               <div className="questions-part">
//                 {activeQuestion === "screening" && (
//                   <ScreeningQuestion
//                     setActiveQuestion={setActiveQuestion}
//                     setStepCount={setStepCount}
//                     setChildQuestions={setChildQuestions}
//                     setProgress={setProgress}
//                   />
//                 )}
//                 {activeQuestion === "indepth" && (
//                   <IndepthQuestion
//                     setActiveQuestion={setActiveQuestion}
//                     childQuestions={childQuestions}
//                     setIndepthProgress={setIndepthProgress}
//                     setActiveStep={setActiveStep}
//                     currentPage={currentPage} 
//                     setCurrentPage={setCurrentPage}
//                     answeredQuestions={answeredQuestions}
//                     setAnsweredQuestions={setAnsweredQuestions}
//                   />
//                 )}
//                 {activeQuestion === "health-history" && (
//                   <HealthHistoryQuestion
//                     setActiveQuestion={setActiveQuestion}
//                     setHealthHistoryProgress={setHealthHistoryProgress}
//                     currentPage={currentPage} 
//                     setCurrentPage={setCurrentPage}
//                     setActiveStep={setActiveStep}
//                     childQuestions={childQuestions}
//                   />
//                 )}
//                 {activeQuestion === "life-function" && (
//                   <LifeFunctionQuestion setActiveQuestion={setActiveQuestion} />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Assessment;
    

import React, { useEffect, useState } from "react";
import "./Assessment.css";
import "react-circular-progressbar/dist/styles.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import AssessmentProgress from "./AssessmentProgress";
import ScreeningQuestion from "./Screeningquestions/ScreeningQuestions";
import IndepthQuestion from "./Indepth/InDepthQuestions";
import HealthHistoryQuestion from "./Helthhistory/HelthHistoryQuestions";
import LifeFunctionQuestion from "./Lifefunction/LifeFunctionsQuestions";
import { useFirebase } from "../../context/FirebaseContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { fs } from "../../config/Firebase";
import jsonData from "../../data/QuestionsData.json";

function Assessment() {
  const [activeQuestion, setActiveQuestion] = useState("screening");
  const [stepCount, setStepCount] = useState(0);
  const [childQuestions, setChildQuestions] = useState(null);
  const [progress, setProgress] = useState(0);
  const [healthHistoryProgress, setHealthHistoryProgress] = useState(0);
  const [indepthProgress, setIndepthProgress] = useState(0);
  const [ lifeFunctionProgress, setLifeFunctionProgress ] = useState(0)
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useFirebase();
  const userId = user ? user.uid : null;

  function filterArrayByParentId(parentId) {
    return jsonData.filter((item) => item.parentId === Number(parentId));
  }

  const loadUserAnswersFromFirestore = async () => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const userAnswersRef = collection(userDocRef, "answers-screenings");
        const userAnswersSnapshot = await getDocs(userAnswersRef);
        const loadedAnswers = [];
        const answer = {};
        userAnswersSnapshot.forEach((doc) => {
          loadedAnswers.push(doc.data());
          answer[doc.id] = doc.data().answer;
        });
        const selectedChildQuestion = Object.keys(answer).filter(
          (key) => answer[key] === "YES"
        );
        const filteredArrays = {};
        console.log(selectedChildQuestion);
        selectedChildQuestion.forEach((parentId) => {
          const filteredArray = filterArrayByParentId(parentId);
          filteredArrays[parentId] = filteredArray;
          console.log(filteredArray , 'fffffffffffffffff');
        });
        setStepCount(Object.keys(filteredArrays).length);
        setChildQuestions(filteredArrays);
        console.log(selectedChildQuestion , 'sssssssssssssssssssssssssss');
        setScreeningQuestions(loadedAnswers);
        console.log(setScreeningQuestions , 'scrrrrrrrrrrrrrrrr');
      }
    } catch (error) {
      console.error("Error loading user answers from Firestore: ", error);
    }
  };

  // AHIYAA filteredArray PARTHI KADACH HEALTHHISTORY LAVI SKASSEEEEE JO INDEPTH MA ANS APAII GYA HSE TOOOOO 
  
  useEffect(() => {
    if (userId) {
      loadUserAnswersFromFirestore();
    }
  }, [userId]);

  useEffect(() => {
    if (screeningQuestions.length === 13) {
      setActiveQuestion("indepth");
    }
  }, [screeningQuestions]);


  // useEffect(() => {
  //   const areAllInDepthQuestionsAnswered = Object.keys(answeredQuestions).every(
  //     (questionId) => answeredQuestions[questionId]
  //   );

  //   if (areAllInDepthQuestionsAnswered) {
  //     setActiveQuestion("health-history");
  //   }
  // }, [answeredQuestions]);

  // useEffect(() => {
  //   const areAllInDepthQuestionsAnswered = Object.values(answeredQuestions).every(answered => answered);
  
  //   if (areAllInDepthQuestionsAnswered && activeQuestion === "indepth") {
  //     setActiveQuestion("health-history");
  //   }
  // }, [answeredQuestions, activeQuestion]);

  // useEffect(() => {
  //   const areAllScreeningQuestionsAnswered = Object.keys(screeningQuestions).every(
  //     questionId => screeningQuestions[questionId] === "YES"
  //   );
  
  //   if (areAllScreeningQuestionsAnswered && activeQuestion === "screening") {
  //     setActiveQuestion("indepth");
  //   }
  // }, [screeningQuestions, activeQuestion]);
  
  // useEffect(() => {
  //   const areAllInDepthQuestionsAnswered = Object.values(answeredQuestions).every(
  //     answered => answered
  //   );
  
  //   if (areAllInDepthQuestionsAnswered && activeQuestion === "indepth") {
  //     setActiveQuestion("health-history");
  //   }
  // }, [answeredQuestions, activeQuestion]);
  
  

  return (
    <>
      <div className="StartAssessment-template">
        <div className="header me-5 ms-2">
          <NavigationBar user={user} />
        </div>
        <div className="StartAssessmentCard">
          <div className="row">
            <div className="col-4">
              <AssessmentProgress
                stepCount={stepCount}
                activeQuestion={activeQuestion}
                progress={progress}
                healthHistoryProgress={healthHistoryProgress}
                indepthProgress={indepthProgress}
                activeStep={activeStep}
                setIndepthProgress={setIndepthProgress}
                setProgress={setProgress}
                setHealthHistoryProgress={setHealthHistoryProgress}
                lifeFunctionProgress={lifeFunctionProgress}

              />
            </div>
            <div className="col-8">
              <div className="questions-part">
                {activeQuestion === "screening" && (
                  <ScreeningQuestion
                    setActiveQuestion={setActiveQuestion}
                    setStepCount={setStepCount}
                    setChildQuestions={setChildQuestions}
                    setProgress={setProgress}
                    setScreeningQuestions={setScreeningQuestions}
                  />
                )}
                {activeQuestion === "indepth" && (
                  <IndepthQuestion
                    setActiveQuestion={setActiveQuestion}
                    childQuestions={childQuestions}
                    setIndepthProgress={setIndepthProgress}
                    setActiveStep={setActiveStep}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    answeredQuestions={answeredQuestions}
                    setAnsweredQuestions={setAnsweredQuestions}
                  />
                )}
                {activeQuestion === "health-history" && (
                  <HealthHistoryQuestion
                    setActiveQuestion={setActiveQuestion}
                    setHealthHistoryProgress={setHealthHistoryProgress}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setActiveStep={setActiveStep}
                    childQuestions={childQuestions}
                  />
                )}
                {activeQuestion === "life-function" && (
                  <LifeFunctionQuestion
                    setActiveQuestion={setActiveQuestion}
                    setLifeFunctionProgress = {setLifeFunctionProgress}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Assessment;
