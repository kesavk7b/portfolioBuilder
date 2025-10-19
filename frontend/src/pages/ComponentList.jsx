import React, { Component, useEffect, useState } from "react"
import axiosInstance from "../API/AxiosInstance"
import "../assets/style/component.css";
import { useNavigate } from "react-router-dom";

const ComponentList = () => {
    const [componentList,setList] = useState([])
    const [addUI,setAddUI] = useState(false);
    const [component,setComponent] = useState(null)
    const navigate = useNavigate();

    const getList  = () =>{
        axiosInstance.get('/API/portfolio/portfolios/component/list').then((response)=>{
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
        <div className="h-[30vh] flex">
            <div className="flex " style={{flexWrap:"wrap"}}>
                {
                    // componentList.map((elem,index)=>{
                    //     return (
                    //         <div key={index} className="component-card" onClick={()=>navigate(`/component/${elem.id}`)}>
                    //             {elem.name}
                    //         </div>
                    //     )
                    // })
                }
            </div>
            
        </div>
    )
}

export default ComponentList;