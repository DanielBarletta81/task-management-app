import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      background: '#f0f0f0',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
          Task Manager
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
              Dashboard
            </Link>
            {user && (
              <span style={{ marginRight: '1rem' }}>
                {user.name}
              </span>
            )}
            <button 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              style={{ 
                padding: '0.3rem 0.8rem', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <button 
            onClick={() => loginWithRedirect()}
            style={{ 
              padding: '0.3rem 0.8rem', 
              backgroundColor: '#0066cc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;