import React from "react";


function Stories(){
    return(
        <>
        <div className="flex space-x-4 overflow-x-auto" >
            <div className="bg-gray-300 w-24 h-40 rounded-lg flex items-center justify-center cursor-pointer" >+ Story</div>
            <div className="bg-gray-300 w-24 h-40 rounded-lg flex items-center justify-center cursor-pointer" >Story 1</div>
            <div className="bg-gray-300 w-24 h-40 rounded-lg flex items-center justify-center cursor-pointer" >Story 2</div>
        </div>
        </>
    )
}

export default Stories