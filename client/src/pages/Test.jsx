import { useEffect, useState } from "react";
import SideBarComp from "./SideBarComp";
import { FaNewspaper } from "react-icons/fa6";
import { PiEmptyBold } from "react-icons/pi";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import PopupTest from "./PopupTest";


function Test(){
    const [test , setTest] = useState([]);
    const [pop , setPop] = useState(false);
    function handleCreate(){
        setPop(!pop);
    }
    async function fetchTest(){
        const res= await axios.get('http://localhost:8000/testseries/get_previous_tests/' , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        if(res){
            setTest(res.data);
        }
    }
    useEffect(() => {
        fetchTest();
    } , [])
    return(
        <div className="flex h-screen">
            <SideBarComp />
            <div className="flex-1 p-4 mt-24">
                <div onClick={handleCreate} className="flex justify-center items-center">
                    <div className="bg-gray-100 w-1/2 h-36 text-black p-4 rounded-2xl flex items-center justify-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                        <FaNewspaper size={45} className="mr-4 text-blue-600" />
                        <div>
                            <h4 className="text-xl font-semibold">Create Test</h4>
                        </div>
                    </div>
                </div>
                {pop && <PopupTest handleClose={handleCreate} onAdded={fetchTest} />}
                <div className="w-full mt-5">
                    <div className="px-8 py-4">
                        <h1 className="font-bold text-2xl">Your recent Activity</h1>
                        <p className="text-sm">Here is all the progress history</p>
                    </div>
                    <div className="border shadow-md m-10 p-8 rounded-xl">
                        <div className={test.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "flex justify-center items-center h-full"}>
                            {test.length > 0 ? (
                                test.map((t , index) => (
                                    <TestBox key={index} test={t} index={index} />
                                ))
                            ) : (
                                <p className="font-semibold rounded-xl p-4 flex items-center justify-center text-xl">
                                    <PiEmptyBold size={25} className="text-xl mr-2" />Nothing scheduled uptill now
                                </p>
                            )}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
export default Test;

const TestBox = ({ test , index }) => (
    <div className={`p-4 rounded-md shadow-md hover:shadow-lg transition duration-500 hover:scale-110 ease-in-out h-64 ${test.completed ? 'bg-gradient-to-r from-green-200 to-green-400' : 'bg-gradient-to-r from-orange-500 via-pink-400 to-yellow-300'}`}>
        <button  className="p-2 transition duration-300 ease-in-out m-2"><MdDelete size={15} /></button>
        <h3 className="text-xl font-semibold text-center">Test - {index+1} </h3>
        <div className="flex justify-start items-center mt-4">
            {test.completed ? (
                <span className="text-orange-600 bg-green-100 px-2 py-1 rounded-md">Completed</span>
            ) : (
                <button className="bg-orange-100 text-orange-600 p-2 rounded">Incomplete</button>
            )}
        </div>
        <h3 className="font-light text-md mt-4">Created at {test.time}</h3>
    </div>
);