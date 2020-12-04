import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownItem } from './Dropdown';

describe('Dropdown component', () => {
  it('Should open dropwown content, when click on button', () => {
    const { getByRole, getByTestId } = render(<Dropdown />);
    userEvent.click(getByRole('button'));
    expect(getByTestId('dropdown-list')).toBeVisible();
  });
});

describe('DropdownItem component', () => {
  it('Should render button', () => {
    const { getByRole } = render(<DropdownItem />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('Should render children props inside of the button', () => {
    const { getByRole, getByText } = render(
      <DropdownItem>
        Test
      </DropdownItem>
    );
    expect(getByRole('button')).toContainElement(getByText(/Test/i));
  });

  it('Default props', () => {
    const { getByRole } = render(<DropdownItem />);
    const button = getByRole('button');
    const clickRes = userEvent.click(button);
    expect(clickRes).toBeUndefined();
  });
});
