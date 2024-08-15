import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders To-Do App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/To-Do App/i);
  expect(titleElement).toBeInTheDocument();
});
