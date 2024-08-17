import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders To-Do App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/To-Do App/i);
  expect(titleElement).toBeInTheDocument();
});
// Check AddTask component
test('renders AddTask component', () => {
  render(<App />);
  const addTaskElement = screen.getByText(/Add Task/i); 
  expect(addTaskElement).toBeInTheDocument();
});

// Check TaskList component
test('renders TaskList component', () => {
  render(<App />);
  const taskListElement = screen.getByText(/All Tasks/i);
  expect(taskListElement).toBeInTheDocument();
});

