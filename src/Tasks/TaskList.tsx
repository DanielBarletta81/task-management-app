import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();

  return (
    <div className="section">
      <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1>⚡ Task Dashboard</h1>
        <Link to="/tasks/new" className="create-task-btn" style={{ 
          borderRadius: '8px',
          fontFamily: 'Orbitron, monospace',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.3)',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          <span>⭐ CREATE TASK ⭐</span>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            No tasks found. Create your first task!
          </p>
        </div>
      ) : (
        <div className="card-grid">
          {tasks.map(task => (
            <div key={task.id} className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ color: 'var(--neon-pink)', marginBottom: '1rem' }}>{task.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {task.description}
              </p>
              <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ 
                  color: task.status === 'completed' ? 'var(--neon-green)' : 
                        task.status === 'in-progress' ? 'var(--neon-cyan)' : 'var(--neon-purple)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem'
                }}>
                  {task.status}
                </span>
                <span style={{ 
                  color: task.priority === 'high' ? 'var(--neon-pink)' : 
                        task.priority === 'medium' ? 'var(--neon-cyan)' : 'var(--neon-green)',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem'
                }}>
                  {task.priority}
                </span>
              </div>
              <Link to={`/tasks/${task.id}`} style={{ 
                display: 'block', 
                textAlign: 'center',
                padding: '0.8rem',
                background: 'rgba(0, 255, 255, 0.1)',
                border: '1px solid var(--neon-cyan)',
                borderRadius: '6px',
                fontFamily: 'Orbitron, monospace',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;