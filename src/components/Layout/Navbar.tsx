import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Task Management App</Link>
      </div>
      
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <Link to="/tasks/new" className="navbar-item">Create Task</Link>
            <Link to="/profile" className="navbar-item">Profile</Link>
            <button 
  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
  className="navbar-item logout-button"
>
  Logout
</button>

            <div className="user-info">
              {user?.picture && <img src={user.picture} alt={user.name} className="user-avatar" />}
              <span>{user?.name}</span>
            </div>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()} className="navbar-item login-button">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
