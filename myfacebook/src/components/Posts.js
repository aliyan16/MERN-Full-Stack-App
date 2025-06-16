import React from "react";
import { FaUserCircle } from "react-icons/fa";


function Posts({username,content}){
    return(
        <>
        <div className="bg-white p-4 rounded-lg shadow" >
            <span><FaUserCircle/>  <h4 className="font-bold mb-4 " >{username}</h4></span>
            <p>{content}</p>
            
        </div>
        </>
    )
}

export default Posts