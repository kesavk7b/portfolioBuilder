import React, { use, useEffect, useState } from "react"
import axiosInstance from "../API/AxiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import { handleDragStart } from "../utils/DragAndDrop";


const SideBar = () =>{
    const [activeTab, setActiveTab] = useState('design');
    const [component,setComponent] = useState(null);
    const [componentList,setList] = useState([]);
    const [modelOpen,setModalOpen] = useState(false);


    const saveComponent = ()=>{
        console.log(component);
        if(component){
            axiosInstance.post("/API/portfolio/portfolios/component/create/",component).then((response)=>{
                alert("created")
                console.log(response.data)
                setComponent({ ...component, id: response.data })
                setList(prev => ([ ...prev, { ...component, id: response.data } ]))
                setModalOpen(false)
            })
            .catch((error) => {
                console.error("Error creating component:", error.response?.data || error.message);
                alert("Failed to create component!");
            });
        }
    }

    const openModal = ()=>{
        setModalOpen(true);
    }
    
    const closeModal = ()=>{
        setModalOpen(false);

    }
    const getList  = () =>{
        axiosInstance.get('/API/portfolio/portfolios/component/list').then((response)=>{
            setList(response.data)
            console.log("component data",response.data)
        })
    }

    useEffect(()=>{
        getList()
    },[]);

    const nav = useNavigate();
    const openList = (id)=>{
        nav(`/component/${id}`)
    }

    const htmlTags = [
        // Document metadata
        "html", "head", "title", "base", "link", "meta", "style",

        // Sectioning
        "body", "header", "nav", "main", "section", "article", "aside", "footer", "address",

        // Text content
        "h1", "h2", "h3", "h4", "h5", "h6", "p", "hr", "pre", "blockquote", "ol", "ul", "li", "dl", "dt", "dd", "figure", "figcaption", "div",

        // Inline text semantics
        "a", "em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "ruby", "rb", "rt", "rtc", "rp", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr",

        // Image & multimedia
        "img", "iframe", "embed", "object", "param", "video", "audio", "source", "track", "canvas", "map", "area", "svg", "math",

        // Tables
        "table", "caption", "colgroup", "col", "tbody", "thead", "tfoot", "tr", "td", "th",

        // Forms
        "form", "label", "input", "button", "select", "datalist", "optgroup", "option", "textarea", "output", "progress", "meter", "fieldset", "legend",

        // Interactive elements
        "details", "summary", "dialog", "menu", "menuitem", "slot", "template"
    ];

    const [htmlList,setHtmlList] = useState(htmlTags);
    const searchComponent = (e)=>{
        var value = e.target.value;
        const regex = new RegExp('^'+value);
        const arr = htmlTags.filter(val=>regex.test(val));
        setHtmlList(arr)

    }

    return (
        <React.Fragment>
            <aside className="bg-[var(--bg-color)] text-[var(--color-text-primary)] my-3 h-[80vh]">
                <div className="flex text-green-400 text-xl m-4">
                    web builder
                </div>
                <div className="border-b border-[var(--color-border)] p-4">
                    <div className="relative border  text-white">
                        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>
                        <input className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" onChange={searchComponent} placeholder="Search components..." type="search" />
                    </div>
                </div>
                <div className="flex flex-wrap border-b border-[var(--color-border)] mx-4">
                    <div className={"w-1/2 py-2 text-center mx-auto " + (activeTab==='design' ? " border-b-2 border-green-500":"")} onClick={()=>setActiveTab('design')}>Designs</div>
                    <div className={"w-1/2 py-2 text-center mx-auto"+ (activeTab==='component' ? ' border-b-2 border-green-500':"")} onClick={()=>setActiveTab('component')}>component</div>
                </div>
                {
                    activeTab==='design' &&
                    <div className="h-[30rem] mx-4">
                        <div className="flex justify-end w-full p-3 text-[var(--theme)]">
                            <FontAwesomeIcon icon={faPlus} onClick={()=>setModalOpen(true)} />
                        </div>
                        {
                            componentList.
                            sort((a, b) => a.name.localeCompare(b.name))
                            .map((element,index)=>{
                                const icon = SolidIcons[element.icon]==undefined? faPlus : SolidIcons[element.icon];
                                return(
                                    <React.Fragment key={index}>
                                        <div className="flex justify-between text-[var(--theme)] p-3 group hover:bg-[var(--theme-hover)] hover:text-white rounded" onClick={()=>openList(element.id)}>
                                            <div className="flex items-center gap-2">
                                                <FontAwesomeIcon icon={icon} />
                                                {element.name}
                                            </div>
                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <FontAwesomeIcon className="cursor-pointer text-blue-500 hover:text-red-500" icon={faPenToSquare} />
                                                <FontAwesomeIcon className="cursor-pointer text-red-500 hover:text-red-500" icon={faTrash} />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                }
                {
                    activeTab==='component' &&
                    <div className="h-[79.6vh] m-4 text-white overflow-y-scroll scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-200">
                        {
                            htmlList.map((elem,index)=> (<div onDragStart={(e)=>handleDragStart(e,{tag:elem,style:{height:"40px",background:"red"}},elem)} key={index} className="flex justify-between text-[var(--theme)] p-3 group hover:bg-[var(--theme-hover)] hover:text-white rounded"
                            draggable
                            >{elem}</div>)
                            )
                        }
                    </div>
                }
                
            </aside>
            <CustomModal 
                isOpen={modelOpen} 
                onClose={closeModal} 
                title="Add design"
                footer={
                    <React.Fragment>
                        <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-gray-300 mx-1" onClick={saveComponent}>Save</button>
                    </React.Fragment>
                }
            >
                <div className="flex flex-wrap justify-center">
                    <input type="text" className="bg-[var(--color-surface)] placeholder-[var(--color-text-secondary)]::placeholder px-2 mb-4 border border-[var(--color-border)] w-64 text-[var(--color-text-primary)]" placeholder="name" onChange={(e)=>setComponent({...component,name:e.target.value})} />
                    <input type="text" className="bg-[var(--color-surface)] placeholder-[var(--color-text-secondary)]::placeholder px-2 mb-4 border border-[var(--color-border)] w-64 text-[var(--color-text-primary)]" placeholder="description" onChange={(e)=>setComponent({...component,description:e.target.value})} />
                    <input type="text" className="bg-[var(--color-surface)] placeholder-[var(--color-text-secondary)]::placeholder px-2 mb-4 border border-[var(--color-border)] w-64 text-[var(--color-text-primary)]" placeholder="icon" onChange={(e)=>setComponent({...component,icon:e.target.value})} />
                </div>
            </CustomModal>
        </React.Fragment>
    )
}


export default SideBar;