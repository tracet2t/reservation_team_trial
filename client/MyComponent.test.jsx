import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import MyComponent from './MyComponent';

test('renders Hello, World! text', () => {
  render(<MyComponent />);
  const element = screen.getByText(/Hello, World!/i);
  expect(element).toBeInTheDocument();
});
