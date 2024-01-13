import React, { useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "../proposal/partials/cta";
import LendingContext from "../../context/index";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { BUTTON_DASHBOARD } from "../../constants";

function ProposalHandoverForm(props) {
  const {
    classes: { center, container, main },
    handleClick,
  } = props;
  const {
    state: {
      orderDetails: {
        data: { application_number = null },
      },
    },
  } = useContext(LendingContext);

  return (
    <Box className={main}>
      <Box className={center}>
        <Box className={container}>
          <Box mb={5}>
            <Box m={5}>
              <Typography variant={"body2"} gutterBottom>
                Application number <b>{`${application_number}`}</b> has handed
                over to the customer.
              </Typography>
            </Box>

            <Box mt={2}>
              <CallToAction handleClick={handleClick} text={BUTTON_DASHBOARD} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(ProposalHandoverForm);
