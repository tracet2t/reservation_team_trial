// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // Provides additional matchers
import App from './App';

test('renders Register heading', () => {
  render(<App />);
  
  // Use getAllByText to find all elements with the text "Register"
  const registerElements = screen.getAllByText(/Register/i);
  
  expect(registerElements).toHaveLength(2); // Ensure there are exactly two elements with "Register"
  expect(registerElements[0].tagName).toBe('H1'); // Check that one of them is an <h1>
  expect(registerElements[1].tagName).toBe('BUTTON'); // Check that the other one is a <button>
});
