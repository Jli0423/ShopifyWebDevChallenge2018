import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../Data/Colors';

const headers = ['Name', 'Language', 'Latest tag', '\u00a0'];

class SearchResults extends Component {
  static propTypes = {
    queryResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { queryResults } = this.props;
    const filteredResults = [];

    if (prevProps.queryResults !== queryResults) {
      queryResults.map((repo, i) => {
        filteredResults[i] = {
          name: repo.name,
          language: repo.language,
          tag: '-',
        };
      });

      this.setState({
        results: filteredResults,
      });
    }
  }

  addToFavorites() {
    console.log('asdf');
  }

  render() {
    const { results } = this.state;
    return (
      <Wrapper>
        <TableHeaders>
          {
            headers.map(title => (
              <Header>
                { title }
              </Header>
            ))
          }
        </TableHeaders>
        {
          results.map(repo => (
            <TableHeaders>
              <td>
                { repo.name }
              </td>
              <td>
                { repo.language }
              </td>
              <td>
                { repo.tag }
              </td>
              <td>
                <AddButton
                  onClick={() => { this.addToFavorites(); }}
                  href=""
                >
                  Add
                </AddButton>
              </td>
            </TableHeaders>
          ))
          }
      </Wrapper>
    );
  }
}

const Wrapper = styled.table`
  margin: 1em 0 0 3em;
  text-align: left;
`;

const TableHeaders = styled.tr`
  font-size: 1.2em;
`;

const Header = styled.th`
  padding-bottom: 1em;
`;

const AddButton = styled.a`
  color: ${Colors.DarkPurpleDark};
`;

export default SearchResults;
