import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, deleteTask } = useTaskContext();
  
  const task = id ? getTask(id) : undefined;

  if (!task) {
    return <div>Task not found</div>;
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h1>{task.title}</h1>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      
      <div style={{ marginTop: '1rem' }}>
        <Link to={`/tasks/edit/${task.id}`} style={{ marginRight: '1rem' }}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      
      <Link to="/dashboard" style={{ display: 'block', marginTop: '1rem' }}>Back to Dashboard</Link>
    </div>
  );
};

export default TaskDetail;