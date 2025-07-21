import { useNavigate } from "react-router-dom";
import { PortfolioProvider } from "../../context/PortfolioContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserPortfolio from "./UserPortfolio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

import "../../assets/style/dashboard.css";
import axiosInstance from "../../API/AxiosInstance";


const DashboardUI = () =>{
    const navigater  = useNavigate();
    const [portfolioList, setPortfolioList] = useState([]);
    const getPortfolio = () =>{
        axiosInstance.get('/API/portfolio/portfolios/').then((response)=>{
            console.log("like",response.data);
            setPortfolioList(response.data);
        }).catch((error)=>{
            console.error('Error fetching portfolio:', error);
        })
    }

    useEffect(() =>{
        getPortfolio();
    },[])

    const like = (e,id) => {
        e.stopPropagation();
        axios.post(`http://localhost:8000/API/portfolio/portfolios/${id}/like/`,{}, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
    }
    const unlike = (e,id) => {
        e.stopPropagation();
        axiosInstance.delete(`http://localhost:8000/API/portfolio/portfolios/${id}/unlike/`)
    }
    const savePortfolio = (e,id,is_liked) => {
        e.stopPropagation();
        alert("Liked!");    
    }
    
    const likeAction = (e,id,liked_status) =>{
        e.stopPropagation();
        console.log("liked_status",liked_status,portfolioList);
        liked_status? unlike(e,id) : like(e,id)

        setPortfolioList((prev)=>{
            return prev.map((item) =>{
                if(item.id === id){
                    return {
                        ...item,
                        is_liked: !liked_status,
                        like_count: liked_status ? item.like_count - 1 : item.like_count + 1
                    }
                }
                return item;
            })
        })

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
                                    <span 
                                        onClick={(e)=>likeAction(e,portfolio.id,portfolio.is_liked)}>
                                        <FontAwesomeIcon icon={portfolio.is_liked?faHeart:farHeart} />
                                        {portfolio.like_count}
                                    </span>
                                    <span onClick={savePortfolio}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </span>
                                    <span onClick={savePortfolio}>
                                        <FontAwesomeIcon icon={farBookmark} />
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