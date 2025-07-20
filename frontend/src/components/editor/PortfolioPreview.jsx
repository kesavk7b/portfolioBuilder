// import { NavBarDefault } from "./navbars";
// import { NavBarTest } from "./navbars";
import { PortfolioContext } from '../../context/PortfolioContext';
import React, { useContext, useRef } from "react";
import RenderTree from "./RenderTree";
import { ActiveContext } from "../../context/ActiveElementContext";
import { ContextMenuProps } from '../../context/ContextMenuProps';

import * as Navbars from './navbars';

const PortfolioPreview = ({setSection}) =>{
    const {setElementId,setMenu} = useContext(ActiveContext)
    const {portfolio} = useContext(PortfolioContext);
    const  {setTargetNode} = useContext(ContextMenuProps);
    const overlayRef = useRef();
    
     if (!portfolio) return <div>Loading...</div>;
    const portfolioData = portfolio;
     const handleRightclick = (e,obj) =>{
        e.preventDefault()
        setElementId(obj.id)
        setTargetNode(obj);
        setSection("navbar");
        setMenu({
            x:e.pageX,
            y:e.pageY,
            visible:true
        })
    }

    let height = "85vh";
    if(!portfolioData?.navbar?.show) height="95vh"
    const Nav = Navbars[portfolioData.navbar.component];
    return (
        <>
            {portfolioData?.navbar?.show &&
            (
                <React.Fragment>
                    <div 
                        ref={overlayRef}
                        style={{
                            position:"absolute",
                            height:"50px",
                            width:"100%",
                            top:0,
                            left:0,
                            zIndex:10,
                            background:"transparent",
                            pointerEvents:"auto"
                        }} 
                        onContextMenu={(e)=>handleRightclick(e,portfolioData?.navbar)}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            if (!overlayRef.current) return;
                            if(e.button===0){

                                const clickedElem = document.elementFromPoint(e.clientX, e.clientY);

                                // Check if the clicked element is the overlay itself
                                overlayRef.current.style.pointerEvents = "none";

                                setTimeout(() => {
                                if (overlayRef.current) {
                                    overlayRef.current.style.pointerEvents = "auto";
                                }
                                }, 5000);
                            }
                        }}
                    >
                    </div>
                    <Nav {...portfolioData.navbar.props} />
                </React.Fragment>
            )
            }
            <div style={{ display: "flex", width: "100%" }}>
                {portfolioData?.sidebar?.show &&
                    (
                        <div style={{ width: "150px", background: "lightblue"}}>Left</div>
                    )
                }
                
                <div  style={{ flex: 1, background: "lightgreen" ,  height:height,overflowY:"hidden"}} onClick={()=>setElementId(null)} >
                    {portfolioData?.body?.pages &&
                        Object.values(portfolioData.body.pages).map((item,i)=>{
                            return (<RenderTree key={i} data={item} height={height} />)
                        })
                    }
                </div>

                {portfolioData?.sidebar_right?.show &&
                    (
                        <div style={{ width: "100px", background: "lightcoral" }}>Right</div>
                    )
                }
            </div>
            <div style={{background:"green"}}>footer</div>
        </>
    )
}

export default PortfolioPreview;