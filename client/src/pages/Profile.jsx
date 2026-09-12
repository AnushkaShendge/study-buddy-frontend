import React, { useContext, useState, useEffect } from 'react';
import { FaStar, FaUserCircle, FaCrown } from 'react-icons/fa';
import SideBarComp from './SideBarComp';
import { UserContext } from '../UserContext';
import axios from 'axios';
import EditForm from './EditForm';
import { PiEmptyFill } from "react-icons/pi";
import { ThemeContext } from '../ThemeContext';
import { LiaUserPlusSolid } from "react-icons/lia";
import one from '../assets/4.jpg';
import two from '../assets/42.jpg';
import three from '../assets/43.jpg';
import four from '../assets/44.jpg';
import five from '../assets/45.jpg';
import six from '../assets/6.jpg';
import sev from '../assets/7.jpg';
import eight from '../assets/8.jpg';
import nine from '../assets/9.jpg';
import ten from '../assets/13.jpg';
import ele from '../assets/14.jpg';
import twelve from '../assets/15.jpg';
import thriteen from '../assets/16.jpg';
import fourteen from '../assets/17.jpg';
import fifteen from '../assets/18.jpg';
import sixteen from '../assets/21.jpg';
import seventeen from '../assets/26.jpg';
import q from '../assets/27.jpg';
import w from '../assets/28.jpg';
import r from '../assets/29.jpg';
import t from '../assets/31.jpg';
import i from '../assets/32.jpg';
import y from '../assets/33.jpg';
import o from '../assets/34.jpg';
import p from '../assets/35.jpg';
import a from '../assets/36.jpg';
import s from '../assets/37.jpg';
import d from '../assets/38.jpg';
import f from '../assets/39.jpg';
import g from '../assets/40.jpg';
import l from '../assets/5.jpg';
import bg from '../assets/bg.jpg'
import Avatar from './Avatar';
import './../index.css'

