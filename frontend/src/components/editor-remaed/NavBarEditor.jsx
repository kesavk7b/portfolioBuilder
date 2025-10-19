import { useContext, useEffect, useState } from "react";
import "../../assets/style/editor.css";
import { PortfolioContext } from "../../context/PortfolioContext";

const NavBarEditor = ()=>{
    const {portfolio,setPortfolio} = useContext(PortfolioContext);
    const [selectedPage, setSelectedPage] = useState({page:"",card:""});
    const  [link,setLink] = useState("");

    const [value,setValue] = useState([...portfolio.navbar?.props?.navLinks] || []);

    useEffect(() => {
    setValue([...portfolio.navbar?.props?.navLinks] || []);
    }, [portfolio.navbar?.props?.navLinks]);
    const add_nav =()=>{
        // if(!selectedPage.value) return;
        const list = portfolio?.navbar?.props?.navLinks || [];
        const last_link = list.length!==0 ? list[list.length - 1].id:'l0';
        const id = 'l'+(parseInt(last_link.replace('l', '')) + 1);
        setPortfolio(prev => ({
            ...prev,
            navbar: {
                ...prev.navbar,
                props: {
                    navLinks: [
                        ...prev.navbar.props.navLinks,
                        {
                            text: link || `Link ${id}`,
                            id: id,
                            link: selectedPage.card,
                            page: selectedPage.page
                        }
                    ]
                }
            }
        }));
        setSelectedPage({});
        setLink("");
    }

    const remove_nav = (id) => {
        setPortfolio(prev => {
            const navLinks = prev.navbar?.props?.navLinks || [];
            return {
                ...prev,
                navbar: {
                    ...prev.navbar,
                    props: {
                        ...prev.navbar.props,
                        navLinks: navLinks.filter(link => link.id !== id)
                    }
                }
            };
        });
    }

    const edit_nav = (id)=>{
        const selectedLink = value.find(link => link.id === id);
        setPortfolio(prev => {
            const updatedLinks = prev.navbar.props.navLinks.map(link => {
                if (link.id === id) {
                    return {
                        ...link,
                        ...selectedLink
                    };
                }
                return link;
            });
            return {
                ...prev,
                navbar: {
                    ...prev.navbar,
                    props: {
                        navLinks: updatedLinks
                    }
                }
            };
        })
    }
    const page_list = (select="")=>{
        const pages = portfolio?.body?.pages;

        if (!pages || Object.keys(pages).length === 0) {
            return <option value="">No pages available</option>;
        }
        return portfolio?.body?.pages ? Object.keys(portfolio.body.pages).map((page,index) => (
            <option key={index} value={page} selected = {select==page} >page {index+1}</option>    
        )):[]
    }

    const card_list = (select) =>{
        const pages = portfolio?.body?.pages;
        if (!pages || Object.keys(pages).length === 0) {
            return <option value="">No cards available</option>;
        }
        return portfolio?.body?.pages ? Object.keys(portfolio.body.pages).map((page,index) =>{
            return pages[page][0]?.children?.map((card, cardIndex) => (
                <option key={`${index}-${cardIndex}`} value={card.id} selected={select === card.id}>
                    {`page ${index + 1} - child ${cardIndex + 1}`}
                </option>
            ));
        }):[];
    }

    const setInputValue = (id, newValue) => {
        setValue(prev => {
            return prev.map(link => {
                if (link.id === id) {
                    return { ...link, ...newValue }
                }
                return link;
            });
        });
    }
    return (
        <div className="navbar-editor">
            <h3>Navbar Editor</h3>
            <div className="row m-0">
            {
                value.map((link, index) => {
                    return (
                        <div key={index} className="d-flex justify-content-between">
                            <div className="col-2">
                                <input size={10} type="text" value={link.text} onChange={(e) => setInputValue(link.id,{text:e.target.value})} />
                            </div>
                            <div className="col-2 p-0 m-0">
                                <select value={link.link} onChange={(e) => setInputValue(link.id,{page:"",link:e.target.value})}>
                                    <option value="">select card</option>
                                    {card_list()}
                                </select>
                            </div>
                            OR
                            <div className="col-2 m-0 p-0">
                                <select value={link.page} onChange={(e) => setInputValue(link.id,{page:"",page:e.target.value})} >
                                    <option value="">Select Page</option>
                                    {page_list()}
                                </select>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-primary" onClick={()=>edit_nav(link.id)}>Edit</button>
                            </div>
                            <div className="col-1 m-0 p-0">
                                <button className="btn btn-danger" onClick={()=>remove_nav(link.id)}>Remove</button>
                            </div>
                        </div>
                    )
                })
            }
            </div>

            <div className="mt-3">
                <div>
                    <input className="mx-2" type="text" placeholder="Enter name" onChange={(e)=>setLink(e.target.value)} />
                    <select className="mx-2" onChange={(e) => setSelectedPage({page:"",card:e.target.value})}>
                        <option value="">selet card</option>
                        {card_list()}
                    </select>
                    or
                    <select onChange={(e) => setSelectedPage({page:e.target.value,card:""})}>
                        <option value="">selet page</option>
                        {page_list()}
                    </select>
                    <button className="btn btn-primary" onClick={add_nav}>Add Link</button>
                </div>
                <div>
                    <button className="btn btn-primary">Add</button>    
                </div>
            </div>
        </div>
    )
}

export default NavBarEditor;