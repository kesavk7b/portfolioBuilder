import { ItemModal } from "./ItemModal";
import '../../assets/style/common.css'
import NavList from "./NavList";
import SideBarList from "./SideBarList";
import ContainerList from "./ContainerList";
import CardList from "./CardList";
import ButtonList from "./ButtonList";
import { useContext } from "react";
import { ActiveContext } from "../../context/ActiveElementContext";
import WebPageTree from "./WebPageTree";
import { PortfolioContext } from "../../context/PortfolioContext";
import Heading from "./Heading";
import Text from "./Text";
import axios from "axios";
import { data } from "react-router-dom";

const Tool = ({id,userid=0}) =>{
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

    const save_portfolio = () => {
        const portfolioData = {
            title:"My Portfolio",
            description:"This is my portfolio",
            data:portfolio,
        }
        axios.post('http://localhost:8000/API/portfolio/portfolios/', portfolioData)
            .then(response => {
                console.log('Portfolio saved successfully:', response.data);
            })
            .catch(error => {
                alert('Error saving portfolio:', error);
            });
    }

    const update_portfolio = () =>{
        const portfolioData = {
            data:portfolio,
            title:"My Portfolio",
            description:"This is my portfolio",
        }
        axios.put(`http://localhost:8000/API/portfolio/portfolios/${id}/`, portfolioData)
    }
    return (
        <>
            <h3>tool</h3>
            <button className="btn btn-primary m-1" onClick={save_portfolio}>portfolio</button>
            <button className="btn btn-primary m-1" onClick={update_portfolio}>update</button>
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