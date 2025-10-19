import { Component, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import '../assets/style/component.css';
import axiosInstance from "../API/AxiosInstance";
// import JsonTreeRender from "../components/JsonTreeRender";
// import FileList from "../components/FileList";
import { handleDragOver, handleDrop } from "../utils/DragAndDrop";
import NodeTree from "../components/NodeTree";
import { SelectedContext } from "../context/SelectedContext";
import BoxModel from "../components/BoxModel";

const ComponentEditor = () => {

    const {data,setData} = useContext(SelectedContext);
    const [zoom, setZoom] = useState(1);
    const editorRef = useRef();

    useEffect(()=>{
    },[data])
    return (
        <div className="p-4">
            <h1 className="text-[var(--color-text-primary)]">ComponetEditor</h1>
            <h3 className="text-[var(--color-text-secondary)]">editing card component</h3>
            <div className="flex flex-wrap">
                <div className="text-[var(--color-text-secondary)] border-b-2 border-[var(--theme)] mx-2">Canvas</div>
                <div className="text-[var(--color-text-secondary)] border-b-2 border-[var(--theme)] mx-2">Json</div>
                <div className="text-[var(--color-text-secondary)] border-b-2 border-[var(--theme)] mx-2">Code</div>
            </div>
            <div
                className="flex justify-center items-center h-[80vh] w-full mt-2 bg-[var(--color-border)] overflow-scroll scrollbar-hide relative"
                ref={editorRef}    
            >
                <div 
                    className="flex justify-center items-center h-[80vh] w-full p-4"
                    style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}
                    onDrop={(e)=>handleDrop(e,data,setData)}
                    onDragOver={handleDragOver}
                >    
                    {
                        !data.length && <span className="text-[var(--color-text-secondary)]">Drag and create</span>
                    }
                    {

                        data.length!==0 && (
                            <div className="w-full h-auto block">
                                <NodeTree data={data} childData={data} setData={setData} />
                            </div>
                        )
                    }   
                    <BoxModel editorRef={editorRef} zoom = {zoom} />
                </div>
            </div>
            <div className="flex bottom-0 w-full h-full items-center text-white-500 justify-end p-1">
                <p className="text-[var(--color-text-primary)] p-1">{99+zoom} %</p>
                <button className="p-1 m-1 w-10 text-[var(--color-text-primary)] border border-[var(--color-border)]" onClick={() => setZoom((z) => z + 0.1)}>+</button>
                <button className="p-1 m-1 w-10 text-[var(--color-text-primary)] border border-[var(--color-border)]" onClick={() => setZoom((z) => Math.max(0.1, z - 0.1))}>-</button>
            </div>
        </div>
    )
}

export default ComponentEditor;