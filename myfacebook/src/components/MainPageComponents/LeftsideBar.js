import React from "react";
import { FaAddressCard, FaArrowCircleDown, FaGamepad, FaStore, FaUser, FaUserFriends, FaUsers } from "react-icons/fa";
import { IoIosAnalytics } from "react-icons/io";
import { useNavigate } from "react-router-dom";


function LeftSideBar({user}){
    const navigate=useNavigate();
    return(
        <>
        <div className="bg-white p-4 overflow-y-auto hidden w-64 lg:block" >
            <div className="space-y-10 p-4" >
                <div className="flex space-x-2 cursor-pointer " onClick={()=> navigate('/friends')} >
                    <FaUser className="text-xl" />
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