import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTaskContext } from '../context/TaskContext';
import { useAuth0 } from '@auth0/auth0-react';

interface TaskFormValues {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

const TaskValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title is too long'),
  description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be at least 5 characters'),
  status: Yup.string()
    .oneOf(['todo', 'in-progress', 'completed'], 'Invalid status')
    .required('Status is required'),
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .required('Priority is required'),
  dueDate: Yup.date()
    .min(new Date(), 'Due date cannot be in the past')
    .nullable(),
});

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { state, getTask, addTask, updateTask } = useTaskContext();
  const { user } = useAuth0();
  const { currentTask, isLoading, error } = state;
  const [initialValues, setInitialValues] = useState<TaskFormValues>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: undefined,
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && id) {
      getTask(id);
    }
  }, [isEditMode, id, getTask]);

  useEffect(() => {
    if (isEditMode && currentTask) {
      // Format date for form input if it exists
      const formattedDueDate = currentTask.dueDate 
        ? new Date(currentTask.dueDate).toISOString().split('T')[0] 
        : undefined;

      setInitialValues({
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
        priority: currentTask.priority,
        dueDate: formattedDueDate,
      });
    }
  }, [isEditMode, currentTask]);

  const handleSubmit = async (values: TaskFormValues) => {
    if (!user) {
      return;
    }

    try {
      if (isEditMode && id) {
        await updateTask(id, {
          ...values,
          dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
        });
        navigate(`/tasks/${id}`);
      } else {
        await addTask({
          ...values,
          dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
          userId: user.sub || '',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading task...</div>;
  }

  if (isEditMode && error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="task-form-container">
      <h2>{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={TaskValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, touched, isValid }) => (
          <Form className="task-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field
                type="text"
                id="title"
                name="title"
                className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                rows={4}
              />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>

            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="status">Status</label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className={`form-control ${errors.status && touched.status ? 'is-invalid' : ''}`}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Field>
                <ErrorMessage name="status" component="div" className="error-message" />
              </div>

              <div className="form-group col">
                <label htmlFor="priority">Priority</label>
                <Field
                  as="select"
                  id="priority"
                  name="priority"
                  className={`form-control ${errors.priority && touched.priority ? 'is-invalid' : ''}`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Field>
                <ErrorMessage name="priority" component="div" className="error-message" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date (Optional)</label>
              <Field
                type="date"
                id="dueDate"
                name="dueDate"
                className={`form-control ${errors.dueDate && touched.dueDate ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="dueDate" component="div" className="error-message" />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Task' : 'Create Task')}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(isEditMode ? `/tasks/${id}` : '/dashboard')}
              >
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
