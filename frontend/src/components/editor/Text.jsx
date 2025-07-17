import { useContext, useState } from "react";
import TextEditor from "../TextEditor";
import { ActiveContext } from "../../context/ActiveElementContext";
import { PortfolioContext } from "../../context/PortfolioContext";
import { addChildById } from "../../utils/ElementTree";

const Text = ()=>{
    const [value,setValue] = useState("");
    const [text,setText] = useState({
        id:"",
        class_name:'',
        style:{},
        tag:"p",
        text:"",
        bg:"",
        children:[]

    })

    const {elementId} = useContext(ActiveContext);
    const {portfolio,setPortfolio} = useContext(PortfolioContext);
    const handleClick = ()=>{
        const page = elementId.split('-')[0];
        setText(prev=>({...prev,text:value}))
        setPortfolio(prev=>({
                 ...prev,
                body: {
                    ...prev.body,
                    pages: {
                        ...prev.body.pages,
                        [page]: addChildById(prev.body.pages[page], elementId, text)
                    }
                }
            }
        ))

    }
    return (
        <>
            <div>
                <TextEditor onChange={(html)=>setValue(html)} />
                <button className="btn" onClick={handleClick}>save</button>
            </div>
        </>
    )
}

export default Text;