import React, { useEffect, useState } from "react";
import {FaUser } from "react-icons/fa";
import axios from "axios";


function RightSideBar(){
    const [users,setUsers]=useState([])

    
    const fetchUsers=async ()=>{
        try{
            const res=await axios.get('http://localhost:5000/get-users')
            setUsers(res.data)
        }catch(e){
            console.error('Error fetching users ',e)
        }
    }
    useEffect(()=>{
        fetchUsers()
    },[])
    return(
        <>
        <div className="bg-white overflow-y-auto hidden w-64 lg:block p-4" >
            <div className="space-y-10 p-4" >
                <h4 className="mb-2 font-bold" >Contacts</h4>
                {users.map(user => (

                    <div key={user._id} className="mb-2 flex space-x-2">
                        {user.profilePic?(
                            <img src={`http://localhost:5000/media/${user.profilePic.fileId}`} alt="ProfilePic" 
                            className="w-8 h-8 rounded-full object-cover cursor-pointer" />
                        ):(
                            <FaUser/>
                        )}
                        <span>{user.firstName} {user.lastName}</span>
                    </div>
                ))}

            </div>
        </div>
        </>
    )
}

export default RightSideBar