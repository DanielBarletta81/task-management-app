import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={() => loginWithRedirect()}
      className="btn btn-primary"
    >
      Log In
    </button>
  );
};