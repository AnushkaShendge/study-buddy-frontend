import Sidebar, { SidebarItem } from "./Sidebar";
import { FaHome } from "react-icons/fa";
import { IoSettings, IoDocumentText } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoMdHelp } from "react-icons/io";
import { useState } from "react";
import Header from "./Header";
import { FaFilePdf } from "react-icons/fa6";

function SideBarComp() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                    <SidebarItem icon={<FaHome size={25} className="rounded-md p-1 text-orange-600 my-1" />} text="Home" to="/dashboard" active />
                    <SidebarItem icon={<LiaUserFriendsSolid size={20} className="rounded-md text-orange-600 my-1" />} text="DOST" to="/dashboard/dost" alert />
                    <SidebarItem icon={<IoDocumentText size={20} className="rounded-md text-orange-600 my-1" />} text="Test Series" to="/dashboard/test" />
                    <SidebarItem icon={<BsGraphUpArrow size={20} className="rounded-md text-orange-600 my-1" />} text="Student Analysis" to="/dashboard/stats" />
                    <SidebarItem icon={<FaFilePdf size={20} className="rounded-md text-orange-600 my-1" />} text="Chat-pdf" to="/dashboard/pdf" />
                    <hr className="my-3" />
                    <SidebarItem icon={<IoSettings size={20} />} text="Settings" to="/dashboard/settings" />
                    <SidebarItem icon={<IoMdHelp size={20} />} text="Help" to="/dashboard/help" />
                </Sidebar>
                <div className={`flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-[196px]' : 'ml-[72px]'}`}>
                    <Header sidebarOpen={sidebarOpen} />
                </div>
            </div>
        </>
    );
}

export default SideBarComp;
