import React from 'react';
import EmptyImg from '../empty-img.png';
import styled from 'styled-components';

const Img = styled.img`
  width: 250px;
  align-self: center;
`;

function Empty() {
  return <Img src={EmptyImg} alt="Empty todo" />;
}

export default Empty;
