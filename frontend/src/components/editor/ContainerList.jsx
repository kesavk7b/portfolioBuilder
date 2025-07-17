import { useContext } from "react";
import { ContainerData } from "./ContainerData";
import { ActiveContext } from "../../context/ActiveElementContext";
import { PortfolioContext } from "../../context/PortfolioContext";

const ContainerList = () =>{
    const {elementId} = useContext(ActiveContext);
    const {setPortfolio} = useContext(PortfolioContext);

    const addElement = (obj,targetId) =>{
        const page = targetId.split("-")[0];
        setPortfolio(prev => ({
            ...prev,
            body: {
                ...prev.body,
                pages: {
                    ...prev.body.pages,
                    [page]: addChildById(prev.body.pages[page], targetId, obj)
                }
            }
        }));
    }

    function addChildById(tree, targetId, newChild) {
        return tree.map(node => {
            if (node.id === targetId) {
                const existingChildren = Array.isArray(node.children) ? node.children : [];
                const lastChild = existingChildren.length!=0 ? existingChildren[existingChildren.length-1].id:"pg1-c0";
                const segments = lastChild.split("-");
                const lastSegment = segments[segments.length - 1]; // "c2"
                const lastIndex = parseInt(lastSegment.replace("c", "")); // 2

                const newIndex = lastIndex + 1;
                const newNode = { ...newChild }; 
                newNode.id = targetId+"-c"+newIndex;
                return {
                    ...node,
                    children: [...existingChildren, newNode]
                };
            }

            if (node.children) {
                return {
                    ...node,
                    children: addChildById(node.children || [], targetId, newChild)
                };
            }

            return node;
        });
    }

    return (
        <>
            <h1>Container</h1>
            {
                 Object.keys(ContainerData).map((key, index) => {
                const item = ContainerData[key];
                return (
                    <div className="border mb-3" key={index}>
                        <div
                            
                            className={item.class_name}
                            style={{ height: "100px", ...item.style }}
                            onClick={()=>addElement(item,elementId)}
                        >
                            {key}
                        </div>
                    </div>
                );
                })
            }
        </>
    )
}

export default ContainerList;