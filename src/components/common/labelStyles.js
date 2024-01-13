import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    cursorPointer: {
      cursor: "pointer",
    },
    question: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("sm")]: {},
      [theme.breakpoints.up("md")]: {
        fontSize: "20px",
      },
    },
  });
