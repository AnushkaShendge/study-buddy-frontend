import { useContext } from "react";
import SideBarComp from "./SideBarComp";
import { ThemeContext } from "../ThemeContext";
import { MdScience } from "react-icons/md";
import { TbMathSymbols } from "react-icons/tb";
import { GiChemicalDrop } from "react-icons/gi";

function Resource(){
    const {theme} = useContext(ThemeContext)
    return(
        <div className={`flex ${theme === 'light' ? '' : 'bg-black text-white'}`}>
            <SideBarComp />
            <div className="flex mt-24 w-full">
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mb-4 px-10 py-10 w-full ">
                    <div  className="h-40 bg-gray-100 text-black p-4 rounded-2xl flex items-center justify-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                        <MdScience size={40} className="mr-4 text-blue-600" />
                        <div>
                            <h4 className="text-md font-semibold">Science</h4>
                        </div>
                    </div>
                    <div  className=" bg-gray-100 text-black p-4 rounded-2xl flex items-center justify-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                        <TbMathSymbols size={40} className="mr-4 text-blue-600" />
                        <div>
                            <h4 className="text-md font-semibold">Maths</h4>
                        </div>
                    </div>
                    <div  className=" bg-gray-100 text-black p-4 rounded-2xl flex items-center justify-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                        <GiChemicalDrop size={40} className="mr-4 text-blue-600" />
                        <div>
                            <h4 className="text-md font-semibold">Chemistry</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resource;