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