import React, { useState } from "react";
import TopicsData from "../../data/TopicData.json";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Summary.css";
function TopicsPart() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("Therapy Details");
  const [currentPage, setCurrentPage] = useState(0);
  const handleModalClose = () => setShowModal(false);

  const handleTherapyBoxClick = (topic, content) => {
    setModalTitle(topic);
    setModalContent(content);
    setShowModal(true);
    setCurrentPage(0);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getContentForPage = () => {
    // Split the content string into two parts
    const middleIndex = Math.ceil(modalContent.length / 2);
    if (currentPage === 0) {
      return modalContent.slice(0, middleIndex);
    } else {
      return modalContent.slice(middleIndex);
    }
  };

  const currentPageContent = getContentForPage();

  console.log(modalContent);
  console.log(currentPageContent);
  return (
    <div className="topics-part">
      <div className="summary-subheading">
        <h4>Topics in Mental Health & Wellness</h4>
      </div>
      <div className="topics-accordion-part">
        <div className="accordion summary-accordion" id="accordionTopics1">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsTopics1-headingOne">
              <button
                className="accordion-button summary-accordion-header"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsTopics1-collapseOne"
                aria-expanded="true"
                aria-controls="panelsTopics1-collapseOne"
              >
                <span>Types of Therapies</span>
              </button>
            </h2>
            <div
              id="panelsTopics1-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="panelsTopics1-headingOne"
            >
              <div className="accordion-body">
                <div className="accordion-content-therapy">
                  <div className="row">
                    {TopicsData.map((item) => {
                      // Extract the first 15 words for display
                      const therapyData = item.topic_data
                        .split(" ")
                        .slice(0, 15)
                        .join(" ");
                      return (
                        <div className="col-lg-6 col-md-12" key={item.id}>
                          <div
                            className="therapy-box"
                            onClick={() =>
                              handleTherapyBoxClick(item.topic, item.topic_data)
                            }
                          >
                            <div className="therapy-heading">
                              <h4>{item.topic}</h4>
                              <p>{therapyData}...</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {showModal && (
              <>
                <div className="modal-backdrop fade show"></div>
                <div
                  className="modal fade show"
                  id="therapyModal"
                  tabindex="-1"
                  aria-hidden="true"
                  role="dialog"
                  style={{ display: "block" }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                      </div>
                      <div className="modal-body scrollable-modal-content">
                        {/* <p>{modalContent}</p> */}
                        <p>{currentPageContent}</p>
                      </div>
                      <div className="modal-background">
                        <img
                          src="https://fbn3staging.ca/static/media/leafs.6d1d1960c27388da506c.svg"
                          alt="fbn"
                          className="modal-back-img"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn close-btn"
                          data-bs-dismiss="modal"
                          onClick={handleModalClose}
                        >
                          Close
                        </button>
                        <div className="paginate-buttons">
                          <div
                            className="arrow-btn left-arrow"
                            onClick={handlePrevPage}
                          >
                            <MdOutlineKeyboardArrowLeft />
                          </div>
                          <div
                            className="arrow-btn right-arrow"
                            onClick={handleNextPage}
                          >
                            <MdKeyboardArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="accordion summary-accordion stress-reduction-part "
          id="accordionTopics2"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsTopics2-headingOne">
              <button
                className="accordion-button summary-accordion-header"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsTopics2-collapseOne"
                aria-expanded="true"
                aria-controls="panelsTopics2-collapseOne"
              >
                <span>Stress Reduction Tips</span>
              </button>
            </h2>
            <div
              id="panelsTopics2-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="panelsTopics2-headingOne"
            >
              <div className="accordion-body">
                <div className="accordion-content">
                  <ol>
                    <li>
                      <div className="question">
                        <h4>1. What is stress?</h4>
                      </div>
                      <div className="answer">
                        <p>
                          Stress can be defined as the response to something
                          that disturbs our physical or mental equilibrium.
                          Anything that poses a challenge or a threat to our
                          well-being causes stress. Some amount of stress is
                          positive; without any stress at all, life would be
                          boring. We generally use the word "stress" when we
                          feel that everything feels too much - we are
                          overloaded and wonder whether we really can cope with
                          the pressures placed upon us. Some situations,
                          although not negative, may still be perceived as
                          stressful. This is because we think we are not
                          completely prepared to cope with them effectively.
                          Examples of stressors include having a baby, moving to
                          a nicer house, and being promoted. Even though these
                          are wonderful life events, any of these positive
                          experiences can potentially cause you to feel stress.
                          It is possible for a person to feel stressed without
                          an identifiable cause. Feelings of frustration,
                          anxiety, and depression can make some people feel
                          stressed more easily than others.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="question">
                        <h4>
                          2. What is the difference between "stress" and "a
                          stressor"
                        </h4>
                      </div>
                      <div className="answer">
                        <p>
                          A stressor is an event or stimulus that causes stress.
                          Stress is the feeling we have when under pressure,
                          while stressors are the things we respond to in our
                          environment. Examples of stressors are noises,
                          unpleasant people, a speeding car, or even going out
                          on a first date. Generally, but not always, the more
                          stressors we experience, the more stressed we feel.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="question">
                        <h4>3. Why do we experience stress?</h4>
                      </div>
                      <div className="answer">
                        <p>
                          Not all stress is bad. All animals have a stress
                          response, which can be lifesaving in dangerous
                          situations. When stressed, your body produces larger
                          quantities of the chemicals cortisol, adrenaline and
                          noradrenaline, which trigger a higher heart rate,
                          heightened muscle preparedness, sweating, and
                          alertness. This response helps you fight or escape the
                          danger. In the short term, it can even boost the
                          immune system. Problems occur if the stress response
                          goes on too long, such as when the source of stress is
                          constant, or if the response continues after the
                          danger has subsided.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="question">
                        <h4>4. How does stress affect a person?</h4>
                      </div>
                      <div className="answer">
                        <p>Effects on your body:</p>
                        <ul>
                          <li>Increased sweating</li>
                          <li>Back pain</li>
                          <li>Chest pain</li>
                          <li>Muscle aches, cramps or spasms</li>
                          <li>Erectile dysfunction</li>
                          <li>Fainting spells</li>
                          <li>Headache</li>
                          <li>
                            Heart disease and hypertension (high blood pressure)
                          </li>
                          <li>Loss of libido</li>
                          <li>Lower immunity against diseases</li>
                          <li>Sleeping difficulties</li>
                          <li>Stomach upset</li>
                        </ul>
                        <p>Effects on your thoughts and feelings:</p>
                        <ul>
                          <li>Anger or irritability</li>
                          <li>Anxiety</li>
                          <li>Burnout or fatigue</li>
                          <li>Depression</li>
                          <li>Feeling of insecurity</li>
                          <li>Forgetfulness</li>
                          <li>Problem concentrating</li>
                          <li>Restlessness</li>
                          <li>Sadness</li>
                        </ul>
                        <p>Effect on your behaviour:</p>
                        <ul>
                          <li>Eating too much or too little</li>
                          <li>Food cravings</li>
                          <li>Nail biting</li>
                          <li>Sudden angry outbursts</li>
                          <li>Drug abuse</li>
                          <li>Alcohol abuse</li>
                          <li>Higher tobacco consumption</li>
                          <li>Social withdrawal</li>
                          <li>Frequent crying</li>
                          <li>Relationship problems</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="question">
                        <h4>5. What are common stressors?</h4>
                      </div>
                      <div className="answer">
                        <p>The most common stressors are:</p>
                        <ul>
                          <li>Bereavement</li>
                          <li>Family problems</li>
                          <li>Financial difficulties</li>
                          <li>Illness</li>
                          <li>Work</li>
                          <li>Lack of time</li>
                          <li>Moving to a new home</li>
                          <li>Relationships (including divorce)</li>
                        </ul>
                        <p>Other causes of stress include:</p>
                        <ul>
                          <li>Abortion</li>
                          <li>Becoming a parent</li>
                          <li>Conflicts in the workplace</li>
                          <li>Driving in bad traffic</li>
                          <li>Fear of crime</li>
                          <li>Losing your job</li>
                          <li>Schoolwork</li>
                          <li>Miscarriage</li>
                          <li>Noisy neighbors</li>
                          <li>Overcrowding</li>
                          <li>Pollution</li>
                          <li>Pregnancy</li>
                          <li>Retirement</li>
                          <li>Too much noise</li>
                          <li>
                            Uncertainty (awaiting laboratory test results,
                            academic exam results, job interview results, etc.)
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="question">
                        <h4>6. What is stress management?</h4>
                      </div>
                      <div className="answer">
                        <p>
                          Stress management therapy teaches specific techniques
                          to help you deal with your stress. Stress management
                          can help you remove or change the source of stress,
                          alter the way you view a stressful event, lower the
                          impact that stress might have on your body, or teach
                          you alternative ways of coping. Since stress impacts
                          your body, mind, and emotions, therapy often targets
                          all three. Some examples of stress management
                          techniques include deep breathing, problem-solving,
                          and incorporating pleasurable activities into your
                          life.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="question">
                        <h4>7. How can I better cope with stress?</h4>
                      </div>
                      <div className="answer">
                        <ul>
                          <li>
                            <p>
                              Exercise - exercise has been proven to have a
                              beneficial effect on a person's mental and
                              physical state. For many people exercise is an
                              extremely effective stress buster.
                            </p>
                          </li>
                          <li>
                            <p>
                              Division of labour - try to delegate your
                              responsibilities at work or share them. If you
                              make yourself indispensable, the likelihood of
                              your feeling highly stressed is significantly
                              greater.
                            </p>
                          </li>
                          <li>
                            <p>
                              Assertiveness - don't say yes to everything. If
                              you cannot do something well, or if something is
                              not your responsibility, try to seek ways of not
                              agreeing to do them.
                            </p>
                          </li>
                          <li>
                            <p>
                              Reduce Alcohol and Drugs - alcohol and drugs will
                              not help you manage your stress better. Either
                              stop consuming them completely or cut down.
                            </p>
                          </li>
                          <li>
                            <p>
                              Caffeine - if your consumption of coffee and other
                              drinks that contain caffeine is high, cut down.
                            </p>
                          </li>
                          <li>
                            <p>
                              Nutrition - make sure you have a healthy and
                              balanced diet.
                            </p>
                          </li>
                          <li>
                            <p>
                              Time - make sure you set aside some time each day
                              just for yourself. Use that time to organize your
                              life, relax, and pursue your own interests.
                            </p>
                          </li>
                          <li>
                            <p>
                              Breathing - there are effective breathing
                              techniques that will slow down your system and
                              help you relax.
                            </p>
                          </li>
                          <li>
                            <p>
                              Talk - talk to your family, friends, work
                              colleagues and your boss. Express your thoughts
                              and worries.
                            </p>
                          </li>
                          <li>
                            <p>
                              Get support - Stay in touch with people who can
                              provide emotional and practical support. Ask for
                              help from friends, family, and community or
                              religious organizations to reduce stress due to
                              work burdens or family issues, such as caring for
                              a loved one.
                            </p>
                          </li>
                          <li>
                            <p>
                              Relaxation techniques - meditation, massage, or
                              yoga have been known to greatly help people with
                              stress.
                            </p>
                          </li>
                          <li>
                            <p>
                              Seek professional help - if the stress is
                              affecting the way you function if you are
                              overwhelmed, feel you cannot cope, have suicidal
                              thoughts, or are using drugs or alcohol to cope.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion summary-accordion" id="accordionTopics3">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsTopics3-headingOne">
              <button
                className="accordion-button summary-accordion-header"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsTopics3-collapseOne"
                aria-expanded="true"
                aria-controls="panelsTopics3-collapseOne"
              >
                <span>How to Help Yourself</span>
              </button>
            </h2>
            <div
              id="panelsTopics3-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="panelsTopics3-headingOne"
            >
              <div className="accordion-body">
                <div className="accordion-content">
                  <div>
                    <div className="question">
                      <h4>Managing your mental health</h4>
                    </div>
                    <div className="answer">
                      <p>
                        There are many ways to deal with mental health issues.
                        Every person is different, so find the way that works
                        best for you. And remember to try different strategies —
                        what worked in the past may not work now or may change
                        in the future.
                      </p>
                      <p>
                        There are many options available to you to manage your
                        mental health. These include stress reduction
                        techniques, online cognitive behavioural therapy, or
                        mental health apps or books. Reach out for support from
                        others or consult a mental health professional about
                        different kinds of psychotherapy or medication.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>Why people sometimes don't seek help</h4>
                    </div>
                    <div className="answer">
                      <p>
                        For a number of reasons, people sometimes don’t get help
                        with their mental health issues. Here are some of the
                        most common explanations:
                      </p>
                      <ol>
                        <li>
                          <h4>1. A lack of awareness</h4>
                          <ul>
                            <li>
                              Often people just don't know how to recognize an
                              issue, or they may not know that help is
                              available.
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <ol>
                        <li>
                          <h4>2. Stigma</h4>
                          <ul>
                            <li>
                              <p>
                                Negative stereotypes about mental health can
                                make people afraid to speak up or cause them to
                                worry about discrimination. Sometimes people
                                don't let anyone know because they are ashamed,
                                or they feel others will look down on them or
                                see them as “weak”. They may be worried about
                                losing job opportunities or missing out on a
                                promotion. They may even fear a boyfriend,
                                girlfriend or spouse seeing them as less
                                desirable.
                              </p>
                            </li>
                            <li>
                              <p>
                                Some of this concern is justified. In the past,
                                people have used stereotypes about mental health
                                to make decisions about whether someone can rent
                                an apartment, whether they can get health
                                insurance, or whether they should be hired or
                                fired. Children with mental health issues are
                                sometimes bullied or otherwise “shut out.”
                              </p>
                            </li>
                            <li>
                              <p>
                                Because of the stigma around mental health, many
                                people have found that they lose their
                                self-esteem or have difficulty making and
                                keeping friends.
                              </p>
                            </li>
                            <li>
                              <p>
                                But there's nothing “wrong” with going through
                                mental health challenges or having a mental
                                illness. If fear of being discriminated against
                                is keeping you from a satisfying life, reach out
                                for help.
                              </p>
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion summary-accordion" id="accordionTopics4">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsTopics4-headingOne">
              <button
                className="accordion-button summary-accordion-header"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsTopics4-collapseOne"
                aria-expanded="true"
                aria-controls="panelsTopics4-collapseOne"
              >
                <span>Feelings of Self-Harm? Here's What to Do</span>
              </button>
            </h2>
            <div
              id="panelsTopics4-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="panelsTopics4-headingOne"
            >
              <div className="accordion-body">
                <div className="accordion-content">
                  <div>
                    <div className="question">
                      <h4>
                        What are some common myths about suicide?
                        <br />
                        There are many misconceptions about suicide, including:
                      </h4>
                    </div>
                    <div className="answer">
                      <ul>
                        <li>
                          <p>
                            Myth: Someone who talks about suicide won't carry it
                            out.
                          </p>
                        </li>
                        <li>
                          <p>
                            Fact: In fact, most people who attempt suicide talk
                            about it first.
                          </p>
                        </li>
                        <li>
                          <p>
                            Myth: If a person wants to commit suicide, nothing
                            will stop them.
                          </p>
                        </li>
                        <li>
                          <p>
                            Fact: In fact, people who attempt suicide often
                            don't really want to die, they want to stop their
                            suffering. This feeling may not last very long,
                            especially if they get appropriate help.
                          </p>
                        </li>
                        <li>
                          <p>Myth: People who attempt suicide are crazy.</p>
                        </li>
                        <li>
                          <p>
                            Fact: In fact, they aren't. They are suffering and
                            need help.
                          </p>
                        </li>
                        <li>
                          <p>
                            Myth: You shouldn't discuss suicide with someone you
                            are concerned about as it could give them ideas.
                          </p>
                        </li>
                        <li>
                          <p>
                            Fact: In fact, talking about suicide doesn't
                            increase risk. It is the best way to understand a
                            person's mindset and intentions.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>What are common warning signs of suicide?</h4>
                    </div>
                    <div className="answer">
                      <p>
                        Suicides seldom occur without warning. If you are aware
                        of common early warning signs, you can help yourself or
                        a person in crisis. A previous attempt is a particularly
                        important sign. Such an attempt increases the risk of
                        future ones.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>
                        The following behaviours are especially significant
                        because these signs indicate that a decision to complete
                        suicide may have been made.
                      </h4>
                    </div>
                    <div className="answer">
                      <ul>
                        <li>
                          <p>
                            Giving away prized possessions (e.g., CD
                            collection).
                          </p>
                        </li>
                        <li>
                          <p>Preoccupation with thoughts of death.</p>
                        </li>
                        <li>
                          <p>
                            Making a will; writing poetry or stories about
                            suicide or death.
                          </p>
                        </li>
                        <li>
                          <p>
                            Quietly putting affairs in order, "taking care of
                            business."
                          </p>
                        </li>
                        <li>
                          <p>Threatening suicide.</p>
                        </li>
                        <li>
                          <p>
                            Hoarding pills, hiding weapons, describing methods
                            for committing suicide.
                          </p>
                        </li>
                        <li>
                          <p>
                            A sudden sense of calm or happiness after a person
                            has been very depressed.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>
                        The common warning signs are usually physical, emotional
                        and behavioural in nature. Be alert to changes.
                      </h4>
                    </div>
                    <div className="answer">
                      <p>The common warning signs include:</p>
                      <ul>
                        <li>
                          <p>
                            Neglect of personal appearance or sudden changes in
                            manner of dress
                          </p>
                        </li>
                        <li>
                          <p>Sudden weight gain or loss.</p>
                        </li>
                        <li>
                          <p>Loss of interest or enjoyment in activities.</p>
                        </li>
                        <li>
                          <p>Wide mood changes and sudden outbursts.</p>
                        </li>
                        <li>
                          <p>Extreme tension, agitation and depression.</p>
                        </li>
                        <li>
                          <p>
                            Changes in personality: from outgoing to withdrawn,
                            from polite to rude, from compliant to rebellious,
                            from well-behaved to "acting out."
                          </p>
                        </li>
                        <li>
                          <p>Loss of rational thought.</p>
                        </li>
                        <li>
                          <p>Self-destructive thoughts.</p>
                        </li>
                        <li>
                          <p>
                            Exaggerated fears of cancer, AIDS or physical
                            impairment.
                          </p>
                        </li>
                        <li>
                          <p>Socially isolating.</p>
                        </li>
                        <li>
                          <p>
                            High-risk behaviours such as reckless driving and
                            sexual promiscuity.
                          </p>
                        </li>
                        <li>
                          <p>Increased use of alcohol or drugs.</p>
                        </li>
                        <li>
                          <p>Feeling trapped, hopeless, or desperate</p>
                        </li>
                        <li>
                          <p>Feeling like a burden to others</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>I tried treatment and it didn't work.</h4>
                    </div>
                    <div className="answer">
                      <p>
                        The vast majority of people who receive appropriate
                        treatment improve or recover completely. Even if you
                        have received treatment before, different treatments
                        work better for different people in different
                        situations. Several tries are sometimes necessary before
                        the right combination is found.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>Is treatment available?</h4>
                    </div>
                    <div className="answer">
                      <p>
                        Suicidal thinking is usually associated with problems
                        that can be treated. Depression, anxiety, chemical
                        dependency, and other problems produce profound
                        emotional distress. They also interfere with effective
                        problem-solving. In people experiencing suicidal
                        thoughts, the underlying psychological problem is often
                        not properly diagnosed or treated.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>Who is at risk for suicide?</h4>
                    </div>
                    <div className="answer">
                      <p>
                        People of all ages, genders, and ethnicities are at risk
                        for suicide; however, some people are at heightened
                        risk. Some risk factors are:
                      </p>
                      <ul>
                        <li>
                          <p>Depression or another mental disorder</p>
                        </li>
                        <li>
                          <p>Substance abuse</p>
                        </li>
                        <li>
                          <p>A previous suicide attempt</p>
                        </li>
                        <li>
                          <p>A family history of suicide</p>
                        </li>
                        <li>
                          <p>Having firearms in the home</p>
                        </li>
                        <li>
                          <p>Being in prison</p>
                        </li>
                        <li>
                          <p>Physical or sexual violence in the family</p>
                        </li>
                        <li>
                          <p>
                            Witnessing others’ suicidal behaviour – in family,
                            friends, or the media
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="question">
                      <h4>
                        Will my feeling that I want to commit suicide go away?
                      </h4>
                    </div>
                    <div className="answer">
                      <p>Suicidal crises are usually temporary.</p>
                      <p>
                        Although it might seem as if your unhappiness will never
                        end, it is important to realize that crises are usually
                        time limited. Solutions are found, feelings change,
                        unexpected positive events occur. Suicide is sometimes
                        referred to as “a permanent solution to a temporary
                        problem.” Don’t let suicide rob you of better times that
                        will come your way when you allow more time to pass.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion summary-accordion" id="accordionTopics5">
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsTopics5-headingOne">
              <button
                className="accordion-button summary-accordion-header"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsTopics5-collapseOne"
                aria-expanded="true"
                aria-controls="panelsTopics5-collapseOne"
              >
                <span>How Can I Help Others</span>
              </button>
            </h2>
            <div
              id="panelsTopics5-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="panelsTopics5-headingOne"
            >
              <div className="accordion-body">
                <div className="accordion-content">
                  <div>
                    <div className="question">
                      <h4>
                        1 in 5 Canadians will suffer a mental health condition
                        in their lifetime.
                      </h4>
                    </div>
                    <div className="answer">
                      <p>
                        Most of us know someone who is struggling now or has
                        faced challenges in the past. As friends, family,
                        classmates and co-workers, we’re often the first people
                        to notice troubling signs and symptoms of mental health
                        problems in others. We are often impacted by their
                        distress.
                      </p>
                      <p>
                        There is growing evidence that your support plays an
                        important role in creating a good outcome.
                      </p>
                      <p>
                        Just like you might give first aid to an injured person
                        before they get medical treatment, you can use your
                        FeelingBetterNow® Mental Heath First Aid Kit until the
                        person you care about gets appropriate treatment or
                        until the crisis is resolved.
                      </p>
                    </div>
                    <div>
                      <div className="question">
                        <h4>
                          How do I know if someone has symptoms of mental
                          illness?
                        </h4>
                      </div>
                      <div className="answer">
                        <p>
                          If you notice changes in their mood, behaviour, energy
                          level, habits or personality, or you see troubling
                          signs, consider whether a mental illness may be the
                          cause. See Mental Health Basics for more information
                          on this topic.
                        </p>
                        <p>
                          If you're worried, don't ignore the symptoms or assume
                          they'll go away.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>How should I approach someone?</h4>
                      </div>
                      <div className="answer">
                        <p>
                          Give the person many opportunities to talk and express
                          their feelings. Not everyone is ready to start the
                          conversation and speak openly and honestly about their
                          issues. It may be helpful to let them choose when to
                          open up.
                        </p>
                        <p>
                          Wait until you're feeling clear-headed and choose a
                          time that's good for both of you to talk in a place
                          where you both feel comfortable.
                        </p>
                        <p>
                          Use “I” statements such as, “I have noticed,” and “I
                          felt concerned when…,” rather than “You” statements
                          like “You seem depressed”.
                        </p>
                        <p>
                          Let them know you're concerned about them and that
                          you're willing to help. Respect the way they interpret
                          their symptoms. For example, if they say they’re “just
                          feeling a little scattered,” don’t try to convince
                          them of something else.
                        </p>
                        <p>
                          If they aren't comfortable talking to you, encourage
                          them to discuss how they're feeling with a friend,
                          family member or mental health professional.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>How can I be supportive?</h4>
                      </div>
                      <div className="answer">
                        <p>Treat the person with respect and dignity.</p>
                        <p>
                          Offer consistent emotional support and understanding.
                          Give them hope that they can feel better.
                        </p>
                        <p>
                          Encourage them to talk to you and be a good listener.
                        </p>
                        <p>
                          If they would like to receive more mental health
                          information, pass along Mental Health Basics and make
                          sure the resources you suggest are accurate and
                          appropriate to their situation.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>What doesn’t help?</h4>
                      </div>
                      <div className="answer">
                        <p>
                          What is not helpful is telling them to “Snap out of
                          it” or “Get over it” or “You should smile more” or
                          “Get your act together.”
                        </p>
                        <p>
                          Don't belittle or dismiss them by saying things like:
                          “You don't seem that bad to me” or “Other people have
                          it a lot worse than you”.
                        </p>
                        <p>
                          Don't be hostile, sarcastic, blame or nag them. Avoid
                          speaking in a patronizing tone of voice.
                        </p>
                        <p>
                          Try not to become over-involved or overprotective.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>
                          Should I encourage them to seek professional help?
                        </h4>
                      </div>
                      <div className="answer">
                        <p>Ask if they want help managing their feelings.</p>
                        <p>
                          If they want help, discuss therapy and therapist
                          options. (See Mental Health Essentials for more
                          information)
                        </p>
                        <p>
                          If nothing else, encourage them to see their family
                          physician as a starting point.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>What if they don’t want help?</h4>
                      </div>
                      <div className="answer">
                        <p>
                          Find out if there is any specific reason, they say
                          they don't want help. They may have fears or mistaken
                          beliefs about treatments for mental health conditions.
                          You may be able to help them overcome their concerns
                          with some of the information in Mental Health Basics.
                        </p>
                        <p>
                          If they still don't want help after you've explored
                          their reasons, let them know that if they change their
                          mind, they can always reach out to you.
                        </p>
                        <p>
                          Respect their right to decide whether they want help
                          or not, unless you believe they're at risk of harming
                          themselves or others.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>
                          What if they are self-harming or considering suicide?
                        </h4>
                      </div>
                      <div className="answer">
                        <p>
                          In most cases suicide can be prevented. Most suicidal
                          people do not want to die. They simply no longer want
                          to live with the pain.Take suicidal thoughts and
                          behaviours seriously.
                        </p>
                        <p>
                          Openly talking about suicidal thoughts and feelings
                          can save their life.
                        </p>
                        <p>
                          Know the warning signs and risk factors for suicide
                          and learn about why a person may consider suicide.
                        </p>
                        <p>
                          Helping a suicidal person is challenging, so it's
                          important to remember two key actions:
                        </p>
                        <ul>
                          <li>
                            <p>
                              If you think someone may be suicidal, ask them
                              directly. Don't be nervous about saying something
                              like, “Are you thinking about killing yourself?”
                            </p>
                          </li>
                          <li>
                            <p>
                              If they say, “Yes”, ensure someone stays with them
                              until they go to an emergency room, see a
                              psychologist, family physician or psychiatrist.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="question">
                        <h4>
                          Are there courses I can take in Mental Health First
                          Aid (MHFA)?
                        </h4>
                      </div>
                      <div className="answer">
                        <p>
                          Yes. Every person can benefit from taking an MHFA
                          course. More than 100,000 Canadians have already
                          undergone the training.
                        </p>
                        <p>
                          To receive more information about an MHFA course visit
                          www.mhfa.ca, email mhfa@mentalhealthcommission.ca or
                          call 1 (866) 989-3985.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopicsPart;
