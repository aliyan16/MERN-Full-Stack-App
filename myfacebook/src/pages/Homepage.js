import React, { useEffect, useState } from "react";
import Stories from "../components/StoryComponents/Stories";
import Posts from "../components/PostComponents/Posts";
import NewPostComponent from "../components/PostComponents/newPost";
import axios from "axios";

function HomePage({ user }) {
    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-post');
            setPosts(response.data);
            console.log('post data fetched');
        } catch (e) {
            console.error('Error fetching posts ', e);
        }
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);
    
    return (
        <div className="space-y-4">
            <NewPostComponent onPostSubmit={fetchPosts} user={user} />
            <Stories user={user} />
            {posts.map((post, index) => (
                <Posts 
                    key={index} 
                    username={`${post.firstName} ${post.lastName}`} 
                    content={post.postvalue} 
                    media={post.media} 
                    id={post._id}
                />
            ))}
        </div>
    );
}

export default HomePage;