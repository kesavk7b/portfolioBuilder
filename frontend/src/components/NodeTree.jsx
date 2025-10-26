import { useContext } from "react";
import { handleDragOver, handleDragStart, handleDrop } from "../utils/DragAndDrop";
import { SelectedContext } from "../context/SelectedContext";
import ToolHolder from "./editor/ToolHolder";
import { CommonToAllContext } from "../context/CommonToAll";

const NodeTree = ({ data,childData ,setData,activePage}) => {
  const {selected,setSelected} = useContext(SelectedContext)
  const {propertyToolActive,setPropertyToolActive} = useContext(CommonToAllContext);
  if (!Array.isArray(childData)) return null;

  const selectMultiple = (e,data)=>{
    e.stopPropagation();
    if(e.ctrlKey){
      setSelected(prev=>[...prev,data])
      return ;
    }
    if(data?.style?.display)
      setPropertyToolActive(true)
    else
      setPropertyToolActive(false)
    setSelected([data])

    console.log(data?.style?.display,"set property",selected?.[0]?.style?.display , selected?.[0]?.style?.display!=="block",data)

  }
  return (
    <>
      {childData.map((elem,index) => {
        const Tag = elem?.tag ?? "div";
        const isSeleted = selected.some(obj=>obj.id===elem.id)
        const node = (<Tag 
                key={index} 
                style={elem?.style}
                id={elem?.id}
                onDragOver={handleDragOver}
                onDrop={(e)=>handleDrop(e,data,setData,elem?.id,activePage)}
                onDragStart={()=>handleDragStart("elem")}
                onClick={(e)=>selectMultiple(e,elem)}
            >
                {elem?.text}
                <NodeTree childData={elem?.children} data={data} setData={setData} activePage={activePage} />
            </Tag>
          )
          return (node);
      })}
    </>
  );
};

export default NodeTree;