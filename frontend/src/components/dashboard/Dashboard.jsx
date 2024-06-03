import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ErrorDismissable from '../ErrorDismissable.jsx';
import AuthNavBar from '../AuthNavBar.jsx';
import CreateNewPresentation from './CreateNewPresentation.jsx';
import PresentationCards from './PresentationCards.jsx';
import { logout } from '../../helper.js';

function Dashboard (props) {
  const { handleClick } = props;
  const [showPresentation, setShowPresentation] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const useSetErrorMessage = (errorMessage) => setErrorMessage(errorMessage);
  const handleShowError = () => setErrorVisible(true);
  const handleCloseError = () => setErrorVisible(false);
  const handleClose = () => setShowPresentation(false);
  const handleShow = () => setShowPresentation(true);

  return (
    <>
      <ErrorDismissable show={errorVisible} handleCloseError={handleCloseError} message={errorMessage} />
      <AuthNavBar handleClick={logout} />
      <div className='d-flex flex-column align-items-center gap-2'>
        <div className='p-3'>
          <Button variant='primary'
            type='button'
            onClick={(event) => {
              event.preventDefault();
              handleShow();
              setShowPresentation(handleClick());
            }}>
            New presentation
          </Button>
          <CreateNewPresentation
            show={showPresentation}
            handleClose={handleClose}
            handleShowError={handleShowError}
            setErrorMessage={useSetErrorMessage}/>
        </div>
        <PresentationCards
          handleShowError={handleShowError}
          setErrorMessage={useSetErrorMessage}
          showPresentation={showPresentation}
        />
      </div>
    </>
  )
}

export default Dashboard;
