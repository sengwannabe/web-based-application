import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { apiCallBodyAuthorised } from '../../../api';
import { v4 as uuidv4 } from 'uuid';
import { getToken, getPresentations } from '../../../helper';

function ParentCreateModal (props) {
  const {
    presentationId, show, handleClose, handleShowError,
    setErrorMessage, slideIndex, childTitle, Child,
    validateChild, createElement, handleSlideUpdate
  } = props;

  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);

  const addElement = async () => {
    if (width <= 1 || width > 100) {
      handleShowError();
      setErrorMessage('Width must be between 0 < WIDTH <= 100.');
      return;
    } else if (height <= 1 || height > 100) {
      handleShowError();
      setErrorMessage('Height must be between 0 < WIDTH <= 100.');
      return;
    } else if (!validateChild(setErrorMessage, handleShowError)) {
      return;
    }

    try {
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      if (!foundPresentation) {
        throw new Error('No presentation found.');
      }
      const slide = foundPresentation.slides[slideIndex];
      const id = uuidv4();
      createElement(slide, id, width / 100, height / 100);

      const token = getToken();
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });

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
          id='addElementForm'
          onSubmit={(event) => {
            event.preventDefault();
            addElement();
          }}
        >
          <Form.Group controlId='formWidth'>
            <Form.Label>
              Width
            </Form.Label>
            <Form.Control
              type='number'
              onChange={(event) => setWidth(event.target.value)}
              defaultValue={50}
              autoFocus
            />
          </Form.Group>
          <Form.Group controlId='formHeight'>
            <Form.Label>
              Height
            </Form.Label>
            <Form.Control
              type='number'
              onChange={(event) => setHeight(event.target.value)}
              defaultValue={50}
            />
          </Form.Group>
          {Child}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type="submit" form="addElementForm">
          Add Element
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ParentCreateModal;
