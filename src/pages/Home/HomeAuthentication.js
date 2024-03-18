import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
import "./Home.css";

const HomeAuthentication = ({
  user,
}) => {
  const { logOutUser } = useFirebase();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <>
          
        </>
      ) : (
        <>
          
        </>
      )}
    </>
  );
};

export default HomeAuthentication;
