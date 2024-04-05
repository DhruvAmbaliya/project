import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import './axiosMock.js'; // Mock axios
import Login from '../Login.js';

// Mock axios post method
jest.mock('axios');

describe('Login component', () => {
  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('should show error message for invalid email', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText('*Invalid Email')).toBeInTheDocument();
    });
  });

  it('should call login API on valid credentials', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    // Mock successful login response
    axios.post.mockResolvedValueOnce({
      data: {
        msg: 'ok',
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password',
          type: 'student',
          _id: 'user_id',
          timing: { /* timing data */ },
          profilePhoto: null,
          skills: [],
        },
      },
    });

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('addstudents/login'),
        {
          email: 'john@example.com',
          password: 'password',
        }
      );
      expect(localStorage.getItem('check')).toBe('okk');
      expect(localStorage.getItem('username')).toBe('John Doe');
      // Add more assertions for other localStorage items set
    });
  });
});
