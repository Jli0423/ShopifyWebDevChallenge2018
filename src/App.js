import React from 'react';
import styled from 'styled-components';

import TitleBar from './Components/TitleBar';
import Container from './Components/Container';

const App = () => (
  <Wrapper>
    <TitleBar />
    <Container />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-content: stretch;
  height: 100vh;
`;

export default App;
