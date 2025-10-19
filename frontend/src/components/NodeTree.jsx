import { useContext } from "react";
import { handleDragOver, handleDragStart, handleDrop } from "../utils/DragAndDrop";
import { SelectedContext } from "../context/SelectedContext";

const NodeTree = ({ data,childData ,setData,activePage}) => {
  const {selected,setSelected} = useContext(SelectedContext)
  if (!Array.isArray(childData)) return null;

  const selectMultiple = (e,data)=>{
    e.stopPropagation();
    if(e.ctrlKey){
      setSelected(prev=>[...prev,data])
      return ;
    }
    setSelected([data])
    console.log(data,"sele")

  }
  return (
    <>
      {childData.map((elem,index) => {
        const Tag = elem?.tag ?? "div";
        const isSeleted = selected.some(obj=>obj.id===elem.id)
        const node = (<Tag 
                className={""}
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
            </Tag>)
         return isSeleted ? (
			<div key={index} className="border border-green-500">
				{node}
			</div>
		) : (
			node
		);
      })}
    </>
  );
};

export default NodeTree;