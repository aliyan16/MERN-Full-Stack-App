import React, { useState } from 'react'
import axios from 'axios'

function NewPostComponent({onPostSubmit}) {
    const [post,setPost]=useState('')
    const handleKeyDown=(e)=>{
      if (e.key==='Enter' && post.trim() !==''){
        handlePost()
      }

    }
    const handlePost=async()=>{
      try{
        await axios.post('http://localhost:5000/create-post',{
          username:'',
          postvalue:post
        })
        console.log('post uploaded')
        setPost('')
        if (onPostSubmit) onPostSubmit();

      }catch(e){
        console.error('Error posting ',e)
        
      }
    }
  return (
    <>
    <div className='space-y-4'>
        <div className="bg-white rounded-lg p-4 shadow" >
            <input onChange={(e)=>setPost(e.target.value)} placeholder='Whats on your mind..' className='w-full outline-none p-4'  onKeyDown={handleKeyDown} value={post}/>
            <hr/>
            <div className='flex justify-between'>
                <button className='p-4 pl-16 align-middle' >Live Video</button>
                <button className='p-4 align-middle'>Image/Video</button>
                <button className='p-4 pr-16  align-middle'>Reel</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default NewPostComponent