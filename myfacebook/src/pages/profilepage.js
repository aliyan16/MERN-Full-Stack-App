import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendsSection from "../components/profilePageComponents/friendsSection";
import ProfileImages from "../components/profilePageComponents/profileImages";

function ProfilePage() {
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = "currentUserId"; // Replace with actual user ID from auth context

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          axios.get(`/api/users/${userId}`),
          axios.get(`/api/users/${userId}/posts`)
        ]);
        
        setUser(userRes.data);
        setPosts(postsRes.data);
        setCoverPic(userRes.data.coverPhoto || null);
        setProfilePic(userRes.data.profilePhoto || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('coverPhoto', file);
      
      try {
        const response = await axios.put(`/api/users/${userId}/cover`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        const url = URL.createObjectURL(file);
        setCoverPic(url);
        // Optionally update user data
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }
    }
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePhoto', file);
      
      try {
        const response = await axios.put(`/api/users/${userId}/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        const url = URL.createObjectURL(file);
        setProfilePic(url);
        // Optionally update user data
      } catch (error) {
        console.error("Error uploading profile photo:", error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cover Photo */}
      <div className="relative w-full h-60 bg-gray-300">
        {coverPic && (
          <img
            src={coverPic}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-2 right-2">
          <label className="bg-white text-sm px-2 py-1 rounded cursor-pointer shadow">
            Edit Cover
            <input type="file" accept="image/*" hidden onChange={handleCoverChange} />
          </label>
        </div>
        
        {/* Profile Picture */}
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <div className="relative">
            <img
              src={profilePic || '/default-profile.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white text-xs px-1 py-0.5 rounded-full cursor-pointer shadow">
              ✎
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfileChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-4">
          <ProfileImages userId={userId} />
          <FriendsSection userId={userId} />
        </div>

        {/* Main Center */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{user.name || "User"}</h2>
            <p className="text-gray-600">{user.bio || ""}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Posts</h3>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-gray-100 p-4 rounded mb-3">
                  <p>{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="mt-2 max-w-full rounded" />
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;