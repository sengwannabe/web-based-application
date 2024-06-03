import React from 'react';
import ParentElement from './ParentElement';

function Image (props) {
  const {
    id, presentationId, currentSlideIndex, xPos, yPos, width, height,
    imageUrl, altTag, imageModal, setElementId, handleSlideUpdate,
    canvasWidth, canvasHeight, handleShowError, setErrorMessage
  } = props;

  const Child = (
    <img src={imageUrl} alt={altTag} width='100%' height='100%' draggable='false' />
  )

  const elemProps = {
    imageUrl,
    altTag
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
      editModal={imageModal}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      handleShowError={handleShowError}
      setErrorMessage={setErrorMessage}
    />
  )
}

export default Image;
