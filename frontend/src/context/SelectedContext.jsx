import { createContext, useState } from "react";

export const SelectedContext = createContext();
export const SelectContextProvider = ({children})=>{
    const [selected,setSelected] = useState([]);
    const [data,setData] = useState([]);
    const [openBoxModal,setOpenBoxModal] = useState(false);

    return (
        <SelectedContext.Provider value={{selected,setSelected,data,setData,openBoxModal,setOpenBoxModal}}>{children}</SelectedContext.Provider>
    )
}