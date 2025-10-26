export const linkError = ()=>{
    alert('nav link not linked to any page/card')
}

export const open_page = (page) => {
    const iframe = document.getElementById("editorScreenFrame");
    const pages = iframe?.contentDocument?.getElementsByClassName("page");

    if (pages) {
        for (let i = 0; i < pages.length; i++) {
            pages[i].style.display = "none";
        }
    }

    if (iframe?.contentDocument) {
        const targetPage = iframe.contentDocument.getElementById(page);
        if (targetPage) {
            targetPage.style.display = "block";
        }
    }
}

export const scrollToTop = (id) => {
    open_page(id.split('-')[0]);
    const iframe = document.getElementById("editorScreenFrame");
    const targetElement = iframe?.contentDocument?.getElementById(id);
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
}




/////////remove above code once wright the nwe functions/////

export const update_props = (data,setData,parent_id,newStyle,activePage)=>{

    const arr_id = parent_id.split('-');
    setData(update_rec(data,arr_id[0],parent_id,arr_id , newStyle,activePage,0));
}


const update_rec = (data, targetId, parent_id, id_arr, newStyle,activePage=undefined, index = 0) => {
    console.log("activePage",activePage,data)
    if(activePage!==undefined){
        const updatedPage = update_rec(
            data[activePage],
            targetId,
            parent_id, 
            id_arr, 
            newStyle,
            undefined, 
            index
        )

        const newData = [...data];
        newData[activePage] = updatedPage;
        return newData;
    }

    if (!data || data.length === 0) return [...data];
    const [first, ...remain] = data;

    if (first.id === targetId) {
        let attr = Object.keys(newStyle)[0];
        let val = Object.values(newStyle)[0];
        if (first.id === parent_id) {
            return [{ ...first, style: { ...first.style, [attr]: val } }, ...remain];
        }

        const newChildren = update_rec(first.children || [], targetId + "-" + id_arr[index + 1], parent_id, id_arr, newStyle,undefined, index + 1);
        return [{ ...first, children: newChildren }, ...remain]; // ✅ use it here
    }

    return [first, ...update_rec(remain, targetId, parent_id, id_arr, newStyle,undefined, index)];
};

