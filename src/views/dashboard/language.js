import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Grid, MenuItem, Select } from "@material-ui/core";
import { options } from "../../defaultValues/index";
import { useStyles } from "./indexStyles";

function SelectLanguage(props) {
  const {
    classes: {},
    form,
    handleChange,
  } = props;

  return (
    <Box width="100%" display="flex" justifyContent="right">
      <Grid container spacing={2}>
        <Grid container item md={10} direction="column"></Grid>
        <Grid container item md={1} direction="column"></Grid>
        <Grid container item md={1} direction="column">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="language"
            value={form.language}
            onChange={handleChange}
          >
            {options.languages.map((item, index) => {
              return (
                <MenuItem value={item.value} key={index}>
                  {item.title}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(SelectLanguage);
