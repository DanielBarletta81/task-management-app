import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(5, 'Too Short!')
    .required('Required'),
  status: Yup.string()
    .oneOf(['todo', 'in-progress', 'completed'], 'Invalid status')
    .required('Required'),
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .required('Required'),
});

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { addTask, updateTask, getTask } = useTaskContext();
  
  const isEditMode = !!id;
  const task = id ? getTask(id) : undefined;
  
  const initialValues: Omit<Task, 'id'> = {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    createdAt: task?.createdAt || new Date(),
    updatedAt: task?.updatedAt || new Date(),
    userId: task?.userId || '',
  };

  const handleSubmit = (values: Omit<Task, 'id'>) => {
    if (isEditMode && id) {
      updateTask(id, values);
      navigate(`/tasks/${id}`);
    } else {
      addTask(values);
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h1>{isEditMode ? 'Edit Task' : 'Create Task'}</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={TaskSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            <div>
              <label htmlFor="title">Title</label>
              <Field name="title" type="text" style={{ width: '100%', padding: '0.5rem' }} />
              <ErrorMessage 
                name="title"
                render={msg => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <Field name="description" as="textarea" rows={4} style={{ width: '100%', padding: '0.5rem' }} />
              <ErrorMessage 
                name="description"
                render={msg => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </div>

            <div>
              <label htmlFor="status">Status</label>
              <Field name="status" as="select" style={{ width: '100%', padding: '0.5rem' }}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Field>
              <ErrorMessage 
                name="status"
                render={msg => <div style={{ color: 'red' }}>{msg}</div>}
              />
            </div>

            <div>
              <label htmlFor="priority">Priority</label>
              <Field name="priority" as="select" style={{ width: '100%', padding: '0.5rem' }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Field>
              <ErrorMessage 
                name="priority"
                render={msg => <div style={{ color: 'red' }}>{msg}</div>}
              />
              </div>
              
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={isSubmitting} style={{ padding: '0.5rem 1rem' }}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '0.5rem 1rem' }}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default TaskForm;