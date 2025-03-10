import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { state, fetchTasks } = useTaskContext();
  const { tasks, isLoading, error } = state;

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>My Tasks</h2>
        <Link to="/tasks/new" className="btn btn-primary">Create Task</Link>
      </div>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>You have no tasks. Create one to get started!</p>
        </div>
      ) : (
        <div className="task-items">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
