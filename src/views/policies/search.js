import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import {
  Box
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useStyles } from "./styles";
import {
  SEARCH_BY_TEXT,
} from "../../constants/index";

function SearchBox(props) {
  const {
    classes,
    filter,
    handleSearchKeyPress,
    onSearchChange,
    onSearchClickHandler,
    openSearch,
  } = props;

  const {
    searchIconBox,
    searchBox,
    input,
    searchBoxHidden,
    inputHidden,
  } = classes;

  return (
    <Box
      className={
        "searchBox animated " + (openSearch ? searchBox : searchBoxHidden)
      }
    >
      <input
        name={"search"}
        value={filter.search}
        placeholder={SEARCH_BY_TEXT}
        className={openSearch ? input : inputHidden}
        onChange={onSearchChange}
        onKeyPress={handleSearchKeyPress}
      />
      <Box className={searchIconBox}>
        <Search onClick={onSearchClickHandler} />
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SearchBox);
