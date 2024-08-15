import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('TodoApp', () => {
  test('renders the app correctly', () => {
    render(<App />);
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a new task')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('allows users to add tasks', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Enter a new task');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Learn React' } });
    fireEvent.click(button);

    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  test('does not add empty tasks', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Enter a new task');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(screen.queryByText('')).not.toBeInTheDocument();
  });
});
