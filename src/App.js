import React, { useEffect } from 'react'
import Main from './route/route'
// import { useFirebase } from './context/FirebaseContext'
// import One from './One';
// import {getDatabase , set , ref} from 'firebase/database';
// import {getAuth , createUserWithEmailAndPassword} from 'firebase/auth'
// import { app } from './config/firebase/firebase';

// const db = getDatabase(app);
// const auth = getAuth(app);
const App = () => {
  // const firebase = useFirebase();
  // useEffect(() => {
  //   firebase?.abc();
  // })
  // console.log(firebase?.user , '................');
  // const putData = () =>{
  //   set(ref(db, "users/hinali") , {
  //     id : 1,
  //     name : "hinali",
  //     age : 20,
  //   })
  //   set(ref(db, "users/hinali/hinali2") , {
  //     id : 2,
  //     name : "hinali19010",
  //     age : 22,
  //   })
  // } 

  return (
    <>
      <Main/>
      {/* <One/> */}
      {/* <button onClick={putData}>put data</button> */}
    </>
  )
}

export default App
