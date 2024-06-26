import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import NavbarAuthentication from "./NavbarAuthentication";
import AssessmentSidebar from "../AssessmentSidebar/AssessmentSidebar";
import { useFirebase } from "../../context/FirebaseContext";

function NavigationBar({
  user,
  handleOpenSignInUpModal,
  assessmentIdRef,
  remainingTime,
  setRemainingTime,
  assessmentStatus,
  setAssessmentStatus,
  filteredQuestions,
  setFilteredQuestions,
  answers,
  selectedQuestions,
  setSelectedQuestions,
  fetchStartTime,
  selectedDisorders,
  setSelectedDisorders,
  screeningQuestions,
  allNo
}) {
  const {isSidebarOpen , setSidebarOpen } = useFirebase()
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const openSidebarDrawer = () => {
    setIsSideDrawerOpen(true);
  };

  const closeSidebarDrawer = () => {
    setIsSideDrawerOpen(false);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      {isSideDrawerOpen && (
        <AssessmentSidebar
          isSideDrawerOpen={isSideDrawerOpen}
          closeSidebarDrawer={closeSidebarDrawer}
          assessmentIdRef={assessmentIdRef}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          assessmentStatus={assessmentStatus}
          setAssessmentStatus={setAssessmentStatus}
          filteredQuestions={filteredQuestions}
          setFilteredQuestions={setFilteredQuestions}
          answers={answers}
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
          fetchStartTime={fetchStartTime}
          selectedDisorders={selectedDisorders}
          setSelectedDisorders={setSelectedDisorders}
          screeningQuestions={screeningQuestions}
          allNo={allNo}
        />
      )}
      <div className="nav navbar homeNav">
        <div
          className={`header-backdrop ${isSidebarOpen ? "body-overlay" : ""}`}
        ></div>

        <ul className="logo-part">
          <li className="nav-item d-flex align-item-center header-logo">
            <Link to="/">
              <div className="logo-size">
                <img
                  src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
                  alt="FeelingBetterNow"
                  className="align-item-center, img-fluid img-responsive logo f-logo"
                />
              </div>
            </Link>
          </li>
        </ul>
        <ul className="link-part ms-auto">
          <NavbarAuthentication
            user={user}
            handleOpenSignInUpModal={handleOpenSignInUpModal}
            openSidebarDrawer={openSidebarDrawer}
            closeSidebarDrawer={closeSidebarDrawer}
            isSideDrawerOpen={isSideDrawerOpen}
            assessmentIdRef={assessmentIdRef}
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
            assessmentStatus={assessmentStatus}
            setAssessmentStatus={setAssessmentStatus}
            filteredQuestions={filteredQuestions}
            setFilteredQuestions={setFilteredQuestions}
            answers={answers}
            selectedQuestions={selectedQuestions}
            setSelectedQuestions={setSelectedQuestions}
            fetchStartTime={fetchStartTime}
            selectedDisorders={selectedDisorders}
            setSelectedDisorders={setSelectedDisorders}
            screeningQuestions={screeningQuestions}
            allNo={allNo}
          />
        </ul>
        {!isSidebarOpen && (
          <button
            className="navbar-toggler"
            type="button"
            id="open-mobile-menu"
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        <div
          className={`only-show-in-mobile ${
            isSidebarOpen ? "sidebar-show" : ""
          }`}
        >
          <div className="nav-header-link">
            <div className="nav-title custom-sidebarHeader">
              <div className="logo-part">
                <img
                  src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
                  alt="FeelingBetterNow"
                  className="align-item-center, img-fluid img-responsive logo f-logo"
                />
              </div>
              <div
                className="mobile-close-icon d-flex justify-content-end"
                onClick={closeSidebar}
              >
                <img
                  src="https://fbn3staging.ca/static/media/mobile-close.482734350e3e8771dd1b2661a4fd6715.svg"
                  alt="close"
                  className="close"
                />
              </div>
            </div>
          </div>
          {user ? (
            <ul>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/Assessment">
                  Start Assessment
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" onClick={openSidebarDrawer}>
                  Assessment
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" to="/Profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link">Sign Out</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" onClick={handleOpenSignInUpModal}>
                  Start Assessment
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link">French</Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link" onClick={handleOpenSignInUpModal}>
                  SignIn/Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
