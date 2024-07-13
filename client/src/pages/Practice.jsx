import { useContext, useEffect, useState } from "react";
import SideBarComp from "./SideBarComp";
import { ThemeContext } from "../ThemeContext";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { HiFolderPlus } from "react-icons/hi2";
import PopupForm from "./PopupForm"; 
import PopupForm1 from "./PopupForm1";
import { PiEmptyBold } from "react-icons/pi";
import axios from "axios";

function Practice() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { theme } = useContext(ThemeContext);
    const [popUp, setPopUp] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [selfStudy, setSelfStudy] = useState([]);

    
    function handleAdd() {
        setPopUp(!popUp);
    }

    function handlePrevDate() {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setCurrentDate(prevDate);
    }

    function handleNextDate() {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);
    }

    useEffect(() => {
        fetchAssignment(currentDate);
        fetchSelfStudy(currentDate);
    }, [currentDate]);

    async function fetchAssignment(currentDate) {
        const formattedDate = formatDate(currentDate);
        const res = await axios.get(`http://localhost:8000/todolist/assignment?date=${formattedDate}`);
        setAssignments(res.data.assignment);
    }

    async function fetchSelfStudy(currentDate) {
        const formattedDate = formatDate(currentDate);
        const res = await axios.get(`http://localhost:8000/selfStudy?date=${formattedDate}`);
        setSelfStudy(res.data.selfStudy);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const completeAssignment = (assignmentId) => {
        axios.post(`http://localhost:8000/todolist/assignment/complete_assignments/${assignmentId}/`)
            .then(() => {
                fetchAssignment(currentDate);
            })
            .catch(error => console.error(error));
    };

    const completeSelfStudy = (selfStudyId) => {
        axios.post(`http://localhost:8000/todolist/selfStudy/complete_selfstudy/${selfStudyId}/`)
            .then(() => {
                fetchSelfStudy(currentDate);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="flex">
            <SideBarComp />
            <div className={`p-4 w-full mt-[76px] ${theme === 'light' ? '' : 'bg-black text-white'}`}>
                <header className={`flex flex-col md:flex-row items-center justify-between m-10 p-8 rounded-lg shadow-lg border-2 border-gray-200 ${theme === 'light' ? '' : 'bg-black text-white'}`}>
                    <h1 className="text-2xl font-semibold font-serif mb-4 md:mb-0">{currentDate.toDateString()}</h1>
                    <div className="flex items-center">
                        <button
                            onClick={handlePrevDate}
                            className="bg-orange-500 text-white p-2 rounded-full mr-3 hover:bg-orange-600 transition duration-300 ease-in-out"
                        >
                            <CiCircleChevLeft size={24} />
                        </button>
                        <button
                            onClick={handleNextDate}
                            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out"
                        >
                            <CiCircleChevRight size={24} />
                        </button>
                    </div>
                </header>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-4 px-10">
                    <div onClick={handleAdd} className="bg-gray-100 text-black p-4 rounded-xl flex items-center justify-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                        <HiFolderPlus size={40} className="mr-4 text-blue-600" />
                        <div>
                            <h4 className="text-md font-semibold">Add Assignment</h4>
                        </div>
                    </div>
                    {popUp && <PopupForm1 handleClose={handleAdd} />}
                    <div onClick={handleAdd} className="bg-gray-100 text-black p-4 rounded-xl flex items-center justify-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                        <HiFolderPlus size={40} className="mr-4 text-blue-600" />
                        <div>
                            <h4 className="text-md font-semibold">Add Self Study</h4>
                        </div>
                    </div>
                    {popUp && <PopupForm handleClose={handleAdd} />}
                </div>
                <div className="border border-lg shadow-sm m-10 p-8 rounded-xl">
                    <h2 className="text-2xl text-orange-300 font-light text-center mb-8">Assignments for {currentDate.toDateString()}</h2>
                    <div className={assignments.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "flex justify-center items-center h-full"}>
                        {assignments.length > 0 ? (
                            assignments.map(assignment => (
                                <AssignmentBox key={assignment._id} assignment={assignment} onComplete={() => completeAssignment(assignment._id)} />
                            ))
                        ) : (
                            <p className="font-bold border rounded-xl p-4 bg-orange-500 flex items-center justify-center">
                                <PiEmptyBold className="text-xl mr-2" />Nothing scheduled for this day
                            </p>
                        )}
                    </div>
                </div>
                <div className="border border-lg shadow-sm m-10 p-8 rounded-xl">
                    <h2 className="text-2xl text-orange-300 font-light text-center mb-8">Self Study Assignments for {currentDate.toDateString()}</h2>
                    <div className={selfStudy.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "flex justify-center items-center h-full"}>
                        {selfStudy.length > 0 ? (
                            selfStudy.map(selfStudy => (
                                <SelfStudyBox key={selfStudy._id} selfStudy={selfStudy} onComplete={() => completeSelfStudy(selfStudy._id)} />
                            ))
                        ) : (
                            <p className="font-bold border rounded-xl p-4 bg-orange-500 flex items-center justify-center">
                                <PiEmptyBold className="text-xl mr-2" />Nothing scheduled for this day
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Practice;

const AssignmentBox = ({ assignment, onComplete }) => (
    <div className="bg-orange-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-center">{assignment.subject}</h3>
        <p className="text-sm text-gray-600 text-center mt-2">{assignment.chapter}</p>
        <div className="flex justify-end mt-4">
            {assignment.completed ? (
                <span className="text-green-700 bg-green-100 px-2 py-1 rounded-md">Completed</span>
            ) : (
                <button onClick={onComplete} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">Complete</button>
            )}
        </div>
    </div>
);

const SelfStudyBox = ({ selfStudy, onComplete }) => (
    <div className="bg-orange-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-center">{selfStudy.subject}</h3>
        <p className="text-sm text-gray-600 text-center mt-2">{selfStudy.chapter}</p>
        <div className="flex justify-end mt-4">
            {selfStudy.completed ? (
                <span className="text-green-700 bg-green-100 px-2 py-1 rounded-md">Completed</span>
            ) : (
                <button onClick={onComplete} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">Complete</button>
            )}
        </div>
    </div>
);
