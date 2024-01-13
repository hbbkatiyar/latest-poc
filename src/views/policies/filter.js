import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useStyles } from "./styles";
import {
  renderCustomDateRangeText,
} from "../../helpers/policy";
import {
  ALL_TIME_TEXT,
  THIS_MONTH_TEXT,
  THIS_WEEK_TEXT,
  TODAY_TEXT,
} from "../../constants/index";

function DurationFilter(props) {
  const {
    classes,
    filter,
    handleChange,
    handleDurationClick,
    selectedDate,
    selectInputRef,
  } = props;

  const {
    durationFilter,
    select,
    formControl,
  } = classes;

  return (
    <Box className={durationFilter}>
      <FormControl size="small" className={formControl} fullWidth>
        <Select
          labelId="duration-simple-select-label"
          id="duration-simple-select"
          name="duration"
          value={filter.duration}
          label="Duration"
          onChange={handleChange}
          onClick={handleDurationClick}
          ref={selectInputRef}
          className={select}
        >
          <MenuItem value={"today"}>{TODAY_TEXT}</MenuItem>
          <MenuItem value={"thisWeek"}>{THIS_WEEK_TEXT}</MenuItem>
          <MenuItem value={"thisMonth"}>{THIS_MONTH_TEXT}</MenuItem>
          <MenuItem value={"allTime"}>{ALL_TIME_TEXT}</MenuItem>
          <MenuItem value={"customDateRange"}>
            {renderCustomDateRangeText(selectedDate)}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(DurationFilter);
