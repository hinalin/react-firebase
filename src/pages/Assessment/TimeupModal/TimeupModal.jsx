import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../../components/SignInUpModal/SignInUpModal.css";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { fs } from "../../../config/Firebase";
import { v4 as uuidv4 } from 'uuid';


const TimeupModal = ({ modalIsOpen, setModalIsOpen , assessmentIdRef , userId}) => {

  const navigate = useNavigate()

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleYesClick = async () => {
    // 1. Update the assessment status to "Incomplete" for the current assessment
    try {
      const userDocRef = doc(fs, "users", userId);
      const assessmentDocRef = doc(
        userDocRef,
        "assessment",
        assessmentIdRef.current
      );
      await setDoc(
        assessmentDocRef,
        {
          assessmentStatus: "Incomplete", // Set the status to Incomplete
        },
        { merge: true }
      );
      console.log("Assessment status updated to Incomplete!");
    } catch (error) {
      console.error("Error updating assessment status: ", error);
    }
  
    // 2. Generate a new assessment ID
    const newAssessmentId = uuidv4();
  
    // 3. Store the new assessment ID in assessmentIdRef
    assessmentIdRef.current = newAssessmentId;
  
    // 4. Store the new assessment ID in local storage
    localStorage.setItem("assessmentId", newAssessmentId);
  
    // 5. Redirect the user to the assessment page
    navigate("/");
  
    // Close the modal
    closeModal();
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TimeupModal;