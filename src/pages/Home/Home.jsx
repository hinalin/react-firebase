import React, { useState } from "react";
import "./Home.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import SignInUpModal from "../../components/SignInUpModal/SignInUpModal";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
function Home({ assessmentIdRef , remainingTime , setRemainingTime , filteredQuestions , setFilteredQuestions , assessmentStatus , setAssessmentStatus , answers , setAnswers }) {
  const [isShowSignInUpModal, setIsShowSignInUpModal] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useFirebase();

  const handleOpenSignInUpModal = () => {
    setIsShowSignInUpModal(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <div className="home">
        <div className="home-banner-section">
          <div className="container">
            <NavigationBar
              user={user}
              handleOpenSignInUpModal={handleOpenSignInUpModal}
              toggleSidebar={toggleSidebar}
              closeSidebar={closeSidebar}
              isSidebarOpen={isSidebarOpen}
              assessmentIdRef={assessmentIdRef}
              remainingTime={remainingTime}
              setRemainingTime={setRemainingTime}
              assessmentStatus={assessmentStatus}
              setAssessmentStatus={setAssessmentStatus}
              filteredQuestions={filteredQuestions}
              setFilteredQuestions={setFilteredQuestions}
              answers={answers}
              setAnswers={setAnswers}
            />
            <div
              className={`fbn-intro ${isSidebarOpen ? "position-back" : ""}`}
            >
              <p className="home-heading">
                <span>
                  FeelingBetterNow® helps you understand your mental health and
                  then take action
                </span>
              </p>
              <ul className="home-page-list mt-5">
                <li>Complete an online mental health risk assessment.</li>
                <li>
                  Easy-to-use assessment is the gold standard in mental health.
                </li>
                <li>View results instantly.</li>
                <li>Privacy, confidentiality, and anonymity maintained.</li>
                <li>
                  Take action using self-care plans and mental health resources.
                </li>
                <li>Return as often as you wish.</li>
              </ul>
              {user ? (
                <Link to="/Assessment">
                  <button className="btn homeButtons">
                    START MY ASSESSMENT NOW
                  </button>
                </Link>
              ) : (
                <button
                  className="btn homeButtons"
                  onClick={handleOpenSignInUpModal}
                >
                  START MY ASSESSMENT NOW
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={`work-section ${isSidebarOpen ? "position-back" : ""}`}>
          <div className="container">
            <div className="title-top-section">
              <h2 className="homeHeadline text-center">
                Why is it important to consider <span>FeelingBetterNow®</span>{" "}
                to understand my mental health?
              </h2>
            </div>
            <div className="work-two-block text-center">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="fbn-about-us">
                    <div className="title-center">
                      <h3>Dr. Sagar Parikh</h3>
                    </div>
                    <p className="homeText">
                      FeelingBetterNow® Medical Director and Professor of
                      Psychiatry, University of Michigan, explains how
                      FeelingBetterNow® is used to help you understand your
                      current mental health and how to take action.
                    </p>
                    {/* <Link to="/SignIn">
                        <button
                          className="btn homeButtons work-home-button"
                          onClick={handleOpenSignInUpModal}
                        >
                          START MY ASSESSMENT NOW
                        </button>
                      </Link> */}
                    {user ? (
                      <Link to="/Assessment">
                        <button className="btn homeButtons work-home-button">
                          START MY ASSESSMENT NOW
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="btn homeButtons work-home-button"
                        onClick={handleOpenSignInUpModal}
                      >
                        START MY ASSESSMENT NOW
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="fbn-video">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/7_JitqfKsIY"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Home-Footer-section">
          <Footer />
        </div>
      </div>
      <SignInUpModal
        forModal={isShowSignInUpModal}
        setForModal={setIsShowSignInUpModal}
      />
    </>
  );
}
export default Home;
