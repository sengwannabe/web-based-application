import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function CodePrompt (props) {
  const {
    presentationId, slideIndex, show, handleClose, handleShowError,
    setErrorMessage, ModalType, element, setElementId, handleSlideUpdate,
  } = props;
  const [code, setCode] = useState('');
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    if (element && element.type === 'Code') {
      const elemProps = element.props;
      setCode(elemProps.code);
      setFontSize(elemProps.fontSize);
    }
  }, [element])

  const validateCode = (setErrorMessage, handleShowError) => {
    if (fontSize <= 0) {
      setErrorMessage('Font size cannot be less than 0 or empty!');
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
      type: 'Code',
      props: {
        xPos,
        yPos,
        width,
        height,
        code,
        fontSize
      }
    });
  }

  const editElement = (slide) => {
    const elem = slide.find((elem) => elem.id === element.id);
    elem.props = {
      ...elem.props,
      code,
      fontSize
    };
  }

  const CodeComponent = (
    <div>
      <Form.Group controlId='formText'>
        <Form.Label>
          Code
        </Form.Label>
        <Form.Control
          as='textarea'
          onChange={(event) => setCode(event.target.value)}
          defaultValue={code}
        />
      </Form.Group>
      <Form.Group controlId='formFontSize'>
        <Form.Label>
          Font Size (em)
        </Form.Label>
        <Form.Control
          type='number'
          onChange={(event) => setFontSize(event.target.value)}
          defaultValue={fontSize}
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
      childTitle={'Code'}
      Child={CodeComponent}
      validateChild={validateCode}
      createElement={createElement}
      editElement={editElement}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
    />
  );
}

export default CodePrompt;
