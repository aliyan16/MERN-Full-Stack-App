import react, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';




function ProfileDropDown({user}){
    const [isOpen,setIsOpen]=useState(false)
    const dropdownRef=useRef(null)
    const navigate=useNavigate()
    useEffect(()=>{
        const handleClickOutside=(e)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown',handleClickOutside)
        return()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[])
    return(
        <>
        <div className="relative" ref={dropdownRef} >
            <button className="flex items-center focus:outline-none" onClick={()=>setIsOpen(!isOpen)} >
                {user?.profilePic?.fileId?(
                    <img src={`http://localhost:5000/media/${user.profilePic.fileId}`} alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                ):(
                    <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-600" />
                )}

            </button>
            {isOpen &&(
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50" >
                    <button onClick={()=>{ navigate(`/profile/${user._id}`); setIsOpen(false);} }className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" >
                        <FaUserCircle className="mr-2" />
                        Profile

                    </button>
                    <button onClick={()=>{ navigate('/setting'); setIsOpen(false);} }className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" >
                        <FaUserCircle className="mr-2" />
                        Settings

                    </button>
                    <button onClick={()=>{ navigate('/'); setIsOpen(false);} }className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" >
                        <FaUserCircle className="mr-2" />
                        Logout

                    </button>

                </div>
            )}

        </div>
        </>
    )
}


export default ProfileDropDown;