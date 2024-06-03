import React from 'react';
import ErrorDismissable from '../../components/ErrorDismissable';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('<ErrorDismissable />', () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  beforeEach(() => {
    jest.clearAllMocks();
    // render error modal component
    act(() => {
      render(<ErrorDismissable show={true} handleCloseError={onClick} message={'Custom error message here'} />);
    });
  });

  it('expect modal container is rendered properly', () => {
    const expectedClassProp = [
      'fade',
      'modal',
      'show'
    ]
    const modalContainer = screen.getByRole('dialog');
    expect(modalContainer).toBeInTheDocument();
    // expect correct classes
    expect(Object.values(modalContainer.classList)).toStrictEqual(expectedClassProp);
    expect(modalContainer).toHaveAttribute('aria-modal', 'true');
  });

  it('expect error message is rendered properly', () => {
    const errorMessage = screen.getByText(/^custom error message here$/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.textContent).toBe('Custom error message here');
  });

  describe('X button tests', () => {
    it('expect X close button to be rendered properly', () => {
      const closeXButton = screen.getAllByRole('button')[0];
      expect(closeXButton).toBeInTheDocument();
      expect(closeXButton).toHaveClass('btn-close');
      expect(closeXButton).toHaveAttribute('aria-label', 'Close');
      expect(closeXButton).toHaveAttribute('type', 'button');
    });

    it('close X button can be clicked', async () => {
      const closeXButton = screen.getAllByRole('button')[0];
      await act(async () => {
        await user.click(closeXButton);
      })
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('close button tests', () => {
    it('expect close button to be rendered properly', () => {
      const closeButton = screen.getAllByRole('button')[1];
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveClass('btn', 'btn-primary');
      expect(closeButton).toHaveAttribute('type', 'button');
      // text of button tag should be 'Logout'
      expect(closeButton.textContent).toBe('Close');
    });

    it('close button can be clicked', async () => {
      const closeButton = screen.getAllByRole('button')[1];
      await act(async () => {
        await user.click(closeButton);
      })
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
