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
import Avatar from './Avatar';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [friReq, setFriReq] = useState([]);
  const [edit, setEdit] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [pop , setPop] = useState(false)
  const [pic , setPic] = useState(null);
  
async function handleAvatar() {
  const res = await axios.get('http://localhost:8000/profile/image2/',{
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
    const res = await axios.get('http://localhost:8000/profile/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      setFriends(res.data.user.friends);
      const friendRequests = res.data.user.received_friend_requests.map(req => req.sender);
      setFriReq(friendRequests);
    }
  }

  async function handleAccept(id) {
    const res = await axios.post(`http://localhost:8000/accept_friend_request/${id}/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      fetchFriends();
    }
  }

  async function handleDecline(id) {
    const res = await axios.post(`http://localhost:8000/decline_friend_request/${id}/`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data) {
      fetchFriends();
    }
  }

  function handleClick() {
    setEdit(!edit);
  }

  return (
    <div className={`flex ${theme === 'light' ? '' : 'bg-black text-white'}`}>
      <SideBarComp />
      <div className="flex-grow mt-24 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center relative">
          <div className="flex gap-40 justify-between">
            {/* Profile Card */}
            <div className={`w-72 h-80 mt-5 rounded-lg border ${theme === 'light' ? 'bg-gradient-to-br from-cyan-100 to-pink-300' : 'bg-gradient-to-br from-cyan-100 to-pink-300 text-black'} p-5 shadow-lg mb-10 flex flex-col items-center`}>
              <div className="text-center mt-12">
                <h6 className="mt-4 text-center text-2xl">
                  Hello {!!user && (
                    <span className="text-orange-600 font-bold">{user.username}</span>
                  )}
                </h6>
                <p>
                  {!!user && (
                    <span className="text-gray-500 text-md">{user.email}</span>
                  )}
                </p>
                <button className="bg-gray-400 text-black px-3 py-2 mx-1 rounded-md text-lg mt-2 hover:bg-blue-700" onClick={handleClick}>Edit</button>
                {edit && (
                  <EditForm handleClose={handleClick} />
                )}
              </div>
            </div>
            <div className="flex flex-col mb-4 items-center justify-center gap-1">
              <FaCrown size={50} className='text-yellow-400 mr-8 -rotate-12' />
              <button className="w-56 h-56 bg-gray-300 rounded-full flex items-center justify-center transition duration-500 hover:scale-110 ease-in-out">
                {pic ? <img src={`http://localhost:8000${pic}`} alt='avatar'  className='rounded-full img' /> : <LiaUserPlusSolid size={120} className='' onClick={handleClickAvatar} />}
                {pop && <Avatar avatars={avatars} handleClose={handleClickAvatar} handleAvatar={setPic}  />}
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
                    <FriendCard key={fri.id} user={fri} isRequest={true} ReqAccept={() => handleAccept(fri.id)} ReqDecline={() => handleDecline(fri.id)} />
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
