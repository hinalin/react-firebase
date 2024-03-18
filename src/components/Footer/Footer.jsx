// import { Link } from 'react-router-dom'
// import './Footer.css'
// import FacebookIcon from '../../assets/icons/facebook.png'
// import twitterIcon from '../../assets/icons/twitter.png'
// import linkedinIcon from '../../assets/icons/linkedin.png'
// import instagramIcon from '../../assets/icons/instagram.png'
// import phone from '../../assets/icons/call.png'
// import mail from '../../assets/icons/mail.png'
// function Footer() {
//     return (
//         <div className="footer-section">
//             <div className="container">
//                 <div className="footer-block">
//                     <div className="block">
//                         <div className="footer-logo">
//                             <img src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg" alt="" className="align-item-center" />
//                         </div>
//                         <div>
//                             <ul className="social-icon">
//                                 <li className="facebook footer-social-icon"><Link to="https://www.facebook.com/Feeling-Better-Now-104118241297424/"><img src={FacebookIcon} alt='facebook'/></Link></li>
//                                 <li className="twitter footer-social-icon"><Link to="https://twitter.com/mentalhealthfbn?lang=en"><img src={twitterIcon} alt='twitter'/></Link></li>
//                                 <li className="linkedin footer-social-icon"><Link to="https://www.linkedin.com/company/feelingbetternow"><img src={linkedinIcon} alt='Linkedin'/></Link></li>
//                                 <li className="instagram footer-social-icon"><Link to="https://www.instagram.com/instafeelingbetternow/"><img src={instagramIcon} alt='instagram'/></Link></li>
//                             </ul>
//                             <div className="copyright">Copyright © 2022 FeelingBetterNow®.</div>
//                         </div>
//                     </div>
//                     <div className="block">
//                         <ul className='footer-ul'>
//                             <h2>Contact Info</h2>
//                             <ul>
//                                 <li className='phone'>
//                                     <img src={phone} alt='phone'/>
//                                     <Link to="tel:416 928 9195"><span>416 928 9195 </span></Link>
//                                 </li>
//                                 <li className='mail'>
//                                     <img src={mail} alt='mail'/>
//                                     <Link to="mailto:info@feelingbetternow.com"><span>info@feelingbetternow.com</span></Link>
//                                 </li>
//                             </ul>
//                         </ul>
//                     </div>
//                     <div className="block">
//                         <ul className='footer-ul'>
//                             <h2>Account</h2>
//                             <ul>
//                                 <li><Link to="/"><span>Forget password</span></Link></li>
//                                 <li><Link to="mailto:help@mensante.com"><span>Help</span></Link></li>
//                             </ul>
//                         </ul>
//                     </div>
//                     <div className="block">
//                         <ul className='footer-ul'>
//                             <h2>Legal</h2>
//                             <ul>
//                                 <li><Link to="/"><span>Privacy Policy</span></Link></li>
//                                 <li><Link to="/"><span>Terms of use</span></Link></li>
//                                 <li><Link to="/"><span>Site Map</span></Link></li>
//                             </ul>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Footer;

import { Link } from 'react-router-dom'
import './Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import phone from '../../assets/icons/call.png'
import mail from '../../assets/icons/mail.png'
function Footer() {
    return (
        <div className="footer-section">
            <div className="container">
                <div className="footer-block">
                    <div className='row'>
                        <div className='col-lg-4 col-md-12 col-sm-12'>
                            <div className="block">
                                <div className="footer-logo">
                                    <img src="https://fbn3staging.ca/static/media/FeelingBetterNowLogo.06eefb0dfb8031f27df7843dd37e1e1b.svg" alt="" className="align-item-center" />
                                </div>
                                <div>
                                    <ul className="social-icon">
                                        <li className="facebook footer-social-icon"><Link to="https://www.facebook.com/Feeling-Better-Now-104118241297424/"><div className="icon"><FaFacebookF /></div></Link></li>
                                        <li className="twitter footer-social-icon"><Link to="https://twitter.com/mentalhealthfbn?lang=en"><div className="icon"><FaTwitter /></div></Link></li>
                                        <li className="linkedin footer-social-icon"><Link to="https://www.linkedin.com/company/feelingbetternow"><div className="icon"><FaLinkedinIn/></div></Link></li>
                                        <li className="instagram footer-social-icon"><Link to="https://www.instagram.com/instafeelingbetternow/"><div className="icon"><FaInstagram /></div></Link></li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-12 col-sm-12'>
                            <div className="block">
                                <ul className='footer-ul'>
                                    <h2>Contact Info</h2>
                                    <ul>
                                        <li className='phone'>
                                            <img src={phone} alt='phone' />
                                            <Link to="tel:416 928 9195"><span>416 928 9195 </span></Link>
                                        </li>
                                        <li className='mail'>
                                            <img src={mail} alt='mail' />
                                            <Link to="mailto:info@feelingbetternow.com"><span>info@feelingbetternow.com</span></Link>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-12 col-sm-12'>
                            <div className="block">
                                <ul className='footer-ul'>
                                    <h2>Account</h2>
                                    <ul>
                                        <li><Link to="/"><span>Forget password</span></Link></li>
                                        <li><Link to="mailto:help@mensante.com"><span>Help</span></Link></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-12 col-sm-12'>
                            <div className="block">
                                <ul className='footer-ul'>
                                    <h2>Legal</h2>
                                    <ul>
                                        <li><Link to="/PrivacyPolicy"><span>Privacy Policy</span></Link></li>
                                        <li><Link to="/TermsOfServices"><span>Terms of use</span></Link></li>
                                        <li><Link to="/"><span>Site Map</span></Link></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                        <div className="copyright">Copyright © 2022 FeelingBetterNow®.</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Footer;
