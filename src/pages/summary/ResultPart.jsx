import React from "react";
import "./Summary.css";
function ResultPart() {
  return (
    <>
      <div className="results-part">
        <div className="summary-subheading">
          <h4>My Results</h4>
        </div>
        <div className="results-sub-heading">
          <h4>
            Your assessment results indicate whether you are at a Low, Moderate,
            or High likelihood of a Mental Health Diagnosis. Click on each for
            more detailed information.
          </h4>
        </div>
        <div className="results-data">
          <p>
            NOTE: Only a qualified Health Care Professional can make a Mental
            Health Diagnosis.
          </p>
          <p>
            FeelingBetterNow® uses American Psychiatric Association DSM-5
            diagnostic criteria to identify Diagnostic Risk Levels on 95% of the
            most common mental health conditions affecting North Americans.
          </p>
          <p>
            Our mental health experts recommend you take the following actions
            based on your results.
          </p>
          <div className="risk-details">
            <p>
              <strong>A Low Diagnostic Risk</strong>
            </p>
            <ul>
              <li>
                <p>
                  Your Assessment Results indicate you are doing well. It is
                  still important to talk with someone about how you are
                  feeling. Please take a moment to talk with a family member,
                  friend, relative, counsellor or family doctor, or a person of
                  faith (if you are religious).
                </p>
              </li>
            </ul>
          </div>
          <div className="risk-details">
            <p>
              <strong>A Moderate Diagnostic Risk</strong>
            </p>
            <ul>
              <li>
                <p>
                  It sounds like you may be experiencing some symptoms. Access
                  the many Self-care Resources available from FeelingBetterNow
                  and your employer or organization. You should also reach out
                  to your family and friends. If you decide to see a healthcare
                  professional be sure to take your Personalized Action Plan
                  with you.
                </p>
              </li>
            </ul>
          </div>
          <div className="risk-details">
            <p>
              <strong>A High Diagnostic Risk</strong>
            </p>
            <ul>
              <li>
                <p>
                  Make an appointment to see your physician or a mental health
                  practitioner. Download your Personal Action Plan to share with
                  your physician or a mental health practitioner. Access the
                  many self-care resources available from FeelingBetterNow and
                  your employer or organization.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResultPart;
