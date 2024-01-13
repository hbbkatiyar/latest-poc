import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Button, Typography } from "@material-ui/core";
import { useStyles } from "./indexStyles";

function ButtonSection(props) {
  const {
    classes: { button, cursorDefault },
    disabled = false,
    onClickHandler,
    index,
    item,
  } = props;

  return (
    <Box display="flex" direction="row" justifyContent="center">
      {item.emi ? (
        <Box>
          <Button
            type={"click"}
            variant={"contained"}
            className={button}
            color={"primary"}
            onClick={() => onClickHandler(item, index)}
            size={"small"}
            {...(disabled && {
              disabled,
            })}
          >
            Select Quote
          </Button>
        </Box>
      ) : (
        <Box m={1}>
          {/* <Button
            type={"click"}
            variant={"outlined"}
            className={`${button} ${cursorDefault}`}
            color={"secondary"}
            size={"small"}
            {...(1 === 1 && {
              disabled: false,
            })}
          >
            Quote not received
          </Button> */}
          <Typography variant="h6">Quote not received</Typography>
        </Box>
      )}
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(ButtonSection);
