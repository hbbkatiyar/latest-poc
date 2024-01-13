import { createStyles } from "@material-ui/core";
// import {Color} from "../../constants/colors";

export const useStyles = (theme) =>
  createStyles({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),

    "&.Mui-selected": {
      color: "#562314",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  });
