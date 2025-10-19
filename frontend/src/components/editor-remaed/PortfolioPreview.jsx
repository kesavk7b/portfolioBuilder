import { PortfolioContext } from '../../context/PortfolioContext';
import { useContext } from "react";
import RenderTree from "./RenderTree";
import { ActiveContext } from "../../context/ActiveElementContext";
import { ContextMenuProps } from '../../context/ContextMenuProps';


const PortfolioPreview = ({setSection}) =>{
    const {setElementId,setMenu} = useContext(ActiveContext)
    const {portfolio} = useContext(PortfolioContext);
    const  {setTargetNode} = useContext(ContextMenuProps);
    
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


    // const Nav = Navbars[portfolioData.navbar.component];
    return (
        
           <div  style={{ flex: 1 ,overflowY:"hidden"}} onClick={()=>setElementId(null)} >
                    {portfolioData?.body?.pages &&
                        Object.values(portfolioData.body.pages).map((item,i)=>{
                            return (<RenderTree key={i} data={item} />)
                        })
                    }
            </div>
        
    )
}

export default PortfolioPreview;