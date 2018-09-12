import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../Data/Colors';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = (props) => {
  const {
    updateRepoList,
    repoList,
    getInitialList,
  } = props;
  return (
    <Wrapper>
      <SearchBar
        getQueryResults={(results) => { getInitialList(results); }}
      />
      <SearchResults
        updateRepoList={updateRepoList}
        repoList={repoList}
      />
    </Wrapper>
  );
};

Search.propTypes = {
  updateRepoList: PropTypes.func.isRequired,
  getInitialList: PropTypes.func.isRequired,
  repoList: PropTypes.isArray(PropTypes.object).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 50%;
  background-color: ${Colors.White};
`;

export default Search;
