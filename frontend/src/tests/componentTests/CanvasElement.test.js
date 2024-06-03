import React from 'react';
import ParentElement from '../../components/presentation/elements/ParentElement';
import { apiCallBody, apiCallBodyAuthorised } from '../../api';
import { render, screen, act } from '@testing-library/react';

describe('<ParentElement />, specifically TextBox', () => {
  const onHandleClose = jest.fn();
  const onHandleShow = jest.fn();
  const handleSlideUpdate = jest.fn();
  const handleShowError = jest.fn();
  const setErrorMessage = jest.fn();
  const registerInput = {
    email: 'example@email.com',
    password: 'example',
    name: 'John'
  }

  const presentationInput = {
    id: 'exampleId',
    title: 'Example title',
    description: 'Example description',
    thumbnail: 'https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg',
    url: '/exampleId'
  }

  beforeEach(async () => {
    // TRY CALL API CALL BODY TO HAVE DATA WITHIN AND REMOVE DATA IN DATABASEJSON
    let postResult = await apiCallBody('POST', '/admin/auth/register', {
      email: registerInput.email,
      password: registerInput.password,
      name: registerInput.name
    });

    if (postResult.error) {
      // if user is already registered, login using premade input
      postResult = await apiCallBody('POST', '/admin/auth/login', {
        email: registerInput.email,
        password: registerInput.password,
      });
    }

    const userData = JSON.stringify({
      token: postResult.token,
      email: registerInput
    });
    localStorage.setItem('currentUser', userData);

    // initialise user's presentations array
    apiCallBodyAuthorised(postResult.token, 'PUT', '/store', {
      store: {
        presentations: [{
          id: presentationInput.id,
          title: presentationInput.title,
          description: presentationInput.description,
          thumbnail: presentationInput.thumbnail,
          url: presentationInput.url,
          slides: [[]],
          'version-history': []
        }]
      }
    });

    // render parent element component, in these specific tests is a TextBox
    act(() => {
      render(
        <ParentElement
          presentationId={presentationInput.id}
          currentSlideIndex={0}
          id={'example-id'}
          xPos={0}
          yPos={0}
          width={100}
          height={100}
          elemProps={{
            text: 'text',
            fontSize: 1,
            colour: 'red'
          }}
          Child={(
            <div
              style={{ fontSize: 1 + 'em' }}
            >
              text
            </div>
          )}
          editModal={
            {
              show: true,
              handleClose: onHandleClose,
              handleShow: onHandleShow,
            }
          }
          setElementId={'example-element-id'}
          handleSlideUpdate={handleSlideUpdate}
          canvasWidth={1000}
          canvasHeight={500}
          handleShowError={handleShowError}
          setErrorMessage={setErrorMessage}
        />
      );
    });
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  })

  it('expect draggable parent element to render properly', () => {
    const canvasElement = screen.getByTestId('canvas-element-draggable');
    // expect that parent element has property draggable for UI
    expect(Object.values(canvasElement.classList)).toStrictEqual(['react-draggable']);
    expect(canvasElement.getAttribute('style')).toMatch(/user-select: auto.*cursor: auto;/i);
  });
});
