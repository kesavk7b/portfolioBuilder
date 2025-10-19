import React, { useContext, useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar1 = () =>{
    return (
        <React.Fragment>
            <nav className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-6 py-1 flex w-full h-12">
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
                        {/* {theme === 'dark' && (
                            <button onClick={() => set_color_theme('primary')}>Switch to Primary</button>
                        )}
                        {theme === 'primary' && (
                            <button onClick={() => set_color_theme('dark')}>Switch to Dark</button>
                        )} */}
    
                    </ul>
    
                </div>
            </nav>
        </React.Fragment>
    )
}

export default NavBar1;