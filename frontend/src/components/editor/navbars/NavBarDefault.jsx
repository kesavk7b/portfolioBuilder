
const NavBarDefault = () =>{
        
    const test = () =>{
        console.log("working");
    }
    const linkError = ()=>{
        alert('navlin not linked to any page/card')
    }
    const navLinks=[
        {navlink:"Home",navId:"",navFunc:linkError},
        {navlink:"Home",navId:"",navFunc:linkError},
        {navlink:"Home",navId:"",navFunc:linkError},
        {navlink:"Home",navId:"",navFunc:linkError},
    ]
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light flex-column" onClick={test}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                   { navLinks.map((item,i)=>{
                        return (
                            <a
                                className="nav-link"
                                key={i}
                                href="/id"
                                onClick={(e) => {
                                    e.preventDefault();
                                    item.navFunc();
                                }}
                            >
                                {item.navlink}
                            </a>
                        );
                    })}
                </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBarDefault;