import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';

describe('Register Component', () => {
  // Test Case 1: Renders the component and checks if the username, password inputs, and the register button are present.
  test('renders Register component with username, password inputs, and register button', () => {
    render(<Register />);
    
    // Check if the input fields and button are present in the document
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // Use getByRole to find the button by its role and name
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  // Test Case 2: Updates the username and password fields and checks if the state is updated correctly.
  test('updates the username and password fields correctly', () => {
    render(<Register />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  // Test Case 3: Simulates the registration process and checks if the handleRegister function is called with the correct values.
  test('calls handleRegister on button click and clears inputs', () => {
    render(<Register />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Spy on console.log to verify the handleRegister function output
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    fireEvent.click(registerButton);

    // Check if console.log was called with the correct values
    expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testuser');
    expect(consoleSpy).toHaveBeenCalledWith('Password:', 'testpassword');

    consoleSpy.mockRestore();

    // Verify that the inputs are cleared after submission
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });
});
