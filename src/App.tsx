import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import './App.css';

// Context Providers
import { TaskProvider } from './context/TaskContext';

// Components
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Auth/PrivateRoute';
import LoginPage from './components/Auth/LoginPage';
import ProfilePage from './components/Auth/ProfilePage';

const App = () => {
  return (
    <Auth0Provider
      domain="YOUR_AUTH0_DOMAIN"
      clientId="YOUR_AUTH0_CLIENT_ID"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <TaskProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                } />
                
                <Route path="/tasks/:id" element={
                  <PrivateRoute>
                    <TaskDetails />
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
                
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                
                {/* Redirect to dashboard if logged in, otherwise to login */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </TaskProvider>
    </Auth0Provider>
  );
};

export default App;
