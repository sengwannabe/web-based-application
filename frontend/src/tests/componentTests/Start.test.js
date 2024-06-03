import React from 'react';
import Start from '../../components/Start';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';

describe('<Start />', () => {
  beforeEach(() => {
    // render AuthNavBar component
    act(() => {
      render(<BrowserRouter><Start /></BrowserRouter>);
    });
  });

  it('expect header to be rendered properly', () => {
    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
    // expect text content to be 'Slides'
    expect(header.textContent).toBe('Slides');
  });

  it('expect link to login to be rendered properly', () => {
    const loginLink = screen.getByRole('link', { name: /Login/i });
    expect(loginLink).toBeInTheDocument();
    // expect when link is clicked, href is to login page
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('expect link to register to be rendered properly', () => {
    const registerLink = screen.getByRole('link', { name: /Register/i });
    expect(registerLink).toBeInTheDocument();
    // expect when link is clicked, href is to register page
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
