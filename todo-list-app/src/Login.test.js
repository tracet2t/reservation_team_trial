import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

// Mocking useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear(); // Clear mock before each test
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  test('renders Login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    
    // Use more specific query to check button text
    const loginButtons = screen.getAllByText(/Login/i);
    expect(loginButtons[0].tagName).toBe('H2'); // Check if the first one is the heading
    expect(loginButtons[1].tagName).toBe('BUTTON'); // Check if the second one is the button
  });

  test('allows user to type in username and password', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  test('submits the form and calls the login API', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fakeToken' }),
      })
    );

    global.fetch = mockFetch;

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(loginButton);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:5000/login', expect.any(Object));
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('handles successful login and redirects to ToDo page', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'fakeToken' }),
      })
    );

    global.fetch = mockFetch;

    // Mocking localStorage.setItem
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.click(loginButton);

    // Wait for the fetch to resolve
    await screen.findByRole('button', { name: /Login/i }); // Ensures fetch completes before checking navigation

    expect(mockSetItem).toHaveBeenCalledWith('token', 'fakeToken');
    expect(mockNavigate).toHaveBeenCalledWith('/todo');
  });

  test('handles failed login attempt', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    global.fetch = mockFetch;

    // Mocking console.error
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.click(loginButton);

    // Wait for the fetch to resolve
    await screen.findByRole('button', { name: /Login/i }); // Ensures fetch completes

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('Invalid credentials');
  });
});
