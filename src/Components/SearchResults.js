import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../Data/Colors';

const headers = ['Name', 'Language', 'Latest tag', '\u00a0'];

class SearchResults extends Component {
  static propTypes = {
    updateRepoList: PropTypes.func.isRequired,
    repoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  addToFavorites(e, repoToFavorite) {
    const { updateRepoList } = this.props;
    e.preventDefault();
    updateRepoList(repoToFavorite, true);
  }

  render() {
    const { repoList } = this.props;
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
        <tbody>
          {
            repoList.map(repo => (
              <TableHeaders>
                <td>
                  <GitLink
                    href={repo.url}
                    target="_blank"
                  >
                    { repo.name }
                  </GitLink>
                </td>
                <td>
                  { repo.language }
                </td>
                <td>
                  { repo.tag }
                </td>
                <td>
                  <AddButton
                    onClick={(click) => { this.addToFavorites(click, repo); }}
                    href=""
                  >
                    {
                      repo.favorite ? '' : 'Add'
                    }
                  </AddButton>
                </td>
              </TableHeaders>
            ))
          }
        </tbody>
      </Wrapper>
    );
  }
}

const Wrapper = styled.table`
  margin: 1em 0 0 3em;
  table-layout: fixed;
  width: 100%;
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

const GitLink = styled.a`
  text-decoration: none;
  color: ${Colors.Black};
`;

export default SearchResults;
