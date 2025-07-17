import { useState } from "react";
import "../../assets/style/common.css";
export const ItemModal = ({title="Navbar",children,id=1}) => {

    const [isOpen,setOpenModal] = useState(null);

    const handleOpenModal = (e,type=null)=>{
         e.stopPropagation()
        setOpenModal(type)
    }

    return (
        <>
            <button className="btn btn-success m-1" onClick={(e)=>handleOpenModal(e,id)} >{title} +</button>
            {isOpen === id ? (
                <div className="modal-container">
                    <div className="tool-modal">{title}
                        <span style={{float:"right",backgroundColor:"red",width:"25px",height:"25px",borderRadius:"50%",textAlign:"center",cursor:"pointer"}} onClick={(e)=>handleOpenModal(e,null)}>X</span><br/>
                        {children}
                    </div>
                </div>
            ) : null}
        </>
    )
}

// export default ItemModal;