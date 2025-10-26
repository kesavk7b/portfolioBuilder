import React, { useContext, useState } from "react";
import EditorComponent from "./EditorComponent";
import EditorNav from "./EditorNav";
import EditorProperty from "./EditorProperty";
import EditorFrame from "./EditorFrame";
import { PortfolioContext } from "../../context/PortfolioContext";
import ActiveElement from "./ActiveElement";
import { SelectedContext } from "../../context/SelectedContext";

const EditorLayout = () =>{
    const [section,setSection] = useState("body");
    const [tab, setTab] = useState('lap');
    const { selected } = useContext(SelectedContext);
    const {activePage,portfolio,setPortfolio} = useContext(PortfolioContext)
    
    return (
        <React.Fragment>
            <div className="flex h-full">
                {/* Left Sidebar */}
                <div className="w-[20%] h-full border border-[var(--color-border)]">
                    <EditorComponent tab={tab} />
                </div>

                {/* Middle Content */}
                <div className="w-[60%] h-full text-white">
                    <EditorNav tab={tab} setTab={setTab} />
                    <div className="flex h-[55rem] w-full border border-1 border-[var(--color-border)] text-wite bg-[var(--color-border)] relative">
                        <EditorFrame section={section} tab={tab} />
                        {
                            selected.map((active,index)=>{
                                return (
                                    <ActiveElement selected={active} key={index} show_tool={index} />
                                )
                            })
                        }
                    </div>
                    <div className="flex items-center justify-between h-12 text-white px-2">
                        <div className="">
                            <button className="px-4 py-1 mx-1 rounded-md bg-[var(--color-border)]">Edit</button>
                            <button className="px-4 py-1 mx-1 rounded-md bg-[var(--color-border)]">View</button>
                        </div>
                        <div className="text-[var(--color-text-primary)]">
                            100%
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-[20%] h-full border border-[var(--color-border)]">
                    <div>
                        <EditorProperty activePage={activePage} data_from="editor" pageData={portfolio} setPageData={setPortfolio} />
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default EditorLayout;