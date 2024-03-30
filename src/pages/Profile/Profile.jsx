import { React, useState, useEffect } from "react";
import "./Profile.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useFirebase } from "../../context/FirebaseContext";
import Footer from "../../components/Footer/Footer";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";

const Profile = () => {
  const { user } = useFirebase();
  const db = getFirestore();

  const userId = user ? user.uid : null;
  const [profileData, setProfileData] = useState({
    gender: "",
    age: "",
    languages: "",
    location: "",
    phoneNumber: "",
    doctorEmail: "",
    email: user.email,
  });

  const { gender, age, languages, location, phoneNumber, doctorEmail } =
    profileData;

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "users", userId), profileData);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", userId));
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleChange = (key, value) => {
    setProfileData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <div className="Profilepage-template">
        <div className="header">
          <NavigationBar user={user} />
        </div>
        <div className="container">
          <div className="Profilepage-card">
            <div className="row d-flex justify-content-between">
              <div className="col-12">
                <div
                  className="title"
                  style={{ backgroundColor: "rgb(247, 247, 247)" }}
                >
                  <h4>Profile</h4>
                </div>
              </div>
              <div className="row" style={{ padding: "20px" }}>
                <div className="col-12 left-part profile-part mt-3">
                  <div className="title subtitle">
                    <h4>Personal-info</h4>
                  </div>
                  <div className="content p-3">
                    <div className="text">
                      <p>
                        We respect your privacy. All personal profile
                        information is optional and is never shared with anyone
                      </p>
                    </div>
                    <div className="Greeting-message mt-5">
                      <h6>Greeting message</h6>
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        className="w-100 p-2"
                        style={{ fontWeight: "600", color: "rgb(56 ,54 , 64)" }}
                      >
                        Hello you are receiving this communication with
                        important information. All of the documents are in
                        password protected PDF’s. Please contact me for the
                        password. Thank you in advance for your compliance.
                      </textarea>
                    </div>
                    <div className="info-form">
                      <form action="">
                        <div className="row mt-3">
                          <div className="col-12">
                            <label htmlFor="Gender">Gender</label>
                          </div>
                          <div className="col-12 mt-2">
                            <select
                              id="Gender"
                              name="Gender"
                              className={`w-100 p-2 ${
                                gender ? "gray-text" : ""
                              }`}
                              value={gender}
                              //   onChange={(e) => setGender(e.target.value)}
                              onChange={(e) =>
                                handleChange("gender", e.target.value)
                              }
                            >
                              <option value=""></option>
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                              <option value="transgender">Transgender</option>
                              <option value="non-binary">Non-binary</option>
                              <option value="two-striped">Two-striped</option>
                              <option value="prefer not to say">
                                Prefer not to say
                              </option>
                            </select>
                          </div>

                          <div className="col-12 mt-4">
                            <label htmlFor="Age">Age</label>
                          </div>
                          <div className="col-12 mt-2">
                            <select
                              id="Age"
                              name="Age"
                              className={`w-100 p-2 ${age ? "gray-text" : ""}`}
                              value={age}
                              //   onChange={(e) => setAge(e.target.value)}
                              onChange={(e) =>
                                handleChange("age", e.target.value)
                              }
                            >
                              <option value=""></option>
                              <option value="<15">&gt; 15</option>
                              <option value="16-30">16-30</option>
                              <option value="31-45">31-45</option>
                              <option value="46-60">46-60</option>
                              <option value="61-75">61-75</option>
                              <option value=">76">&gt; 75</option>
                            </select>
                          </div>

                          <div className="col-12 mt-4">
                            <label htmlFor="Languages">
                              Preffered Languages
                            </label>
                          </div>
                          <div className="col-12 mt-2">
                            <select
                              id="Languages"
                              name="Languages"
                              className={`w-100 p-2 ${
                                languages ? "gray-text" : ""
                              }`}
                              value={languages}
                              //   onChange={(e) => setLanguages(e.target.value)}
                              onChange={(e) =>
                                handleChange("languages", e.target.value)
                              }
                            >
                              <option value=""></option>
                              <option value="english">English</option>
                              <option value="french">French</option>
                            </select>
                          </div>

                          <div className="col-12 mt-4">
                            <label htmlFor="Location">Location</label>
                          </div>
                          <div className="col-12 mt-2">
                            <select
                              id="Location"
                              name="Location"
                              className={`w-100 p-2 ${
                                location ? "gray-text" : ""
                              }`}
                              value={location}
                              //   onChange={(e) => setLocation(e.target.value)}
                              onChange={(e) =>
                                handleChange("location", e.target.value)
                              }
                            >
                              <option value=""></option>
                              <option value="Alberta">Alberta</option>
                              <option value="British Columbia">
                                British Columbia
                              </option>
                              <option value="Manitoba">Manitoba</option>
                              <option value="New Brunswick">
                                New Brunswick
                              </option>
                            </select>
                          </div>

                          <div className="col-12 mt-4">
                            <label htmlFor="Phone number">
                              Phone number (for text message reminder)
                            </label>
                          </div>
                          <input
                            type="tel"
                            maxLength={10}
                            name="phonenumber"
                            id="phonenumber"
                            className={`mt-2 p-2 ${
                              phoneNumber ? "gray-text" : ""
                            }`}
                            value={phoneNumber}
                            // onChange={(e) => setPhoneNumber(e.target.value)}
                            onChange={(e) =>
                              handleChange("phoneNumber", e.target.value)
                            }
                          />

                          <div className="col-12 mt-4">
                            <label htmlFor="Doctor email">Doctor's Email</label>
                          </div>
                          <input
                            type="email"
                            name="doctoremail"
                            id="doctoremail"
                            className={`mt-2 p-2 ${
                              doctorEmail ? "gray-text" : ""
                            }`}
                            value={doctorEmail}
                            // onChange={(e) => setDoctorEmail(e.target.value)}
                            onChange={(e) =>
                              handleChange("doctorEmail", e.target.value)
                            }
                          />

                          <div className="col-12 mt-4">
                            <label htmlFor="Email">Email</label>
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-2 p-2 myemail"
                            value={user.email}
                            readOnly
                            disabled
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="update-btn">
                  <button className="btn mt-4 ms-5 mb-4" onClick={handleUpdate}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Profile;
