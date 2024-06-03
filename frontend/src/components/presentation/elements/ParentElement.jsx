import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { getToken, getFoundPresentation, getPresentations } from '../../../helper';
import { apiCallBodyAuthorised } from '../../../api';
import HandleBox from './HandleBox';

function ParentElement (props) {
  const {
    presentationId, currentSlideIndex, id, width, height, xPos, yPos,
    elemProps, Child, editModal, setElementId, handleSlideUpdate,
    canvasWidth, canvasHeight, handleShowError, setErrorMessage
  } = props;

  const token = getToken();

  const [element, setElement] = useState({
    width,
    height,
    xPos,
    yPos,
    ...elemProps
  })

  const [showCorners, setShowCorners] = useState(false);
  const [moveable, setMoveable] = useState(false);

  const handleAllowMoveable = () => setMoveable(true);
  const handleShowCorners = () => setShowCorners(true);

  useEffect(() => {
    // Prevents ParentElement from resetting after editing then moving/resizing
    const getLatestProps = async () => {
      try {
        const foundPresentation = await getFoundPresentation(presentationId);
        const slide = foundPresentation.slides[currentSlideIndex];
        const foundElem = slide.find((elem) => elem.id === id);
        if (foundElem) {
          setElement(foundElem.props);
        } else {
          setElement(undefined);
        }
      } catch (err) {
        setErrorMessage(err);
        handleShowError();
      }
    }
    getLatestProps();
  }, [editModal.show]);

  const editElementModal = () => {
    editModal.handleShow();
  };

  const deleteElement = async () => {
    const presentationsCopy = await getPresentations();
    const foundPresentation = presentationsCopy.find((pres) => pres.id === presentationId);
    const currentSlide = foundPresentation.slides[currentSlideIndex];
    const elemIndex = currentSlide.findIndex((elem) => elem.id === id);
    currentSlide.splice(elemIndex, 1);
    await apiCallBodyAuthorised(token, 'PUT', '/store', {
      store: {
        presentations: presentationsCopy
      }
    });
    handleSlideUpdate();
  }

  const saveElement = async () => {
    try {
      const presentations = await getPresentations();
      const foundPresentation = presentations.find((pres) => pres.id === presentationId);
      const slide = foundPresentation.slides[currentSlideIndex];
      const foundElem = slide.find((elem) => elem.id === id);
      foundElem.props = element;
      apiCallBodyAuthorised(token, 'PUT', '/store', {
        store: {
          presentations
        }
      });
      handleSlideUpdate();
    } catch (err) {
    }
  }

  useEffect(saveElement, [element]);

  const resizeable = {
    top: false,
    bottom: false,
    left: false,
    right: false,
    topLeft: moveable,
    topRight: moveable,
    bottomLeft: moveable,
    bottomRight: moveable
  };

  // Required to use canvas measurements as react-rnd package has issues with percentage-based boundaries
  let correctWidth = element.width;
  let correctHeight = element.height;

  // if-statement checks if width/height is string (as returned from ref.style) or if its not a string (inital elements will have float)
  if (typeof element.width !== 'string') {
    correctWidth = canvasWidth * element.width;
  }

  if (typeof element.height !== 'string') {
    correctHeight = canvasHeight * element.height;
  }

  return (
    <Rnd
      data-testid='canvas-element-draggable'
      bounds='parent'
      size={{
        width: correctWidth,
        height: correctHeight
      }}
      position={{
        x: element.xPos,
        y: element.yPos
      }}
      enableResizing={resizeable}
      disableDragging={!moveable}
      onDragStop={(_, d) => {
        setElement({
          ...element,
          xPos: d.x,
          yPos: d.y
        });
      }}
      onResize={(_1, _2, ref, _3, position) => {
        // By default, react-rnd prevents element from going below 1% height/width
        setElement({
          ...element,
          width: ref.style.width,
          height: ref.style.height,
          xPos: position.x,
          yPos: position.y
        });
      }}
      onResizeStop={(_1, _2, _3, _4, position) => {
        // This prevents the element from moving when resizing
        // Limitation: Weird edge case when dev tool 'Emulate touch events' is used
        // which causes the onDragStop and onResize to run at the same time
        setElement({
          ...element,
          xPos: position.x,
          yPos: position.y
        });
      }}
      resizeHandleComponent={{
        topLeft: showCorners ? <HandleBox/> : null,
        topRight: showCorners ? <HandleBox/> : null,
        bottomLeft: showCorners ? <HandleBox/> : null,
        bottomRight: showCorners ? <HandleBox/> : null
      }}
      onClick={() => {
        setElementId(id);
        handleShowCorners();
        handleAllowMoveable();
      }}
      onDoubleClick={() => {
        editElementModal();
      }}
      onContextMenu={() => {
        deleteElement();
      }}
    >
      {Child}
    </Rnd>
  )
}

export default ParentElement;
