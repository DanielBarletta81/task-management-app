import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { TaskProvider } from '../src/context/TaskContext'

import Navbar from '../src/components/Navbar'
import LoginPage from '../src/Auth/LoginPage'
import PrivateRoute from '../src/Auth/PrivateRoute'
import TaskList from '../src/Tasks/TaskList'
import TaskDetail from '../src/Tasks/TaskDetail'
import TaskForm from '../src/Tasks/TaskForm'

function App() {
  //debug lines, I was getting 404 error...
  console.log("Auth0 Domain:", import.meta.env.VITE_AUTH0_DOMAIN);
  console.log("Auth0 Client ID:", import.meta.env.VITE_AUTH0_CLIENT_ID);

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`
      }}
    >
      <TaskProvider>
        <Router>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
            <Navbar />
            <div style={{ marginTop: '2rem' }}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                } />
                
                <Route path="/tasks/:id" element={
                  <PrivateRoute>
                    <TaskDetail />
                  </PrivateRoute>
                } />
                
                <Route path="/tasks/new" element={
                  <PrivateRoute>
                    <TaskForm />
                  </PrivateRoute>
                } />
                
                <Route path="/tasks/edit/:id" element={
                  <PrivateRoute>
                    <TaskForm />
                  </PrivateRoute>
                } />
                
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </Auth0Provider>
  )
}

export default App
