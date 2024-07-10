import { useContext, useState, useEffect } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import robot from '../assets/Robot.jpg'
import { LuUpload } from "react-icons/lu";
import { FaFileDownload } from "react-icons/fa";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";

function ChatpdfSidebar({ isOpen, toggleSidebar }) {
    const { theme } = useContext(ThemeContext);
    const [expanded, setExpanded] = useState(isOpen);
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        setExpanded(isOpen);
    }, [isOpen]);

    const handleFileChange = (event) => {
        // Convert FileList to an Array
        const files = Array.from(event.target.files);
        setPdfs(files);
        console.log(files); // Log the selected files
    };

    const handleUpload = async () => {
        const formData = new FormData();
        pdfs.forEach((pdf, index) => {
            formData.append(`pdfs[${index}]`, pdf);
        });

        // Log the FormData keys and values
        for (let pair of formData.entries()) {
            console.log(thasbbev)
            console.log(pair[0]);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/upload_pdfs/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload successful', response.data);
        } catch (error) {
            console.error('Error uploading PDFs', error);
        }
    };

    return (
        <aside className={`fixed h-screen ${theme === 'light' ? '' : 'bg-black text-white'}`}>
            <nav className="h-full flex flex-col border-r shadow-sm p-4">
                <div className="flex justify-end">
                    <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-gray-100">
                        {expanded ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                    </button>
                </div>
                <div className={`flex flex-col items-center ${expanded ? "" : "w-0 text-white"}`}>
                    <img src={robot} alt="Robot" className="mb-16 h-72" />
                    <div className="text-center ">
                        <div className="flex items-center justify-center">
                            <h1 className="text-2xl flex gap-4 font-bold mb-4 leading-5">
                                <FaFileDownload size={35} className="text-yellow-400" />
                                PDF File's Section
                            </h1>
                        </div>
                        <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange} 
                            className="mb-2" 
                        />
                        <p className="text-md mb-4">Upload your PDF Files & Click on the Submit & Process Button</p>
                        <div className="flex items-center justify-center mt-8">
                            <button 
                                className="bg-blue-500 text-white gap-2 flex py-2 px-4 rounded-lg hover:bg-blue-600" 
                                onClick={handleUpload}
                            >
                                <LuUpload size={20} />Upload PDFs
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export default ChatpdfSidebar;
