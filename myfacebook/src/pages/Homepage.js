import React from "react";
import Stories from "../components/Stories";
import Posts from "../components/Posts";



function HomePage(){
    return(
        <>
        <div className="space-y-4" >
            <div className="bg-white rounded-lg p-4 shadow" >Whats on your mind?</div>
            <Stories/>
            <Posts username='User 1' content='This is my Facebook Clone' />
            <Posts username='User 2' content='This is my first post' />
        </div>
        </>
    )
}

export default HomePage