export const addChildById = (tree, targetId, newChild) => {
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
                    children: addChildById(node.children, targetId, newChild)
                };
            }

            return node;
        });
    }

const updateNodeById = (tree, targetId, updatedProps) => {
    return tree.map(node => {
        if (node.id === targetId) {
        return { ...node, ...updatedProps };
        }

        if (node.children) {
        return {
            ...node,
            children: updateNodeById(node.children, targetId, updatedProps)
        };
        }

        return node;
    });
}

export const getTree = (id=null)=>{
    if(!id) return [];
    const treeArr = [];
    const ids = id.split('-')

    let val = "";
    for(let i=0;i<ids.length-1;i++){
        val = val + (i!=0?"-":"") +ids[i];
        treeArr.push(val)
    }
    return treeArr;
}

export const removePage = (pagesObj, targetId) => {
  return Object.fromEntries(
    Object.entries(pagesObj).filter(([key]) => key !== targetId)
  );
};

export const removeNode = (tree, targetId) => {
  if (!Array.isArray(tree)) return [];

  return tree
    .map(node => {
      if (node.id === targetId) return null;

      if (node.children) {
        return {
          ...node,
          children: removeNode(node.children, targetId)
        };
      }

      return node;
    })
    .filter(Boolean); // remove nulls
};
