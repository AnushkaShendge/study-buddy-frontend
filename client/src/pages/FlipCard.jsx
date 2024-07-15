import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const FlipCard = ({ user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const CardFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  const sendFriendRequest = async (receiver_id) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/connect/send_friend_request/${receiver_id}/`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data) {
        setRequestSent(true);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-64 cursor-pointer">
      <div className="flip-card w-64 h-64 rounded-md" onClick={CardFlip}>
        <motion.div
          className="flip-card-inner w-full h-full relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="flip-card-front w-full h-full absolute flex flex-col items-center justify-center bg-gradient-to-b from-purple-300 to-indigo-400 rounded-md shadow-lg" style={{ backfaceVisibility: 'hidden' }}>
            <div className="w-28 h-28 rounded-full overflow-hidden">
              {user.image ? (
                <img src={user.image} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle size={112} className="text-black" />
              )}
            </div>
            <h2 className="mt-4 text-2xl text-white font-bold">{user.username}</h2>
          </div>
          <div className="flip-card-back w-full h-full absolute flex flex-col items-center justify-center bg-gradient-to-b from-cyan-200 to-blue-400 rounded-md shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="mt-2 text-gray-700">{user.email}</p>
            <button
              className={` text-white px-4 py-2 mt-8 rounded transition duration-300 ${requestSent ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={() => sendFriendRequest(user.id)}
              disabled={requestSent}
            >
              {requestSent ? "Request Sent" : "Send Request"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlipCard;
