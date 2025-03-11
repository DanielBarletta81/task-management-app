# Task Management Application

A TypeScript & React task management application with Auth0 authentication.

## Features

- Create, view, edit, and delete tasks
- Organize tasks by status, priority, and due date
- Secure authentication with Auth0
- Responsive design

## Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Auth0 Configuration**
   - Create an account at https://auth0.com
   - Create a new Single Page Application
   - Set the following URLs in your Auth0 application settings:
     - Allowed Callback URLs: `http://localhost:3000`
     - Allowed Logout URLs: `http://localhost:3000`
     - Allowed Web Origins: `http://localhost:3000`
   - Note your Auth0 Domain and Client ID

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_AUTH0_DOMAIN=your-auth0-domain
   REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

## Project Structure

```
task-management-app/
├── src/
│   ├── components/          # UI components
│   │   ├── Auth/            # Authentication components
│   │   ├── Layout/          # Layout components
│   │   ├── TaskDashboard/   # Task list and items
│   │   ├── TaskDetails/     # Task view
│   │   └── TaskForm/        # Task creation/editing
│   ├── context/             # React Context for state
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Entry point
└── package.json
```

## Main Components

1. **Authentication**
   - `LoginPage`: Login interface
   - `PrivateRoute`: Protects routes from unauthorized access
   - `ProfilePage`: Shows user information

2. **Task Management**
   - `TaskList`: Displays all tasks
   - `TaskDetails`: Shows detailed task information
   - `TaskForm`: Form for creating/editing tasks

## How to Use

1. **Login** using the Auth0 authentication system
2. **View tasks** on the dashboard
3. **Create new tasks** using the "Create Task" button
4. **View details** by clicking on a task
5. **Edit or delete** tasks from the task details page

## Technology Stack

- React with TypeScript
- React Context API for state management
- React Router for navigation
- Formik with Yup for form handling and validation
- Auth0 for authentication
```

```markdown:docs/SETUP_AND_DEPLOYMENT.md
# Detailed Setup & Deployment Guide

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Auth0 Configuration

1. Create an Auth0 account at https://auth0.com
2. Create a new Single Page Application
3. Configure the following settings:
   - Allowed Callback URLs: `http://localhost:3000`
   - Allowed Logout URLs: `http://localhost:3000`
   - Allowed Web Origins: `http://localhost:3000`
4. Note your Auth0 Domain and Client ID

### 4. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
```

### 5. Start the Development Server

```bash
npm start
```

Your application should now be running at http://localhost:3000

## Deploying Your App

### Option 1: Netlify Deployment

1. Create a GitHub repository and push your code
2. Sign up for Netlify (netlify.com)
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add your environment variables in the Netlify dashboard
6. Deploy

### Option 2: Vercel Deployment

1. Create a GitHub repository and push your code
2. Sign up for Vercel (vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect React settings
5. Add your environment variables
6. Deploy

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/task-management-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## Troubleshooting

### Common Issues

1. **Auth0 Login Not Working**
   - Verify your Auth0 domain and client ID
   - Check your callback URLs in Auth0 settings

2. **API Calls Failing**
   - Ensure your backend API URLs are correct
   - Check CORS configuration if using a separate backend

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run tsc`
