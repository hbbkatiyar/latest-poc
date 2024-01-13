import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { ExpandMore } from "@material-ui/icons";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./accordianStyles";

function CustomAccordion({ children, ...rest }) {
  const {
    classes: { accordionSummary },
    title = "Section Title",
    disabled = false,
    defaultExpanded = false
  } = rest;

  return (
    <Accordion defaultExpanded={defaultExpanded} disabled={false}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={accordionSummary}
      >
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default withStyles(useStyles, { withTheme: true })(CustomAccordion);
