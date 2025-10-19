import {createContext, useState } from "react";

export const CommonToAllContext = createContext();

export const CommonToAllProvider = ({children}) =>{
    const [test, setTest] = useState();
    return (
        <CommonToAllContext.Provider value={{test}}>{children}</CommonToAllContext.Provider>
    )
}