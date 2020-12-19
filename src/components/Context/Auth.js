import { createContext } from 'react';
import { useState, useEffect } from "react";
import { server } from "../../libs/const";


export const AuthContext = createContext();

function MyProvider({children}) {

  const [session, setSession] = useState({
    username:"",
    id:0
  });

  useEffect(()=>{
    const oldSession2 = localStorage.getItem("rememberSessionID");
    console.log(oldSession2);
    if(oldSession2!=null){

      fetch( `${server}users/${oldSession2}` )
      .then((res) => res.json())
      .then((result) => {
        if (!!result) {
          setSession({...result});
          console.log("weapon got");
        }
      })
      .catch(console.log);

    }
  }, []);

  return (
    <AuthContext.Provider value={{session, setSession}}>
      {children}
    </AuthContext.Provider>
  );
}

export default MyProvider;