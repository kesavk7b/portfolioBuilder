import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";

const EditorNav = ({tab,setTab})=>{
    const active_class = "rounded-md bg-gray-700 p-2 text-white";
    const {portfolio,setPortfolio,activePage,setActivePage} = useContext(PortfolioContext);
    return (
        <div className="flex items-center h-12">
            <button className="p-3 hover:bg-gray-700 hover:text-white" onClick={()=>setPortfolio(prev=>[...prev,[]])}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <div className="flex">
                {
                    portfolio.map((page,index)=>{
                        return (
                            <button key={index} className={(activePage==index)?active_class:"rounded-md px-3 py-1 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"} onClick={()=>setActivePage(index)}>page {index+1}</button>
                        )
                    })
                }
            </div>
            <div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-lg bg-gray-800 p-1">
                        <div>
                            
                        </div>
                        <button className={tab==='lap' ? active_class :"p-2 text-gray-400 hover:text-white"} onClick={()=>setTab('lap')}>
                            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"></path>
                            </svg>
                        </button>
                        <button className={tab==='tab' ? active_class :"p-2 text-gray-400 hover:text-white"}  onClick={()=>setTab('tab')}>
                            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                                <path d="M176,40H80A16,16,0,0,0,64,56V200a16,16,0,0,0,16,16h96a16,16,0,0,0,16-16V56A16,16,0,0,0,176,40Zm0,160H80V56h96V200Z"></path>
                            </svg>
                        </button>
                        <button className={tab==='mob' ? active_class :"p-2 text-gray-400 hover:text-white"}  onClick={()=>setTab('mob')}>
                            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20">
                                <path d="M168,40H88A16,16,0,0,0,72,56V200a16,16,0,0,0,16,16h80a16,16,0,0,0,16-16V56A16,16,0,0,0,168,40Zm0,160H88V56h80V200Z"></path>
                            </svg>
                        </button>
                    </div>
                    <button className="bg-blue-700 px-5 py-1 rounded-full">Save</button>
                    <button className="bg-[var(--color-border)] px-5 py-1 rounded-full">Prevew</button>
                    <button className="bg-green-600 px-5 py-1 rounded-full">publish</button>
                </div>
            </div>
                    <button className="h-10 w-10 ml-auto mr-3 bg-red-500 rounded-full"></button>
        </div>
    )
}

export default EditorNav;