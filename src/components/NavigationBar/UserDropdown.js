

// import React, { useState } from "react";
// import "./NavigationBar.css";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { useFirebase } from "../../context/FirebaseContext";

// const UserDropdown = ({ user }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [arrowRotation, setArrowRotation] = useState(0);
//   const { logOutUser } = useFirebase();
//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//     setArrowRotation(arrowRotation === 0 ? 180 : 0);
//   };

//   const handleLogoutUser = async () => {
//     try {
//       await logOutUser();
//       navigate("/");
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//   const renderUserInitials = () => {
//     if (user && user.email) {
//       const initials = user.email.slice(0, 2);
//       return initials.toUpperCase();
//     }
//     return "";
//   };
//   return (
//     <>
//       <div className="UserDropdown">
//         <Link className="user-drop-down d-flex" onClick={toggleDropdown}>
//           <div className="user-circle">
//             <span>{renderUserInitials()}</span>
//           </div>
//           <div
//             className={`arrow ${dropdownOpen ? "open" : ""}`}
//             onClick={toggleDropdown}
//           >
//             <MdKeyboardArrowDown
//               className="drop-down-arrow"
//               style={{ transform: `rotate(${arrowRotation}deg)` }}
//             />
//           </div>
//           {dropdownOpen && (
//             <div className="dropdown-content">
//               <div className="links">
                
//                 <li className="nav-item d-flex  justify-content-start">
//                   <Link className="nav-link">Dowanload Action Plan</Link>
//                 </li>
//                 <li className="nav-item d-flex  justify-content-start">
//                   <Link  className="nav-link">French</Link>
//                 </li>
//                 <li className="nav-item d-flex  justify-content-start">
//                   <Link to='/Profile' className="nav-link">Profile</Link>
//                 </li>
//                 <li className="nav-item d-flex  justify-content-start">
//                   <Link className="nav-link" onClick={handleLogoutUser}>
//                     Logout
//                   </Link>
//                 </li>
//               </div>
//             </div>
//           )}
//         </Link>
//       </div>
//     </>
//   );
// };

// export default UserDropdown;


import React, { useState, useEffect } from "react";
import "./NavigationBar.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";

const UserDropdown = ({ user , name }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const { logOutUser } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        event.target.closest(".UserDropdown") === null
      ) {
        setDropdownOpen(false);
        setArrowRotation(0);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setArrowRotation(arrowRotation === 0 ? 180 : 0);
  };

  const handleLogoutUser = async () => {
    try {
      await logOutUser();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderUserInitials = () => {
    if (user && user.email) {
      const initials = user.email.slice(0, 2);
      return initials.toUpperCase();
    }
    return "";
  };

  // const renderUserInitials = () => {
  //   if (user && user.name) {
  //     // If the user logged in or signed up with a name
  //     return name.slice(0, 2).toUpperCase();
  //   } else if (user && user.email) {
  //     // If the user logged in or signed up with email
  //     return user.email.slice(0, 2).toUpperCase();
  //   }
  //   return "";
  // };
  return (
    <>
      <div className="UserDropdown">
        <Link className="user-drop-down d-flex" onClick={toggleDropdown}>
          <div className="user-circle">
            <span>{renderUserInitials()}</span>
          </div>
          <div
            className={`arrow ${dropdownOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <MdKeyboardArrowDown
              className="drop-down-arrow"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
            />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              <div className="links">
                <li className="nav-item d-flex justify-content-start">
                  <Link className="nav-link">Download Action Plan</Link>
                </li>
                <li className="nav-item d-flex justify-content-start">
                  <Link className="nav-link">French</Link>
                </li>
                <li className="nav-item d-flex justify-content-start">
                  <Link to="/Profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item d-flex justify-content-start">
                  <Link className="nav-link" onClick={handleLogoutUser}>
                    Logout
                  </Link>
                </li>
              </div>
            </div>
          )}
        </Link>
      </div>
    </>
  );
};

export default UserDropdown;
