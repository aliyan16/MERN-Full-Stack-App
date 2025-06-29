import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'

function FriendsPage() {
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
  return (
    <div className='bg-white overflow-y-auto hidden max-w-full lg:block p-4'>
      <h6 className='text-center '>
        Friends
      </h6>
      <div className='space-y-10 p-4' >
        {users.map((user)=>(
          <div key={user._id} className='mb-2 flex space-x-2'>
            <FaUser/>
            <span>{user.firstName} {user.lastName}</span>
          </div>
        ))}

      </div>

    </div>
  )
}

export default FriendsPage