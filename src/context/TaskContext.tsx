import React, { createContext, useContext, useState } from 'react';
import { Task } from '../types';
import { useAuth0 } from '@auth0/auth0-react';

// Add some Sample data for testing
const sampleTasks: Task[] = [
  {
      id: '1',
      title: 'Complete project setup',
      description: 'Set up the initial project structure',
      status: 'completed',
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: ''
  },
  {
    id: '2',
    title: 'Implement task list',
    description: 'Create the task list component',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: ''
  },
  {
    id: '3',
    title: 'Add authentication',
    description: 'Integrate Auth0 for user authentication',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: ''
  }
];
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const { user } = useAuth0();

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user?.sub || 'anonymous'
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};