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