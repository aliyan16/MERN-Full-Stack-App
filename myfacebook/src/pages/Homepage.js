import React from "react";
import Stories from "../components/StoryComponents/Stories";
import Posts from "../components/PostComponents/Posts";
import NewPostComponent from "../components/PostComponents/newPost";


function HomePage(){
    return(
        <>
        <div className="space-y-4" >
            <NewPostComponent/>
            <Stories/>
            <Posts username='User 1' content='This is my Facebook Clone' />
            <Posts username='User 2' content='This is my first post' />
        </div>
        </>
    )
}

export default HomePage