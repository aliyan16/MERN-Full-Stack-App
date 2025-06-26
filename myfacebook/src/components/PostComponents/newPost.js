import React, { useState } from 'react'

function NewPostComponent() {
    const [post,setPost]=useState('')
    const handleKeyDown=(e)=>{
      if (e.key==='Enter' && post.trim() !==''){
        handlePost()
      }

    }
    const handlePost=async()=>{
      try{
        const response=await fetch('http://localhost:5000/create-post',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            username:'',
            postvalue:post,
          }),
        })
        if(response.ok){
          console.log('Post uploaded')
          setPost('')
        }else{
          console.error('Failed to post')
        }
      }catch(e){
        console.error('Error ',e)
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