import { PortfolioContext } from '../../context/PortfolioContext';
import { useContext } from "react";
import RenderTree from "./RenderTree";
import { ActiveContext } from "../../context/ActiveElementContext";
import { ContextMenuProps } from '../../context/ContextMenuProps';
import { handleDragOver, handleDrop } from '../../utils/DragAndDrop';
import NodeTree from '../NodeTree';


const PortfolioPreview = ({setSection}) =>{
    const {setElementId,setMenu} = useContext(ActiveContext)
    const {portfolio,setPortfolio,activePage} = useContext(PortfolioContext);
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
    console.log("test==================================",portfolio,activePage);
    return (
           <div
                className='bg-black-500'
                style={{ transform: `scale(1)`, transformOrigin: "0 0",height:"100vh"}}
                onDrop={(e)=>handleDrop(e,portfolio,setPortfolio,"",activePage)}
                onDragOver={handleDragOver}
            >    
                {
                    !portfolio[activePage].length && <span className="text-[var(--color-text-secondary)]">Drag and create</span>
                }
                {

                    portfolio[activePage].length!==0 && (
                        <div className="w-full h-full block">
                            <NodeTree data={portfolio} childData={portfolio[activePage]} setData={setPortfolio} activePage={activePage} />
                        </div>
                    )
                }   
            </div>
        
        
    )
}

export default PortfolioPreview;