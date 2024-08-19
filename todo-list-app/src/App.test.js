import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Register heading', () => {
  render(<App />);
  
  // Check for the heading specifically
  const headingElement = screen.getByRole('heading', { name: /Register/i });
  expect(headingElement).toBeInTheDocument();
});
