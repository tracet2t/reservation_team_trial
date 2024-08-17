import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  // Test Case 1: Renders the component and checks if the username, password inputs, and the login button are present.
  test('renders Login component with username, password inputs, and login button', () => {
    render(<Login handleLogin={jest.fn()} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByText(/login/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // Test Case 2: Updates the username and password fields and checks if the state is updated correctly.
  test('updates the username and password fields correctly', () => {
    render(<Login handleLogin={jest.fn()} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  // Test Case 3: Simulates the login process and checks if the handleLogin function is called with the correct values.
  test('calls handleLogin on button click and clears inputs', () => {
    const handleLogin = jest.fn();
    render(<Login handleLogin={handleLogin} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByText(/login/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(loginButton);

    expect(handleLogin).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  // Test Case 4: Displays error message for empty username and password.
  test('displays error message for empty username and password', () => {
    render(<Login handleLogin={jest.fn()} />);

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
  });

  // Test Case 5: Shows success message after successful login.
  test('shows success message after successful login', () => {
    const handleLogin = jest.fn();
    render(<Login handleLogin={handleLogin} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByText(/login/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(loginButton);

    expect(screen.getByText(/login successful/i)).toBeInTheDocument();
  });
});
