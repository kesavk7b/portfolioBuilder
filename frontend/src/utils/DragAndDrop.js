export const handleDragStart = (e, data,text = "Dragging") => {
  e.stopPropagation();
  const preview = document.createElement("div");
  preview.innerHTML = text;

  // ✅ keep preview small & floating
  preview.style.position = "absolute";
  preview.style.display = "inline-block";
  preview.style.pointerEvents = "none";
  preview.style.padding = "8px 12px";
  preview.style.background = "#53e546ff";
  preview.style.color = "white";
  preview.style.borderRadius = "6px";
  preview.style.fontSize = "14px";

  document.body.appendChild(preview);

  if (e.dataTransfer) {
    e.dataTransfer.setData("application/json", JSON.stringify(data)); // send text along
    // e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setDragImage(preview, 0, 0);
  }

  setTimeout(() => {
    document.body.removeChild(preview);
  }, 0);
};

let drop_position = 0;
export const handleDrop = (e,data,setData,id="",activePage) => {
  e.preventDefault();
  e.stopPropagation()
  let element_data = e.dataTransfer?.getData("application/json");
  let val = '';
  element_data = JSON.parse(element_data);
  if(data.length===0) drop_position=0
  const id_arr = id.split('-')
  setData(updateData(element_data,data,id,id_arr,id_arr[0],activePage));
  if (element_data) {
    alert(`Dropped: ${element_data}`);
  }
};

export const handleDragOver = (e) => {
  e.preventDefault(); // allow drop

  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const offsetY = e.clientY - rect.top; // mouse Y inside element
  const height = rect.height;

  // Reset border
  target.style.border = "2px dashed gray";

  let before_or_after = "";
  if (offsetY < height * 0.25) {
    // Top quarter
    target.style.borderTop = "3px solid red";
    before_or_after="top"
    drop_position=1;

  } else if (offsetY > height * 0.75) {
    // Bottom quarter
    target.style.borderBottom = "3px solid red";
    before_or_after = "bottom";
    drop_position=1;
  } else {
    // Middle area
    target.style.border = "3px solid red";
    drop_position=0;
  }

  e.dataTransfer.setData("text",before_or_after);
  e.dataTransfer.dropEffect = "move";

};

const updateData = (element_data, data, targetId, id_arr, parent_id,activePage, index = 0) => {
  if (activePage !== undefined) {
    // Call the same function for the selected page only
    const updatedPage = updateData(
      element_data,
      data[activePage],
      targetId,
      id_arr,
      parent_id,
      undefined, // no need to pass activePage again
      index
    );

    // Replace only that page
    const newData = [...data];
    newData[activePage] = updatedPage;
    return newData;
  }
	if (!data || data.length === 0 || targetId==="") {
    element_data.id = find_max_id(data || [],targetId)
    return [...data,element_data];
  }

	const [first, ...rest] = data;

	if (first.id === parent_id) {
		if (targetId === first.id) {
		// found the target, add element_data to its children
			let id = "c0";
      element_data.id = find_max_id(first.children || [],targetId)

			return [
				{ ...first, children: [...(first.children || []), element_data] },
				...rest,
			];
		}

		// go deeper
		const nextParentId = parent_id+'-'+id_arr[index + 1]; // step forward
		const newChildren = updateData(
			element_data,
			first.children || [],
			targetId,
			id_arr,
			nextParentId,
      undefined,
			index + 1
		);
		return [{ ...first, children: newChildren }, ...rest];
	}

	// check the rest

	return [first, ...updateData(element_data, rest, targetId, id_arr, parent_id,undefined, index)];
};

const find_max_id = (data,parent_id="") =>{
  if(parent_id!=="") parent_id+="-"; 
  if(data.length===0) return parent_id+"c0";
  let id = 0;
  data.map((elem,i)=>{
    let id_arr = elem.id.split('-');
    const last_index = id_arr[id_arr.length-1];
    const match = parseInt(last_index.match(/([a-zA-Z]+)(\d+)/)[2],10);
    if(match>id) id =match;
  })

  let result = data[0].id.split('-');
  result[result.length-1] ='c'+(id+1);
  return  result.join('-');
}


