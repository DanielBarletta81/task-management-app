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
    <div className="section">
      <div className="glass-card" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>⚡ {task.title}</h1>
        
        <div className="flex-col" style={{ gap: '2rem' }}>
          <div>
            <label style={{ marginBottom: '0.5rem' }}>Description</label>
            <p style={{ 
              color: 'var(--text-secondary)', 
              background: 'rgba(20, 20, 20, 0.5)',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              lineHeight: '1.6'
            }}>
              {task.description}
            </p>
          </div>

          <div className="flex-row" style={{ justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <label>Status</label>
              <p style={{ 
                color: task.status === 'completed' ? 'var(--neon-green)' : 
                      task.status === 'in-progress' ? 'var(--neon-cyan)' : 'var(--neon-purple)',
                fontWeight: '700',
                textTransform: 'uppercase',
                fontSize: '1.4rem'
              }}>
                {task.status}
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <label>Priority</label>
              <p style={{ 
                color: task.priority === 'high' ? 'var(--neon-pink)' : 
                      task.priority === 'medium' ? 'var(--neon-cyan)' : 'var(--neon-green)',
                fontWeight: '700',
                textTransform: 'uppercase',
                fontSize: '1.4rem'
              }}>
                {task.priority}
              </p>
            </div>
          </div>
          
          <div className="flex-row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <Link to={`/tasks/edit/${task.id}`} style={{
              padding: '0.8rem 1.5rem',
              background: 'linear-gradient(45deg, var(--neon-cyan), var(--neon-purple))',
              borderRadius: '8px',
              fontFamily: 'Orbitron, monospace',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}>
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ff0000)',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
            }}>
              🗑️ Delete
            </button>
          </div>
          
          <Link to="/dashboard" style={{ 
            display: 'block', 
            textAlign: 'center',
            marginTop: '2rem',
            padding: '0.8rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-border)',
            borderRadius: '6px',
            fontFamily: 'Orbitron, monospace',
            textTransform: 'uppercase'
          }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;