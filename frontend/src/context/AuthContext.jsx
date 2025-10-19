import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken,setAuthToken] = useState();
    const [isLogged,setLogin] = useState(true);
    const [theme,setTheme] = useState(
        () => localStorage.getItem("theme") || "dark"
    );
    

    useEffect(()=>{
        const token = localStorage.getItem("access")
        if(token){
            setLogin(true)
            setAuthToken(token)
        }
        
        const local_theme = localStorage.getItem('theme');
        if(local_theme){
            setTheme(local_theme)
        }
    },[])

    return (
        <AuthContext.Provider value={{authToken,setAuthToken,isLogged,setLogin,theme,setTheme}}>{children}</AuthContext.Provider>
    )
}