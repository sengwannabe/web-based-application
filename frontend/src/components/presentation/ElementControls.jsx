import React from 'react';
import Button from 'react-bootstrap/Button';
import TextBoxPrompt from './elementmodals/TextBoxPrompt';
import ParentCreateModal from './elementmodals/ParentCreateModal';
import ImagePrompt from './elementmodals/ImagePrompt';
import VideoPrompt from './elementmodals/VideoPrompt';
import CodePrompt from './elementmodals/CodePrompt';

function ElementControls (props) {
  const {
    presentationId, errorModal, setErrorMessage,
    textBoxModal, imageModal, videoModal, codeModal,
    slideIndex, handleSlideUpdate
  } = props;
  return (
    <div>
      <TextBoxPrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={textBoxModal.show}
        handleClose={textBoxModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentCreateModal}
        handleSlideUpdate={handleSlideUpdate}
      />
      <ImagePrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={imageModal.show}
        handleClose={imageModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentCreateModal}
        handleSlideUpdate={handleSlideUpdate}
      />
      <VideoPrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={videoModal.show}
        handleClose={videoModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentCreateModal}
        handleSlideUpdate={handleSlideUpdate}
      />
      <CodePrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={codeModal.show}
        handleClose={codeModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentCreateModal}
        handleSlideUpdate={handleSlideUpdate}
      />
      <div className='d-flex flex-row justify-content-center p-1'>
        <Button
          variant='secondary'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            textBoxModal.handleShow();
          }}>
          Add Text
        </Button>
        <Button
          variant='secondary'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            imageModal.handleShow();
          }}>
          Add Image
        </Button>
        <Button
          variant='secondary'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            videoModal.handleShow();
          }}>
          Add Video
        </Button>
        <Button
          variant='secondary'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            codeModal.handleShow();
          }}>
          Add Code
        </Button>

      </div>
    </div>
  )
}

export default ElementControls;
