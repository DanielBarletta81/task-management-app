import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      
      <div className="profile-container">
        {user?.picture && (
          <div className="profile-picture">
            <img src={user.picture} alt={user.name} />
          </div>
        )}
        
        <div className="profile-details">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          
          <div className="profile-metadata">
            <h4>User Information</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
