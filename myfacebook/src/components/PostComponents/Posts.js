import React from "react";
import { FaUserCircle } from "react-icons/fa";

function Posts({ username, content, media, id, profilePic }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex space-x-2 items-center">
                {profilePic?.fileId ? (
                    <img 
                        src={`http://localhost:5000/media/${profilePic.fileId || profilePic}`} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <FaUserCircle className="text-2xl" />
                )}
                <h4 className="font-bold">{username}</h4>
            </div>
            <p className="mt-2">{content}</p>
            {media && media.fileId && media.contentType && (
                media.contentType.startsWith('video') ? (
                    <video controls className="max-w-full rounded mt-2">
                        <source src={`http://localhost:5000/media/${media.fileId}`} type={media.contentType} />
                    </video>
                ) : (
                    <img 
                        src={`http://localhost:5000/media/${media.fileId}`} 
                        alt="post" 
                        className="max-w-full rounded mt-2" 
                    />
                )
            )}
        </div>
    );
}

export default Posts;