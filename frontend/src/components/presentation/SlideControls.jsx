import React from 'react';
import Button from 'react-bootstrap/Button';
import SlideshowDeck from './SlideshowDeck';

function SlideControls (props) {
  const {
    createNewSlide, deleteSlide, currentSlideIndex,
    slidesUpdate, handleCloseSlideUpdate, setCurrentSlideIndex,
    setCurrentSlideInfo, errorModal, setErrorMessage
  } = props;

  return (
    <div className='d-flex flex-row justify-content-between p-1'>
      <div>
        <Button
          variant='primary'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            createNewSlide();
          }}
        >
          New slide
        </Button>
        <Button
          variant='danger'
          type='button'
          onClick={(event) => {
            event.preventDefault();
            deleteSlide(currentSlideIndex);
          }}
        >
          Delete slide
        </Button>
      </div>
      <SlideshowDeck
        slidesUpdate={slidesUpdate}
        handleCloseSlideUpdate={handleCloseSlideUpdate}
        currentIndex={currentSlideIndex}
        setCurrentIndex={setCurrentSlideIndex}
        setCurrentInfo={setCurrentSlideInfo}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
      />
    </div>
  )
}

export default SlideControls;
