import '../../assets/style/common.css';
import { useContext, useState } from "react";
import { ActiveContext } from "../../context/ActiveElementContext";
import WebPageTree from "./WebPageTree";
import { PortfolioContext } from "../../context/PortfolioContext";
import axios from "axios";

const Tool = ({id,userid=0}) =>{
    const {elementId} = useContext(ActiveContext)
    const {portfolio} = useContext(PortfolioContext);
    const [isOpen,setOpenModal] = useState(null);
    

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

           
            <div>id:{elementId}</div>
            <WebPageTree  />
        </>
    )
}



export default Tool;