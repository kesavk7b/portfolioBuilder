import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


const DropDown = ({children,title="Layout",openState=false}) =>{
    const [open,setOpen]= useState(openState);
    return (
        <div>
            <div 
                className="flex justify-between bg-[var(--color-bg)] text-[var(--color-text-primary)] h-10 p-2"
                onClick={()=>setOpen(!open)}
            >
                {title}
                <FontAwesomeIcon icon={open?faChevronDown:faChevronRight} />
            </div>
            {open && <div className="bg-[var(--color-surface)] p-4">
                {children}
            </div>
            }
        </div>
    )
}

export default DropDown;