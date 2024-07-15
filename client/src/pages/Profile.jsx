import React, { useContext, useState, useEffect } from 'react';
import { FaStar, FaUserCircle, FaCrown } from 'react-icons/fa';
import SideBarComp from './SideBarComp';
import { UserContext } from '../UserContext';
import axios from 'axios';
import EditForm from './EditForm';
import { PiEmptyFill } from "react-icons/pi";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [friReq, setFriReq] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchFriends();
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
    <div className="flex">
      <SideBarComp />
      <div className="flex-grow mt-24">
        <div className="flex flex-col items-center">
          {/* Profile Card */}
          <div className="w-64 rounded-lg border bg-gray-100 p-5 shadow-lg mb-10">
            <div className="text-center">
              <div className='mt-3 ml-20 transform -rotate-12'>
                <FaCrown size={30} className='text-yellow-400' />
              </div>
              <div className="w-14 h-14 mx-auto rounded-full mt-4">
                <FaUserCircle size={60} className='text-gray-400' />
              </div>
              <h6 className="mt-4 text-center text-xl">
                Hello {!!user && (
                  <span className="text-orange-600 font-bold">{user.username}</span>
                )}
              </h6>
              <p>
                {!!user && (
                  <span className="text-gray-500 text-xs">{user.email}</span>
                )}
              </p>
              <button className="text-blue-500 text-sm mt-2 hover:underline" onClick={handleClick}>Edit</button>
              {edit && (
                <EditForm handleClose={handleClick} />
              )}
            </div>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center mb-4">
                <FaStar className="text-yellow-500" />
                <span className="ml-2 text-sm">5 Stars</span>
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
    </div>
  );
};

export default Profile;

const FriendCard = ({ user, isRequest, ReqAccept, ReqDecline }) => (
  <div className="w-60 p-6 rounded-xl border shadow-md hover:shadow-lg transition duration-500 hover:scale-105 ease-in-out flex flex-col items-center">
    <FaUserCircle size={50} className='text-gray-400 mb-4' />
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
