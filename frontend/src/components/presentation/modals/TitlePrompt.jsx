import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalTitle } from 'react-bootstrap';
import { apiCallBodyAuthorised } from '../../../api';
import { getToken, checkStringInput, getPresentations } from '../../../helper';

const TitlePrompt = (props) => {
  const { presentationId, show, handleClose, handleShowError, setErrorMessage, title, setTitle } = props;

  const [newTitle, setNewTitle] = useState(title);

  const changeTitle = async () => {
    if (!checkStringInput([newTitle])) {
      setErrorMessage('New title cannot be empty!');
      handleShowError();
      return;
    }

    try {
      const token = getToken();
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      foundPresentation.title = newTitle;
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });
      setTitle(newTitle);
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
        handleClose();
        setNewTitle(title);
      }}
    >
      <Modal.Header closeButton>
        <ModalTitle>
          Edit Title
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form id='changeTitleForm'
          onSubmit={(event) => {
            event.preventDefault();
            changeTitle();
          }}>
          <Form.Group controlId="formNewTitle">
            <Form.Label>New Title:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={title}
              onChange={(event) => setNewTitle(event.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type="submit"
          form="changeTitleForm"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TitlePrompt;
