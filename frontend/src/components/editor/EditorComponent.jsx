import React, { useState } from "react";
import SideBar from "../SideBar";
import LayerTree from "../LayerTree";
import { handleDragStart } from "../../utils/DragAndDrop";
import {SwapVert,ViewComfy,TableChartOutlined,LayersOutlined} from '@mui/icons-material';
import { Typography } from "@mui/material";
import { elements } from "../../utils/StaticElemStruct";

const EditorComponent = ()=>{
    const [activeMenu,setActiveMenu] = useState("layer");
    const layouts = [
        {data:elements.flex,icon:SwapVert,text:"Flex"},
        {data:elements.grid,icon:SwapVert,text:"Grid"},
        {data:elements.table,icon:SwapVert,text:"Table"},
        {data:elements.div,icon:SwapVert,text:"Layer"},
    ]
    return (
        <React.Fragment>
            <h1 className="px-2 text-bold flex items-center h-12 border border-[var(--color-border)] text-[var(--color-text-primary)]">
                <button className={"w-1/2 text-[var(--color-text-primary)] p-1 mx-2 "+(activeMenu==='component'?" bg-gray-700 rounded-md":"")} onClick={()=>setActiveMenu("component")}>Components</button>
                <button className={"w-1/2 text-[var(--color-text-primary)] p-1 mx-2"+(activeMenu==='layer'?" bg-gray-700 rounded-md":"")} onClick={()=>setActiveMenu("layer")}>Layers</button>
            </h1>
            <div className="h-[48rem]">
                <div className="border-b border-[var(--color-border)] p-4">
                    <div className="relative border  text-white">
                        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
                        <input className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Search components..." type="search" />
                    </div>
                </div>
                {
                    activeMenu==="layer" && (
                        <LayerTree />
                    )
                }
                {
                    activeMenu==="component" && (
                        <React.Fragment>
                            <div className="text-[var(--color-text-primary)] p-4">Layouts</div>
                            <div className="grid grid-cols-2 gap-3 mx-3">
                                {
                                    layouts.map((layer,index)=>{
                                        return (
                                            <div key={index} onDragStart={(e)=>handleDragStart(e,layer.data,layer.text)} className="flex justify-center items-center text-[var(--theme)] p-3 group hover:bg-[var(--theme-hover)] hover:text-white rounded border border-[var(--border-color)] h-20"
                                            draggable
                                            >
                                                <div>
                                                    <layer.icon fontSize="medium" />
                                                    <Typography>{layer.text}</Typography>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        </React.Fragment>
        
    )
}

export default EditorComponent;