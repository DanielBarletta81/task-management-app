# Task Management Application

A robust TypeScript-powered task management application built with React, Auth0 authentication, and Context API for state management.

## Features

- **Task Management**: Create, view, edit, and delete tasks
- **Task Organization**: Sort and filter tasks by status, priority, and due date
- **User Authentication**: Secure login and registration with Auth0
- **User Profiles**: View and manage user profile information
- **Responsive Design**: Mobile-friendly interface

## Technology Stack

- **Frontend**: React with TypeScript
- **State Management**: React Context API with TypeScript
- **Routing**: React Router v6
- **Form Handling**: Formik with Yup validation
- **Authentication**: Auth0 React SDK
- **Styling**: CSS (with potential for CSS-in-JS or frameworks)

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_AUTH0_DOMAIN=your-auth0-domain
   REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Project Structure

```
task-management-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── PrivateRoute.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── Layout/
│   │   │   └── Navbar.tsx
│   │   ├── TaskDashboard/
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── TaskDetails/
│   │   │   └── TaskDetails.tsx
│   │   └── TaskForm/
│   │       └── TaskForm.tsx
│   ├── context/
│   │   └── TaskContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Usage

After logging in, you'll be directed to the dashboard where you can:

1. View all your tasks
2. Create new tasks using the "Create Task" button
3. View task details by clicking on a task
4. Edit or delete tasks from the task details page
5. View and edit your profile information

## Authentication

This application uses Auth0 for authentication. To configure Auth0:

1. Create an Auth0 account and application at https://auth0.com
2. Set the callback URL to `http://localhost:3000`
3. Update the `.env` file with your Auth0 domain and client ID


### PrivateRoute

`PrivateRoute` is a wrapper component that ensures users are authenticated before accessing protected routes.


### LoginPage

`LoginPage` provides the login interface for unauthenticated users.


### ProfilePage

`ProfilePage` displays user information and profile details.


## Task Components

### TaskList

`TaskList` displays a list of all tasks and provides a button to create new tasks.

### TaskItem

`TaskItem` is a child component of TaskList that displays an individual task card.


### TaskDetails

`TaskDetails` shows detailed information about a specific task.


### TaskForm

`TaskForm` provides a form for creating and editing tasks.


### Navbar

`Navbar` provides navigation links and authentication controls.

### Provided Methods

- `fetchTasks(): Promise<void>` - Fetches all tasks for the authenticated user
- `getTask(id: string): Promise<void>` - Fetches a specific task by ID
- `addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void>` - Creates a new task
- `updateTask(id: string, task: Partial<Task>): Promise<void>` - Updates an existing task
- `deleteTask(id: string): Promise<void>` - Deletes a task



### Provider Setup

```tsx
import { TaskProvider } from './context/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <Router>
        {/* App components */}
      </Router>
    </TaskProvider>
  );
};
```

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}
```

## State Types

### TaskState

```typescript
interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}
```

### AuthState

```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
```

## Form Types

### TaskFormValues

```typescript
interface TaskFormValues {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}
```

## Component Props Types

### PrivateRouteProps

```typescript
interface PrivateRouteProps {
  children: JSX.Element;
}
```

### TaskItemProps

```typescript
interface TaskItemProps {
  task: Task;
}
```
```

## SETUP_GUIDE.md

```markdown:docs/SETUP_GUIDE.md
# Setup Guide

This guide provides detailed instructions for setting up the Task Management Application.

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

