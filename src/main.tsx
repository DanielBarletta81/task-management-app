import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth0ProviderWithConfig } from './Auth/auth0-provider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  </React.StrictMode>
)
