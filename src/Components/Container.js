import React, { Component } from 'react';
import styled from 'styled-components';

import Favorites from './Favorites';
import Search from './Search';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoList: [],
      favList: [],
    };
  }

  getSearchRepo(repoList) {
    const { favList } = this.state;
    const filteredResults = [];
    let favListIds = [];
    repoList.map((repo, i) => {
      filteredResults[i] = {
        id: repo.id,
        name: repo.name,
        language: repo.language,
        tag: repo.tag || '-',
        url: repo.html_url,
        favorite: false,
      };
    });
    favListIds = favList.map(repo => repo.id);
    filteredResults.forEach((repo, index) => {
      if (favListIds.indexOf(repo.id) > -1) {
        filteredResults[index].favorite = true;
      }
    });
    this.setState({
      repoList: filteredResults,
    });
  }

  updateFavRepo(repo, isFav) {
    const {
      repoList,
      favList,
    } = this.state;
    const favoriteList = repoList;
    repoList.forEach((item, i) => {
      if (item.id === repo.id) {
        favoriteList[i].favorite = isFav;
        if (isFav) {
          favList.push(favoriteList[i]);
        } else {
          const index = favList.indexOf(repo);
          favList.splice(index, 1);
        }
      }
    });
    // allows removal of favorite regardless of if
    // it shows up on the current search query or not
    if (!isFav) {
      const index = favList.indexOf(repo);
      if (index > -1) {
        favList.splice(index, 1);
      }
    }
    this.setState({
      repoList: favoriteList,
      favList,
    });
  }

  render() {
    const {
      repoList,
      favList,
    } = this.state;
    return (
      <Wrapper>
        <Search
          updateRepoList={(newList, isFav) => { this.updateFavRepo(newList, isFav); }}
          getInitialList={(newList) => { this.getSearchRepo(newList); }}
          repoList={repoList}
        />
        <Favorites
          updateRepoList={(newList, isFav) => { this.updateFavRepo(newList, isFav); }}
          repoList={favList}
        />
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
