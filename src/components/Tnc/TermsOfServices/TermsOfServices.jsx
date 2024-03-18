/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./TermsOfServices.css";
import { Link } from "react-router-dom";
import NavigationBar from "../../NavigationBar/NavigationBar";
import Footer from "../../Footer/Footer";
import SignInUpModal from "../../SignInUpModal/SignInUpModal";

const TermsOfServices = () => {
  const [isShowSignInUpModal, setIsShowSignInUpModal] = useState(false);
  const handleOpenSignInUpModalModal = () => {
    setIsShowSignInUpModal(true);
  };
  return (
    <>
      <div className="TermsOfServices">
        <div className="NavbarComponent">
          <NavigationBar
            handleOpenSignInUpModalModal={handleOpenSignInUpModalModal}
          />
        </div>
        <div className="TermsOfConditionCard">
          <div className="TermsOfConditionText">
            <div className="TermsOfUseText">
              <h3>Terms Of Use </h3>
            </div>

            <div className="TnC_Question_Part">
              <h2 className="mb-4">
                Why is your mental health care a priority?
              </h2>
              <p>
                Mental health is just as important as your physical health. You
                cannot have health without mental health.
              </p>
              <p>
                1 in 5 Canadians is affected by a mental health condition. 1 in
                3 people experience a mental health issue at some point in life.
                Mental health not only has an impact on the mind and its ability
                to function, but it also has a physical impact on the brain.
                Without treatment, your brain can experience physical shrinkage
                and damage over time.
              </p>
              <p>
                Mental health is important to ensure your well-being and that
                you are functioning at your very best. It impacts every aspect
                of your life – your productivity at work, your relationships
                with family, colleagues and friends. It can change your outlook
                on life and affect your daily functions such as sleep,
                concentration, motivation, and ability to handle problems.
              </p>
              <h2>FeelingBetterNow® User Terms and Conditions</h2>
              <h3>Welcome to FeelingBetterNow®</h3>
              <p>
                Thanks for using our FeelingBetterNow® Service. The Service is
                provided by Mensante Corporation (“Mensante”). By using our
                Service, you are agreeing to these terms. Please read them
                carefully.
              </p>
              <ol>
                <li>
                  <p>
                    <strong>Your FeelingBetterNow® Account</strong>
                  </p>
                  <p>
                    You need to create an account in order to use our Service.
                    To protect your Account, keep your password confidential.
                    You are responsible for the activity that happens on or
                    through your Account.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Terms of Service and Privacy</strong>
                  </p>
                  <p>
                    The data you enter on the Service is subject to the
                    Mensante’s Privacy Policy, available elsewhere on this site.
                    By using our Service, you agree that Mensante can use such
                    data in accordance with our privacy policies.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Ownership and Our Relationship with You</strong>
                  </p>
                  <p>
                    Mensante and our Service is protected by Proprietary Rights
                    including, but not limited to copyrights, trademarks,
                    service marks, international treaties, Canadian laws and
                    laws of other countries. You agree to abide by all
                    Proprietary Rights and laws. Mensante owns all rights,
                    title, and interest in the Service.
                  </p>
                  <p>
                    You may not use content, logos or branding from our Service
                    without Mensante‘s prior written consent.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Warranties, Disclaimers and Liability</strong>
                  </p>
                  <p>
                    We provide our Services using a commercially reasonable
                    level of skill and care and we hope that you will enjoy
                    using it. But there are certain things that we do not
                    promise about our Services.
                  </p>
                  <p>
                    Other than as expressly set out in these terms, neither
                    Mensante nor its suppliers or distributors make any specific
                    promises about the Service. For example, we don’t make any
                    commitments about the content within the services, the
                    specific functions of the services, or their reliability,
                    availability, or ability to meet your needs. We provide the
                    services “as is”.
                  </p>
                  <ol>
                    <li>
                      <p>
                        Content. The Service is provided solely to assist you
                        and your mental health professional. You should consult
                        your physician or another mental health professional you
                        trust to determine the appropriateness of the
                        information for your specific situation and before
                        making any decision regarding treatment and/or
                        medication.
                      </p>
                      <p>
                        The content and resources provided on the Service are
                        not a substitute for the personalized judgment and care
                        of trained mental health care professionals.
                      </p>
                      <p>
                        The Service does not make any diagnosis. Only a
                        physician or a psychologist can make a diagnosis.
                      </p>
                      <p>
                        The information on this site is derived from DSM-5 and
                        treatment Guidelines of the American Psychiatric
                        Association and the canadian Network of Mood and Anxiety
                        Disorders (CANMAT).
                      </p>
                    </li>
                    <li>
                      <p>
                        Third-party Websites or Apps. We are not responsible for
                        any Third-party websites or apps you link to from the
                        Service. You are responsible for reading the
                        Third-party’ own Terms and Conditions and Privacy
                        Policies.
                      </p>
                      <p>
                        Any links we provide Third-party websites or apps are
                        provided as a reference to help you identify and locate
                        online resources that may be of interest. These other
                        websites and apps were independently developed by Third
                        Parties and we do not assume responsibility for the
                        accuracy or appropriateness of the information contained
                        at, or endorse the viewpoints expressed at such other
                        sites.
                      </p>
                    </li>
                    <li>
                      <p>
                        Your Computer or Device. Although we attempt to provide
                        information that is available, uninterrupted, timely,
                        secure, error-free and free of computer viruses or other
                        harmful components, we do not make a warranty of it.
                        Anything you download or otherwise obtain through the
                        Service is done at your discretion and risk. We are not
                        responsible for any damage to your computer or loss of
                        data.
                      </p>
                    </li>
                    <li>
                      <p>
                        Other than as expressly set out in these terms, neither
                        Mensante nor its suppliers or distributors make any
                        specific promises about the Service. For example, we
                        don’t make any commitments about the content within the
                        services, the specific functions of the services, or
                        their reliability, availability, or ability to meet your
                        needs. We provide the services “as is”.
                      </p>
                      <p>
                        Some jurisdictions provide for certain warranties, like
                        the implied warranty of merchantability, fitness for a
                        particular purpose and non-infringement. To the extent
                        permitted by law, we exclude all warranties.
                      </p>
                      <hr />
                      <p>
                        Other than as expressly set out in these terms, neither
                        Mensante nor its suppliers or distributors make any
                        specific promises about the Service. For example, we
                        don’t make any commitments about the content within the
                        services, the specific functions of the services, or
                        their reliability, availability, or ability to meet your
                        needs. We provide the services “as is”.
                      </p>
                      <p>
                        Some jurisdictions provide for certain warranties, like
                        the implied warranty of merchantability, fitness for a
                        particular purpose and non-infringement. To the extent
                        permitted by law, we exclude all warranties.
                      </p>
                    </li>
                    <p></p>
                  </ol>
                </li>
                <li>
                  <p>
                    <strong>Indemnification</strong>
                  </p>
                  <p>
                    You agree to indemnify and hold harmless Mensante from any
                    claim or demand, including reasonable attorneys' fees, made
                    by any third party in connection with or arising out of your
                    misuse of the Service or failure to comply with this User
                    Agreement.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Mobile Devices</strong>
                  </p>
                  <p>
                    Our Service is available on mobile devices. Do not use such
                    our Service in a way that distracts you and prevents you
                    from obeying traffic or safety laws.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Modifying and Terminating our Services</strong>
                  </p>
                  <p>
                    We are constantly improving our Service. We may add or
                    remove functionalities or features, and we may suspend or
                    stop the Service altogether.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Waiver and Severability</strong>
                  </p>
                  <p>
                    If you do not comply with the terms of this Agreement, and
                    we don’t take action right away, this doesn’t mean that we
                    are giving up any rights that we may have (such as taking
                    action in the future).
                  </p>
                  <p>
                    If it turns out that a particular term is not enforceable,
                    this will not affect any other terms.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Applicable Law</strong>
                  </p>
                  <p>
                    The laws of Ontario, Canada will apply to any disputes
                    arising out of or relating to these terms or the Service.
                  </p>
                </li>
              </ol>

              <h2 className="mb-4">What is FeelingBetterNow®?</h2>
              <p>
                FeelingBetterNow®(FBN) is a mental health hub and comprehensive
                guidance system personalized for you. FBN offers you Gold
                Standard Assessments which immediately link to your Personalized
                evidence-based Action Plan and Tool Box for self-help and/or
                collaborative care with a mental health professional. FBN is
                built on a prevention framework to assist in early
                identification, triage you to the right care at the right time
                be it self-care and/or collaborative care. It connects you to
                your organization’s resources so that your complete mental
                health support network is available in one place.
              </p>

              <h2 className="mt-5 mb-5">
                Who is eligible to use FeelingBetterNow®?
              </h2>
              <p>
                FeelingBetterNow®(FBN) is provided as a benefit to you by your
                organization, including your employer, insurer, union,
                university, college, or hospital. Check your organization’s
                intranet to see if FBN is available for you.
              </p>
              <p className="mb-5">
                If you are eligible, your family members also have access to
                FBN.
              </p>

              <h2 className="mb-4">
                Why should I use the FeelingBetterNow®(FBN)? How is FBN
                different from other mental health tools?
              </h2>
              <p>
                FeelingBetterNow® includes all evidence-based e-mental health
                care practices and augment traditional in-person care. We
                research all e-mental health tools currently available and we
                can assure you there is no comparable tool in the market.
              </p>

              <ul className="mb-5">
                <li>
                  You access FBN anonymously. It is a safe haven for you to
                  early identify your symptoms, triggers, and your level of risk
                  for a mental health concern.
                </li>
                <li>
                  FBN Offers a comprehensive approach to your mental health
                  care: it is a comprehensive online tool covering 95% of the
                  most common mental health conditions affecting Canadians.
                </li>
                <li>
                  Easy access. You can use it anytime and anywhere on your
                  computer, tablet or smartphone.
                </li>
                <li>
                  The Assessment provides you with an unbiased analysis of your
                  mental health. Most assessments pre-judge that you may have a
                  specific mental health problem and assess for only that
                  problem.
                </li>
                <li>
                  Assessments are based on gold standards of diagnosis and
                  treatment. It identifies your risk level (low, medium, high)
                  for mental health disorders. FBN does not diagnose or treat.
                  Only your mental healthcare provider can do that.
                </li>
                <li>
                  Assessments alone are not enough. Immediately after completing
                  your Assessment, you receive your Medical Action Plan. You are
                  not left hanging as to what you should do next. Your plan is
                  tailored specifically to meet your needs. It includes a Tool
                  Box for self-help and/or collaborative care with the right
                  mental health professional.
                </li>
                <li>
                  Your Toolbox promotes your engagement and allows you to take a
                  leading role in your mental health. It contains tools for
                  self-help including expert-curated resources for online
                  cognitive behavioral therapy, stress reduction, apps, how to
                  support others, how to navigate the system, what triggers and
                  symptoms you should look for and general education about
                  mental health.
                </li>
                <li>
                  The Assessment helps your mental health professionals provide
                  you with gold standard diagnosis and treatment and best
                  practice outcomes.
                </li>
                <li>
                  It addresses co-morbidity with physical and mental health
                  issues.
                </li>
                <li>
                  FBN is customized to connect you to your organization’s
                  Resources.
                </li>
              </ul>

              <p className="Tnc-link Link_To_Home_Page">
                <Link to="/">Visit our Features section to learn more!</Link>
              </p>

              <h2 className="mb-4 mt-5">How long does an assessment take?</h2>
              <p>
                On average, an assessment can take from 5 to 20 minutes to
                complete, depending on the number of concerns identified in the
                assessment. The assessment has a progress bar and users can
                pause and return to complete the assessment at another time.
              </p>

              <h2 className="mb-3 mt-5">
                How do I know I can trust the accuracy of FeelingBetterNow®?
              </h2>
              <p className="mb-4">
                FeelingBetterNow® was developed by leading mental health
                experts, including family physicians, psychologists,
                psychiatrists, academics, and social workers. These experts
                review the site and update regularly.
              </p>
              <p className="Tnc-link Link_To_About_Team">
                <a href="#">
                  Visit Our Mental Health Care Professional Advisory Board to
                  learn more about our Team!
                </a>
              </p>
              <p>
                CEO Dr. Sam Ozersky, A.B., MD, FRCP(C), received the Community
                Based Innovation Award in 2008 for developing FeelingBetterNow®.
              </p>
              <p>
                The College of Family Physicians of Canada has reviewed and
                approved FeelingBetterNow® as a practice management tool
                available to assist family physicians inpatient care.
              </p>
              <p>
                In 2016, the Mental Health Commission of Canada provided a
                letter of Excellence, for “FeelingBetterNow® stating it “is a
                made-in-Canada innovation in e-Mental Health focused on
                addressing gaps in the sphere of workplace mental health.
                Congratulations on this excellent initiative.”
              </p>
              <p className="Tnc-link Link_To_About_Team">
                <a href="">Visit Our Story to learn more!</a>
              </p>

              <h2 className="mb-4">How accessible is FeelingBetterNow®?</h2>
              <p>
                It is mobile-friendly and can be accessed from your smartphone,
                tablet or computer device anywhere, anytime. You can return as
                often as you want to use your Toolbox, Resources, and/or
                re-assess, and compare your assessment responses and risk level.
              </p>
              <p>
                It complies with the Accessibility for Ontarians with
                Disabilities (AODA) Act to ensure accessibility for all users.
              </p>
              <p>It is available in both French and English.</p>

              <h2 className="mt-5 mb-4">How is my privacy secured?</h2>
              <p>
                You access FBN anonymously by creating your own username and
                password. Neither Mensante nor your organization connects your
                Assessment information to you.
              </p>
              <p>
                FeelingBetterNow® is compliant with the Canadian Personal
                Information Protection and Electronic Documents Act (PIPEDA).
              </p>
              <p>
                We adhere to the latest standards and utilize the latest
                technology for encrypting account information. The servers are
                maintained in a 24-hour secured location.
              </p>
              <p>
                Any reporting to your organization is anonymized and aggregated.
              </p>

              <h2 className="mt-5 mb-4">
                How long has FeelingBetterNow® been on the market? Who is using
                it?
              </h2>
              <p>
                FeelingBetterNow®(FBN) has been available to users since 2006.
                Over the next 9 years, we gathered user feedback, conducted
                research, and learned from our experience. In 2015, we utilized
                state-of-the-art technology, made the site more user-friendly,
                and enhanced the content and scope of FBN.
              </p>
              <p>
                Today, FBN is available to over 1 million Canadians. Our
                customers include universities and colleges, insurers, unions,
                hospitals, and corporations. We have an over 90% contract
                renewal rate.
              </p>

              <h2 className="mt-5 mb-4">
                Who can I contact for more information?
              </h2>
              <p className="Tnc-link">
                Our team is always here for you. If you have questions, please
                contact{" "}
                <a href="#" style={{ textDecoration: "none" }}>
                  info@mensante.com.
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="TermsOfServices-Footer-Part">
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

export default TermsOfServices;
