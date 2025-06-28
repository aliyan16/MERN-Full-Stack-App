import React, { useEffect, useState } from 'react'
import ReelComponent from '../components/ReelsComponents/ReelComponent'
import axios from 'axios'

function ReelsPage() {
  const [vid,setVid]=useState([])
  const fetchVideos=async ()=>{
    try{
      const res=await axios.get('http://localhost:5000/get-videos')

      setVid(res.data)
    }catch(e){
      console.error('Error fetching videos: ',e)
    }
  }
  useEffect(()=>{
    fetchVideos()
  },[])
  return (
    <>
    <ReelComponent videos={vid} />
    </>
  )
}

export default ReelsPage