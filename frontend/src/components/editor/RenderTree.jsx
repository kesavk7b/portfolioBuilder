import React, { useContext, useState } from "react";
import { ActiveContext } from "../../context/ActiveElementContext";
import { getTree, removeNode } from "../../utils/ElementTree";
import { PortfolioContext } from "../../context/PortfolioContext";
import { ContextMenuProps } from "../../context/ContextMenuProps";
const RenderTree = ({data,height=""}) =>{
    const  {elementId,setElementId,setActiveTree,menu,setMenu} = useContext(ActiveContext);
    const {targetNode,setTargetNode,setOption} = useContext(ContextMenuProps)
    const {setPortfolio} = useContext(PortfolioContext)

    if (!Array.isArray(data)) return null;
    
    const handleSetId = (e,id) =>{
        e.stopPropagation();
        setElementId(id)
        const activeElementArr = getTree(id);
        setActiveTree(activeElementArr)
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

    const pageheight = height ==="" ? {}:{height:height};
    return (
        <React.Fragment>
            {
                data &&
                data.map((obj,i)=>{
                    const Tag = obj.tag ? obj.tag:"div";
                    return (
                        <React.Fragment key={"comp"+data.id+i}>
                            <Tag 
                                className = {obj.class_name} 
                                id = {obj.id} onContextMenu={(e)=>handleRightclick(e,obj)} 
                                style = {
                                    {
                                        backgroundColor:obj.bg,
                                        ...obj.style,border:obj.id===elementId?"2px solid red":"",
                                        ...pageheight
                                    }
                                } 
                                onClick={(e)=>handleSetId(e,obj.id)}
                                >
                                <span dangerouslySetInnerHTML={{ __html: obj.text || "" }}></span>
                                <RenderTree data={obj.children} setElementId={setElementId} />
                            </Tag>
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
    )
}

export default RenderTree;