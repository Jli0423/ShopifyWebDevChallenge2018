import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from '../Data/Colors';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResults: [],
    };
  }

  getResults(queryResults) {
    this.setState({
      queryResults,
    });
  }

  render() {
    const { queryResults } = this.state;
    return (
      <Wrapper>
        <SearchBar
          getQueryResults={(results) => { this.getResults(results); }}
        />
        <SearchResults
          queryResults={queryResults || []}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 50%;
  background-color: ${Colors.White};
`;

export default Search;
