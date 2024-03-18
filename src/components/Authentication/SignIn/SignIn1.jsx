import React, { useState , useEffect} from 'react';
import './SignIn.css';
import { Link , Navigate } from 'react-router-dom';
import FacebookIcon from '../../../assets/icons/facebook-1.png';
import GoogleIcon from '../../../assets/icons/google.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth , googleProvider} from '../../../config/Firebase';
import { signInWithPopup } from 'firebase/auth'
import Assessment from '../../../pages/Assessment/Assessment';


const SignIn = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [signIn , setSignIn] = useState(false);
    const [userValue , setUserValue] = useState("")

    // useEffect(() => {
    //     setUserValue(localStorage.getItem('email...'))
    // })

    const signInUser = () => {
        signInWithEmailAndPassword(
            auth,
            email,
            password,
        )
        .then(() =>{
            alert("successful");
            setSignIn(true);

        })
        .catch((error) => alert(error))
    }
    if (signIn) {
        return <Navigate to="/Assessment" />;
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth , googleProvider )
        .then(()=>{
            setSignIn(true);
        })
        .catch((error) => {
            alert(error)
        })
    }
   
  return (
    <>
    {/* {userValue ? <Assessment/> :  */}
      <div className="Signin-template">
        <div className="Signin-form-outer">
            <div className="Signin-form-body">
                <div className="Signin-form-logo">
                    <img src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg" alt="logo" />
                </div>
                <div className="Signin-form-inner mt-5">
                    <h4>Sign in with your email address</h4>
                    {/* <form action="" className='was-validated'> */}
                        <div>
                            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='Signin-item-input' name="Email Address" title="Please enter a valid Email Address" pattern="^[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'+^_`{}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$" autoFocus="" placeholder="Email Address" aria-label="Email Address" />
                            <div className="invalid-feedback">
                                Please enter valid Email.
                            </div>
                        </div>
                        <div>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='Signin-item-input' name="password" placeholder='Password' />
                        </div>
                        <div className='Forgot-Password-link'>
                            <Link to='/Forgot' style={{color:"#337ab7"}}>Forgot your password?</Link>
                        </div>
                        {/* <Link to='/Assessment'> */}
                            <button className='btn Sign-in-btn' onClick={signInUser}>Sign in</button>
                        {/* </Link> */}
                        <div className='d-flex' style={{marginLeft:"128px" , marginTop:"10px"}}>
                            <p className='me-2'>Don't have an account?</p>
                            <Link to='/SignUp' className='create-acc-link' style={{color:"#337ab7"}}> Sign up now</Link>
                        </div>
                    {/* </form> */}
                    <div className="google-facebook-signin">
                        <div className="row">
                            <div className="col-12">
                                <h5 className='mt-3'>Sign in with your social account</h5>
                            </div>
                            <div className="col-12 Signup-form-icon mt-2">
                                <button className='w-100' onClick={signInWithGoogle}>
                                    <div className="d-flex justify-content-start">
                                        <img src={GoogleIcon} alt="" />
                                        <p className='m-auto' >Google</p>

                                    </div>
                                </button>
                            </div>
                            <div className="col-12 Signup-form-icon mt-2">
                                <button className='w-100'>
                                    <div className='d-flex justify-content-start'>
                                        <img src={FacebookIcon} alt="" className=''/>
                                        <p className='m-auto'>Facebook</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    {/* } */}
    </>
  )
}

export default SignIn


