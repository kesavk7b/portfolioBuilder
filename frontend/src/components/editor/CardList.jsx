import { useContext } from "react";
import { ActiveContext } from "../../context/ActiveElementContext";
import { CardData } from "./CardData";
import { addChildById } from "../../utils/ElementTree";
import { PortfolioContext } from "../../context/PortfolioContext";

const CardList = () =>{

    const {elementId} = useContext(ActiveContext);
    const {setPortfolio} = useContext(PortfolioContext);
    const addElement = (obj,targetId) =>{
        setPortfolio(prev => ({
            ...prev,
            body: {
                ...prev.body,
                pages: {
                ...prev.body.pages,
                pg1: addChildById(prev.body.pages.pg1, targetId, obj)
                }
            }
        }));
    }
    return (
        <>
            <h1>Card</h1>
            <div className="d-flex">
                {
                    Object.keys(CardData).map((key, index) => {
                        const item = CardData[key];
                        return (
                            <div className="border m-3 d-flex" key={index}>
                                <div
                                    
                                    className={item.class_name}
                                    style={{  ...item.style }}
                                    onClick={()=>addElement(item,elementId)}
                                >
                                    {key}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default CardList;