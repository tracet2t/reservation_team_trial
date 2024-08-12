import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDo from './ToDo';

test('renders ToDo component', () => { 
  render(<ToDo />); // Render the ToDo component into a virtual DOM
  expect(screen.getByText(/To-Do List/i)).toBeInTheDocument(); // Check if the text "To-Do List" is present in the document
});

test('adds a new task', () => {
  render(<ToDo />); // Render the ToDo component
  fireEvent.change(screen.getByPlaceholderText(/Title/i), { // Simulate user typing into the Title input field
    target: { value: 'Test Task' },  // Set the value of the input to 'Test Task'
  });
  fireEvent.click(screen.getByText(/Add Task/i)); // Simulate a click event on the "Add Task" button
  expect(screen.getByText('Test Task')).toBeInTheDocument(); // Check if the text 'Test Task' is present in the document
});

test('adds a new task with description', () => {
  render(<ToDo />);  // Render the ToDo component
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {  // Simulate user typing into the Title input field
    target: { value: 'Test Task with Description' },  
  });
  fireEvent.change(screen.getByPlaceholderText(/Description \(optional\)/i), { // Simulate user typing into the Description input field
    target: { value: 'This is a description' }, // Set the value of the input to 'This is a description'
  });
  fireEvent.click(screen.getByText(/Add Task/i));  // Simulate a click event on the "Add Task" button
  expect(screen.getByText('Test Task with Description')).toBeInTheDocument(); // Check if the text 'Test Task with Description' is present in the document
  expect(screen.getByText('This is a description')).toBeInTheDocument(); // Check if the text 'This is a description' is present in the document
});

test('does not add a task without a title', () => {
  render(<ToDo />); // Render the ToDo component
  fireEvent.change(screen.getByPlaceholderText(/Description \(optional\)/i), { // Simulate user typing into the Description input field
    target: { value: 'This is a description' },  // Set the value of the input to 'This is a description'
  });
  fireEvent.click(screen.getByText(/Add Task/i));  // Simulate a click event on the "Add Task" button
  expect(screen.queryByText('This is a description')).not.toBeInTheDocument(); // Ensure description is not displayed without title
});
