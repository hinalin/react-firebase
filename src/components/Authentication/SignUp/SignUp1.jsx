import { React, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import BackArrow from "../../../assets/icons/back-arrow.png";
import { createUserWithEmailAndPassword , RecaptchaVerifier} from 'firebase/auth';
import { auth } from '../../../config/Firebase';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';


const SignUp = () => {
  // const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [phoneNumber , setPhoneNumber] = useState("");

  const handleSendVerification = (e) => {
    if (phoneNumber.trim() !== "") {
      setShowVerification(true);
      e.preventDefault()
      console.log('Number...' , phoneNumber)
    } else {
      alert("please enter your phonenumber");
    }
  };

  const createUser = () => {
    createUserWithEmailAndPassword(
      auth,
      // email,
      password,
    ).then(value => {
      alert("User created successfully.");
      // setEmail("");
      setPassword("");
      setConfirmPassword("");
    }).catch(error => {
      alert("Error creating user. Please try again later.");
    });
  }
  const sendSignUpOtp = () => {
    const recaptcha = new RecaptchaVerifier(auth , 'recaptcha' , {})
    // const 
  }
  return (
    <>
      <div className="Signup-template">
        <div className="Signup-form-outer">
          <div className="Signup-form-body">
            <div className="back-to-signin">
              <Link to="/SignIn" style={{ textDecoration: "none" }}>
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

            {showVerification && phoneNumber.trim() !== "" ? (
              <p className="mt-3">
                Verification code has been sent to your inbox. Please copy it to
                the input box below.
              </p>
            ) : null}

            <div className="Signup-form-inner mt-5">
              {/* <form action=""> */}
                <div>
                  <label htmlFor="email">Phone Number</label>
                  {/* <input
                    type="email"
                    id="email"
                    className="Signup-item-input"
                    name="Email Address"
                    title="Please enter a valid Email Address"
                    pattern="^[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$"
                    autofocus=""
                    placeholder="Email Address"
                    aria-label="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  /> */}
                  <PhoneInput
                    defaultCountry={"PH"}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={()=>setPhoneNumber('+' + phoneNumber)}
                  />

                  {/* <input type="password" name="" id="" /> */}
                  
                </div>

                {!showVerification && (
                  <div className="Signup-sent-verificationcode-btn">
                    <button onClick={handleSendVerification}>
                      Send verification code
                    </button>
                  </div>
                )}

                {showVerification && phoneNumber.trim() !== "" ? (
                  <div className="mt-3 Signup-verifictioncode">
                    <div className="Signup-verificationcode-input">
                      <label htmlFor="verificationcode">
                        Verification Code
                      </label>
                      <input
                        type="tel"
                        maxLength="6"
                        id="verificationcode"
                        className="Signup-item-input"
                        name="verificationcode"
                        placeholder="Verification code"
                      />
                    </div>
                    <div className="mt-3 Signup-verifictioncode-btns">
                      <button className="me-1">Verify code</button>
                      <button>Send new code</button>
                    </div>
                  </div>
                ) : null}

                    <div className="Signup-create-password mt-3">
                        <div>
                            <label htmlFor="create-password">New Password</label>
                            <input type="password" name="password" id="password" placeholder="New Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="create-password">Confirm New Password</label>
                            <input type="password" name="confirmpassword" id="confirmpassword" placeholder="Confirm New Password"  value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="mt-3 Signup-create-password-btn">
                        <Link to='/Assessment'>
                          <button onClick={createUser}> create user </button>
                        </Link>
                        </div>
                    </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

// import { React, useState } from "react";
// import "./SignUp.css";
// import { Link } from "react-router-dom";
// import BackArrow from "../../../assets/icons/back-arrow.png";
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
// import { auth } from '../../../config/firebase/firebase';

// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [password , setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState(null);

//   const handleSendVerification = async () => {
//     if (email.trim() !== "") {
//       try {
//         await sendEmailVerification(auth.currentUser);
//         setOtpSent(true);
//       } catch (error) {
//         setError(error.message);
//       }
//     } else {
//       setError("Please enter your email address.");
//     }
//   };

//   const createUser = async () => {
//     if (password !== confirmPassword) {
//       setError("Passwords do not match. Please confirm your password.");
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       alert("User created successfully. Please verify your email address.");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       setOtp("");
//       setOtpSent(false);
//     } catch (error) {
//       setError(error.message);
//     }
//   }

//   const handleVerifyOtp = async () => {
//     try {
//       await auth.currentUser.reload();
//       if (auth.currentUser.emailVerified) {
//         alert("Email verified successfully. You can now proceed with sign up.");
//         createUser();
//       } else {
//         setError("Invalid OTP. Please enter the correct OTP.");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <div className="Signup-template">
//         <div className="Signup-form-outer">
//           <div className="Signup-form-body">
//             <div className="back-to-signin">
//               <Link to="/SignIn" style={{ textDecoration: "none" }}>
//                 <img src={BackArrow} alt="" />
//                 <span>Cancel</span>
//               </Link>
//             </div>
//             <div className="Signup-form-logo">
//               <img
//                 src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
//                 alt="logo"
//               />
//             </div>

//             {otpSent && email.trim() !== "" ? (
//               <p className="mt-3">
//                 OTP has been sent to your email. Please check your inbox and enter the OTP below.
//               </p>
//             ) : null}

//             {error && <p className="error-message">{error}</p>}

//             <div className="Signup-form-inner mt-5">
//               <div>
//                 <label htmlFor="email">Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="Signup-item-input"
//                   name="Email Address"
//                   title="Please enter a valid Email Address"
//                   pattern="^[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$"
//                   autoFocus=""
//                   placeholder="Email Address"
//                   aria-label="Email Address"
//                   onChange={(e) => setEmail(e.target.value)}
//                   value={email}
//                 />
//               </div>

//               {!otpSent && (
//                 <div className="Signup-sent-otp-btn">
//                   <button onClick={handleSendVerification}>
//                     Send OTP
//                   </button>
//                 </div>
//               )}

//               {otpSent && email.trim() !== "" ? (
//                 <div className="mt-3 Signup-otp">
//                   <div className="Signup-otp-input">
//                     <label htmlFor="otp">Enter OTP</label>
//                     <input
//                       type="text"
//                       id="otp"
//                       className="Signup-item-input"
//                       name="otp"
//                       placeholder="Enter OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-3 Signup-otp-btns">
//                     <button className="me-1" onClick={handleVerifyOtp}>Verify OTP</button>
//                     <button onClick={handleSendVerification}>Resend OTP</button>
//                   </div>
//                 </div>
//               ) : null}

//               <div className="Signup-create-password mt-3">
//                 <div>
//                   <label htmlFor="create-password">New Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="New Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="mt-2">
//                   <label htmlFor="confirm-password">Confirm New Password</label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     placeholder="Confirm New Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="mt-3 Signup-create-password-btn">
//                   <button onClick={createUser}>Create User</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;
