import React, { useEffect, useState } from "react";
import axios from "axios";


function Stories(){
    const [file,setFile]=useState(null)
    const [stories,setStories]=useState([])


    const handleChange=(e)=>{
        const selected=e.target.files[0]
        if(selected){
            setFile(selected)
        }
    }
    const fetchStories=async ()=>{
        try{
            const res=await axios.get('http://localhost:5000/get-stories')
            setStories(res.data)
        }catch(e){
            console.error('Error fetching stories ',e)

        }
    }

    const handleUpload=async ()=>{
        if(!file){
            return alert('Please select file')
        }
        const StoryData=new FormData()
        StoryData.append('Story',file)
        StoryData.append('username','')
        try{
            await axios.post('http://localhost:5000/upload-story',StoryData,{
                headers:{'Content-Type':'multipart/form-data'}
            })
            alert('Story uploaded')
            setFile(null)
            fetchStories()
        }catch(e){
            console.error('Upload error',e)
            alert('Failed to upload story')
        }
    }

    useEffect(()=>{
        fetchStories()
    },[])

    
    return(
        <>
        <div className="flex space-x-4 overflow-x-auto" >
            <div className="bg-gray-300 w-24 h-40 rounded-lg flex items-center justify-center cursor-pointer relative" onClick={file? handleUpload :undefined} >
                <label className="cursor-pointer absolute inset-0 flex flex-col items-center justify-center" >
                      {file?(
                        <span className="text-sm" >Click to upload</span>
                      ):(
                        <>
                        <span className="text-sm">Add Story</span>
                        <input type="file" accept="image/*" hidden onChange={handleChange} />
                        </>
                      )}              
                </label>
            </div>
            {stories.map((story)=>(
                <div key={story._id} className="bg-gray-300 w-24 h-40 rounded-lg flex items-center justify-center cursor-pointer" onClick={()=> window.open(`http://localhost:5000/story/${story._id}`,"_blank")}>
                    <img src={`http://localhost:5000/story/${story._id}`} alt="story" className="object-cover w-full h-full rounded-lg" />

                </div>
            ))}
        </div>
        </>
    )
}

export default Stories