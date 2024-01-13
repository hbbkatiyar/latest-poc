import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "./styles";

function CustomPagination(props) {
  const { classes, isSearchResultLoaded, onPagination, totalCount } = props;

  return (
    <div
      className={classes.root}
      style={{
        textAlign: "right",
        display: "inline-flex",
        marginBottom: "5vh"
      }}
    >
      {isSearchResultLoaded && totalCount > 0 && (
        <Pagination
          count={totalCount}
          color="primary"
          variant="outlined"
          onChange={(e, pageNumber) => {
            onPagination(pageNumber);
          }}
        />
      )}
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomPagination);
