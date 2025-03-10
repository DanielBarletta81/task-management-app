import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { deleteTask } = useTaskContext();
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`task-item priority-${task.priority}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className={`status status-${task.status}`}>{task.status}</span>
          <span className="priority">Priority: {task.priority}</span>
          {task.dueDate && (
            <span className="due-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
        <p>{task.description}</p>
      </div>
      
      <div className="task-actions">
        <Link to={`/tasks/${task.id}`} className="btn btn-info">View</Link>
        <Link to={`/tasks/edit/${task.id}`} className="btn btn-secondary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
