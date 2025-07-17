import { useContext } from "react";
import * as navlist from "./navbars";
import { PortfolioContext } from "../../context/PortfolioContext";
const NavList = () => {

    const {portfolio,setPortfolio} = useContext(PortfolioContext)
    const setNav =(component) =>{
        console.log(portfolio)
        setPortfolio(prev => ({
            ...prev,
            navbar: {
                ...prev.navbar,
                component: component,
                show:true
            }
        }));
    }
    return (
        <>
            {Object.entries(navlist).map(([name, Component]) => (
                <div key={name} >
                    <h3>{name}</h3>
                    <div style={{position:"relative"}}>
                        <Component />
                        <div 
                            style={{position:"absolute",width:"100%",height:"100%",top:0}}
                            onClick={()=>setNav(Component)}
                        ></div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default NavList;