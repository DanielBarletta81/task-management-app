import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Auth0ProviderWithConfigProps {
  children: ReactNode;
}

export const Auth0ProviderWithConfig = ({ children }: Auth0ProviderWithConfigProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

  if (!domain || !clientId) {
    throw new Error('Missing Auth0 configuration. Check your .env file.');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: import.meta.env.VITE_AUTH0_SCOPE
      }}
    >
      {children}
    </Auth0Provider>
  );
};