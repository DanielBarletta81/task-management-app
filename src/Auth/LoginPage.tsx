import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="section" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <div className="glass-card" style={{ padding: '4rem', maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>⚡ Task Matrix</h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '3rem',
          fontFamily: 'Orbitron, monospace'
        }}>
          Enter the digital realm to manage your tasks
        </p>
        <button onClick={() => loginWithRedirect()} style={{ fontSize: '1.1rem' }}>
          🚀 Access System
        </button>
      </div>
    </div>
  );
};

export default LoginPage;