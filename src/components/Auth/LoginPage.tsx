import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Task Management App</h1>
        <p>Manage your tasks efficiently with our TypeScript-powered task manager.</p>
        <button onClick={() => loginWithRedirect()} className="login-button">
          Log In / Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
