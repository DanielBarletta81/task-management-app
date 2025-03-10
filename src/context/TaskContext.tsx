import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task, TaskState } from '../types';

type TaskAction = 
  | { type: 'FETCH_TASKS_START' }
  | { type: 'FETCH_TASKS_SUCCESS'; payload: Task[] }
  | { type: 'FETCH_TASKS_ERROR'; payload: string }
  | { type: 'SET_CURRENT_TASK'; payload: Task }
  | { type: 'CLEAR_CURRENT_TASK' }
  | { type: 'ADD_TASK_SUCCESS'; payload: Task }
  | { type: 'UPDATE_TASK_SUCCESS'; payload: Task }
  | { type: 'DELETE_TASK_SUCCESS'; payload: string };

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'FETCH_TASKS_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_TASKS_SUCCESS':
      return { ...state, tasks: action.payload, isLoading: false };
    case 'FETCH_TASKS_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_CURRENT_TASK':
      return { ...state, currentTask: action.payload };
    case 'CLEAR_CURRENT_TASK':
      return { ...state, currentTask: null };
    case 'ADD_TASK_SUCCESS':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK_SUCCESS':
      return { 
        ...state, 
        tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
        currentTask: action.payload
      };
    case 'DELETE_TASK_SUCCESS':
      return { 
        ...state, 
        tasks: state.tasks.filter(task => task.id !== action.payload),
        currentTask: null
      };
    default:
      return state;
  }
};

interface TaskContextProps {
  state: TaskState;
  fetchTasks: () => Promise<void>;
  getTask: (id: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async (): Promise<void> => {
    dispatch({ type: 'FETCH_TASKS_START' });
    try {
      // Replace with actual API call
      const response = await fetch('/api/tasks');
      const data = await response.json();
      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_ERROR', payload: 'Failed to fetch tasks' });
    }
  };

  const getTask = async (id: string): Promise<void> => {
    try {
      // Replace with actual API call
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      dispatch({ type: 'SET_CURRENT_TASK', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_ERROR', payload: 'Failed to fetch task' });
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_ERROR', payload: 'Failed to add task' });
    }
  };

  const updateTask = async (id: string, task: Partial<Task>): Promise<void> => {
    try {
      // Replace with actual API call
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_ERROR', payload: 'Failed to update task' });
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      // Replace with actual API call
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_ERROR', payload: 'Failed to delete task' });
    }
  };

  return (
    <TaskContext.Provider value={{ state, fetchTasks, getTask, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
