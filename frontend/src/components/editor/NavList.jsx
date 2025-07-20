import { useContext } from "react";
import * as navlist from "./navbars";
import { PortfolioContext } from "../../context/PortfolioContext";
const NavList = () => {

    const {portfolio,setPortfolio} = useContext(PortfolioContext)
    const setNav =(component) =>{
        const comp_name = ""+component.name;
        console.log("check comm=",comp_name)
        setPortfolio(prev => ({
            ...prev,
            navbar: {
                ...prev.navbar,
                component: comp_name,
                props: {
                    navLinks: [ 
                        {
                            text: "Home",
                            id:"l1",
                            link: "",
                            page:""
                        },
                    ],
                },
                show:true
            }
        }));

        console.log("check comm=",portfolio)
    }

    const test = {
                    home: {
                        text: "Home",
                        link: "",
                        page:""
                    },
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