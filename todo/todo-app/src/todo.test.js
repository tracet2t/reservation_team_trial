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
