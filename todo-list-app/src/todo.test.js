// src/ToDo.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDo from './ToDo';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ToDo Component', () => {
  beforeEach(() => {
    // Mock localStorage to handle token checking
    Storage.prototype.getItem = jest.fn(() => 'mock-token');
    Storage.prototype.removeItem = jest.fn();
  });

  test('renders ToDo component', () => {
    render(
      <Router>
        <ToDo />
      </Router>
    );
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
  });

  test('allows user to add a task', () => {
    render(
      <Router>
        <ToDo />
      </Router>
    );
    
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Task description' } });
    fireEvent.change(screen.getByPlaceholderText('Due Date'), { target: { value: '2024-08-17' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'High' } });
    fireEvent.click(screen.getByText('Add Task'));
    
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('Task description')).toBeInTheDocument();
  });

  test('allows user to update a task', () => {
    render(
      <Router>
        <ToDo />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Old Task' } });
    fireEvent.click(screen.getByText('Add Task'));

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByText('Update Task'));

    expect(screen.getByText('Updated Task')).toBeInTheDocument();
    expect(screen.queryByText('Old Task')).not.toBeInTheDocument();
  });

  test('allows user to delete a task', () => {
    render(
      <Router>
        <ToDo />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Task to Delete' } });
    fireEvent.click(screen.getByText('Add Task'));

    fireEvent.click(screen.getByText('Delete'));

    expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
  });

  test('handles logout', () => {
    render(
      <Router>
        <ToDo />
      </Router>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
