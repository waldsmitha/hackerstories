import axios from "axios";
import { useState, useEffect, useReducer, useCallback } from "react";

import "./App.css";

//Components
import InputWithLabel from "./components/InputWithLabel";
import List from "./components/List";
import SearchForm from "./components/SearchForm";

//Hooks
import useSemiPersistentState from "./hooks/useSemiPersistentSearch";

//Reducers
import storiesReducer from "./reducers/storiesReducer";

//Styling
import styled from "styled-components";

function App() {
  const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

  const initialState = {
    data: [],
    isLoading: false,
    isError: false,
  };
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}&page=1`);

  const handleFetchStories = useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        console.log(stories.isLoading);
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: res.data.hits,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemoveStory = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>Hacker Stories</StyledHeadlinePrimary>
      <SearchForm
        searchTerm={searchTerm}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
      />

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

export default App;
