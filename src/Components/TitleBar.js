import React from 'react';
import styled from 'styled-components';

import Colors from '../Data/Colors';

const TitleBar = () => (
  <Wrapper>
    <Title>
      My Github Favorites
    </Title>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: ${Colors.DarkPurpleDark};
  display: flex;
  flex: 0 0 8em;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${Colors.White};
`;

export default TitleBar;
