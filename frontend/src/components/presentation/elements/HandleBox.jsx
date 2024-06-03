import React from 'react';
import styled from 'styled-components';

const HandleBoxStyle = styled.div`
  position: relative;
  height: 5px;
  width: 5px;
  left: 8px;
  top: 8px;
  background: rgb(105,105,105);
`

function HandleBox () {
  return (
    <HandleBoxStyle>
    </HandleBoxStyle>
  )
}

export default HandleBox;
