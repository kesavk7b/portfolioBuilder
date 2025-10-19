import { createContext, useState } from "react";

export const PortfolioContext = createContext()

export const PortfolioProvider = ({children}) =>{
    const [portfolio,setPortfolio] = useState([[]]);
    const [render,setRender] = useState(0);
    const [activePage,setActivePage] = useState(0)

    return(
        <PortfolioContext.Provider value={{portfolio,setPortfolio,render,setRender, activePage,setActivePage}}>
            {children}
        </PortfolioContext.Provider>
    )
}