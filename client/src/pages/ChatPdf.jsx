import { useState } from "react";
import ChatpdfSidebar from './ChatpdfSidebar';
import { AiOutlineRobot } from "react-icons/ai";
import axios from "axios";

function ChatPdf() {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    const response = axios.post('http://localhost:8000/api/ask_question/' , {question});
    setReply(response.data.answer);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <ChatpdfSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-grow w-full p-6 ml-96 mt-28"> 
        <div className="flex flex-col items-center  p-6">
          <header className="flex items-center mb-6">
            <h1 className="text-3xl font-bold mr-2">Multi-PDF's</h1>
            <span className="text-3xl">📚</span>
            <h1 className="text-3xl font-bold mx-2">- Chat Agent</h1>
            <AiOutlineRobot className="text-3xl" />
          </header>
          <p className="text-md mb-4">Ask a Question from the PDF Files uploaded .. ✍️📤</p>
          <div className="w-full max-w-md">
            <input 
              type="text" 
              value={question} 
              onChange={handleQuestionChange} 
              placeholder="What are the pros of clustering" 
              className="w-full p-2 border rounded mb-4" 
            />
            <button 
              onClick={handleSubmit} 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
          <div className="mt-6 w-full max-w-md">
            <p className="font-semibold">Reply:</p>
            <p className="mt-2">{reply}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatPdf;
