import React, { useState } from "react";
import NavigationBar from "../../NavigationBar/NavigationBar";
import "./PrivacyPolicy.css";
import Footer from "../../Footer/Footer";
import SignInUpModal from "../../SignInUpModal/SignInUpModal";

const PrivacyPolicy = () => {
  const [isShowSignInUpModal, setIsShowSignInUpModal] = useState(false);
  const handleOpenSignInUpModalModal = () => {
    setIsShowSignInUpModal(true);
  };
  return (
    <>
      <div className="PrivacyPolicy">
        <div className="NavbarComponent">
          <NavigationBar
            handleOpenSignInUpModalModal={handleOpenSignInUpModalModal}
          />
        </div>

        <div className="PrivacyPolicyCard">
          <div className="PrivacyPolicyText">
            <h3 className="mb-4">Privacy Policy</h3>

            <h2 className="mb-4">Why is your mental health care a priority?</h2>
            <p>
              Mental health is just as important as your physical health. You
              cannot have health without mental health.
            </p>
            <p>
              1 in 5 Canadians is affected by a mental health condition. 1 in 3
              people experience a mental health issue at some point in life.
              Mental health not only has an impact on the mind and its ability
              to function, but it also has a physical impact on the brain.
              Without treatment, your brain can experience physical shrinkage
              and damage over time.
            </p>
            <p className="mb-0">
              Mental health is important to ensure your well-being and that you
              are functioning at your very best. It impacts every aspect of your
              life – your productivity at work, your relationships with family,
              colleagues and friends. It can change your outlook on life and
              affect your daily functions such as sleep, concentration,
              motivation, and ability to handle problems.
            </p>
            <p className="mb-0">
              Mensante Corporation is committed to protecting your privacy when
              using the FeelingBetterNow® (FBN) website. We adhere to the
              Canadian government’s Personal Information Protection and
              Electronic Documents Act ('PIPEDA'), which sets out how personal
              information is to be protected using the ten privacy principles of
              the Canadian Standards Association Model Code for the Protection
              of Personal Information (www.scc.ca) that have been adopted by all
              provincial and territorial privacy legislation. The federal Act
              can be viewed at
            </p>
            <p className="privacy-link">
              <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/r_o_p/">
                https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/r_o_p/.
              </a>
            </p>
            <p>
              FBN does not collect any personally identifying information such
              as your name, gender, age, or home/business address. While FBN is
              completely anonymous, you have the option to use your email
              address for password recovery purposes, to receive follow-up
              reminders, or become eligible for prizes.
            </p>
            <p>
              To further protect your privacy, as with any password, we
              recommend you use a strong password such as at least 8 characters
              including, a capital letter and a number. We recommend not using
              anything that identifies you such as your name, birthday, address
              and the like.
            </p>
            <p>
              We adhere to the following ten privacy principles mentioned above:
            </p>

            <ol>
              <li>
                <p>
                  <strong>Accountability: </strong>
                  Mensante is accountable for protecting the privacy and
                  confidentiality of all personal information under its custody
                  and control. Mensante has appointed an individual who is
                  responsible for ensuring its compliance with the following
                  Privacy Principles.
                </p>
              </li>
              <li>
                <p>
                  <strong>Identifying Purposes: </strong>
                  The purposes for which you enter your personal information is
                  to enable the FBN tool to provide you with feedback based upon
                  the answers you provide to the Diagnostic Risk Assessment
                  questions asked. Upon request, we will provide Aggregate Data
                  Reports to the organizations that purchased the FBN service
                  (see Principle 5).
                </p>
              </li>
              <li>
                <p>
                  <strong>Consent: </strong>
                  By agreeing to use the FBN website terms and conditions and
                  privacy policy statement, you are consenting to the collection
                  of your personal information for the purposes of providing you
                  with feedback on your responses to the answers you provide
                  when you use the FBN Diagnostic Risk Assessment tool(s). You
                  are also consenting to permit Mensante to provide your
                  organization with Aggregate reports on members’, employees’,
                  insureds’ or students’ use of the FBN website and Diagnostic
                  Risk Assessment tools. “Aggregate Data” is defined in 5 below.
                </p>
              </li>
              <li>
                <p>
                  <strong>Limiting Collection: </strong>
                  The only personal information that is collected by Mensante is
                  that which you provide when you enter your responses to the
                  FBN Assessment. We also collect your User Name and password
                  for purposes of allowing you to log back into the website. We
                  only collect your email address should you choose to provide
                  it as part of the password recovery process or to enable us to
                  send you reminders to revisit the FBN website, or be eligible
                  for a prize.
                </p>
              </li>
              <li>
                <p>
                  <strong>Limiting Use, Disclosure and Retention: </strong>
                  Upon request, Mensante will provide Aggregate Data Reports to
                  our customer organizations on its employees’, insureds’,
                  members’ or students’ use of the FBN website. “Aggregate Data”
                  means information such as the total number of individuals from
                  the organization who used the FBN website and completed the
                  Diagnostic Risk Assessments. None of the personal information
                  entered into the Diagnostic Risk Assessments is ever disclosed
                  to anyone. We never sell any personal information under our
                  custody or control. We retain your personal information only
                  as long as we need to fulfill the purposes for which it was
                  collected.
                </p>
              </li>
              <li>
                <p>
                  <strong>Accuracy: </strong>
                  The accuracy of the personal information you enter into the
                  FBN Diagnostic Risk Assessment tools is maintained unchanged
                  until such time as you choose to change it by returning to the
                  FBN website and re-using the tools.
                </p>
              </li>
              <li>
                <p>
                  <strong>Safeguards: </strong>
                  We ensure the confidentiality of your personal information by
                  storing your information in a secure data centre on secure
                  servers with access limited to a limited number of authorized
                  persons for the purposes of maintenance of the database. See
                  “Website Use” below for additional security information.
                </p>
              </li>
              <li>
                <p>
                  <strong>Openness: </strong>
                  Upon request, Mensante will provide you with a copy of our
                  privacy policy and procedures that pertain to the management
                  of personal information.
                </p>
              </li>
              <li>
                <p>
                  <strong>Individual Access: </strong>
                  You may return to and use the FBN website as often as you
                  choose.
                </p>
              </li>
              <li>
                <p>
                  <strong>Challenging Compliance: </strong>
                  You may contact Mensante’s privacy officer at any time should
                  you wish to register a complaint or concern about Mensante’s
                  privacy practices. This person can be contacted at
                  416-928-9195.
                </p>
              </li>
            </ol>

            <h2>Website Use</h2>
            <p>
              As you use FBN, we may also collect non-identifiable information
              through the use of commonly-used information-gathering tools, such
              as cookies. A cookie is a piece of data that a website can send to
              the browsers of visitors’ computers and that may then be stored on
              the hard drives of their computers. The goal is to improve
              efficiency and effectiveness and to measure Website activity.
              Certain login information may be maintained in a cookie stored
              locally on your personal computing device (i.e. not on a server)
              in order to streamline the login process. There are no cookies
              tracking your browsing history outside of the FeelingBetterNow®
              website itself, or your location, activity, social networking and
              the like. Other information collected may include standard
              information regarding your web-connected device, web browser type,
              browser language, Operating System, Internet Protocol (“IP”)
              address, and the actions you take on our website (such as the web
              pages viewed and the links clicked).
            </p>

            <h2>When Exiting the Website</h2>
            <p>
              The FeelingBetterNow® website contains links to other related
              information websites and mobile applications (“apps”). If you
              visit a link for another site or app, you are subject to the
              privacy policy of the new site or app.
            </p>

            <h2>Safeguards</h2>
            <p>
              The measures Mensante Corporation takes to ensure the security of
              personal information include:
            </p>

            <ul>
              <li>
                <p>Physical security of our premises and the Data Center.</p>
              </li>
              <li>
                <p>CSAE 3416-compliant third part assurance standards</p>
              </li>
              <li>
                <p>
                  Restriction of staff access to files on a 'need to know'
                  basis.
                </p>
              </li>
              <li>
                <p>Undertakings by all staff to comply with our policy.</p>
              </li>
              <li>
                <p>
                  Deployment of technological safeguards like security software,
                  encryption and firewalls to prevent hacking or unauthorized
                  computer access.
                </p>
              </li>
              <li>
                <p>Internal password and security policies.</p>
              </li>
              <li>
                <p>
                  Regular audits of our procedures and measures to ensure that
                  they are properly administered and that they remain effective
                  and appropriate.
                </p>
              </li>
            </ul>

            <p className="mt-5 mb-3 privacy-link">
              At FeelingBetterNow we take your privacy seriously. If you want to
              delete your account (which will remove all your personal data from
              our servers) please message us at{" "}
              <a href="mailto:help@mensante.com">help@mensante.com</a>; or use
              the delete your account option in our profile page.
            </p>

            <h2>Updates to this Privacy Policy</h2>
            <p>
              Mensante Corporation reserves the right to update this privacy
              policy at any time.
            </p>
          </div>
        </div>
        <div className="PrivacyPolicy-Footer-Part">
          <Footer />
        </div>
      </div>
      <SignInUpModal
        forModal={isShowSignInUpModal}
        setForModal={setIsShowSignInUpModal}
      />
    </>
  );
};

export default PrivacyPolicy;
