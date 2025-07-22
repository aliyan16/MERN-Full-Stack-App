import React from "react";
import { FaAddressCard, FaArrowCircleDown, FaGamepad, FaStore, FaUser, FaUserFriends, FaUsers } from "react-icons/fa";
import { IoIosAnalytics } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


function LeftSideBar({user}){
    const navigate=useNavigate();
    // const userId=useParams()
    return(
        <>
        <div className="bg-white p-4 overflow-y-auto hidden w-64 lg:block" >
            <div className="space-y-10 p-4" >
                <div className="flex space-x-2 cursor-pointer " onClick={()=> navigate(`/profile/${user._id}`)} >
                    {user.profilePic?(
                        <img src={`http://localhost:5000/media/${user.profilePic.fileId}`} alt="Profile" className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                    ):(
                        <FaUser/>
                    )}
                    <span>
                        {user? `${user.firstName} ${user.lastName}`:'Guest'}
                    </span>
                </div>
                <div className="flex space-x-2 cursor-pointer " onClick={()=> navigate('/friends')} >
                    <FaUserFriends className="text-xl" />
                    <span>Friends</span>
                </div>
                <div className="flex space-x-2 cursor-pointer" onClick={()=> navigate('/home')} >
                    <FaAddressCard className="text-xl" />
                    <span>Feed</span>
                </div>
                <div className="flex space-x-2 cursor-pointer ">
                    <FaUsers className="text-xl" />
                    <span>Groups</span>
                </div>
                <div className="flex space-x-2 cursor-pointer">
                    <IoIosAnalytics className="text-2xl" />
                    <span>Professional Dashboard</span>
                </div>
                <div className="flex space-x-2 cursor-pointer" >
                    <FaStore className="text-xl" />
                    <span>Market Place</span>
                </div>
                <div className="flex space-x-2 cursor-pointer" >
                    <FaArrowCircleDown className="text-xl" />
                    <span>See more</span>
                </div>
                <hr className="font-bold "/>
                <div className="flex space-x-2 cursor-pointer" >
                    <FaGamepad className="text-xl" />
                    <span>Games</span>
                </div>

            </div>
        </div>
        </>
    )
}

export default LeftSideBar