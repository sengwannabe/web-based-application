import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function ImagePrompt (props) {
  const {
    presentationId, slideIndex, show, handleClose, handleShowError,
    setErrorMessage, ModalType, element, setElementId, handleSlideUpdate,
  } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [altTag, setAltTag] = useState('');

  useEffect(() => {
    if (element && element === 'Image') {
      const elemProps = element.props;
      setImageUrl(elemProps.imageUrl);
      setAltTag(elemProps.altTag);
    }
  }, [element])

  const validateImageStr = (setErrorMessage, handleShowError) => {
    if (!imageUrl) {
      setErrorMessage('Image URL cannot be empty!');
      handleShowError();
      return false;
    }
    return true;
  }

  const xPos = 0;
  const yPos = 0;

  const createElement = (slide, id, width, height) => {
    slide.push({
      id,
      type: 'Image',
      props: {
        xPos,
        yPos,
        width,
        height,
        imageUrl,
        altTag
      }
    });
  }

  const editElement = (slide) => {
    const elem = slide.find((elem) => elem.id === element.id);
    elem.props = {
      ...elem.props,
      imageUrl,
      altTag
    };
  }

  const ImageComponent = (
    <div>
      <Form.Group controlId='formImageUrl'>
        <Form.Label>
          Image URL
        </Form.Label>
        <Form.Control
          type='text'
          onChange={(event) => setImageUrl(event.target.value)}
          defaultValue={imageUrl}
        />
      </Form.Group>
      <Form.Group controlId='formFontSize'>
        <Form.Label>
          Alt Tag
        </Form.Label>
        <Form.Control
          type='text'
          onChange={(event) => setAltTag(event.target.value)}
          defaultValue={altTag}
        />
      </Form.Group>
    </div>
  );

  return (
    <ModalType
      presentationId={presentationId}
      show={show}
      handleClose={handleClose}
      handleShowError={handleShowError}
      setErrorMessage={setErrorMessage}
      slideIndex={slideIndex}
      childTitle={'Image'}
      Child={ImageComponent}
      validateChild={validateImageStr}
      createElement={createElement}
      editElement={editElement}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
    />
  );
}

export default ImagePrompt;
