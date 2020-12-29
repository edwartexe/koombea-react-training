import { createContext } from 'react';
import { useState, useEffect } from "react";
import { server } from "../libs/const";
import axios from 'axios';

export const AuthContext = createContext();

function MyProvider({children}) {

  const [session, setSession] = useState(null);

  useEffect(()=>{
    const oldSession2 = localStorage.getItem("rememberSessionID");
    if(oldSession2!=null){

      axios.get(`${server}users/${oldSession2}`)
      .then(function (result) {
        if (!!result.data) {
          setSession({...result.data});
          console.log("old session got");
        }
      })
      .catch(console.log);

    }

    /*return ( )=>{
      unmount - cleanup
    }*/
  }, []);

  return (
    <AuthContext.Provider value={{session, setSession}}>
      {children}
    </AuthContext.Provider>
  );
}

export default MyProvider;