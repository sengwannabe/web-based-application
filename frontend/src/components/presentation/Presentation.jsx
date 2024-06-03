import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthNavBar from '../AuthNavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorDismissable from '../ErrorDismissable'
import { apiCallBodyAuthorised } from '../../api';
import { getToken, getFoundPresentation, getPresentations, logout } from '../../helper';
import PresentationControls from './PresentationControls';
import ElementControls from './ElementControls';
import Canvas from './Canvas';
import SlideControls from './SlideControls';

const PresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 92%;
  justify-content: space-between;
`

function Presentation () {
  const navigate = useNavigate();
  const location = useLocation();
  const presentationId = location.pathname.substring(1);

  const [modals, setModals] = useState({
    error: false,
    titlePrompt: false,
    deletePrompt: false,
    thumbnailPrompt: false,
    textBoxPrompt: false,
    editTextBoxModal: false,
    imagePrompt: false,
    editImageModal: false,
    videoPrompt: false,
    editVideoModal: false,
    codePrompt: false,
    editCodeModal: false,
  });

  const getModal = (modalName) => {
    return {
      show: modals[modalName],
      handleClose: () => setModals(() => ({
        ...modals,
        [modalName]: false
      })),
      handleShow: () => setModals(() => ({
        ...modals,
        [modalName]: true
      })),
    }
  }

  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const errorModal = getModal('error');
  const titlePromptModal = getModal('titlePrompt');
  const deletePromptModal = getModal('deletePrompt');
  const thumbnailPromptModal = getModal('thumbnailPrompt');
  const textBoxModal = getModal('textBoxPrompt');
  const editTextBoxModal = getModal('editTextBoxModal');
  const imageModal = getModal('imagePrompt');
  const editImageModal = getModal('editImageModal');
  const videoModal = getModal('videoPrompt');
  const editVideoModal = getModal('editVideoModal');
  const codeModal = getModal('codePrompt');
  const editCodeModal = getModal('editCodeModal');

  const [errorMessage, setErrorMessage] = useState('');
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentSlideInfo, setCurrentSlideInfo] = useState([]);
  const [slidesUpdate, setSlidesUpdate] = useState(false);
  const handleSlideUpdate = () => setSlidesUpdate(true);
  const handleCloseSlideUpdate = () => setSlidesUpdate(false);

  useEffect(() => {
    let unmount = false;
    const checkPresentationId = async () => {
      try {
        const foundPresentation = await getFoundPresentation(presentationId);
        if (!unmount) {
          setTitle(foundPresentation.title);
          setThumbnailUrl(foundPresentation.thumbnail);
        }
      } catch (err) {
        errorModal.handleShow();
        setErrorMessage(err);
      }
    }
    checkPresentationId();
    return () => {
      unmount = true;
    }
  }, []);

  useEffect(() => {
    let unmount = false;
    const loadSlides = async () => {
      try {
        const foundPresentation = await getFoundPresentation(presentationId);
        if (!unmount) {
          setSlides(foundPresentation.slides);
          setCurrentSlideInfo(foundPresentation.slides[currentSlideIndex]);
        }
      } catch (err) {
        errorModal.handleShow();
        setErrorMessage(err);
      }
    }
    loadSlides();
    return () => {
      unmount = true;
    }
  }, [slidesUpdate])

  const navDashboard = () => {
    navigate('/dashboard');
  }

  const createNewSlide = async () => {
    try {
      const token = getToken();
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      slides.push([]);
      foundPresentation.slides = slides;
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });
      // when created new slide, go to new slide at the end index
      setCurrentSlideIndex(slides.length - 1);
      setCurrentSlideInfo(slides[slides.length - 1]);
      handleSlideUpdate();
    } catch (err) {
      errorModal.handleShow();
      setErrorMessage(err);
    }
  }

  const deleteSlide = async (slideIndex) => {
    try {
      const token = getToken();
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      if (slides.length === 1) {
        // handles deleting 1 slide left in presentation
        deletePromptModal.handleShow();
      } else {
        slides.splice(slideIndex, 1);
        foundPresentation.slides = slides;
        await apiCallBodyAuthorised(token, 'PUT', '/store', {
          store: {
            presentations
          }
        });
        if (slideIndex === 0) {
          // if deleting first slide, go to new starting slide
          setCurrentSlideIndex(0);
        } else {
          // deleting current slide, go to previous slide
          setCurrentSlideIndex(slideIndex - 1);
        }
        setCurrentSlideInfo(slides[currentSlideIndex]);
        handleSlideUpdate();
      }
    } catch (err) {
      errorModal.handleShow();
      setErrorMessage(err);
    }
  }

  return (
    <div className='vh-100'>
      <ErrorDismissable show={errorModal.show} handleCloseError={errorModal.handleClose} message={errorMessage} />
      <AuthNavBar handleClick={logout} />
      <PresentationContainer>
        <PresentationControls
          navDashboard={navDashboard}
          deletePromptModal={deletePromptModal}
          presentationId={presentationId}
          errorModal={errorModal}
          setErrorMessage={setErrorMessage}
          titlePromptModal={titlePromptModal}
          title={title}
          setTitle={setTitle}
          thumbnailPromptModal={thumbnailPromptModal}
          thumbnailUrl={thumbnailUrl}
        />
        <ElementControls
          presentationId={presentationId}
          errorModal={errorModal}
          setErrorMessage={setErrorMessage}
          textBoxModal={textBoxModal}
          imageModal={imageModal}
          videoModal={videoModal}
          codeModal={codeModal}
          slideIndex={currentSlideIndex}
          handleSlideUpdate={handleSlideUpdate}
        />
        <Canvas
          presentationId={presentationId}
          currentSlideInfo={currentSlideInfo}
          currentSlideNumber={currentSlideIndex + 1}
          errorModal={errorModal}
          setErrorMessage={setErrorMessage}
          textBoxModal={editTextBoxModal}
          imageModal={editImageModal}
          videoModal={editVideoModal}
          codeModal={editCodeModal}
          handleSlideUpdate={handleSlideUpdate}
        />
        <SlideControls
          createNewSlide={createNewSlide}
          deleteSlide={deleteSlide}
          currentSlideIndex={currentSlideIndex}
          slidesUpdate={slidesUpdate}
          handleCloseSlideUpdate={handleCloseSlideUpdate}
          setCurrentSlideIndex={setCurrentSlideIndex}
          setCurrentSlideInfo={setCurrentSlideInfo}
          errorModal={errorModal}
          setErrorMessage={setErrorMessage}
        />
      </PresentationContainer>
    </div>
  )
}

export default Presentation;
