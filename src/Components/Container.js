import React, { Component } from 'react';
import styled from 'styled-components';

import Favorites from './Favorites';
import Search from './Search';

class Container extends Component {
  render() {
    return (
      <Wrapper>
        <Search></Search>
        <Favorites></Favorites>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export default Container;
