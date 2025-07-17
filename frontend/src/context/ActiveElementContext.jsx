import { createContext, useState } from "react";

export const ActiveContext = createContext();

export const ActiveContextProvider = ({children}) =>{
    const [elementId,setElementId] = useState(null);
    const [activeTree,setActiveTree] = useState([null])
    const [menu,setMenu] = useState({ visible: false, x: 0, y: 0 })

    return (
        <ActiveContext.Provider value={{elementId,setElementId,activeTree,setActiveTree,menu,setMenu}} >{children}</ActiveContext.Provider>
    )

}