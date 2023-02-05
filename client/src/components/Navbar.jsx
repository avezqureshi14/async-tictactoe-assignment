import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
    if (isDarkMode) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }
    setIsDarkMode(!isDarkMode);
};

    useEffect(() => {
        document.body.classList.remove("light-theme");
        document.body.classList.remove("dark-theme");
        document.body.classList.add(isDarkMode ? "dark-theme" : "light-theme");
    }, [isDarkMode]);

    return (
        <>
            <header class="header" id="header">
                <nav class="nav container">
                    <a href="google.com" class="nav__logo">Go to Google</a>

                   
                    <div className="topNavi">
                        <img src={logo} alt="" class="nav__img" />
                        <i onClick={toggleDarkMode} class='bx bxl-youtube' ></i>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
