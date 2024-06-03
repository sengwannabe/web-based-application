import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function TextBoxPrompt (props) {
  const {
    presentationId, slideIndex, show, handleClose, handleShowError,
    setErrorMessage, ModalType, element, setElementId, handleSlideUpdate,
  } = props;
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(1);
  const [colour, setColour] = useState('#000000');

  useEffect(() => {
    if (element && element.type === 'TextBox') {
      const elemProps = element.props;
      setText(elemProps.text);
      setFontSize(elemProps.fontSize);
      setColour(elemProps.colour);
    }
  }, [element])

  const validateText = (setErrorMessage, handleShowError) => {
    if (fontSize <= 0) {
      setErrorMessage('Font size cannot be less than 0 or empty!');
      handleShowError();
      return false;
    } else if (!/^#[0-9-A-F]{6}$/i.test(colour)) {
      setErrorMessage('Invalid HEX value!');
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
      type: 'TextBox',
      props: {
        xPos,
        yPos,
        width,
        height,
        text,
        fontSize,
        colour
      }
    });
  }

  const editElement = (slide) => {
    const elem = slide.find((elem) => elem.id === element.id);
    elem.props = {
      ...elem.props,
      text,
      fontSize,
      colour
    };
  }

  const TextComponent = (
    <div>
      <Form.Group controlId='formText'>
        <Form.Label>
          Text
        </Form.Label>
        <Form.Control
          type='text'
          onChange={(event) => setText(event.target.value)}
          defaultValue={text}
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
      <Form.Group controlId='formTextColour'>
        <Form.Label>
          Colour (HEX)
        </Form.Label>
        <Form.Control
          type='text'
          onChange={(event) => setColour(event.target.value)}
          defaultValue={colour}
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
      childTitle={'Text Box'}
      Child={TextComponent}
      validateChild={validateText}
      createElement={createElement}
      editElement={editElement}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
    />
  );
}

export default TextBoxPrompt;
