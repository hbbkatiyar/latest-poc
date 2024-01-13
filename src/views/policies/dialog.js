import React from "react";
import moment from "moment";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Dialog, DialogTitle } from "@material-ui/core";
import {
  DateRangeDelimiter,
  LocalizationProvider,
  StaticDateRangePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import {
  buildPolicyStatusList,
  isArrayContainsAllNonNullable,
  policyStatusContainerMinHeight,
} from "../../helpers/policy";
import { Multiselect } from "multiselect-react-dropdown";
import { ToastContainer } from "react-toastify";

function PoliciesDialog(props) {
  const {
    classes,
    errors,
    handleApplyDateFilter,
    handleApplyStatusFilter,
    handleClose,
    handleDateChange,
    handleOnClose,
    maxIssuanceEndDate,
    onSelectRemoveStatus,
    modal,
    selectedDate,
    selectedStatus,
    statusContainer,
  } = props;

  return (
    <>
      {/* Start Error Download Policy Document Dialog */}
      <Dialog
        onClose={() => handleClose(false)}
        aria-labelledby="simple-dialog-title"
        open={modal.open}
      >
        <DialogTitle id="simple-dialog-title">Policy Document</DialogTitle>

        {errors.length > 0 && (
          <Box
            m={3}
            mb={5}
            className={classes.formGroup}
            style={{ color: "red", textAlign: "center" }}
          >
            {errors.map((error, key) => {
              return (
                <Typography
                  key={key}
                  component={"p"}
                  variant={"string"}
                  paragraph={true}
                  className="error-message"
                >
                  {error}
                </Typography>
              );
            })}
          </Box>
        )}

        <Box m={2} mt={0} display={"flex"} justifyContent={"center"}>
          <Button
            type={"button"}
            variant="outlined"
            size="large"
            color="secondary"
            onClick={() => handleClose(false)}
          >
            Close
          </Button>
        </Box>
      </Dialog>
      {/* End Error Download Policy Document Dialog */}

      {/* Start Date Filter Dialog */}
      <Dialog
        onClose={(event, reason) => handleOnClose(event, reason, "dateFilter")}
        aria-labelledby="simple-dialog-title"
        open={modal.dateFilter}
        maxWidth={"lg"}
      >
        <Box
          m={3}
          mb={5}
          className={classes.formGroup}
          style={{ color: "red", textAlign: "center" }}
        >
          <>
            <LocalizationProvider dateAdapter={DateFnsUtils}>
              <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                maxDate={maxIssuanceEndDate}
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                disableHighlightToday={true}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <DateRangeDelimiter> to </DateRangeDelimiter>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
          </>
        </Box>

        <Box m={2} mt={0} display={"flex"} justifyContent={"right"}>
          {isArrayContainsAllNonNullable(selectedDate) && (
            <Box mr={2} pt={2}>
              {selectedDate.map((item, index) => {
                return (
                  <Box key={index} variant="body2" component="span">
                    {moment(item).format("DD-MM-YYYY")} {index === 0 && " TO "}
                  </Box>
                );
              })}
            </Box>
          )}

          <Box mr={2}>
            <Button
              type={"button"}
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() => handleOnClose(false, "cancel", "dateFilter")}
            >
              Cancel
            </Button>
          </Box>

          <Box>
            <Button
              type={"button"}
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleApplyDateFilter}
              {...(!isArrayContainsAllNonNullable(selectedDate) && {
                disabled: true,
              })}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Dialog>
      {/* End Date Filter Dialog */}

      {/* Start Status Filter Dialog */}
      <Dialog
        onClose={(event, reason) =>
          handleOnClose(event, reason, "statusFilter")
        }
        aria-labelledby="simple-dialog-title"
        open={modal.statusFilter}
        maxWidth={"md"}
      >
        <Box
          m={2}
          mt={0}
          display={"flex"}
          justifyContent={"center"}
          className={statusContainer}
          style={{ minHeight: `${policyStatusContainerMinHeight}px` }}
        >
          <Box m={3} mb={5} pt={1}>
            Policy Status
          </Box>
          <Box
            m={3}
            mb={5}
            className={classes.formGroup}
            style={{ width: "300px" }}
          >
            <Multiselect
              displayValue="cat"
              onSelect={onSelectRemoveStatus}
              onRemove={onSelectRemoveStatus}
              options={buildPolicyStatusList()}
              selectedValues={selectedStatus}
              showCheckbox={true}
              avoidHighlightFirstOption={true}
              showArrow={false}
              hidePlaceholder={
                selectedStatus.length === buildPolicyStatusList().length
              }
            />
          </Box>
        </Box>

        <Box m={2} mt={0} display={"flex"} justifyContent={"right"}>
          <Box mr={2}>
            <Button
              type={"button"}
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => handleOnClose(false, "cancel", "statusFilter")}
            >
              Cancel
            </Button>
          </Box>

          <Box>
            <Button
              type={"button"}
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleApplyStatusFilter}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Dialog>
      {/* End Status Filter Dialog */}

      <ToastContainer />
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(PoliciesDialog);
