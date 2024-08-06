import { useState, useEffect } from "react";
import axios from "axios";

function Results({ handleClose }) {
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            const res = await axios.get(`http://localhost:8000/testseries/get_test_detail/${localStorage.getItem('test_id')}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data) {
                setQuestions(res.data.answers);
                setScore(res.data.score);
            }
        }

        fetchDetails();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gradient-to-r from-orange-200 to-red-200 text-black p-6 rounded-xl shadow-lg w-full max-w-md overflow-y-auto max-h-full">
                <h2 className="text-xl font-semibold mb-4">Your Test Results</h2>
                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div key={item.question.id} className="mb-5 border p-4 mx-4 shadow-sm rounded-xl">
                            <h2 className="text-lg">{item.question.text}</h2>
                            <div className="p-2 mx-4 grid grid-cols-2 gap-4">
                                {[item.question.option1, item.question.option2, item.question.option3, item.question.option4].map((option, optIndex) => {
                                    const isSelected = item.selected_option === `option${optIndex + 1}`;
                                    const isCorrect = item.correct_option === `option${optIndex + 1}`;
                                    const bgColor = isCorrect ? 'bg-green-200' : (isSelected ? 'bg-red-200' : 'bg-white');

                                    return (
                                        <div key={optIndex} className={`mb-5 border p-2 rounded-xl ${bgColor}`}>
                                            <label className="flex items-center">
                                                <input 
                                                    type="radio" 
                                                    name={`option-${index}`} 
                                                    value={option} 
                                                    checked={isSelected}
                                                    className="mr-2" 
                                                    readOnly
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <button onClick={handleClose} className="bg-white border-2 border-orange-100 text-orange-500 py-3 px-4 rounded-lg font-semibold cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Results;
