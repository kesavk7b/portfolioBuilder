import React, { Component, useEffect, useState } from "react"
import axiosInstance from "../API/AxiosInstance"
import "../assets/style/component.css";
import { useNavigate, useParams } from "react-router-dom";

const ComponentItemList = () => {
    const [componentList,setList] = useState([])
    const [addUI,setAddUI] = useState(false);
    const [component,setComponent] = useState(null)
    const navigate = useNavigate();
    const {id} = useParams()

    const getList  = () =>{
        axiosInstance.get(`/API/portfolio/portfolios/${id}/component/item/list`).then((response)=>{
            setList(response.data)
            console.log("component data",response.data)
        })
    }

    const saveComponent = ()=>{
        if(component){
            axiosInstance.post("/API/portfolio/portfolios/component/create/",component).then((response)=>{
                alert("created")
                console.log(response.data)
                setComponent({...component, id: response.data})
                setList(prev => ({ ...prev, ...{ component } }))
                setComponent(null)
            })
            .catch((error) => {
                console.error("Error creating component:", error.response?.data || error.message);
                alert("Failed to create component!");
            });
        }
    }

    useEffect(()=>{
        getList()
    },[])

    const closeAdd = (e)=>{
        e.stopPropagation()
        setAddUI(false)
    }
    return (
        <div className="p-4">
            <h2 className="text-[var(--color-text-primary)] py-4">Component Builder</h2>
            <h4 className="text-[var(--color-text-secondary)]">Browse and select the compoent to edit</h4>
            <div className="flex flex-wrap">
                <div className="text-[var(--color-text-secondary)] mx-2 border-b-2 p-1 border-[var(--theme)]">Card</div>
            </div>
            <div className="flex flex-wrap p-2">
                {
                    componentList.map((elem,index)=>{
                        return (
                            <div key={index} className="border border-[var(--color-border)] text-white" onClick={()=>navigate(`/component/editor/${id}`,{state:{data:{elem}}})}>
                                {elem.name}
                                
                            </div>
                        )
                    })
                }
                <div className="flex h-20 w-20 text-center justify-center border border-[var(--color-border)] text-white" onClick={()=>navigate("/component/editor/0",{state:{data:{},id:id}})}>Add</div>
            </div>
            
        </div>
    )
}

export default ComponentItemList;