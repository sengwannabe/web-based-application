import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Register from '../../components/Register';
import { BrowserRouter } from 'react-router-dom';

describe('<Register />', () => {
  const onSubmit = jest.fn();
  const user = userEvent.setup();
  const inputs = {
    email: 'username123@email.com',
    username: 'username123',
    password: '123',
    confirmPassword: '123'
  }

  beforeEach(() => {
    jest.clearAllMocks();
    // render register component
    act(() => {
      render(<BrowserRouter><Register handleSubmit={onSubmit} /></BrowserRouter>);
    });
  });

  it('expect header to be rendered properly', () => {
    const header = screen.getByRole('heading', { name: /register/i });
    expect(header).toBeInTheDocument();
    // expect text content to be 'Register'
    expect(header.textContent).toBe('Register');
  });

  it('expect email input and label to be rendered properly', () => {
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const emailLabel = screen.getByText(/email/i);
    // expect label and input to be in document
    expect(emailInput).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();

    // expect label is for input id
    const expectedId = 'formBasicEmail';
    expect(emailLabel).toHaveAttribute('for', expectedId);
    expect(emailInput).toHaveAttribute('id', expectedId);

    // expect input to have placeholder type is of email
    const expectedPlaceHolder = 'Enter email';
    const expectedType = 'email';
    expect(emailInput).toHaveAttribute('placeholder', expectedPlaceHolder);
    expect(emailInput).toHaveAttribute('type', expectedType);
    expect(emailLabel.textContent).toBe('Email');
  });

  it('expect name input and label to be rendered properly', () => {
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const nameLabel = screen.getByText(/name/i);
    // expect label and input to be in document
    expect(nameInput).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();

    // expect label is for input id
    const expectedId = 'formBasicName';
    expect(nameLabel).toHaveAttribute('for', expectedId);
    expect(nameInput).toHaveAttribute('id', expectedId);

    // expect input to have placeholder type is of text
    const expectedPlaceHolder = 'Enter name';
    const expectedType = 'text';
    expect(nameInput).toHaveAttribute('placeholder', expectedPlaceHolder);
    expect(nameInput).toHaveAttribute('type', expectedType);
    expect(nameLabel.textContent).toBe('Name');
  });

  it('expect password input and label to be rendered properly', () => {
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const passwordLabel = screen.getByText(/^password$/i);
    // expect label and input to be in document
    expect(passwordInput).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();

    // expect label is for input id
    const expectedId = 'formBasicPassword';
    expect(passwordLabel).toHaveAttribute('for', expectedId);
    expect(passwordInput).toHaveAttribute('id', expectedId);

    // expect input to have placeholder type is of password
    const expectedPlaceHolder = 'Enter password';
    const expectedType = 'password';
    expect(passwordInput).toHaveAttribute('placeholder', expectedPlaceHolder);
    expect(passwordInput).toHaveAttribute('type', expectedType);
    expect(passwordLabel.textContent).toBe('Password');
  });

  it('expect confirm password input and label to be rendered properly', () => {
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
    const confirmPasswordLabel = screen.getByText(/confirm password/i);
    // expect label and input to be in document
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();

    // expect label is for input id
    const expectedId = 'formConfirmPassword';
    expect(confirmPasswordLabel).toHaveAttribute('for', expectedId);
    expect(confirmPasswordInput).toHaveAttribute('id', expectedId);

    // expect input to have placeholder type is of password
    const expectedPlaceHolder = 'Confirm password';
    const expectedType = 'password';
    expect(confirmPasswordInput).toHaveAttribute('placeholder', expectedPlaceHolder);
    expect(confirmPasswordInput).toHaveAttribute('type', expectedType);
    expect(confirmPasswordLabel.textContent).toBe('Confirm Password');
  });

  it('expect button to be rendered properly', () => {
    // premade object required class attributes of button
    const expectedClassProp = [
      'mb-3',
      'btn',
      'btn-primary'
    ]
    const submitButton = screen.getByRole('button', { name: /submit/i });
    // expect label and input to be in document
    expect(submitButton).toBeInTheDocument();
    // expect correct class
    expect(Object.values(submitButton.classList)).toStrictEqual(expectedClassProp);
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton.textContent).toBe('Submit');
  });

  it('expect link to login to be rendered properly', () => {
    const loginLink = screen.getByRole('link', { name: /here!/i });
    expect(loginLink).toBeInTheDocument();
    // expect when link is clicked, href is to login page
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('user inputs values and value is stored in element', async () => {
    // user types in email and input value should be updated
    const email = screen.getByRole('textbox', { name: /email/i });
    await user.type(email, inputs.email);
    expect(email).toHaveValue(inputs.email);

    // user types in name and input value should be updated
    const name = screen.getByRole('textbox', { name: /name/i });
    await user.type(name, inputs.username);
    expect(name).toHaveValue(inputs.username);

    // user types in password and input value should be updated
    const password = screen.getByPlaceholderText(/enter password/i);
    await user.type(password, inputs.password);
    expect(password).toHaveValue(inputs.password);

    // user types in confirm password and input value should be updated
    const confirmPassword = screen.getByPlaceholderText(/confirm password/i);
    await user.type(confirmPassword, inputs.confirmPassword);
    expect(confirmPassword).toHaveValue(inputs.confirmPassword);
  });

  it('triggers onSubmit when registration form is submitted by button', async () => {
    // user types in email and input value should be updated
    await user.type(screen.getByRole('textbox', { name: /email/i }), inputs.email);
    // user types in name and input value should be updated
    await user.type(screen.getByRole('textbox', { name: /name/i }), inputs.username);
    // user types in password and input value should be updated
    await user.type(screen.getByPlaceholderText(/enter password/i), inputs.password);
    // user types in confirm password and input value should be updated
    await user.type(screen.getByPlaceholderText(/confirm password/i), inputs.confirmPassword);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /submit/i }));
    })
    // ensure click was made
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('username123@email.com', '123', '123', 'username123');
  });
});
