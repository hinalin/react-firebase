// import { React } from "react";
// import "./NavigationBar.css";
// import { Link } from "react-router-dom";

// function NavigationBar({ handleOpenSignInUpModal }) {
  
//   return (
//     <>
//       <div className="nav navbar navbar-template">
//         <ul className="logo-part">
//           <li className="nav-item d-flex align-item-center header-logo mt-3">
//             <Link to="/">
//               <img
//                 src="	https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
//                 alt="Feeling Better Now"
//                 className="align-item-center img-fluid img-responsive logo f-logo"
//               />
//             </Link>
//           </li>
//         </ul>
//         <ul className="d-flex link-part">
//           <li
//             className="nav-item d-flex align-items-center justify-content-end"
//             tabIndex="0"
//           >
//             <div className="nav-link" onClick={handleOpenSignInUpModal}>Start Assessment</div>
//           </li>
//           <li
//             className="nav-item d-flex align-items-center justify-content-end"
//             tabIndex="0"
//           >
//             <div className="nav-link">French</div>
//           </li>
//           {/* <li classNameName="nav-item d-flex align-items-center justify-content-end" data-toggle="modal" data-target="#assessmentHistoryModal" role="button">Assessments</li>
//                 <li classNameName="nav-item d-flex align-items-center justify-content-end"><a classNameName="nav-link" href="/Education">Resources</a></li> */}
//           <li className="nav-item d-flex align-items-center justify-content-center">
//             <button
//               className="btn homeNavBtn"
//               onClick={handleOpenSignInUpModal}
//             >
//               Sign In/Up
//             </button>
//           </li>
//         </ul>
//       </div>
      
//     </>
//   );
// }

// export default NavigationBar;

import React from "react";
import { Link } from "react-router-dom";
import './NavigationBar.css'
import NavbarAuthentication from "./NavbarAuthentication";


function NavigationBar({user , handleOpenSignInUpModal,closeSidebar,toggleSidebar,isSidebarOpen }) {
    return (
        <>
            <div className="nav navbar homeNav">
                <div className={`header-backdrop ${isSidebarOpen ? 'body-overlay' : ''}`}></div>

                <ul className="logo-part">
                    <li className="nav-item d-flex align-item-center header-logo">
                        <Link to="/">
                            <div className="logo-size">
                                <img src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg" alt="FeelingBetterNow" className="align-item-center, img-fluid img-responsive logo f-logo" />
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className="link-part ms-auto">
                    {/* <li className="nav-item d-flex align-items-center justify-content-end"><Link className="nav-link" onClick={handleOpenSignInUpModal} >Start Assessment</Link></li> */}
                    {/* <li className="nav-item d-flex align-items-center justify-content-end"><Link className="nav-link">French</Link></li> */}
                    {/* <li className="nav-item d-flex align-items-center justify-content-center"><button className="btn homeNavBtn" onClick={handleOpenSignInUpModal}>Sign In/Up</button></li> */}
                    <NavbarAuthentication user={user} handleOpenSignInUpModal={handleOpenSignInUpModal}  />
                </ul>
                {!isSidebarOpen && (
                    <button className="navbar-toggler" type="button" id="open-mobile-menu" onClick={toggleSidebar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                )}

                <div className={`only-show-in-mobile ${isSidebarOpen ? 'sidebar-show' : ''}`}>
                    <div className="nav-header-link">
                        <div className="nav-title custom-sidebarHeader">
                            <div className="logo-part">
                                <img src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg" alt="FeelingBetterNow" className="align-item-center, img-fluid img-responsive logo f-logo" />
                            </div>
                            <div className="mobile-close-icon d-flex justify-content-end" onClick={closeSidebar}>
                                <img src="https://fbn3staging.ca/static/media/mobile-close.482734350e3e8771dd1b2661a4fd6715.svg" alt="close" className="close" />
                            </div>
                        </div>
                    </div>
                    { user ? 
                    <ul>
                    <li className="nav-item d-flex align-items-center"><Link className="nav-link" to='/Assessment'>Start Assessment</Link></li>
                    <li className="nav-item d-flex align-items-center"><Link className="nav-link" to='/'>Assessment</Link></li>
                    <li className="nav-item d-flex align-items-center"><Link className="nav-link" to='/Profile'>Profile</Link></li>
                    <li className="nav-item d-flex align-items-center"><Link className="nav-link">Sign Out</Link></li>
                </ul>
                    
                    :
                    <ul>
                        <li className="nav-item d-flex align-items-center"><Link className="nav-link" onClick={handleOpenSignInUpModal}>Start Assessment</Link></li>
                        <li className="nav-item d-flex align-items-center"><Link className="nav-link">French</Link></li>
                        <li className="nav-item d-flex align-items-center"><Link className="nav-link" onClick={handleOpenSignInUpModal}>SignIn/Up</Link></li>
                    </ul>
                    }
                </div>
            </div>
            
        </>
    );
}

export default NavigationBar;
