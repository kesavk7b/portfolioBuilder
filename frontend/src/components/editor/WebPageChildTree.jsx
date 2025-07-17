import React, { useContext, useState } from "react";
import "../../assets/style/page_tree.css";
import { ActiveContext } from "../../context/ActiveElementContext";
import { ContextMenuProps } from "../../context/ContextMenuProps";
const WebPageChildTree = ({data,type="Page"})=>{
    const [isPageOpen,setOpenPage] = useState(null)
    const {elementId,setElementId,activeTree,setMenu} = useContext(ActiveContext)
    const {setTargetNode} = useContext(ContextMenuProps)
    if (!Array.isArray(data)) return null;

    const extendPage = (id) =>{
        setElementId(id)
        if(isPageOpen!==null && isPageOpen===id) id=null;
        setOpenPage(id)
    }

    const handleRightclick = (e,obj) =>{
        e.preventDefault()
        e.stopPropagation();
        setElementId(obj.id)
        setTargetNode(obj);
        setMenu({
            x:e.pageX,
            y:e.pageY,
            visible:true
        })
    }
    return (
        <React.Fragment>
            {
                data.map((item,idx)=>{
                    return (
                        <React.Fragment key={item.id || idx}>
                            <div 
                                className="page" 
                                style={{border:elementId===item.id? "2px solid red":""}} 
                                onClick={() => extendPage(item.id)}
                                onContextMenu={(e)=>handleRightclick(e,item)} 
                            >
                                {type+" "+(idx+1)}
                            </div>
                            <div  className={`panel ${isPageOpen===item.id && item?.children?.length>0 || activeTree.includes(item.id) ? 'open' : ''} border-dark`}>
                                {
                                    <WebPageChildTree data={item.children} type="Child" />
                                }
                            </div>
                        </React.Fragment>
                        
                    )
                })
            }
        </React.Fragment>
    )
}

export default WebPageChildTree;