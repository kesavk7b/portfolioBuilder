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
        axiosInstance.delete(`/API/portfolio/portfolios/${id}/unlike/`)
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

    const bookmark = (e,id) => {
        e.stopPropagation();
        axiosInstance.post(`/API/portfolio/portfolios/${id}/bookmark/`).then((response) => {
            console.log("Bookmark added:", response.data);
        }).catch((error) => {
            console.error('Error adding bookmark:', error);
        });
    }
    const unbookmark = (e,id) => {
        e.stopPropagation();
        axiosInstance.delete(`/API/portfolio/portfolios/${id}/unbookmark/`).then((response) => {
            console.log("Bookmark added:", response.data);
        }).catch((error) => {
            console.error('Error adding bookmark:', error);
        });
    }

    const bookmarkAction = (e,id,is_bookmark) => {
        e.stopPropagation();
        console.log("is_bookmark",is_bookmark,portfolioList);
        is_bookmark ? unbookmark(e,id) : bookmark(e,id)

        setPortfolioList((prev)=>{
            return prev.map((item) =>{
                if(item.id === id){
                    return {
                        ...item,
                        is_bookmarked: !is_bookmark,
                        bookmark_count: is_bookmark ? item.bookmark_count - 1 : item.bookmark_count + 1
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
                <div className="flex mx-4">
                    {
                        portfolioList.map((portfolio, index) => (

                           <figure
                                key={index}
                                onClick={() => navigater('/editor', { state: { portfolio } })}
                                className="relative w-80 h-48 overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-lg transition mx-2"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnr5hGcxCJA24f4A4exhcxlna42r0ge8CD_A&s"
                                    alt="Image"
                                />
                                <figcaption className="absolute bottom-0 left-0 w-full bg-black/50 text-white flex justify-between px-4 py-2">
                                    <span
                                        className="flex items-center gap-1 cursor-pointer hover:text-red-400"
                                        onClick={(e) => likeAction(e, portfolio.id, portfolio.is_liked)}
                                    >
                                        <FontAwesomeIcon icon={portfolio.is_liked ? faHeart : farHeart} />
                                        {portfolio.like_count}
                                    </span>
                                    <span
                                        className="cursor-pointer hover:text-yellow-400"
                                        onClick={(e) => bookmarkAction(e, portfolio.id, portfolio.is_bookmarked)}
                                    >
                                        <FontAwesomeIcon icon={portfolio.is_bookmarked ? faBookmark : farBookmark} />
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