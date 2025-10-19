import { useEffect, useState } from "react"
import axiosInstance from "../API/AxiosInstance"
import { PortfolioProvider } from "../context/PortfolioContext"
import { useNavigate } from "react-router-dom"

const Bookmark = () => {
    const [portfolioList, setPortfolioList] = useState([])
    const navigater = useNavigate();
    const getBookmark = () => {
        axiosInstance.get('/API/portfolio/portfolios/bookmark/list/').then((response)=>{
            setPortfolioList(response.data);
        }).catch((error)=>{
            console.error('Error fetching bookmarks:', error);
        })
    }

    useEffect(()=>{
        getBookmark();
    },[])

    return (
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
                                {/* <figcaption className="dashboard-card-caption">
                                    <span 
                                        onClick={(e)=>likeAction(e,portfolio.id,portfolio.is_liked)}>
                                        <FontAwesomeIcon icon={portfolio.is_liked?faHeart:farHeart} />
                                        {portfolio.like_count}
                                    </span>
                                    <span onClick={(e)=>bookmarkAction(e,portfolio.id,portfolio.is_bookmark)}>
                                        <FontAwesomeIcon icon={portfolio.is_bookmark?faBookmark:farBookmark} />
                                    </span>
                                </figcaption> */}
                            </figure>

                        ))
                    }
                </div>
            </PortfolioProvider>
    )
}

export default Bookmark;