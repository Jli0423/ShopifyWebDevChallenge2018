import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import Colors from '../Data/Colors';

const gitApiURL = 'https://api.github.com/search/repositories';
const Authorization = 'aeeee80752f54705133ee759f877cf641b91ed52';

class SearchBar extends Component {
  static propTypes = {
    getQueryResults: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.queryRef = React.createRef();
  }

  gitSearch() {
    const { getQueryResults } = this.props;
    axios.get(gitApiURL, {
      headers: {
        Authorization,
      },
      params: {
        q: this.queryRef.value,
      },
    })
      .then((res) => {
        getQueryResults(res.data.items.slice(0, 10));
      })
      .catch((err) => {
        // if input is empty or an error is returned
        // empty the query results and log error
        getQueryResults([]);
        console.log(`github API ${err}`);
      });
  }

  validateEnterKey(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.gitSearch();
    }
  }

  preventClickDefault(click) {
    click.preventDefault();
    this.gitSearch();
  }

  render() {
    return (
      <Wrapper
        onKeyDown={(key) => { this.validateEnterKey(key); }}
      >
        <InputArea
          innerRef={(input) => { this.queryRef = input; }}
          placeholder="Shopify"
        />
        <Submit
          onClick={(click) => { this.preventClickDefault(click); }}
        >
          Search
        </Submit>
      </Wrapper>
    );
  }
}

const Wrapper = styled.form`
  margin: 3em;
  display: flex;
  flex-direction: row;
`;

const InputArea = styled.input`
  flex: 1 0 60%;
  border-radius: 4px;
  border: 1px solid black;
  outline: none;
  margin-right: .7em;
  padding: .7em;
`;

const Submit = styled.button`
  flex: 1 0 25%;
  border-radius: 4px;
  background-color: ${Colors.DarkPurpleDark};
  color: ${Colors.White};
  outline: none;
  border: none;
`;

export default SearchBar;
