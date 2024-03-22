// const { user } = useFirebase();

  // const userId = user ? user.uid : null;
  // const [profileData, setProfileData] = useState({
  //   gender: "",
  //   age: "",
  //   languages: "",
  //   location: "",
  //   phoneNumber: "",
  //   doctorEmail: "",
  // });

  // const { gender, age, languages, location, phoneNumber, doctorEmail } =
  //   profileData;

  // const handleUpdate = () => {
  //   Object.keys(profileData).forEach((key) => {
  //     localStorage.setItem(`${userId}_${key}`, profileData[key]);
  //   });
  //   alert("Data updated successfully!");
  // };

  // useEffect(() => {
  //   const storedProfileData = {};
  //   Object.keys(profileData).forEach((key) => {
  //     const storedValue = localStorage.getItem(`${userId}_${key}`);
  //     if (storedValue) storedProfileData[key] = storedValue;
  //   });
  //   // Update profileData state with stored data
  //   setProfileData((prevState) => ({ ...prevState, ...storedProfileData }));
  // }, [userId]);

  // const handleChange = (key, value) => {
  //   setProfileData((prevState) => ({
  //     ...prevState,
  //     [key]: value,
  //   }));
  // };


    // const unansweredQuestions = filteredQuestions.filter(
    //     question => !answers.hasOwnProperty(question.id)
    //   );
    
    //   if (unansweredQuestions.length > 0) {
    //     // Show an alert if there are unanswered questions
    //     alert("Please answer all questions before proceeding.");
    //   } else {
    //     // Proceed to display child questions
    //     setShowChildQuestions(true);
    //   }



           {/* {filteredQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`unanswered-card ${
                focusedQuestion === index ? "focused-card" : ""
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              <div className="question">
                <p>{question.scn_question}</p>
                {answers[question.id] && (
                  <div className="ticked-img-div">
                    <AiOutlineCheck className="ticked-img" />
                  </div>
                )}
              </div>
              {focusedQuestion === index && (
                <div className="buttons">
                  <button
                    className={`yes_btn ${
                      answers[question.id] === "YES" ? "green" : ""
                    }`}
                    onClick={() => handleYesClick(question.id)}
                  >
                    YES
                  </button>
                  <button
                    className={`no_btn ${
                      answers[question.id] === "NO" ? "green" : ""
                    }`}
                    onClick={() => handleNoClick(question.id)}
                  >
                    NO
                  </button>
                </div>
              )}

              {focusedQuestion !== index && answers[question.id] && (
                <div className="answer">
                  <span>{answers[question.id]}</span>
                </div>
              )}
            </div>
          ))} */}