import React, { useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CallToAction from "../proposal/partials/cta";
import LendingContext from "../../context/index";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Images } from "../../constants/images";
import { BUTTON_DASHBOARD } from "../../constants";

function ProposalAcknowledgeForm(props) {
  const {
    classes: { center, container, main },
    handleClick
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
            <img src={Images.policyIssued} />
            <Box m={5}>
              <Typography variant={"body2"} gutterBottom>
                Your application number <b>{`${application_number}`}</b> has
                been submitted.
              </Typography>
              <Typography variant={"body2"} gutterBottom>
                We will get back to you about the application status
                through sms and email.
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

export default withStyles(useStyles, { withTheme: true })(
  ProposalAcknowledgeForm
);
