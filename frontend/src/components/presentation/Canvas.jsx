import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import ParentEditModal from './elementmodals/ParentEditModal';
import TextBox from './elements/TextBox';
import Image from './elements/Image';
import TextBoxPrompt from './elementmodals/TextBoxPrompt';
import ImagePrompt from './elementmodals/ImagePrompt';
import VideoPrompt from './elementmodals/VideoPrompt';
import Video from './elements/Video';
import Code from './elements/Code';
import CodePrompt from './elementmodals/CodePrompt';
import { getFoundPresentation } from '../../helper';

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  border: 1px solid rgb(180, 180, 180);
  margin: 10px 20px;
  box-shadow: 0px 25px 80px rgba(0, 0, 0, 0.5);
`

const SlideNumbersContainer = styled.div`
  background-color: rgb(50, 50, 50);
  color: rgb(200, 200, 200, 0.7);
  z-index: 1;
  font-size: 1em;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Canvas (props) {
  const {
    presentationId, currentSlideInfo, currentSlideNumber, errorModal,
    setErrorMessage, textBoxModal, imageModal, videoModal, codeModal,
    handleSlideUpdate
  } = props;
  const slideIndex = currentSlideNumber - 1;
  const [elements, setElements] = useState(null);
  const [elementId, setElementId] = useState(undefined);
  const [element, setElement] = useState(undefined);

  const ref = useRef(null);

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  useEffect(() => {
    setCanvasWidth(ref.current.offsetWidth);
    setCanvasHeight(ref.current.offsetHeight);
  }, [[]]);

  useEffect(() => {
    setElementId(undefined);
  }, [currentSlideNumber]);

  useEffect(() => {
    const setElementFromId = async () => {
      try {
        const foundPresentation = await getFoundPresentation(presentationId);
        const slide = foundPresentation.slides[slideIndex];
        const foundElement = slide.find((elem) => elem.id === elementId);
        setElement(foundElement);
      } catch (err) {
        errorModal.show();
      }
    };

    setElementFromId();
  }, [elementId])

  useEffect(() => {
    if (!currentSlideInfo) {
      return;
    }
    const elementMap = currentSlideInfo.map((elem) => {
      const props = elem.props;
      switch (elem.type) {
      case 'TextBox':
        return (
          <TextBox
            key={elem.id}
            presentationId={presentationId}
            currentSlideIndex={slideIndex}
            id={elem.id}
            xPos={props.xPos}
            yPos={props.yPos}
            width={props.width}
            height={props.height}
            text={props.text}
            fontSize={props.fontSize}
            colour={props.colour}
            textBoxModal={textBoxModal}
            setElementId={setElementId}
            handleSlideUpdate={handleSlideUpdate}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            handleShowError={errorModal.handleShow}
            setErrorMessage={setErrorMessage}
          />
        )
      case 'Image':
        return (
          <Image
            key={elem.id}
            presentationId={presentationId}
            currentSlideIndex={slideIndex}
            id={elem.id}
            xPos={props.xPos}
            yPos={props.yPos}
            width={props.width}
            height={props.height}
            imageUrl={props.imageUrl}
            altTag={props.altTag}
            imageModal={imageModal}
            setElementId={setElementId}
            handleSlideUpdate={handleSlideUpdate}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            handleShowError={errorModal.handleShow}
            setErrorMessage={setErrorMessage}
          />
        )
      case 'Video':
        return (
          <Video
            key={elem.id}
            presentationId={presentationId}
            currentSlideIndex={slideIndex}
            id={elem.id}
            xPos={props.xPos}
            yPos={props.yPos}
            width={props.width}
            height={props.height}
            videoUrl={props.videoUrl}
            autoplay={props.autoplay}
            videoModal={videoModal}
            setElementId={setElementId}
            handleSlideUpdate={handleSlideUpdate}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            handleShowError={errorModal.handleShow}
            setErrorMessage={setErrorMessage}
          />
        )
      case 'Code':
        return (
          <Code
            key={elem.id}
            presentationId={presentationId}
            currentSlideIndex={slideIndex}
            id={elem.id}
            xPos={props.xPos}
            yPos={props.yPos}
            width={props.width}
            height={props.height}
            code={props.code}
            fontSize={props.fontSize}
            codeModal={codeModal}
            setElementId={setElementId}
            handleSlideUpdate={handleSlideUpdate}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            handleShowError={errorModal.handleShow}
            setErrorMessage={setErrorMessage}
          />
        )
      default:
        return null;
      }
    });
    setElements(elementMap);
  }, [currentSlideNumber, currentSlideInfo])

  return (
    <CanvasContainer ref={ref}>
      <TextBoxPrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={textBoxModal.show}
        handleClose={textBoxModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentEditModal}
        element={element}
        setElementId={setElementId}
        handleSlideUpdate={handleSlideUpdate}
      />
      <ImagePrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={imageModal.show}
        handleClose={imageModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentEditModal}
        element={element}
        setElementId={setElementId}
        handleSlideUpdate={handleSlideUpdate}
      />
      <VideoPrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={videoModal.show}
        handleClose={videoModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentEditModal}
        element={element}
        setElementId={setElementId}
        handleSlideUpdate={handleSlideUpdate}
      />
      <CodePrompt
        presentationId={presentationId}
        slideIndex={slideIndex}
        show={codeModal.show}
        handleClose={codeModal.handleClose}
        handleShowError={errorModal.handleShow}
        setErrorMessage={setErrorMessage}
        ModalType={ParentEditModal}
        element={element}
        setElementId={setElementId}
        handleSlideUpdate={handleSlideUpdate}
      />
      {elements}
      <SlideNumbersContainer
        className='slide-number-container'
      >
        {currentSlideNumber}
      </SlideNumbersContainer>
    </CanvasContainer>
  )
}

export default Canvas;
