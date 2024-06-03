import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function VideoPrompt (props) {
  const {
    presentationId, slideIndex, show, handleClose, handleShowError,
    setErrorMessage, ModalType, element, setElementId, handleSlideUpdate,
  } = props;
  const [videoUrl, setVideoUrl] = useState('');
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (element && element.type === 'Video') {
      const elemProps = element.props;
      setVideoUrl(elemProps.videoUrl);
      setAutoplay(elemProps.autoplay);
    }
  }, [element]);

  const validateVideoStr = (setErrorMessage, handleShowError) => {
    if (!videoUrl) {
      setErrorMessage('Video URL cannot be empty!');
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
      type: 'Video',
      props: {
        xPos,
        yPos,
        width,
        height,
        videoUrl,
        autoplay
      }
    });
  }

  const editElement = (slide) => {
    const elem = slide.find((elem) => elem.id === element.id);
    elem.props = {
      ...elem.props,
      videoUrl,
      autoplay
    };
  }

  const VideoComponent = (
    <div>
      <Form.Group controlId='formVideoUrl'>
        <Form.Label>
          Video URL
        </Form.Label>
        <Form.Control
          type='text'
          onChange={(event) => setVideoUrl(event.target.value)}
          defaultValue={videoUrl}
        />
      </Form.Group>
      <Form.Group controlId='formFontSize'>
        <Form.Label>
          Autoplay
        </Form.Label>
        <Form.Check
          type='checkbox'
          onChange={(event) => setAutoplay(event.target.checked)}
          checked={autoplay}
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
      childTitle={'Video'}
      Child={VideoComponent}
      validateChild={validateVideoStr}
      createElement={createElement}
      editElement={editElement}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
    />
  );
}

export default VideoPrompt;
