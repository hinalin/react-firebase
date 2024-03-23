import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import UserDropdown from "./UserDropdown";

const NavbarAuthentication = ({ user, handleOpenSignInUpModal , name }) => {
  return (
    <>
      {user ? (
        <>
          <li className="nav-item d-flex justify-content-start">
            <Link className="nav-link" to="/Assessment">
              Start Assessment
            </Link>
          </li>
          <li className="nav-item d-flex  justify-content-start">
            <Link className="nav-link">Assessment</Link>
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
