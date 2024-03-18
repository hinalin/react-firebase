import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

const ProtectedRoute = ({ children }) => {
    let { user } = useFirebase();
    if(!user){
        return <Navigate to='/signIn' />
    }
  return children;
}

export default ProtectedRoute;
