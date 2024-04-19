import { React, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import BackArrow from "../../../assets/icons/back-arrow.png";
import "./SignUp.css";
import "react-phone-number-input/style.css";
import { useFirebase } from "../../../context/FirebaseContext";
import PhoneIcon from '../../../assets/icons/phone.png';

const SignUp = () => {
  const [ email , setEmail ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ confirmPassword , setConfirmPassword ] = useState("");
  const [ error , setError ] = useState('');


  const { signUpUser  , loading , setLoading } = useFirebase();
  const navigate = useNavigate();

  const handleSignUpUser = async (e) => {
    e.preventDefault();
    setError("");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!email || !password) {
      setError("Please enter both email and password.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must have at least 6 characters, one uppercase letter, one lowercase letter, one digit, and one special character.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    try {
      setLoading(true);
      const res = await signUpUser( email, password , confirmPassword );
      navigate('/')
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered, please go with SignIn");
      }
      else{
      setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    finally{
      setLoading(false);
    }
  };
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

            <div className="Signup-form-inner mt-5">
            {error && <p className="text-danger"> { error } </p>}
              <form >
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="Signup-item-input"
                    name="Email Address"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="create-password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="create-password">Confirm Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3 Signup-create-password-btn">
                  <button type="submit" onClick={handleSignUpUser} disabled={loading}> create user </button>
                </div>
              </form>

              <div className="signUpwithNumber">
                <Link to='/SignUpwithNumber'>
                  <button className="p-2 mt-3 w-100">
                    <div className="d-flex justify-content-start">
                      <img src={PhoneIcon} alt="" className="" />
                      <p className="m-auto">Sign Up with Number</p>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

