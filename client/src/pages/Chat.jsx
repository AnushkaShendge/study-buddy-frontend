import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Background from '../assets/back.jpg';
import { MdSend } from "react-icons/md";
import { ThemeContext } from '../ThemeContext';
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import background1 from '../assets/back1.jpg'

function Chat(){
  const {theme , toggleTheme} = useContext(ThemeContext)
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    if(selectedUser != null){
      fetchMessage(selectedUser);
    }
  }, [selectedUser]);

  async function handleUser() {
    const res = await axios.get('http://localhost:8000/connect/friends/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.data.friends) {
      setUsers(res.data.friends);
    }
  }

  async function SendMessage(selectedUser) {
    setInput('');
    const res = await axios.post(`http://localhost:8000/connect/chat/${selectedUser.username}/`, { content: input } , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if(res.data){
        console.log('Message sent');
        fetchMessage(selectedUser); // Fetch messages again to update the chat
    }
  }

  async function fetchMessage(selectedUser) {
    const res = await axios.get(`http://localhost:8000/connect/chat/${selectedUser.username}/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if(res.data){
        setMessages(res.data.messages.map(message => ({
            role: message.sender === selectedUser.username ? 'receiver' : 'sender',
            content: message.content
        })));
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-tr from-cyan-200 via-purple-300 to-violet-400 p-4">
        <div className='w-full flex justify-between'>
            <input
                type="text"
                placeholder="Search people, groups and messages"
                className="px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button className='mb-4 p-2' >{theme === 'light' ? <FaMoon size={24} onClick={toggleTheme } /> :  <IoIosSunny  size={24} onClick={toggleTheme } />}</button>
        </div>
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              className={`flex items-center p-2 bg-gray-200 rounded-lg mb-2 cursor-pointer hover:bg-gray-300 ${
                selectedUser && selectedUser.id === user.id ? 'bg-gray-400' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={`http://localhost:8000${user.profile_image}`}
                alt={user.username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-bold text-xl">{user.username}</div>
                <div className="text-sm text-gray-600">{user.lastMessage}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col p-4 relative ${theme === 'light' ? '' : 'bg-black text-white'}`}  >
        <div
          className={`absolute inset-0 bg-cover bg-center ${theme === 'light' ? 'opacity-40' : 'opacity-30'}`}
          style={{ backgroundImage: theme === 'light' ? `url(${Background})` : `url(${background1})` }}
        ></div>
        {selectedUser ? (
          <div className={`relative flex flex-col h-full`}>
            <div className="flex items-center mb-4 p-2 border-b border-gray-500 bg-opacity-70 rounded-lg">
              <img
                src={`http://localhost:8000${selectedUser.profile_image}`}
                alt={selectedUser.username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <h2 className="text-xl font-bold">{selectedUser.username}</h2>
            </div>
            <div className="flex-1 bg-opacity-80 p-4 rounded-lg overflow-auto">
              {/* Chat messages will go here */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${msg.role === 'sender' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`bg-gradient-to-r border ${
                      msg.role === 'sender'
                        ? 'from-green-300 to-green-100 text-black'
                        : 'from-blue-500 to-cyan-200 text-black'
                    } p-2 rounded-xl w-auto max-w-xs`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <input
                value={input}
                type="text"
                placeholder="Type a message"
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button onClick={() => SendMessage(selectedUser)} className="bg-orange-400 text-white p-3 rounded-lg mx-4"><MdSend size={16}/></button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <h2 className="text-3xl text-orange-600 font-bold leading-4">
              Select a user to start chatting
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
