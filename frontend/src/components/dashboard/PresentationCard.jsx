import React from 'react'
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Ratio from 'react-bootstrap/Ratio';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  border: 1px solid rgb(153, 153, 153);
  border-radius: 0.45rem;
  height: fit-content;
  min-width: 250px;
  max-width: 400px;
  flex-wrap: nowrap;
  flex: 1;
`

function PresentationCard (props) {
  const navigate = useNavigate();
  const { presentationUrl, title, thumbnail, description, slidesNumber, handleClick } = props;
  return (
    <CardContainer>
      <Ratio data-testid='ratio-element' aspectRatio={1 / 2}>
        <div className='d-flex flex-column justify-content-between flex-nowrap'>
          <div className='d-flex flex-row justify-content-between flex-nowrap'>
            <h4>{title}</h4>
            <img
              className='rounded-2'
              alt='presentation-thumbnail'
              src={thumbnail}
              width={'50%'}
              height={80}
            />
          </div>
          <span data-testid='card-description'>{description}</span>
          <span data-testid='card-slides-number'>Number of slides: {slidesNumber}</span>
          <Button
            variant="primary"
            onClick={(event) => {
              event.preventDefault();
              handleClick();
              navigate(presentationUrl)
            }}
          >
            Go to presentation
          </Button>
        </div>
      </Ratio>
    </CardContainer>
  );
}

export default PresentationCard;
