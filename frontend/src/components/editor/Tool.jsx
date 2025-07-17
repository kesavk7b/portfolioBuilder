import { ItemModal } from "./ItemModal";
import '../../assets/style/common.css'
import NavList from "./NavList";
import SideBarList from "./SideBarList";
import ContainerList from "./ContainerList";
import CardList from "./CardList";
import ButtonList from "./ButtonList";
import { useContext, useEffect } from "react";
import { ActiveContext } from "../../context/ActiveElementContext";
import WebPageTree from "./WebPageTree";
import { PortfolioContext } from "../../context/PortfolioContext";
import Heading from "./Heading";
import Text from "./Text";

const Tool = () =>{
    const {elementId} = useContext(ActiveContext)
    const {portfolio} = useContext(PortfolioContext);
    const list = [
        {
            title:"NavBar",
            component:NavList
        },
        {
            title:"Side Bar",
            component:SideBarList
        },
        {
            title:"Container",
            component:ContainerList
        },
        {
            title:"Card",
            component:CardList
        },
        {
            title:"Button",
            component:ButtonList
        },
        {
            title:"Text",
            component:Text,
        },
        {
            title:"Heading",
            component:Heading,
        },
    ]

    return (
        <>
            <h1>tool</h1>
            <div className="edit-container">
                <div className="edit-body">
                    
                </div>
                <div className="edit-foot">
                    <div>X</div>
                    <div>X</div>
                </div>
            </div>
            {
                list.map((item,index)=>{
                    return(
                        <ItemModal key={index} title={item.title} id={index} >
                            <div style={{overflowY:"scroll",height:"50vh",width:"100%"}} >
                                <item.component />
                            </div>
                        </ItemModal>
                    )
                })
            }
            <div>id:{elementId}</div>
            <WebPageTree  />
        </>
    )
}

export default Tool;