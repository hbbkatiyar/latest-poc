import { createStyles } from "@material-ui/core";

export const useStyles = (theme) =>
  createStyles({
    main: {
      display: "flex",
      // flexDirection: 'column',
      width: "100%",
      justifyContent: "space-between",
      // [theme.breakpoints.down('sm')]: {
      //
      // },
      // [theme.breakpoints.up('sm')]: {},
      // [theme.breakpoints.up('md')]: {
      // },
    },
  });
