import React, { useState, useEffect } from 'react';
import { getToken } from '../../helper.js';
import { apiCallAuthorised } from '../../api.js';
import PresentationCard from './PresentationCard.jsx';

const testHandleClick = () => {}

const PresentationCards = (props) => {
  const { handleShowError, setErrorMessage, showPresentation } = props;
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const getStoreData = async () => {
      try {
        const token = getToken();
        const getData = await apiCallAuthorised(token, 'GET', '/store');
        setStoreData(getData);
      } catch (err) {
        handleShowError();
        setErrorMessage(err);
      }
    }
    getStoreData();
  }, [showPresentation])

  if (storeData === null || storeData.store.presentations.length === 0) {
    return (
      <div>
        <h3>No Presentations</h3>
      </div>
    )
  }

  return (
    <div className='d-flex flex-row flex-wrap gap-3 px-3 justify-content-center w-100'>
      {
        storeData.store.presentations.map((presentation) => (
          <PresentationCard
            key={presentation.id}
            presentationUrl={presentation.url}
            title={presentation.title}
            thumbnail={presentation.thumbnail}
            description={presentation.description}
            slidesNumber={presentation.slides.length}
            handleClick={testHandleClick}
          />
        ))
      }
    </div>
  )
}

export default PresentationCards;
