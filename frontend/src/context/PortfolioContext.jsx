import { createContext, useState } from "react";

export const PortfolioContext = createContext()

export const PortfolioProvider = ({children}) =>{
    const [portfolio,setPortfolio] = useState(
        {
            navbar:{
                show:false,
                component:"",
                probs:{
                    props:{navLinks:{}}
                }
            },
            sidebar:{
                show:false,
                component:null,
                probs:{}
            },
            sidebar_right:{
                show:false,
                component:null,
                probs:{}
            },
            body:{
                pages:{}
            },
            footer:{},
        }
    );
    const [render,setRender] = useState(0);

    return(
        <PortfolioContext.Provider value={{portfolio,setPortfolio,render,setRender}}>
            {children}
        </PortfolioContext.Provider>
    )
}