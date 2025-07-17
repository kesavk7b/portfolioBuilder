import React, { useContext, useState } from "react";
import "../../assets/style/page_tree.css";
import { PortfolioContext } from "../../context/PortfolioContext";
import WebPageChildTree from "./WebPageChildTree";
import { ActiveContext } from "../../context/ActiveElementContext";
import ContextMenu from "../ContextMenu";
import { removeNode } from "../../utils/ElementTree";
import { ContextMenuProps } from "../../context/ContextMenuProps";
const WebPageTree = () => {
    const {portfolio,setPortfolio} =useContext(PortfolioContext)


    const [isPageOpen,setOpenPage] = useState(false)
    const {setElementId,activeTree,setActiveTree,setMenu} = useContext(ActiveContext)
    const {setTargetNode}= useContext(ContextMenuProps)
    const page_obj = {
        id:"pg1",
        component:'',
        class_name:'page',
        style:{},
        text:"",
        bg:"",
        children:[]
    }
        
    const add_page = ()=>{
        const keys = Object.keys(portfolio.body.pages);
        const lastKey = keys.length!==0 ? keys[keys.length-1]:"pg0";
        const newPageNum = parseInt(lastKey.split('pg')[1]) + 1; // 4
        const newPageKey = `pg${newPageNum}`; // "pg4" 
        const newPageObj = {
            ...page_obj, // clone original object
            id: newPageKey // set new id
        };  
        setPortfolio(prev => (
            {
                ...prev,
                body: {
                    ...prev.body,
                    pages: {
                        ...prev.body.pages,
                        [newPageKey]: [newPageObj] // ✅ use computed key
                    }
                }
            }
        ))
    }



    const extendPage = (id) =>{
        setElementId(id)

        const iframe = document.getElementById("editorScreenFrame");
        const pages = iframe?.contentDocument?.getElementsByClassName("page");

        if (pages) {
            for (let i = 0; i < pages.length; i++) {
                pages[i].style.display = "none";
            }
        }

        if (iframe?.contentDocument) {
            const targetPage = iframe.contentDocument.getElementById(id);
            if (targetPage) {
                targetPage.style.display = "block";
            }
        }
        if(isPageOpen!==null && isPageOpen===id) {
            id=null;
            setActiveTree([null])
        }
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
        <>
            <h6>Pages</h6>
            <div className="page-wrapper"></div>
                {
                    Object.keys(portfolio.body.pages).map((item,idx)=>{
                        const pageIdx = parseInt(item.replace('pg',"")) 
                        const children = portfolio?.body?.pages[item]?.[0]?.children;
                        return(
                            <React.Fragment key={idx}>
                                <div 
                                    className="page" 
                                    onClick={() => extendPage(item)} 
                                    onContextMenu={(e)=>handleRightclick(e,item)} 
                                >Page 
                                    {pageIdx}
                                </div>
                                <div 
                                    className={`panel ${isPageOpen===item && children.length>0 || activeTree.includes(item) ? 'open' : ''} border`} 
                                    style={{border:"1px solid green"}}
                                >
                                    {
                                        <WebPageChildTree data={children} type="Child" />
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            <button className="add-page" onClick={add_page}>+</button>
        </>
    )
}

export default WebPageTree;