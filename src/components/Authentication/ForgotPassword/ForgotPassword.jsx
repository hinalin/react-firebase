import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import BackArrow from "../../../assets/icons/back-arrow.png";
import { useFirebase } from "../../../context/FirebaseContext";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const { resetUserPassword , loading , setLoading } = useFirebase();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage('');
    try {
      setLoading(true);
      await resetUserPassword(email);
      setEmail('');
      setSuccessMessage("Password reset email sent successfully.");
    }
    catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Email not registered. Please enter a registered email address.");
      } else {
        setError(err.message);
      }
    }
    finally{
      setLoading(false);
    }
    setTimeout(() => { 
      setError("");
      setSuccessMessage('');
    }, 3000);

  };
  return (
    <>
      <div className="Forgot-Password-template">
        <div className="forgot-password-card">
          <div className="forgot-password-body">
            <div className="back-to-signin">
              <Link to="/SignIn" style={{ textDecoration: "none" }}>
                <img src={BackArrow} alt="" />
                <span>Cancel</span>
              </Link>
            </div>
            <div className="forgot-password-logo mt-3">
              <img
                src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
                alt="logo"
              />
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
            {successMessage && <p className="text-success mt-3">{successMessage}</p>}

            <form action="">
              <div className="mt-5">
                <label htmlFor="">Enter Email</label>
                <input
                  type="email"
                  id="email"
                  className="forgot-password-input"
                  name="Email Address"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <button className="btn reset-password-btn mt-3" onClick={handleResetPassword} disabled={loading}>Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
