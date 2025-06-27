import React from "react";
import { FaUserCircle } from "react-icons/fa";


function Posts({username,content,media,id}){
    return(
        <>
        <div className="bg-white p-4 rounded-lg shadow" >
            <div className="flex space-x-2" > <FaUserCircle/>  <h4 className="font-bold mb-4 " >{username}</h4></div>
            <p>{content}</p>
            {media && (
                media && media.contentType && media.contentType.startsWith('video')?(
                    <video controls className="max-w-full rounded" >
                        <source src={`http://localhost:5000/media/${media.fileId}`} type={media.contentType} />
                    </video>
                ):(
                    <img src={`http://localhost:5000/media/${media.fileId}`} alt="post" className="max-w-full rounded" />
                )
            )}
            
        </div>
        </>
    )
}

export default Posts