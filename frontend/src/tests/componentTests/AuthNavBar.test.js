import React from 'react';
import AuthNavBar from '../../components/AuthNavBar';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('<AuthNavBar />', () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  beforeEach(() => {
    jest.clearAllMocks();
    // render AuthNavBar component
    act(() => {
      render(<BrowserRouter><AuthNavBar handleClick={onClick} /></BrowserRouter>);
    });
  });

  it('expect nav bar to be rendered properly', () => {
    // premade object required class attributes of nav bar
    const expectedClassProp = [
      'bg-primary-subtle',
      'text-right',
      'justify-content-end',
      'align-items-center',
      'navbar',
      'navbar-expand',
      'navbar-light'
    ]
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
    // expect correct classes
    expect(Object.values(navBar.classList)).toStrictEqual(expectedClassProp);
  });

  describe('logout button tests', () => {
    it('expect logout button to be rendered properly', () => {
      const logoutButton = screen.getByRole('button');
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveClass('btn', 'btn-dark');
      expect(logoutButton).toHaveAttribute('type', 'button');
      // text of button tag should be 'Logout'
      expect(logoutButton.textContent).toBe('Logout');
    });

    it('logout button can be clicked', async () => {
      const logoutButton = screen.getByRole('button');
      await act(async () => {
        await user.click(logoutButton);
      })
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
