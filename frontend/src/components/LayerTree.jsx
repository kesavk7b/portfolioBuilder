import React, { useContext, useState } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import LayerTreeBranch from "./LayerTreeBranch";

const LayerTree = ()=>{
    const {portfolio} = useContext(PortfolioContext);
    const [openTree,setOpenTree] = useState(false);
    return (
        <div className="m-3 p-1 bg-gray-700 min-h-10 h-auto rounded-lg">
            {
                portfolio.map((page,index)=>{
                    return(
                        <React.Fragment key={index}>
                            <div className="p-1 m-1 h-10 bg-gray-400">Page {index+1}</div>
                            <div className="h-auto bg-red-500">
                                <LayerTreeBranch page={page} />
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default LayerTree;