import React, { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../../context/SelectedContext";

const EditorPropertyType = ()=>{
    const {selected} = useContext(SelectedContext);
    const [property,setProperty] = useState();
    useEffect(()=>{
        setProperty(selected?.[0]?.style?.display);
    })
    return (
        <React.Fragment>
            <div className="text-white">{property} Property</div>
        </React.Fragment>
    )
}
export default EditorPropertyType;