const Profile = () => {
  const [friends, setFriends] = useState([]);
  const [friReq, setFriReq] = useState([]);
  const [popEdit, setPopEdit] = useState(false);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [pop , setPop] = useState(false)
  const [pic , setPic] = useState(null);
  
  async function handleAvatar() {
    const res = await axios.get(`${API_BASE_URL}/profile/image2/`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    })
    if(res.data){
      setPic(res.data.profile_image);
    }
  }

  const avatars = [
    one,two , three , four , five , six , sev , eight , nine , ten , ele , twelve , thriteen , fourteen , fifteen , sixteen , seventeen , q , w , r, t , i , y , o , p, a , s, d , f , g , l
  ];

  function handleClickAvatar(){
    setPop(!pop)
  }

  useEffect(() => {
    fetchFriends();
    handleAvatar();
    
  }, []);

  async function fetchFriends() {
    const res = await axios.get(`${API_BASE_URL}/profile/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      setFriends(res.data.user.friends);
      const friendRequests = res.data.user.received_friend_requests
      .filter(req => req.status === 'pending') 
      .map(req => ({
        id: req.id,
        sender: req.sender
      }));

      setFriReq(friendRequests);
    }
  }

  async function handleAccept(id) {
    const res = await axios.post(`${API_BASE_URL}/accept_friend_request/${id}/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      fetchFriends();
    }
  }

  async function handleDecline(id) {
    const res = await axios.post(`${API_BASE_URL}/decline_friend_request/${id}/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      fetchFriends();
    }
  }

  function handleClick() {
    setPopEdit(!popEdit);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBarComp />
      <div className={`flex-1 flex flex-col items-center justify-between p-6 ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-black'} overflow-y-auto`}>
        <h1 className="text-[#3F48C4] text-5xl font-extrabold mb-8 tracking-wider font-sans uppercase underline decoration-rose-500 underline-offset-8">User Profile</h1>

        {/* Profile Card */}
        <div className="w-full max-w-4xl shadow-xl rounded-2xl p-6 border transition duration-300 transform hover:scale-102 mb-8" style={{ background: 'linear-[#FAFAFA]' }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h2 className="text-[#DF662A] text-4xl font-bold mb-2 uppercase">{user.username}</h2>
                <p className="text-gray-600 mb-[#F3F4F6] text-xl font-medium">{user.email}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="relative inline-block text-left">
                    <button onClick={handleClick} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 font-semibold shadow-md transition duration-300">Edit Profile</button>
                    {popEdit && (
                      <EditForm handleClose={handleClick} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-8 items-center justify-center gap-1">
              <FaCrown size={50} className='text-yellow-400 mr-8 -rotate-12' />
              <button className="w-56 h-56 bg-gray-300 rounded-full flex items-center justify-center  ">
                {pic ? <img src={pic.startsWith('http') ? pic : `${API_BASE_URL}${pic}`} alt='avatar' onClick={handleClickAvatar} className='rounded-full img hover:scale-110 ease-in-out transition duration-500 border-glow' /> : <LiaUserPlusSolid size={90} className='' onClick={handleClickAvatar} />}
                {pop && <Avatar avatars={avatars} handleClose={handleClickAvatar} handleAvatar={setPic} />}
              </button>
            </div>
          </div>
        </div>

        {/* Friend Requests */}
        <div className="w-full max-w-2xl">
          <div className='shadow-lg rounded-xl border p-4 mb-10'>
            <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Friend Requests</h2>
            <div className="p-4 rounded-lg">
              <div className={`${friReq.length > 0 ? 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4' : 'flex items-center justify-center'}`}>
                {friReq.length > 0 ? (
                  friReq.map(fri => (
                    <FriendCard1 key={fri.id} user={fri} isRequest={true} ReqAccept={() => handleAccept(fri.id)} ReqDecline={() => handleDecline(fri.id)} />
                  ))
                ) : (
                  <div className='p-3 rounded-xl bg-orange-400 inline-block'><p className='flex gap-2 text-lg font-semibold'><PiEmptyFill size={30} className='' />No friend requests</p></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Friends List */}
        <div className="w-full max-w-2xl">
          <div className='shadow-lg rounded-xl border p-4'>
            <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Friends</h2>
            <div className="p-4 rounded-lg">
              <div className={`${friends.length > 0 ? 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4' : 'flex items-center justify-center'}`}>
                {friends.length > 0 ? (
                  friends.map((friend, index) => (
                    <FriendCard key={index} user={friend} isRequest={false} />
                  ))
                ) : (
                  <div className='p-3 rounded-xl bg-orange-400 inline-block'><p className='flex gap-2 text-lg font-semibold'><PiEmptyFill size={30} className='' />No friends to show</p></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const FriendCard = ({ user, isRequest, ReqAccept, ReqDecline }) => (
  <div className="w-60 p-6 rounded-xl border shadow-md hover:shadow-lg transition duration-500 hover:scale-105 ease-in-out flex flex-col items-center">
    <FaUserCircle size={70} className='text-gray-400 mb-4' />
    <div className="text-center">
      <p className="text-xl font-semibold text-orange-600">{user.username}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
    {isRequest && (
      <div className="mt-4 flex gap-2">
        <button onClick={ReqAccept} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Accept</button>
        <button onClick={ReqDecline} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decline</button>
      </div>
    )}
  </div>
);

const FriendCard1 = ({ user, isRequest, ReqAccept, ReqDecline }) => (
  <div className="w-60 p-6 rounded-xl border shadow-md hover:shadow-lg transition duration-500 hover:scale-105 ease-in-out flex flex-col items-center">
    <FaUserCircle size={70} className='text-gray-400 mb-4' />
    <div className="text-center">
      <p className="text-xl font-semibold text-orange-600">{user.sender.username}</p>
      <p className="text-sm text-gray-500">{user.sender.email}</p>
    </div>
    {isRequest && (
      <div className="mt-4 flex gap-2">
        <button onClick={ReqAccept} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Accept</button>
        <button onClick={ReqDecline} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Decline</button>
      </div>
    )}
  </div>
);
