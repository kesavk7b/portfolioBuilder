import { linkError, open_page, scrollToTop } from "../../../utils/Common";

const NavBarDefault = ({navLinks}) =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {
                        navLinks && navLinks.map((item, index) => (
                             (<a 
                                key={index}
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (item.page!=="") {
                                        open_page(item.page);
                                    } else if(item.link!==""){
                                        scrollToTop(item.link);
                                    }else{
                                        linkError();
                                    }
                                }}
                            >{item.text}</a>)
                        )
                        )
                    }
                </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBarDefault;