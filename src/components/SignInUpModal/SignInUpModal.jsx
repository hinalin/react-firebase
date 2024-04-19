import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import './SignInUpModal.css';

const SignInUpModal = ({ setForModal, forModal }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const openModal = () => {
    setIsOpen(true);
    setForModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    setForModal(false);
    document.body.style.overflow = "unset";
  };
  useEffect(() => {
    if (forModal) {
      openModal();
      setIsChecked(false);
    }
    if (!forModal) {
      closeModal();
    }
  }, [forModal]);
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
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <p className="ps-5" style={{fontWeight:"700" ,color:"rgb(80, 80, 80)" , fontFamily: "CircularStdBook, sans-serif"}}>
              FeelingBetterNow requires all new and returning users to sign up
              or sign in using a valid email address.
            </p>
            <div className="Checkbox ps-5">
              <input
                type="checkbox"
                className="me-2"
                onChange={handleCheckboxChange}
              />
              Please accept our{" "}
              <Link
                to="/TermsOfServices"
                style={{ color: "#33ca8e", textDecoration: "none" }}
                onClick={closeModal}
              >
                Terms of Service{" "}
              </Link>
              and{" "}
              <Link
                to="/PrivacyPolicy"
                style={{ color: "#33ca8e", textDecoration: "none" }}
                onClick={closeModal}
              >
                Privacy Policy{" "}
              </Link>
              by clicking on this checkbox.
            </div>
          </div>
          <div className="mt-2 mb-2 m-auto">
            <Link to="/SignIn">
              <button
                type="button"
                data-bs-dismiss="modal"
                // className="btn btn-danger"
                className={`homeNavBtn ${isChecked ? "" : "disabled"}`}
                disabled={!isChecked}
                style={{ cursor: isChecked ? "pointer" : "not-allowed" , padding: "10px 15px", border: "none"}}
              >
                SIGNIN/UP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignInUpModal;
