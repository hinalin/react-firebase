import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../../components/SignInUpModal/SignInUpModal.css";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { fs } from "../../../config/Firebase";

const TimeupModal = ({ modalIsOpen, setModalIsOpen , assessmentIdRef , userId}) => {

  const navigate = useNavigate();
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleYesClick = async () => {
    closeModal();
    await storeAssessmentStatusToFirestore(userId, assessmentIdRef);
  };

  const handleNoClick = async () => {
    closeModal();
    navigate('/')
    await storeAssessmentStatusToFirestore(userId, assessmentIdRef);

  };

  const storeAssessmentStatusToFirestore = async (userId, assessmentIdRef) => {
    try {
      if (userId) {
        const userDocRef = doc(fs, "users", userId);
        const assessmentDocRef = doc(
          userDocRef,
          "assessment",
          assessmentIdRef.current
        );
  
        await setDoc(
          assessmentDocRef,
          {
            assessmentStatus: true, // Set assessment status to true
          },
          { merge: true }
        );
        console.log("Assessment status stored in Firestore successfully!");
      }
    } catch (error) {
      console.error("Error storing assessment status in Firestore: ", error);
    }
  };
  return (
    <Modal
      ariaHideApp={false}
      className={"mt-5 w-full bg-white lg:w-[600px]"}
      onRequestClose={closeModal}
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 10000,
        },
        content: {
          backgroundColor: " rgba(255, 255, 255)",
          outline: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
          padding: 0,
        },
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <img
              src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
              alt=""
            />
          </div>
          <div className="modal-body">
            <p
              className="ps-5 text-danger"
              style={{
                fontWeight: "700",
                fontFamily: "CircularStdBook, sans-serif",
              }}
            >
              Oopss!!
            </p>
            <div className="Checkbox ps-5">
              Your Session is Expired 
              want to go with new session
            </div>
          </div>
          <div className="d-flex ps-5">
            <button
              type="button"
              className="homeNavBtn me-2 ms-3"
              onClick={handleYesClick}
              style={{ padding: "10px 15px", border: "none", width: "100px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="homeNavBtn"
              onClick={handleNoClick}
              style={{
                cursor: "pointer",
                padding: "10px 15px",
                border: "none",
                width: "100px",
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimeupModal;



// import { useNavigate } from "react-router-dom";

// const TimeupModal = ({ modalIsOpen, setModalIsOpen, assessmentIdRef, userId }) => {
//   const navigate = useNavigate();

//   const handleYesClick = async () => {
//     closeModal();
//     // Redirect to assessment questions page
//     navigate('/assessment');

//     // Store new assessment start time and screening answers
//     await storeNewAssessmentData();
//   };

//   const storeNewAssessmentData = async () => {
//     // Store new assessment start time
//     const startTime = new Date().toISOString();
//     localStorage.setItem(`startTime_${userId}`, startTime);

//     // Store new assessment start time in Firestore
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         const assessmentDocRef = doc(userDocRef, "assessment", assessmentIdRef.current);

//         await setDoc(
//           assessmentDocRef,
//           {
//             startTime: startTime,
//           },
//           { merge: true }
//         );
//         console.log("New assessment start time stored in Firestore successfully!");
//       }
//     } catch (error) {
//       console.error("Error storing new assessment start time in Firestore: ", error);
//     }

//     // Store screening answers for the new assessment
//     try {
//       if (userId) {
//         const userDocRef = doc(fs, "users", userId);
//         const assessmentDocRef = doc(userDocRef, "assessment", assessmentIdRef.current);
//         const answersRef = collection(assessmentDocRef, "answers_screenings");

//         // Assuming you have the screening answers stored in state
//         Object.entries(answers).forEach(async ([questionId, answer]) => {
//           const answerDocRef = doc(answersRef, questionId.toString());
//           await setDoc(answerDocRef, {
//             questionId: questionId,
//             answer: answer,
//             buttonState: answer === "YES" ? true : false,
//             type: "screening",
//           });
//         });

//         console.log("Screening answers for the new assessment stored in Firestore successfully!");
//       }
//     } catch (error) {
//       console.error("Error storing screening answers for the new assessment in Firestore: ", error);
//     }
//   };

//   return (
//     // Modal JSX remains the same
//   );
// };

// export default TimeupModal;
