import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Task Management App</h1>
      <p>Please log in to manage your tasks</p>
      <button 
        onClick={() => loginWithRedirect()}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginPage;