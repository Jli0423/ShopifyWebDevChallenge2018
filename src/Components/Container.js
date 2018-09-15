import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    if (repoList.length === 0) {
      return this.setState({
        repoList: [],
      });
    }
    console.log(repoList);
    return repoList.map((repo, i) => {
      filteredResults[i] = {
        id: repo.id,
        name: `${repo.owner.login}/${repo.name}`,
        language: repo.language,
        url: repo.html_url,
        favorite: false,
        tagVersion: '-',
      };
      axios.get(repo.tags_url)
        .then((res) => {
          const tag = (res.data && res.data[0] && res.data[0].name) || '-';
          filteredResults[i].tagVersion = tag;
          favListIds = favList.map(favRepo => favRepo.id);
          filteredResults.forEach((filteredRepo, index) => {
            if (favListIds.indexOf(filteredRepo.id) > -1) {
              filteredResults[index].favorite = true;
            }
          });
          this.setState({
            repoList: filteredResults,
          });
        })
        .catch((err) => {
          console.log(`Tags version err ${err}`);
        });
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
