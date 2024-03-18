import { React, useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from "../../../assets/icons/facebook-1.png";
import GoogleIcon from "../../../assets/icons/google.png";
import { useFirebase } from "../../../context/FirebaseContext";
import PhoneIcon from '../../../assets/icons/phone.png';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signInUser , googleSignInUser } = useFirebase();
  const navigate = useNavigate();

  const handleSignInUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInUser(email, password);
      navigate("/");
    } catch (err) {
        if (err.code === "auth/invalid-credential") {
            setError("User not found. Please check your email and password or sign up if you don't have an account.");
          } else {
            setError(err.message);
          }
    }
    setTimeout(() => { 
      setError("");
    }, 3000);
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try{
        await googleSignInUser();
        navigate('/')
    }
    catch(err){
        setError(err.message)
    }
  }

  return (
    <>
      <div className="Signin-template">
        <div className="Signin-form-outer">
          <div className="Signin-form-body">
            <div className="Signin-form-logo">
              <img
                src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg"
                alt="logo"
              />
            </div>
            <div className="Signin-form-inner mt-5">
              <h4>Sign in with your email address</h4>
              {error && <p className="text-danger mb-0 pb-0"> {error} </p>}

              <form>
                <div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      className="Signin-item-input"
                      name="Email Address"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      id="password"
                      className="Signin-item-input"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div className="Forgot-Password-link">
                    <Link to="/ForgotPassword" style={{ color: "#337ab7" }}>
                      Forgot your password?
                    </Link>
                  </div>
                  <button
                    className="btn Sign-in-btn"
                    onClick={handleSignInUser}
                  >
                    Sign in
                  </button>
                  <div
                    className="d-flex"
                    style={{ marginLeft: "128px", marginTop: "10px" }}
                  >
                    <p className="me-2">Don't have an account?</p>
                    <Link
                      to="/SignUp"
                      className="create-acc-link"
                      style={{ color: "#337ab7" }}
                    >
                      {" "}
                      Sign up now
                    </Link>
                  </div>
                </div>
              </form>
              <div className="google-facebook-signin">
                <div className="row">
                  <div className="col-12">
                    <h5 className="mt-3">Sign in with your social account</h5>
                  </div>
                  <div className="col-12 Signup-form-icon mt-2">
                    <button className="w-100" onClick={handleGoogleSignIn}>
                      <div className="d-flex justify-content-start">
                        <img src={GoogleIcon} alt="" />
                        <p className="m-auto">Google</p>
                      </div>
                    </button>
                  </div>
                  <div className="col-12 Signup-form-icon mt-2">
                    <button className="w-100">
                      <div className="d-flex justify-content-start">
                        <img src={FacebookIcon} alt="" className="" />
                        <p className="m-auto">Facebook</p>
                      </div>
                    </button>
                  </div>
                  <div className="signUpwithNumber">
                    <Link to='/SignUpwithNumber'>
                    <button className="p-2 mt-3 w-100">
                        <div className="d-flex justify-content-start">
                        <img src={PhoneIcon} alt="" className="" />
                        <p className="m-auto">Sign In with Number</p>
                        </div>
                    </button>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
