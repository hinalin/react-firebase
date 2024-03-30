import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../../../assets/icons/back-arrow.png";
import "./SignUp.css";
import "react-phone-number-input/style.css";
import { useFirebase } from "../../../context/FirebaseContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { fs } from "../../../config/Firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

const SignUpwithNumber = () => {
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState("");

  const { setUpRecaptcha } = useFirebase();
  const navigate = useNavigate();

  const getSignUpOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (phoneNumber === "") {
      setError("Please Enter a Valid  Phone Number");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    try {
      const response = await setUpRecaptcha(phoneNumber);
      console.log(response, "response...");
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    setTimeout(() => {
      setError("");
    }, 2000);
    console.log(phoneNumber);
  };
  const verifySignUpOtp = async (e) => {
    e.preventDefault();
    if (otp === "") return;
    try {
      setError("");
      const result = await confirmObj.confirm(otp);
      if (result.user) {
        const { uid } = result.user;
        const userDocRef = doc(fs, "users", uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          console.log("User exists in Firestore. Logging in...");
        } else {
          console.log(
            "User does not exist in Firestore. Creating a new document..."
          );
          await setDoc(userDocRef, {
            name: name,
            phoneNumber: phoneNumber,
          });
        }

        setName(name);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  console.log("Name:", name);
  return (
    <>
      <div className="Signup-template">
        <div className="Signup-form-outer">
          <div className="Signup-form-body">
            <div className="back-to-signin">
              <Link to="/SignUp" style={{ textDecoration: "none" }}>
                <img src={BackArrow} alt="" />
                <span>Cancel</span>
              </Link>
            </div>
            <div className="Signup-form-logo">
              <img
                src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
                alt="logo"
              />
            </div>

            <div className="Signup-form-inner mt-5">
              {error && <p className="text-danger"> {error} </p>}
              <form style={{ display: !flag ? "block" : "none" }}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <PhoneInput
                    defaultCountry={"PH"}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </div>

                <div id="recaptcha-container" className="mt-3 ms-5" />

                <div className="Signup-sent-verificationcode-btn">
                  <button onClick={getSignUpOtp}>Send verification code</button>
                </div>
              </form>

              <form style={{ display: flag ? "block" : "none" }}>
                <div className="mt-3 Signup-verifictioncode">
                  <div className="Signup-verificationcode-input">
                    <label htmlFor="verificationcode">Verification Code</label>
                    <input
                      type="tel"
                      maxLength="6"
                      id="verificationcode"
                      className="Signup-item-input"
                      name="verificationcode"
                      placeholder="Verification code"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 Signup-verifictioncode-btns">
                    <button className="me-1" onClick={verifySignUpOtp}>
                      Verify code
                    </button>
                    <button onClick={getSignUpOtp}>Send new code</button>
                  </div>
                </div>
              </form>

              <div className="mt-3 Signup-create-password-btn">
                <button type="submit">create user</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpwithNumber;
