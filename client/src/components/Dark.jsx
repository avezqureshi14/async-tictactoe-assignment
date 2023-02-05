import React from 'react'
import Navbar from './Navbar';

const Dark = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }
};

useEffect(() => {
    document.body.classList.remove("light-theme");
    document.body.classList.remove("dark-theme");
    document.body.classList.add(isDarkMode ? "dark-theme" : "light-theme");
}, [isDarkMode]);

  return (
    <>
    <Navbar toggleDarkMode={toggleDarkMode} />
    </>
  )
}

export default Dark