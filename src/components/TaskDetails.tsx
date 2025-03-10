import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, getTask, deleteTask } = useTaskContext();
  const { currentTask, isLoading, error } = state;

  useEffect(() => {
    if (id) {
      getTask(id);
    }
  }, [id, getTask]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      if (id) {
        deleteTask(id);
        navigate('/dashboard');
      }
    }
  };

  if (isLoading) return <div>Loading task details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentTask) return <div>Task not found</div>;

  return (
    <div className="task-details">
      <div className="task-details-header">
        <h2>{currentTask.title}</h2>
        <div className="task-details-actions">
          <Link to={`/tasks/edit/${currentTask.id}`} className="btn btn-primary">Edit Task</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete Task</button>
          <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
        </div>
      </div>
      
      <div className="task-details-content">
        <div className="task-details-meta">
          <span className={`status status-${currentTask.status}`}>
            Status: {currentTask.status}
          </span>
          <span className={`priority priority-${currentTask.priority}`}>
            Priority: {currentTask.priority}
          </span>
          {currentTask.dueDate && (
            <span className="due-date">
              Due Date: {new Date(currentTask.dueDate).toLocaleDateString()}
            </span>
          )}
          <span className="created-at">
            Created: {new Date(currentTask.createdAt).toLocaleString()}
          </span>
          <span className="updated-at">
            Last Updated: {new Date(currentTask.updatedAt).toLocaleString()}
          </span>
        </div>
        
        <div className="task-details-description">
          <h3>Description</h3>
          <p>{currentTask.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
