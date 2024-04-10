import React, { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import "./Drawer.css";
import CongratsVideo from '../../assets/gif/con1.mp4'

function CongratulationDrawer({toggleDrawer, drawerOpen}) {
    const [showVideo, setShowVideo] = useState(true);

    useEffect(() => {
        if (drawerOpen) {
            setTimeout(() => {
                setShowVideo(false);
            }, 4000); 
        }
    }, [drawerOpen]);
    return (
        <>
            <div className={`tab-part ${drawerOpen ? 'open' : ''}`}>
                <button className="nav-item" onClick={toggleDrawer}><span className="nav-link">Need Help?</span></button>
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer}
                className="drawer"
            >
                <div>
                    <div className="drawer-container">
                    {showVideo && (
                            <video autoPlay loop muted className="drawer-video">
                                <source src={CongratsVideo} type="video/mp4" />
                                {/* Include additional source elements for different video formats if needed */}
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {/* White background */}
                        <div className="drawer-content">
                            <div className="row">
                                <div className="col-lg-7 col-md-12 col-sm-12">
                                    <div className="drawer-left-part">
                                        <div className="drawer-img">
                                            <img
                                                src="https://fbn3staging.ca/static/media/success.1487509d02797662142f.png"
                                                alt="trophy-img"
                                            />
                                        </div>
                                        <div className="congratulations-text">
                                            <h2>Congratulations</h2>
                                            <p>
                                                You've completed your Mental Health Assessment. Now follow
                                                these easy steps.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 col-sm-12">
                                    <div className="drawer-right-part">
                                        <button className="close-btn" onClick={toggleDrawer}>
                                            <img src="https://fbn3staging.ca/static/media/close.e8a75041941d2b22d1033421572a2ffe.svg" alt="close" />
                                        </button>
                                        <div className="steps">
                                            <div className="step">
                                                <div className="count">
                                                    <span>1</span>
                                                </div>
                                                <p>VIEW MY ASSESSMENT RESULTS</p>
                                            </div>
                                            <div className="step">
                                                <div className="count">
                                                    <span>2</span>
                                                </div>
                                                <p>VIEW MY ACTION PLAN SUMMARY</p>
                                            </div>
                                            <div className="step">
                                                <div className="count">
                                                    <span>3</span>
                                                </div>
                                                <p>DOWNLOAD AND SHARE MY ACTION PLAN</p>
                                            </div>
                                            <div className="step">
                                                <div className="count">
                                                    <span>4</span>
                                                </div>
                                                <p>ACCESS SUPPORT RESOURCES</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
            </div>
        </>
    );
}

export default CongratulationDrawer;
