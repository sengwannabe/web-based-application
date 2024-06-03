import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import { apiCallBodyAuthorised } from '../../../api';
import { getToken, getPresentations } from '../../../helper';

const DeletePrompt = (props) => {
  const navigate = useNavigate();
  const { presentationId, show, handleClose, handleShowError, setErrorMessage } = props;

  const deletePresentation = async () => {
    try {
      // const storeData = await apiCallAuthorised(token, 'GET', '/store');
      // const presentations = storeData.store.presentations;
      const presentations = await getPresentations();
      const newPresentations = presentations.filter((p) => {
        return p.id !== presentationId;
      });
      const token = getToken();
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations: newPresentations
        }
      });
      navigate('/dashboard');
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
          Delete Presentation
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' type="button"
          onClick={(event) => {
            event.preventDefault();
            handleClose();
          }}
        >
          No
        </Button>
        <Button variant='danger' type="button"
          onClick={(event) => {
            event.preventDefault();
            deletePresentation();
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePrompt;
