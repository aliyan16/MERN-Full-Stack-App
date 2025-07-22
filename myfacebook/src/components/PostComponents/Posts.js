import React from "react";
import { FaUserCircle,FaHeart,FaRegHeart,FaComment,FaRegComment } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function Posts({ username, content, media, id, profilePic,likes,comments,currentUserId }) {
    const [isLiked,setIsLiked]=useState(likes.includes(currentUserId))
    const [likeCount,setLikeCount]=useState(likes.length)
    const [commentText,setCommentText]=useState('')
    const [showComments,setShowComments]=useState(false)
    const [postComments,setPostComments]=useState(comments || [])

    const handleLike=async()=>{
        try{
            const res=await axios.post('http://localhost:5000/like-post',{
                postId:id,
                userId:currentUserId
            })
            setIsLiked(!isLiked)
            setLikeCount(res.data.likes)
        }catch(e){
            console.error('Error liking post: ',e)
        }
    }

    const handleAddComment=async ()=>{
        if(!commentText.trim()){return}
        try{
            const res=await axios.post('http://localhost:5000/add-comment',{
                postId:id,
                userId:currentUserId,
                text:commentText
            })
            setPostComments([...postComments,res.data.comment])
            setCommentText('')
        }catch(e){
            console.error('Error adding comment: ',e)
            

        }
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex space-x-2 items-center">
                {profilePic?.fileId ? (
                    <img 
                        src={`http://localhost:5000/media/${profilePic.fileId || profilePic}`} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <FaUserCircle className="text-2xl" />
                )}
                <h4 className="font-bold">{username}</h4>
            </div>
            <p className="mt-2">{content}</p>
            {media && media.fileId && media.contentType && (
                media.contentType.startsWith('video') ? (
                    <video controls className="max-w-full rounded mt-2">
                        <source src={`http://localhost:5000/media/${media.fileId}`} type={media.contentType} />
                    </video>
                ) : (
                    <img 
                        src={`http://localhost:5000/media/${media.fileId}`} 
                        alt="post" 
                        className="max-w-full rounded mt-2" 
                    />
                )
            )}
            {/* Like and Comment Section */}
            <div className="mt-3 flex justify-between border-t pt-2">
                <button 
                    onClick={handleLike}
                    className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <span>{likeCount}</span>
                </button>
                
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-1 text-gray-500"
                >
                    <FaRegComment />
                    <span>{postComments.length}</span>
                </button>
            </div>
            
            {/* Comments Section */}
            {showComments && (
                <div className="mt-3 border-t pt-2">
                    {/* Add Comment */}
                    <div className="flex items-center space-x-2 mb-3">
                        {currentUserId.profilePic?.fileId ? (
                            <img 
                                src={`http://localhost:5000/media/${currentUserId.profilePic.fileId}`} 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <FaUserCircle className="text-xl" />
                        )}
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 border rounded-full px-3 py-1 text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        />
                        <button 
                            onClick={handleAddComment}
                            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                        >
                            Post
                        </button>
                    </div>
                    
                    {/* Comments List */}
                    <div className="space-y-2">
                        {postComments.map((comment, index) => (
                            <div key={index} className="flex space-x-2">
                                {comment.profilePic?.fileId ? (
                                    <img 
                                        src={`http://localhost:5000/media/${comment.profilePic.fileId}`} 
                                        alt="Profile" 
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="text-xl" />
                                )}
                                <div className="bg-gray-100 rounded-lg px-3 py-1 flex-1">
                                    <span className="font-semibold text-sm">{comment.username}</span>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Posts;