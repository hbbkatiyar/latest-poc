import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import QuotesList from "./indexList";
import { Box, Grid } from "@material-ui/core";
import { useStyles } from "./indexStyles";

function Quotes(props) {
  const {
    classes: { container, outerContainer },
    amountChangeHandler,
    form,
    provisionalQuotes = [],
    refreshClickHandler,
    selectQuoteClickHandler,
    tenureChangeHandler,
  } = props;

  return (
    <Box className={outerContainer}>
      <Grid container={true} spacing={5} className={container}>
        {provisionalQuotes.map((item, index) => {
          return (
            <QuotesList
              amountChangeHandler={amountChangeHandler}
              form={form}
              index={index}
              item={item}
              refreshClickHandler={refreshClickHandler}
              selectQuoteClickHandler={selectQuoteClickHandler}
              tenureChangeHandler={tenureChangeHandler}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Quotes);
