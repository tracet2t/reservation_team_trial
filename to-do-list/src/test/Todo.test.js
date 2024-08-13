import React from 'react';
import { render, fireEvent } from '@testing-library/react';


test('renders Todo component', () => {
  const { getByText } = render(<Todo />);
  expect(getByText('Todo List')).toBeInTheDocument();
});

test('adds a new todo item', () => {
  const { getByPlaceholderText, getByText } = render(<Todo />);
  const input = getByPlaceholderText('Add a new todo');
  fireEvent.change(input, { target: { value: 'Learn React Testing' } });
  fireEvent.click(getByText('Add'));

  expect(getByText('Learn React Testing')).toBeInTheDocument();
});

test('marks a todo as completed', () => {
  const { getByText } = render(<Todo />);
  fireEvent.click(getByText('Add Task')); // Assuming there's a button called 'Complete'

  expect(getByText('Add Task')).toHaveStyle('text-decoration: line-through');
});

test('deletes a todo item', () => {
  const { getByText, queryByText } = render(<Todo />);
  fireEvent.click(getByText('Delete')); // Assuming there's a button called 'Delete'

  expect(queryByText('Some todo text')).toBeNull();
});
