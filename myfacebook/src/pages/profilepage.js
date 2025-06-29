import React, { useState } from "react";

function ProfilePage() {
    const [coverPic,setCoverPic]=useState(null)
    const [profilePic,setProfilePic]=useState(null)

    const handleCoverChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            const url=URL.createObjectURL(file)
            setCoverPic(url)
        }
    }

    const handleProfileChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            const url=URL.createObjectURL(file)
            setProfilePic(url)
        }
    }


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cover Photo */}
      <div className="relative w-full h-60 bg-gray-300">
        <img
          src={coverPic}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
            <label className="bg-white text-sm px-2 py-1 rounded cursor-pointer shadow">
                Edit Cover
                <input type="file" accept="image/*" hidden onChange={handleCoverChange} />
            </label>
        </div>
        {/* Profile Picture */}
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
            <div className="relative" >
                <img
                src={profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />

                {/* Profile Edit Button */}
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
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {/* Map photos */}
              <img src="photo1_url" alt="Photo 1" className="w-full h-20 object-cover rounded" />
              <img src="photo2_url" alt="Photo 2" className="w-full h-20 object-cover rounded" />
              <img src="photo3_url" alt="Photo 3" className="w-full h-20 object-cover rounded" />
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Friends</h3>
            <p>807 friends</p>
            {/* Optionally add small friend thumbnails */}
          </div>
        </div>

        {/* Main Center */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Aliyan Khan</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Posts</h3>
            {/* Render posts */}
            <div className="bg-gray-100 p-2 rounded">Sample post content...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
