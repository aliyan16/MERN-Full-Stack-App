import React from 'react';
import ProfileHeader from '../components/profilePageComponents/profileHeader';
import FriendsSection from '../components/profilePageComponents/friendsSection';
import ImagesSection from '../components/profilePageComponents/profileImages';
import Posts from '../components/PostComponents/Posts';
import { useParams } from 'react-router-dom';


const ProfilePage = ({ user }) => {
  const { userId } = useParams();
  return (
    <div className="bg-gray-100 min-h-screen">
      <ProfileHeader userId={userId} user={user}/>

      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <ImagesSection userId={userId} />
          <FriendsSection />
        </div>

        <div className="md:col-span-2 space-y-4">
          <Posts userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
