import { useNavigate } from "react-router-dom";
import { PortfolioProvider } from "../../context/PortfolioContext";

const DashboardUI = () =>{
    const navigater  = useNavigate();
    return (
        <PortfolioProvider>
            <h1>Welcome</h1>
            <div className="card" onClick={()=>navigater('/editor')}> card </div>
        </PortfolioProvider>
    
    )
}

export default DashboardUI;