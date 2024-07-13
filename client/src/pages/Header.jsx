import { IoIosSearch } from "react-icons/io";
import { FaUserCircle, FaCrown, FaBlogger, FaMoon } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import { IoToggleSharp } from "react-icons/io5";
import { CgToggleOn } from "react-icons/cg";
import { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { FaUserAlt } from "react-icons/fa";
import { UserContext } from "../UserContext";

function Header({ sidebarOpen }) {
    const { user } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [redirect, setRedirect] = useState(false);

    const location = useLocation();
    const pathTitleMap = {
        '/dashboard': 'Dashboard',
        '/dashboard/pdf': 'Chat PDF',
        '/practice-dost': 'Practice-DOST'
    };
    const currentPath = location.pathname;
    const currentTitle = pathTitleMap[currentPath] || 'Dashboard';

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("theme");
        window.location.reload();
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div
            className={`shadow-md p-4 flex items-center justify-between border-b-4 fixed top-0 left-0 right-0 bg-white z-10 border-orange-400 transition-all duration-300 ${
                sidebarOpen ? 'ml-[196px]' : 'ml-[72px]'
            } header-container`}
            style={{
                backgroundColor: theme === 'light' ? '' : 'black',
                color: theme === 'light' ? '' : 'white'
            }}
        >
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">{currentTitle}</h1>
            </div>
            <div className="flex items-center">
                <div className="relative w-full max-w-xs rounded-full border border-orange-600">
                    <IoIosSearch size={24} className="absolute top-0 left-0 mt-2 ml-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-full pl-10 pr-4 py-2 w-full"
                    />
                </div>
                <div className="ml-4 flex items-center space-x-1 cursor-pointer relative">
                    <FaUserCircle size={40} className="text-gray-300" />
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <RiArrowDropDownLine size={30} />
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className={`absolute top-[64px] right-4 border rounded-lg shadow-xl p-2 w-48 bg-white `} style={theme === 'light' ? {} : { backgroundColor: "black", color: "white" }}>
                        <ul className="space-y-2">
                            <li className="flex gap-2 m-1 items-center border-b-2 rounded border-gray-300 mb-3 cursor-pointer">
                                <div className="mb-2 flex gap-2">
                                    <FaUserAlt className="text-md mt-1" />
                                    <Link to="/profile">{user && (
                                        <span className="text-md font-semibold">{user.username}</span>
                                    )}</Link>
                                </div>
                            </li>
                            <li className="flex gap-2 items-center cursor-pointer">
                                <FaCrown />
                                <Link to="/purchase">Purchase</Link>
                            </li>
                            <li className="flex gap-2 items-center cursor-pointer">
                                <CiBookmark />
                                <Link to="/bookmark">Bookmark</Link>
                            </li>
                            <li className="flex gap-2 items-center cursor-pointer">
                                <FaBlogger />
                                <Link to="/blogs">Blogs</Link>
                            </li>
                            <li className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center justify-center gap-2"><FaMoon /> Dark mode</div>
                                {theme === "light" ? (
                                    <IoToggleSharp size={24} onClick={toggleTheme} />
                                ) : (
                                    <CgToggleOn size={24} onClick={toggleTheme} />
                                )}
                            </li>
                        </ul>
                        <button className="rounded-lg p-2 w-full text-sm border-t-2 mt-2" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
