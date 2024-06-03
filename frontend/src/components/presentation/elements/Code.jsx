import React from 'react';
import ParentElement from './ParentElement';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/cjs/languages/hljs/c';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import py from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

function Code (props) {
  const {
    id, presentationId, currentSlideIndex, xPos, yPos, width, height,
    code, fontSize, codeModal, setElementId, handleSlideUpdate,
    canvasWidth, canvasHeight, handleShowError, setErrorMessage
  } = props;

  const codeStyle = {
    width: '100%',
    height: '100%',
    border: 'solid 1px grey',
    fontSize: fontSize + 'em',
    whiteSpace: 'pre-wrap',
    lineBreak: 'anywhere',
    overflow: 'hidden'
  }

  SyntaxHighlighter.registerLanguage('c', c);
  SyntaxHighlighter.registerLanguage('javascript', js);
  SyntaxHighlighter.registerLanguage('python', py);

  const Child = (
    <SyntaxHighlighter
      style={nightOwl}
      customStyle={codeStyle}
      wrapLongLines='pre-wrap'
    >
      {code}
    </SyntaxHighlighter>
  )

  const elemProps = {
    code,
    fontSize
  }

  return (
    <ParentElement
      presentationId={presentationId}
      currentSlideIndex={currentSlideIndex}
      id={id}
      xPos={xPos}
      yPos={yPos}
      width={width}
      height={height}
      elemProps={elemProps}
      Child={Child}
      editModal={codeModal}
      setElementId={setElementId}
      handleSlideUpdate={handleSlideUpdate}
      canvasWidth={canvasWidth}
      canvasHeight={canvasHeight}
      handleShowError={handleShowError}
      setErrorMessage={setErrorMessage}
    />
  )
}

export default Code;
