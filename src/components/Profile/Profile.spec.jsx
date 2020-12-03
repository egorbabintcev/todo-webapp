import React from 'react';
import { render } from '@testing-library/react';
import Profile from './Profile';

describe('Profile component', () => {
  it('Should render greeting', () => {
    const { getByText } = render(<Profile />);
    expect(getByText(/Hey, User/i)).toBeInTheDocument();
  });

  it('Should render current date string in "Month Day, Year" format', () => {
    const { getByText } = render(<Profile />);
    const compareStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    expect(getByText(compareStr)).toBeInTheDocument();
  });
});
