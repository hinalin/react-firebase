import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import ResultPart from "./ResultPart";
import TopicsPart from "./TopicsPart";
import "./Summary.css";
import Drawer from "../../components/drawer/Drawer";
import { useFirebase } from "../../context/FirebaseContext";

function Summary({ isSidebarOpen, setSidebarOpen }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user } = useFirebase();

  useEffect(() => {
    setDrawerOpen(true);
  }, []);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <div className="summary-section">
        <div className="navigationbar container">
          <NavigationBar
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={user}
          />
        </div>
        <div className="summary-card">
          <div className="summary-container">
            <div className="summary-heading">
              <h4>Assessment Outcomes</h4>
            </div>
          </div>
          <ResultPart />
          <div className="risk-accordion-part">
            <div className="accordion summary-accordion" id="accordionRisk1">
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsRisk1-headingOne">
                  <button
                    className="accordion-button summary-accordion-header"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsRisk1-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsRisk1-collapseOne"
                  >
                    <span>Depression</span>
                    
                    <div className="d-flex">
                      <div className="dot"></div>
                      <p>Low Risk</p>
                    </div>
                  </button>
                </h2>
                <div
                  id="panelsRisk1-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsRisk1-headingOne"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TopicsPart />
        </div>
        <Footer />
      </div>
      <Drawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
      />
    </>
  );
}

export default Summary;
