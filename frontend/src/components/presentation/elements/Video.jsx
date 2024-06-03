import React from 'react';
import ParentElement from './ParentElement';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 1px solid rgb(0,0,0);
`

function Video (props) {
  const {
    id, presentationId, currentSlideIndex, xPos, yPos, width, height,
    videoUrl, autoplay, videoModal, setElementId, handleSlideUpdate,
    canvasWidth, canvasHeight, handleShowError, setErrorMessage
  } = props;

  const autoplayVideo = autoplay ? videoUrl + '&autoplay=1&mute=1' : videoUrl;

  // Video containers a small border so that edit works due to the nature of an iframe
  const Child = (
    <VideoContainer>
      <iframe src={autoplayVideo} width='96%' height='96%' allow='autoplay'>
      </iframe>
    </VideoContainer>
  )

  const elemProps = {
    videoUrl,
    autoplay
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
      editModal={videoModal}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      handleShowError={handleShowError}
      setErrorMessage={setErrorMessage}
    />
  )
}

export default Video;
