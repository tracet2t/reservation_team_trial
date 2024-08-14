import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

// Mock tasks data
const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', completed: true },
];

describe('Todo App', () => {
  // Test for rendering the App component
  test('renders the App component without crashing', () => {
    render(<App />);
    expect(screen.getByText('Todo Application')).toBeInTheDocument();
  });

  // Test for TaskForm component
  test('renders the TaskForm component and submits form', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    // Simulate entering a task title
    fireEvent.change(screen.getByPlaceholderText('Enter task title'), {
      target: { value: 'New Task' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Add Task'));

    // Ensure the addTask function was called with correct data
    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: '',
      dueDate: '',
      priority: 'Low',
    });
  });

  // Test for TaskList component
  test('renders the TaskList component with tasks', () => {
    render(<TaskList tasks={mockTasks} />);

    // Ensure tasks are displayed
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Ensure completed tasks are marked
    expect(screen.getByText('Task 2')).toHaveClass('completed');
  });

  // Test for marking a task as completed
  test('marks a task as completed', () => {
    const mockToggleTaskCompletion = jest.fn();
    render(<TaskList tasks={mockTasks} toggleTaskCompletion={mockToggleTaskCompletion} />);

    // Simulate marking the first task as completed
    fireEvent.click(screen.getByText('Task 1'));

    // Ensure toggleTaskCompletion function was called
    expect(mockToggleTaskCompletion).toHaveBeenCalledWith(1);
  });
});
