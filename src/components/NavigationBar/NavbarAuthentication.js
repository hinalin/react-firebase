import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import UserDropdown from "./UserDropdown";
import AssessmentSidebar from "../AssessmentSidebar/AssessmentSidebar";

const NavbarAuthentication = ({
  user,
  handleOpenSignInUpModal,
  name,
  closeSidebarDrawer,
  openSidebarDrawer,
  isSideDrawerOpen,
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
  setSelectedDisorders
}) => {
  return (
    <>
      {isSideDrawerOpen &&(
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
        />
      )}
      {user ? (
        <>
          <li className="nav-item d-flex justify-content-start">
            <Link className="nav-link" to="/Assessment">
              Start Assessment
            </Link>
          </li>
          <li className="nav-item d-flex  justify-content-start">
            <Link className="nav-link" onClick={openSidebarDrawer}>
              Assessment
            </Link>
          </li>
          <li className="nav-item d-flex  justify-content-start">
            <Link className="nav-link">Resources</Link>
          </li>
          <UserDropdown user={user} name={name} />
        </>
      ) : (
        <>
          <li className="nav-item d-flex align-items-center justify-content-end">
            <Link className="nav-link" onClick={handleOpenSignInUpModal}>
              Start Assessment
            </Link>
          </li>
          <li className="nav-item d-flex align-items-center justify-content-end">
            <Link className="nav-link">French</Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <button
              className="btn homeNavBtn"
              onClick={handleOpenSignInUpModal}
            >
              Sign In/Up
            </button>
          </li>
        </>
      )}
    </>
  );
};

export default NavbarAuthentication;
