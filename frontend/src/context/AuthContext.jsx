import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken,setAuthToken] = useState();
    const [isLogged,setLogin] = useState(true);
    

    useEffect(()=>{
        const token = localStorage.getItem("access")
        if(token){
            setLogin(true)
            setAuthToken(token)
        }
    },[])

    return (
        <AuthContext.Provider value={{authToken,setAuthToken,isLogged,setLogin}}>{children}</AuthContext.Provider>
    )
}