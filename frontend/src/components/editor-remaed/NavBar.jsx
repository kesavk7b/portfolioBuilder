const NavBar = ({class_name="kb-navbar",background_color="white",navitems=[{text:"test"},{text:"test"},{text:"test"},{text:"test"}]}) =>{
    const linkError = () =>{
        console.log("scroll")
    }
    const scrollToTop = ()=>{
        console.log("scrollToTop")
    }
    const open_page = () =>{
        console.log("open_page")
    }
    return (
        <nav className={class_name} style={{backgroundColor:background_color}}>
            <div className="left-section">
                <a href="#">navbar</a>
                <ul>
                    {navitems.map((item, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (item.page) {
                                        open_page(item.page);
                                    } else if (item.link) {
                                        scrollToTop(item.link);
                                    } else {
                                        linkError();
                                    }
                                }}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right-section">
                <ul>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;