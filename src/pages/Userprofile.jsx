import React from 'react';
import ProfileCard from './ProfileInfo'; // Replace with the actual path
import mine from '../images/mine.png'// Replace with the actual path to your logo image

const UserProfile = () => {
  const user = {
    profilePicture: mine,
    name: 'Sarvesh JD',
    address: 'HIG 13, Jagannathpuram Colony, RK Nagar, Bilaspur C.G. - 495006',
    email: 'sdahre3@gmail.com',
    contactNumber: '9752778088',
    designation: 'Software Developer',
  };

  return (
    <div>
      <ProfileCard
      profilePicture={user.profilePicture}
      name={user.name}
      address={user.address}
      email={user.email}
      contactNumber={user.contactNumber}
      designation={user.designation} />
    </div>
  );
};

export default UserProfile;
