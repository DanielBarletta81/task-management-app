import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="glass-card" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1.5rem 2rem', 
      margin: '1rem 1rem 2rem 1rem',
      position: 'relative',
      zIndex: 100
    }}>
      <div>
        <Link to="/" style={{ 
          fontSize: '2.2rem', 
          fontWeight: '900',
          fontFamily: 'Orbitron, monospace',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          ⚡ Task Matrix
        </Link>
      </div>
      <div className="flex-row">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            {user && (
              <span style={{ 
                color: 'var(--neon-green)',
                fontFamily: 'Orbitron, monospace',
                fontSize: '1.1rem'
              }}>
                {user.name}
              </span>
            )}
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;