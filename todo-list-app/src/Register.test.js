import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';

// Mock console.error to avoid actual error logging during tests
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Register Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  test('handles registration success', async () => {
    // Mock successful registration API call
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Registration successful' }),
    });

    renderWithRouter(<Register fetchFunction={mockFetch} />);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    // Click the Register button using getByRole to avoid conflict
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for the mock function to be called and assert it was called with the correct arguments
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:5000/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'testuser',
            password: 'testpassword',
          }),
        }
      );
    });
  });

  test('handles registration failure', async () => {
    // Mock failed registration API call
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Registration failed' }),
    });

    renderWithRouter(<Register fetchFunction={mockFetch} />);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    // Click the Register button using getByRole to avoid conflict
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Wait for the error to be logged to the console
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Registration Error:',
        'Registration failed'
      );
    });
  });

  test('renders Register form and handles input changes', async () => {
    renderWithRouter(<Register />);

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Already have an account\?/i })).toBeInTheDocument();

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });
  });

  test('navigates to login page when "Already have an account?" button is clicked', () => {
    renderWithRouter(<Register />);

    // Click the "Already have an account?" button
    fireEvent.click(screen.getByRole('button', { name: /Already have an account\?/i }));

    // Check if the navigation to the login page was triggered
    expect(window.location.pathname).toBe('/login');
  });
});
