import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from '../Data/Colors';

class Favorites extends Component {
  render() {
    return (
      <Wrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 50%;
  background-color: ${Colors.LightPurpleLight};
`;

export default Favorites;
