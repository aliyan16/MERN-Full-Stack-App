import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FriendsSection({ userId }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/friends`);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Friends</h3>
      <p className="mb-3">{friends.length} friends</p>
      <div className="grid grid-cols-3 gap-2">
        {friends.slice(0, 6).map((friend) => (
          <div key={friend._id} className="text-center">
            <img 
              src={friend.profilePic || '/default-profile.png'} 
              alt={friend.name} 
              className="w-full h-20 object-cover rounded mb-1" 
            />
            <p className="text-xs truncate">{friend.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendsSection;