import { createContext, useContext } from "react";
import { PortfolioContext } from "./PortfolioContext";
import { removeNode } from "../utils/ElementTree";
import { ActiveContext } from "./ActiveElementContext";

export const ContextMenuFunction = createContext();

export const ContextMenuFunctionProvider = ({children}) =>{
    const  {setPortfolio} = useContext(PortfolioContext)
    const {setMenu,menu,setActiveTree} = useContext(ActiveContext)


    const deleteNode = (obj) => {
        const confirmText = "Are you sure you want to delete?";
        if (!window.confirm(confirmText)) return;

        const parts = obj.id.split("-");
        const pageKey = parts[0];

        setPortfolio(prev => {
            const newPages = { ...prev.body.pages };

            if (parts.length === 1) {
            // delete entire page
            delete newPages[obj.id];
            } else {
            // delete node inside page tree
            const pageTree = newPages[pageKey];
            const updatedTree = removeNode(pageTree, obj.id);
            newPages[pageKey] = updatedTree;
            }

            return {
            ...prev,
            body: {
                ...prev.body,
                pages: newPages
            }
            };
        });
    };


    const editNode = (obj)=>{

    }
    

    const onClose = ()=>{
        setMenu({...menu,visible:false})
         setActiveTree([null])
    }
    return (
        <ContextMenuFunction.Provider value={{onClose,editNode,deleteNode}} >{children}</ContextMenuFunction.Provider>
    )
}