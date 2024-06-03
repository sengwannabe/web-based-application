import React from 'react';
import Button from 'react-bootstrap/Button';
import DeletePrompt from './modals/DeletePrompt';
import TitlePrompt from './modals/TitlePrompt';
import ThumbnailPrompt from './modals/ThumbnailPrompt';

function PresentationControls (props) {
  const {
    navDashboard, deletePromptModal, presentationId,
    errorModal, setErrorMessage, titlePromptModal,
    title, setTitle, thumbnailPromptModal, thumbnailUrl,
  } = props;

  return (
    <div className='d-flex flex-row justify-content-between p-1'>
      <div>
        <Button
          variant='primary'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            navDashboard();
          }}
        >
          Back
        </Button>
        <Button
          variant='danger'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            deletePromptModal.handleShow();
          }}>
          Delete Presentation
        </Button>
        <DeletePrompt
          presentationId={presentationId}
          show={deletePromptModal.show}
          handleClose={deletePromptModal.handleClose}
          handleShowError={errorModal.handleShow}
          setErrorMessage={setErrorMessage}
        />
      </div>
      <h3>{title}:</h3>
      <div>
        <Button
          variant='info'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            titlePromptModal.handleShow();
          }}>
          Edit Title
        </Button>
        <TitlePrompt
          presentationId={presentationId}
          show={titlePromptModal.show}
          handleClose={titlePromptModal.handleClose}
          handleShowError={errorModal.handleShow}
          setErrorMessage={setErrorMessage}
          title={title}
          setTitle={setTitle}
        />
        <Button
          variant='info'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            thumbnailPromptModal.handleShow();
          }}>
          Change Thumbnail
        </Button>
        <ThumbnailPrompt
          presentationId={presentationId}
          show={thumbnailPromptModal.show}
          handleClose={thumbnailPromptModal.handleClose}
          handleShowError={errorModal.handleShow}
          setErrorMessage={setErrorMessage}
          thumbnailUrl={thumbnailUrl}
        />
      </div>
    </div>
  )
}

export default PresentationControls;
