import React, { useContext, useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const NavBar = () =>{
    const navigate = useNavigate();
    const {isLogged,setAuthToken,setLogin,theme,setTheme} = useContext(AuthContext)
    const set_color_theme = (theme) =>{
        localStorage.setItem('theme',theme);
        setTheme(theme);
        console.log(theme)
    }
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
        <nav className="bg-[var(--color-surface)] text-[var(--color-text-primary)] px-6 py-1 flex w-full">
            <div className="text-xl font-bold mb-2 md:mb-0">WebBuilder</div>
            <div className="flex justify-between items-center w-full">
                <ul className="hidden md:flex gap-6 text-lg">
                    <li className="hover:text-gray-200 cursor-pointer">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-gray-200 cursor-pointer">
                        <a href="/editor">Editor</a>
                    </li>
                    <li className="hover:text-gray-200 cursor-pointer">
                        <a href="/bookmark">Bookmark</a>
                    </li>
                    <li className="hover:text-gray-200 cursor-pointer">
                        <a href="/component">Component</a>
                    </li>
                </ul>
                <ul className="hidden md:flex gap-6 text-lg flex">
                    {theme === 'dark' && (
                        <button onClick={() => set_color_theme('primary')}>Switch to Primary</button>
                    )}
                    {theme === 'primary' && (
                        <button onClick={() => set_color_theme('dark')}>Switch to Dark</button>
                    )}

                    {isLogged?
                        (<button onClick={logout} className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100">
                            logout
                        </button>):
                        (
                            <React.Fragment>
                                <button 
                                    className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100" 
                                    type="submit" 
                                    onClick={() => navigate('/register',{state:{type:"reg"}})}
                                >
                                    sign-ups
                                </button>
                                <button 
                                    className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100" 
                                    type="submit" onClick={() => navigate('/login',{state:{type:"log"}})}
                                >
                                    login
                                </button>
                            </React.Fragment>
                        )
                    }
                </ul>

            </div>
        </nav>
    )
}

export default NavBar;