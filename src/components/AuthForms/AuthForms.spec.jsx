import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Signup, Login } from './AuthForms';

describe('Signup component', () => {
  it('Should render title', () => {
    render(<Signup />);
    expect(screen.getByText(/Create new account/i)).toBeInTheDocument();
  });

  it('Should render 3 inputs for login, password and it\'s confirmation', () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText(/Your login here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Your password here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Your password here/i)).toBeInTheDocument();
  });

  it('Should display typed input', () => {
    render(<Signup />);
    const inputs = screen.getAllByPlaceholderText(/Your.+here/i);
    inputs.forEach((i) => {
      userEvent.type(i, 'Test');
      expect(i).toHaveValue('Test');
    });
  });
});

describe('Login component', () => {
  it('Should be', () => {

  });
});
