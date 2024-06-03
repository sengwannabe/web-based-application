import React from 'react';
import ParentElement from './ParentElement';

function TextBox (props) {
  const {
    id, presentationId, currentSlideIndex, xPos, yPos, width, height,
    text, fontSize, colour, textBoxModal, setElementId, handleSlideUpdate,
    canvasWidth, canvasHeight, handleShowError, setErrorMessage
  } = props;

  const textStyle = {
    width: '100%',
    height: '100%',
    border: 'solid 1px grey',
    fontSize: fontSize + 'em',
    color: colour,
    overflow: 'hidden'
  }

  const Child = (
    <div
      style={textStyle}
    >
      {text}
    </div>
  )

  const elemProps = {
    text,
    fontSize,
    colour
  }

  return (
    <ParentElement
      presentationId={presentationId}
      currentSlideIndex={currentSlideIndex}
      id={id}
      xPos={xPos}
      yPos={yPos}
      width={width}
      height={height}
      elemProps={elemProps}
      Child={Child}
      editModal={textBoxModal}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      handleShowError={handleShowError}
      setErrorMessage={setErrorMessage}
    />
  )
}

export default TextBox;
