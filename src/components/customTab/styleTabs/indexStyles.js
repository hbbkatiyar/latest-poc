import { createStyles } from "@material-ui/core";
// import {Color} from "../../constants/colors";

export const useStyles = (theme) =>
  createStyles({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    ".MuiTab-fullWidth": {
      flexBasis: "1",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 60,
      width: "100%",
      backgroundColor: "#2A4C7C",
    },
  });
