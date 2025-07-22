import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import Posts from "../PostComponents/Posts";
import { useParams } from "react-router-dom";

function UserPosts(){
    const [posts,setPosts]=useState([])
    const {userId}=useParams()
    useEffect(()=>{
        axios.get(`http://localhost:5000/get-user-posts/${userId}`)
            .then(res=>setPosts(res.data))
            .catch(e=>console.log(e))
    },[userId])
    return(
        <div className="space-y-4">
            {posts.map(post=>(
                <Posts key={post._id} username={`${post.firstName} ${post.lastName}`} content={post.postvalue} media={post.media} id={post._id} profilePic={post.profilePic} likes={post.likes} comments={post.comments} currentUserId={userId} />
            ))}

        </div>
    )
}


export default UserPosts