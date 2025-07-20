import { useNavigate } from "react-router-dom";
import { PortfolioProvider } from "../../context/PortfolioContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserPortfolio from "./UserPortfolio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

import "../../assets/style/dashboard.css";


const DashboardUI = () =>{
    const navigater  = useNavigate();
    const [portfolioList, setPortfolioList] = useState([]);
    const getPortfolio = () =>{
        axios.get('http://localhost:8000/API/portfolio/portfolios/').then((response)=>{
            console.log(response.data);
            setPortfolioList(response.data);
            // Assuming you want to set the portfolio data in context or state
            // setPortfolio(response.data);
        }).catch((error)=>{
            console.error('Error fetching portfolio:', error);
        })
    }

    useEffect(() =>{
        getPortfolio();
    },[])

    const like = (e) => {
        e.stopPropagation();
        alert("Liked!");    
    }
    const savePortfolio = (e) => {
        e.stopPropagation();
        alert("Liked!");    
    }
    return (
        <React.Fragment>
            <UserPortfolio />
            <PortfolioProvider>
                <h5>Portfolio</h5>
                <div className="row m-0 p-1">
                    {/* <div className="card col-3" onClick={()=>navigater('/editor')}> card </div> */}
                    {
                        portfolioList.map((portfolio, index) => (

                            <figure className="dashboard-card col-3 p-0"
                                key={index}
                                onClick={() => navigater('/editor', { state: { portfolio } })}
                            >
                                    <img 
                                        className="dashboard-card-img" 
                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnr5hGcxCJA24f4A4exhcxlna42r0ge8CD_A&s"} 
                                        alt="Image" 
                                    />
                                    <figcaption className="dashboard-card-caption">
                                        <span onClick={like}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                        <span onClick={like}>
                                            <FontAwesomeIcon icon={faHeart} />
                                        </span>
                                        <span onClick={savePortfolio}>
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </span>
                                        <span onClick={savePortfolio}>
                                            <FontAwesomeIcon icon={faBookmark} />
                                        </span>
                                    </figcaption>
                                </figure>

                        ))
                    }
                </div>
            </PortfolioProvider>
        </React.Fragment>
    
    )
}

export default DashboardUI;