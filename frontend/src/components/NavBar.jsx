import { useContext, useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const NavBar = () =>{
    const navigate = useNavigate();
    const {isLogged,setAuthToken,setLogin} = useContext(AuthContext)
    const logout = () =>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setLogin(false);
        setAuthToken(null);
        navigate('/login',{state:{type:"log"}})
    }

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            setLogin(true);
            setAuthToken(token);
        } else {
            setLogin(false);
            setAuthToken(null);
        }
    }, []);

    // function openFullscreen() {
    //     const elem = document.documentElement;
    //     if (elem.requestFullscreen) {
    //     elem.requestFullscreen();
    //     } else if (elem.webkitRequestFullscreen) { // Safari
    //     elem.webkitRequestFullscreen();
    //     } else if (elem.msRequestFullscreen) { // IE11
    //     elem.msRequestFullscreen();
    //     }
    // }

    // function closeFullscreen() {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.webkitExitFullscreen) { /* Safari */
    //         document.webkitExitFullscreen();
    //     } else if (document.msExitFullscreen) { /* IE11 */
    //         document.msExitFullscreen();
    //     }
    // }
    // const [toggleFullScreen, setToggleFullScreen] = useState(false);  
    // const setScreen = () =>{
    //     if (toggleFullScreen) {
    //         closeFullscreen();
    //     } else {
    //         openFullscreen();
    //     }
    //     setToggleFullScreen(!toggleFullScreen);

    // }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Portfolio</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    
                    {!isLogged?(
                        <>
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height":"100px;"}}>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="about">about</a>
                                </li>
                            </ul>
                            <button className="btn btn-outline-success" type="submit" onClick={() => navigate('/register',{state:{type:"reg"}})}>sign-ups</button>
                            <button className="btn btn-outline-success" type="submit" onClick={() => navigate('/login',{state:{type:"log"}})}>logins</button>
                        </>
                    ):(
                        <>
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{"--bs-scroll-height":"100px;"}}>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="about">about</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="editor">Editor</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="test">test</a>
                                </li>
                            </ul>
                            {/* <button className="btn btn-outline-primary" onClick={setScreen}>test</button> */}
                            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        </>
                    )

                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;