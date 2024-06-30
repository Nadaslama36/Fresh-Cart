
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export const  authContext=createContext()

export function AuthContextProvider({children}){

  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)



function getUserData() {
const userData=  jwtDecode(localStorage.getItem('tkn'))
console.log('userData',userData);
setUserData(userData);
}



    
  useEffect(function(){
    
    const val=localStorage.getItem('tkn')
    if (val!=null) {
    setToken(val)
    getUserData();
      
    }


  },[])

   return<authContext.Provider value={{mytoken:token,setToken,userData,getUserData}}>
   
   { children}
   
   
   </authContext.Provider>
}