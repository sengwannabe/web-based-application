import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 * Function produces JSX Modal for errors
 * @param {*} props, takes in show boolean, close handler and error message
 * @returns {Modal} error popup
 */
function ErrorDismissable (props) {
  const { show, handleCloseError, message } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseError}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorDismissable;
