import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { getFoundPresentation } from '../../helper';

const SlideshowDeck = (props) => {
  const location = useLocation();
  const presentationId = location.pathname.substring(1);
  const {
    slidesUpdate, handleCloseSlideUpdate, currentIndex,
    setCurrentIndex, setCurrentInfo, handleShowError,
    setErrorMessage
  } = props;
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    let unmount = false;
    const getSlides = async () => {
      try {
        const foundPresentation = await getFoundPresentation(presentationId);
        if (!unmount) {
          setSlides(foundPresentation.slides);
          handleCloseSlideUpdate();
        }
      } catch (err) {
        handleShowError();
        setErrorMessage(err);
      }
    }
    getSlides();
    return () => {
      unmount = true;
    }
  }, [slidesUpdate]);

  const handleNextSlide = () => {
    if (slides.length === 1) {
      return;
    }
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentInfo(slides[currentIndex + 1]);
    }
  }

  const handlePreviousSlide = () => {
    if (slides.length === 1) {
      return;
    }
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentInfo(slides[currentIndex - 1]);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      handlePreviousSlide();
    } else if (event.key === 'ArrowRight') {
      handleNextSlide();
    }
  }

  // listen for left and right keydown presses
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [[], currentIndex]);

  let prevVisibility = 'invisible';
  let nextVisibility = 'invisible';

  if (slides.length === 1) {
    // there is 1 slide, no slide deck controls
    prevVisibility = 'invisible';
    nextVisibility = 'invisible';
  } else if (currentIndex === 0) {
    // reached more than 1 slide
    // index is the start, hence hide previous arrow
    prevVisibility = 'invisible';
    nextVisibility = 'visible';
  } else if (currentIndex === slides.length - 1) {
    // index is the end, hence hide next arrow
    prevVisibility = 'visible';
    nextVisibility = 'invisible';
  } else {
    // not on first or last slide, show both arrows
    prevVisibility = 'visible';
    nextVisibility = 'visible';
  }

  return (
    <div>
      <Button
        className={prevVisibility}
        variant="primary"
        onClick={(event) => {
          event.preventDefault();
          handlePreviousSlide();
        }}
      >
        &lt;
      </Button>
      <Button
        className={nextVisibility}
        variant="primary"
        onClick={(event) => {
          event.preventDefault();
          handleNextSlide();
        }}
      >
        &gt;
      </Button>
    </div>
  )
}

export default SlideshowDeck;
