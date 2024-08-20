// ToDo.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import ToDo from './ToDo';

// Mock the fetch API
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (url.includes('/tasks')) {
      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    }
    if (url.includes('/task')) {
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    }
    return Promise.reject(new Error('Unknown API call'));
  });
});

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const navigate = jest.fn();
useNavigate.mockReturnValue(navigate);

test('renders ToDo component', () => {
  render(
    <Router>
      <ToDo />
    </Router>
  );

  // Check if "Add Task" button is in the document
  expect(screen.getByText('Add Task')).toBeInTheDocument();
});

test('fetches and displays tasks', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ title: 'Sample Task' }]),
    })
  );

  render(
    <Router>
      <ToDo />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
  });
});

test('adds a new task', async () => {
  const newTask = { title: 'New Task' };

  // Mock fetch for adding a task
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(newTask),
    })
  );

  render(
    <Router>
      <ToDo />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: newTask.title } });
  fireEvent.click(screen.getByText('Add Task'));

  await waitFor(() => {
    expect(screen.getByText(newTask.title)).toBeInTheDocument();
  });
});

test('edits an existing task', async () => {
  const updatedTask = { title: 'Updated Task' };

  // Mock fetch for editing a task
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(updatedTask),
    })
  );

  render(
    <Router>
      <ToDo />
    </Router>
  );

  fireEvent.click(screen.getByText('Edit Task'));

  // Simulate task update
  fireEvent.change(screen.getByPlaceholderText('Task Title'), { target: { value: updatedTask.title } });
  fireEvent.click(screen.getByText('Save Changes'));

  await waitFor(() => {
    expect(screen.getByText(updatedTask.title)).toBeInTheDocument();
  });
});

test('deletes a task', async () => {
  const taskToDelete = { title: 'Task to Delete' };

  // Mock fetch for deleting a task
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );

  render(
    <Router>
      <ToDo />
    </Router>
  );

  fireEvent.click(screen.getByText('Delete Task'));

  await waitFor(() => {
    expect(screen.queryByText(taskToDelete.title)).not.toBeInTheDocument();
  });
});

test('searches for tasks', async () => {
  const taskToSearch = { title: 'Searchable Task' };

  // Mock fetch for search functionality
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([taskToSearch]),
    })
  );

  render(
    <Router>
      <ToDo />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('Search tasks'), { target: { value: 'Searchable Task' } });

  await waitFor(() => {
    expect(screen.getByText(taskToSearch.title)).toBeInTheDocument();
  });
});
