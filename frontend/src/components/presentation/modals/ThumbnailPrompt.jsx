import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalTitle } from 'react-bootstrap';
import { apiCallBodyAuthorised } from '../../../api';
import { getToken, checkStringInput, getPresentations } from '../../../helper';

const ThumbnailPrompt = (props) => {
  const { presentationId, show, handleClose, handleShowError, setErrorMessage, thumbnailUrl } = props;

  const [newThumbnailUrl, setThumbnailUrl] = useState(thumbnailUrl);

  const changeThumbnail = async () => {
    if (!checkStringInput([newThumbnailUrl])) {
      setErrorMessage('Thumbnail URL cannot be empty!');
      handleShowError();
      return;
    }

    try {
      const token = getToken();
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      foundPresentation.thumbnail = newThumbnailUrl;
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });
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
        setThumbnailUrl(thumbnailUrl);
      }}
    >
      <Modal.Header closeButton>
        <ModalTitle>
          Change Thumbnail
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form id='changeThumbnailForm'
          onSubmit={(event) => {
            event.preventDefault();
            changeThumbnail();
          }}>
          <Form.Group controlId="formNewThumbnailUrl">
            <Form.Label>New Thumbnail:</Form.Label>
            <Form.Control
              type="text"
              defaultValue={thumbnailUrl}
              onChange={(event) => setThumbnailUrl(event.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type="submit"
          form="changeThumbnailForm"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ThumbnailPrompt;
