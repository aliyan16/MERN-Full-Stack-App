import React, { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "../pages/Homepage";
import ProfilePage from "../pages/profilepage";
import SigninPage from "../pages/Signin";
import RegistrationPage from "../pages/Registraion";
import SettingsPage from "../pages/settings";
import Header from "../components/MainPageComponents/Header";
import LeftSideBar from '../components/MainPageComponents/LeftsideBar';
import RightSideBar from '../components/MainPageComponents/RightsideBar';
import ReelsPage from "../pages/Reels";
import FriendsPage from "../pages/friends";
import NotificationPage from "../pages/notification";
import { useLocation } from "react-router-dom";

function PageRouting() {
 const location=useLocation();
 const [currentUser,setCurrentUser]=useState(null)
  const isAuthPage=location.pathname==='/'|| location.pathname==='/registration';
  return (
    <>
      <div className="flex flex-col h-screen">
        { !isAuthPage && <Header/>}
        <div className="flex flex-1 overflow-hidden">
          {!isAuthPage &&<LeftSideBar user={currentUser} />}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<SigninPage setCurrentUser={setCurrentUser} />} />
              <Route path="/home" element={<HomePage/>} />
              <Route path="/registration" element={<RegistrationPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
              <Route path="/setting" element={<SettingsPage/>} />
              <Route path="/reels" element={<ReelsPage/>} />
              <Route path="/friends" element={<FriendsPage/>} />
              <Route path="/notification" element={<NotificationPage/>} />
            </Routes>
          </div>
          {!isAuthPage && <RightSideBar/>}
        </div>
      </div>
    </>
  );
}

export default PageRouting