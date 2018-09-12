import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../Data/Colors';

const headers = ['Name', 'Language', 'Latest tag', '\u00a0'];

class Favorites extends Component {
  static propTypes = {
    repoList: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateRepoList: PropTypes.func.isRequired,
  }

  removeFromFavorites(e, repoRemoveFromFavorite) {
    const { updateRepoList } = this.props;
    e.preventDefault();
    updateRepoList(repoRemoveFromFavorite, false);
  }

  renderFavorites(repo) {
    return (
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
          <RemoveButton
            onClick={(key) => { this.removeFromFavorites(key, repo); }}
            href=""
          >
          Remove
          </RemoveButton>
        </td>
      </TableHeaders>
    );
  }

  render() {
    const { repoList } = this.props;
    return (
      <Wrapper>
        <Table>
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
              repo.favorite && this.renderFavorites(repo)
            ))
            }
          </tbody>
        </Table>
      </Wrapper>
    );
  }
}

const Table = styled.table`
  margin: 3em 0 0 3em;
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

const RemoveButton = styled.a`
  color: ${Colors.DarkPurpleDark};
`;

const GitLink = styled.a`
  text-decoration: none;
  color: ${Colors.Black};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 0 50%;
  background-color: ${Colors.LightPurpleLight};
`;

export default Favorites;
