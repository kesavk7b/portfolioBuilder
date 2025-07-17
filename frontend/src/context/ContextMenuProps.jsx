import { createContext, useState } from "react";

export const ContextMenuProps = createContext();

export const ContextMenuPropsProvider = ({children}) =>{
    const [options,setOptions] = useState();
    const [targetNode,setTargetNode] = useState();

    return (
        <ContextMenuProps.Provider value={{options,setOptions,targetNode,setTargetNode}}>
            {children}
        </ContextMenuProps.Provider>
    )
}