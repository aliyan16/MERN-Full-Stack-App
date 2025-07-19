import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsSection = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get-users')
      .then(res => setFriends(res.data))
      .catch(err => console.error('Error fetching friends:', err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Friends</h3>
      <p>{friends.length} friends</p>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {friends.map((friend, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto"></div>
            <p className="text-xs mt-1">{friend.firstName} {friend.lastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsSection;
