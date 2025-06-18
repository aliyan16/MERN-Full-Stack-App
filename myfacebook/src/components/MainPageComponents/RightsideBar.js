import React from "react";
import {FaUser } from "react-icons/fa";


function RightSideBar(){
    return(
        <>
        <div className="bg-white overflow-y-auto hidden w-64 lg:block p-4" >
            <div className="space-y-10 p-4" >
                <h4 className="mb-2 font-bold" >Contacts</h4>
                <div className="mb-2 flex space-x-2" >
                    <FaUser/>
                    <span>User 1</span>
                </div>

            </div>
        </div>
        </>
    )
}

export default RightSideBar