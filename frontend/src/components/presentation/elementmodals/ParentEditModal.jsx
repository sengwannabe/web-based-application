import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { apiCallBodyAuthorised } from '../../../api';
import { getToken, getPresentations } from '../../../helper';

function ParentEditModal (props) {
  const {
    presentationId, show, handleClose, handleShowError,
    setErrorMessage, slideIndex, childTitle, Child,
    validateChild, editElement, setElementId, handleSlideUpdate
  } = props;

  const modifyElement = async () => {
    if (!validateChild(setErrorMessage, handleShowError)) {
      return;
    }

    try {
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      if (!foundPresentation) {
        throw new Error('No presentation found.');
      }
      const slide = foundPresentation.slides[slideIndex];
      editElement(slide);

      const token = getToken();
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });

      setElementId(undefined);
      handleSlideUpdate();
      handleClose();
    } catch (err) {
      handleShowError();
      setErrorMessage(err);
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setElementId(undefined);
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <ModalTitle>
          {childTitle}
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form
          id='editElementForm'
          onSubmit={(event) => {
            event.preventDefault();
            modifyElement();
          }}
        >
          {Child}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type="submit" form="editElementForm">
          Update Element
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ParentEditModal;
