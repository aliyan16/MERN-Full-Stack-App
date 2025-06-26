import React, { useState } from 'react'
import axios from 'axios'

function NewPostComponent({onPostSubmit}) {
    const [post,setPost]=useState('')
    const [file,setFile]=useState(null)
    const [previewURL,setPreviewURL]=useState(null)
    const [selected, setSelectedFile] = useState(null);
    const handleKeyDown=(e)=>{
      if (e.key==='Enter' && post.trim() !==''){
        handlePost()
      }

    }
    const handlePost=async()=>{
      try{
        const PostData=new FormData()
        PostData.append('username','')
        PostData.append('postvalue',post)
        if(file){PostData.append('media',file)}
        await axios.post('http://localhost:5000/create-post',PostData,{
          headers:{'Content-Type':'multipart/form-data'}
        })
        setPost('')
        setFile(null)
        setPreviewURL(null)
        if(onPostSubmit){onPostSubmit()}
      }catch(e){
        console.error('Error posting ',e)
      }
    }
    const handleFileChange=(e)=>{
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewURL(URL.createObjectURL(selected));
    }
    }
  return (
    <>
    <div className='space-y-4'>
        <div className="bg-white rounded-lg p-4 shadow" >
            <input onChange={(e)=>setPost(e.target.value)} placeholder='Whats on your mind..' className='w-full outline-none p-4'  onKeyDown={handleKeyDown} value={post}/>
            {previewURL && (
              <div className='mb-2' >
                {file?.type?.startsWith('video')?(
                  <video className='max-w-full rounded' controls >
                    <source src={previewURL} type={file.type} />
                  </video>
                ):(
                  <img src={previewURL} alt='preview' className='max-w-full rounded'  />
                )}

              </div>
            )}
            <hr/>
            <div className='flex justify-between'>
              <label className='p-4 pl-16 cursor-pointer' >
                Live video
                <input className='p-4 pl-16 align-middle' />
              </label>
              <label className='p-4 pl-16 cursor-pointer'>
                Image/Video
                <input type='file' accept='image/*' hidden onChange={handleFileChange}  className='p-4 align-middle'/>
              </label>
              <label className='p-4 pl-16 cursor-pointer'>
                Reel
                <input type='file' accept='video/*' hidden onChange={handleFileChange} className='p-4 pr-16  align-middle'/>
              </label>
              <button className='p-4 pr-16' onClick={handlePost} >Post</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default NewPostComponent