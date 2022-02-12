import React from "react";
import InputWithLabel from "./InputWithLabel";
import styled from "styled-components";

const SearchForm = ({ handleSearchInput, handleSearchSubmit, searchTerm }) => {
  return (
    <StyledSearchForm action="" onSubmit={handleSearchSubmit}>
      <InputWithLabel
        id="search"
        label="search"
        value={searchTerm}
        onInputChange={handleSearchInput}
        type="text"
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <StyledButtonLarge type="submit" disabled={!searchTerm}>
        Submit
      </StyledButtonLarge>
    </StyledSearchForm>
  );
};

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;

const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
`;

export default SearchForm;
