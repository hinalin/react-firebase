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