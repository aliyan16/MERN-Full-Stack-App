import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileHeader = ({ userId,user }) => {
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if(!userId){return}
    axios.get(`http://localhost:5000/get-user-profile/${userId}`)
      .then(res => {
        if (res.data.profilePic) {
          setProfilePic(`http://localhost:5000/media/${res.data.profilePic.fileId}`);
        }
        if (res.data.coverPic) {
          setCoverPic(`http://localhost:5000/media/${res.data.coverPic.fileId}`);
        }
      }).catch(err => console.error('Error fetching profile data:', err));
  }, [userId]);

  const uploadPic = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('media', file);

    axios.post(`http://localhost:5000/update-${type}-pic/${userId}`, formData)
      .then(() => window.location.reload())  // Simple reload to reflect changes
      .catch(err => console.error(`Error uploading ${type} pic:`, err));
  };

  return (
    <div className="relative w-full h-60 bg-gray-300">
      <img src={coverPic} alt="Cover" className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2">
        <label className="bg-white text-sm px-2 py-1 rounded cursor-pointer shadow">
          Edit Cover
          <input type="file" accept="image/*" hidden onChange={(e) => uploadPic(e, 'cover')} />
        </label>
      </div>

      <div className="absolute bottom-0 left-8 transform translate-y-1/2">
        <div className="relative">
          <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white object-cover" />
          <label className="absolute bottom-0 right-0 bg-white text-xs px-1 py-0.5 rounded-full cursor-pointer shadow">
            ✎
            <input type="file" accept="image/*" hidden onChange={(e) => uploadPic(e, 'profile')} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
