import React from 'react';
import PresentationCard from '../../components/dashboard/PresentationCard';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('<PresentationCard />', () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  const input = {
    url: '/exampleurl',
    title: 'Example title',
    thumbnail: 'Example image url',
    description: 'Example description',
    slidesNumber: 0
  }

  beforeEach(() => {
    jest.clearAllMocks();
    // render CreateNewPresentation component
    act(() => {
      render(
        <BrowserRouter>
          <PresentationCard
            presentationUrl={input.url}
            title={input.title}
            thumbnail={input.thumbnail}
            description={input.description}
            slidesNumber={input.slidesNumber}
            handleClick={onClick}
          />
        </BrowserRouter>
      );
    });
  })

  it('expect ratio container to be properly rendered', () => {
    const ratioContainer = screen.getByTestId('ratio-element');
    expect(ratioContainer).toBeInTheDocument();
    // expect presentation card is in a width:height ratio of 2:1
    expect(Object.values(ratioContainer.classList)).toStrictEqual(['ratio']);
    expect(ratioContainer).toHaveAttribute('style', '--bs-aspect-ratio: 50%;')
  });

  it('expect header to be properly rendered', () => {
    const header = screen.getByRole('heading');
    expect(header).toBeInTheDocument();
    // expect text content to be inputted title
    expect(header.textContent).toBe(input.title);
  });

  it('expect image thumbnail to be properly rendered', () => {
    const thumbnail = screen.getByRole('img');
    expect(thumbnail).toBeInTheDocument();
    // expect alt to be have any description
    expect(thumbnail).toHaveAttribute('alt');
  });

  it('expect card description to be properly rendered', () => {
    const description = screen.getByTestId('card-description');
    expect(description).toBeInTheDocument();
    // expect text content to be inputted description
    expect(description.textContent).toBe(input.description);
  });

  it('expect card slides number to be properly rendered', () => {
    const slidesNumber = screen.getByTestId('card-slides-number');
    expect(slidesNumber).toBeInTheDocument();
    // expect text content to be inputted slidesNumber
    expect(slidesNumber.textContent).toBe(`Number of slides: ${input.slidesNumber}`);
  });

  it('expect go to button to be rendered properly', () => {
    // premade object required class attributes of button
    const expectedClassProp = [
      'btn',
      'btn-primary'
    ]
    const goToButton = screen.getByRole('button');
    expect(goToButton).toBeInTheDocument();
    // expect correct class
    expect(Object.values(goToButton.classList)).toStrictEqual(expectedClassProp);
    expect(goToButton).toHaveAttribute('type', 'button');
    expect(goToButton.textContent).toBe('Go to presentation');
  });

  it('expect go to button can be clicked', async () => {
    const goToButton = screen.getByRole('button');
    await act(async () => {
      await user.click(goToButton);
    })
    // ensure click was made
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
