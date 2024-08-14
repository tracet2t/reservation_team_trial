import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDo from './ToDo';

test('renders ToDo component', () => {
  render(<ToDo />);
  expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
});

test('adds a new task', () => {
  render(<ToDo />);
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: 'Test Task' },
  });
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.getByText('Test Task')).toBeInTheDocument();
});

test('adds a new task with description', () => {
  render(<ToDo />);
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: 'Test Task with Description' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Description \(optional\)/i), {
    target: { value: 'This is a description' },
  });
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.getByText('Test Task with Description')).toBeInTheDocument();
  expect(screen.getByText('This is a description')).toBeInTheDocument();
});

test('does not add a task without a title', () => {
  render(<ToDo />);
  fireEvent.change(screen.getByPlaceholderText(/Description \(optional\)/i), {
    target: { value: 'This is a description' },
  });
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.queryByText('This is a description')).not.toBeInTheDocument(); // Ensure description is not displayed without title
});

test('adds a new task with due date', () => {
  render(<ToDo />);
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: 'Test Task with Due Date' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Due Date \(optional\)/i), {
    target: { value: '2024-12-31' }, // Set the due date
  });
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.getByText('Test Task with Due Date')).toBeInTheDocument();
  expect(screen.getByText('Due Date: 2024-12-31')).toBeInTheDocument();
});

// Test case for editing an existing task
test('edits an existing task', () => {
  render(<ToDo />);
  
  // Add a task first
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: 'Test Task to Edit' },
  });
  fireEvent.click(screen.getByText(/Add Task/i));
  expect(screen.getByText('Test Task to Edit')).toBeInTheDocument();

  // Locate the task by its title
  const taskElement = screen.getByText('Test Task to Edit');
  
  // Use the task element's parent node to find the associated "Edit" button
  const editButton = taskElement.closest('li').querySelector('button');
  fireEvent.click(editButton);

  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: 'Edited Test Task' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Description \(optional\)/i), {
    target: { value: 'Updated description' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Due Date \(optional\)/i), {
    target: { value: '2024-11-30' }, // Update the due date
  });
  fireEvent.click(screen.getByText(/Save Changes/i)); // Assuming there's a Save Changes button

  // Check if the changes are saved
  expect(screen.getByText('Edited Test Task')).toBeInTheDocument();
  expect(screen.getByText('Updated description')).toBeInTheDocument();
  expect(screen.getByText('Due Date: 2024-11-30')).toBeInTheDocument();
});
