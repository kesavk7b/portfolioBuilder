import React from "react";

const LayerTreeBranch = ({page})=>{
    if(!Array.isArray(page)) return null;
    return (
        <React.Fragment>
            {
                page.map((leaf,index)=>{
                    return (
                        <React.Fragment key={index}>
                            <div className="bg-yellow-500">
                                leaf
                            </div>
                            <div>
                                <LayerTreeBranch page={leaf.children} />
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
    )
}

export default LayerTreeBranch;