import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { getToken, getPresentations } from '../../helper.js';
import { apiCallBodyAuthorised } from '../../api.js';

const CreateNewPresentation = (props) => {
  const { show, handleClose, handleShowError, setErrorMessage } = props;
  const [name, setName] = useState('');
  const [inputDescription, setDescription] = useState('');

  const createPresentation = async () => {
    if (name === '') {
      handleShowError();
      setErrorMessage('Presentation name cannot be empty.');
      return;
    }

    const presentationId = uuidv4();
    try {
      const presentations = await getPresentations();
      presentations.unshift({
        id: presentationId,
        title: name,
        description: inputDescription,
        thumbnail: 'https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg',
        url: `/${presentationId}`,
        slides: [[]],
        'version-history': []
      });

      const token = getToken();
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });

      handleClose();
      setName('');
      setDescription('');
    } catch (err) {
      handleShowError();
      setErrorMessage(err);
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setName('');
          setDescription('');
        }}
      >
        <Modal.Header closeButton>
          <ModalTitle>
            Create new presentation
          </ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Form
            id='createPresentationForm'
            onSubmit={(event) => {
              event.preventDefault();
              createPresentation();
            }}
          >
            <Form.Group controlId='formPresentationName'>
              <Form.Label>
                Presentation Name
              </Form.Label>
              <Form.Control
                type='text'
                onChange={(event) => setName(event.target.value)}
                placeholder='Presentation Name'
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId='formPresentationDescription'>
              <Form.Label>
                Description
              </Form.Label>
              <Form.Control
                type='text'
                onChange={(event) => setDescription(event.target.value)}
                placeholder='Description'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type="submit" form="createPresentationForm">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateNewPresentation;
