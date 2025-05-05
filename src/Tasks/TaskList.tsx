import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Task Dashboard</h1>
        <Link to="/tasks/new" style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: 'white', textDecoration: 'none' }}>
          Create Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span>Status: {task.status}</span>
                <span>Priority: {task.priority}</span>
              </div>
              <Link to={`/tasks/${task.id}`} style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;