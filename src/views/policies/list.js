import React from "react";
import CustomPagination from "./pagination";
import CustomTableHead from "./head";
import DurationFilter from "./filter";
import ExportButton from "./export";
import NoDataFound from "./noDataFound";
import PoliciesDialog from "./dialog";
import PoliciesListItem from "./listItem";
import SearchBox from "./search";
import UploadPhotoDialog from "../proposal/partials/uploadInvoice";
import withStyles from "@material-ui/core/styles/withStyles";
import "react-toastify/dist/ReactToastify.css";
import { Box, Paper, Typography } from "@material-ui/core";
import { Table, TableBody, TableContainer } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { useStyles } from "./styles";
import DurationTabsComponent from "../dashboard/duration";

function PoliciesList(props) {
  const {
    classes,
    downloadId,
    errors,
    filter,
    handleApplyDateFilter,
    handleApplyStatusFilter,
    handleButtonClick,
    handleChange,
    handleClose,
    handleDateChange,
    handleDownload,
    handleDurationClick,
    handleOnClose,
    handlePolicyExport,
    handleSearchKeyPress,
    handleStatusClick,
    isPolicyInActive,
    isSearchResultLoaded,
    maxIssuanceEndDate,
    modal,
    onPagination,
    onSearchChange,
    onSearchClickHandler,
    openSearch,
    onRowClick,
    onSelectRemoveStatus,
    photo,
    photoChangeHandler,
    policyList,
    selectedDate,
    selectInputRef,
    selectedStatus,
    statusContainer,
    submitInvoiceHandler,
    submitRepairedMobileHandler,
    totalCount,
    uploadClickHandler,
    tabChange,
    value,
  } = props;

  const {
    main,
    contentBox,
    listingBox,
    listingItemContainerPolicies,
    mainContainer,
    policiesListingItemHeader,
    policiesListingItemHeaderHidden,
    policyListingBox,
    tableBody,
  } = classes;

  return (
    <>
      <Box className={main}>
        <Box className={mainContainer}>
          <Box className={contentBox}>
            {/* <Box>
              <Typography variant={"h6"}>
                <strong>Claims List</strong>
              </Typography>
            </Box> */}
            <DurationTabsComponent value={value} handleChange={tabChange} />
            <Box className={classes.itemContainer}>
              <Box className={listingBox}>
                <Box className={listingItemContainerPolicies}>
                  {1 === 1 && (
                    <form onSubmit={onSearchClickHandler}>
                      <Box
                        className={
                          openSearch
                            ? policiesListingItemHeader
                            : policiesListingItemHeaderHidden
                        }
                        m={2}
                      >
                        {/* Search Box */}
                        {/* <SearchBox
                          filter={filter}
                          handleSearchKeyPress={handleSearchKeyPress}
                          onSearchChange={onSearchChange}
                          onSearchClickHandler={onSearchClickHandler}
                          openSearch={openSearch}
                        /> */}

                        {/* Duration Filter */}
                        {/* <DurationFilter
                          filter={filter}
                          handleChange={handleChange}
                          handleDurationClick={handleDurationClick}
                          selectedDate={selectedDate}
                          selectInputRef={selectInputRef}
                        /> */}

                        <Typography variant="body1">
                          {`Total Claims: ${
                            policyList.length >= 10
                              ? policyList.length
                              : `0${policyList.length}`
                          }`}
                        </Typography>

                        <Box></Box>

                        {/* Export Button */}
                        <ExportButton
                          handlePolicyExport={handlePolicyExport}
                          totalCount={totalCount}
                        />
                      </Box>
                    </form>
                  )}

                  <Box className={policyListingBox}>
                    <TableContainer
                      component={Paper}
                      className={classes.tableContainer}
                    >
                      <Table stickyHeader aria-label="sticky table">
                        <CustomTableHead handleClick={handleStatusClick} />

                        <TableBody className={tableBody}>
                          {totalCount > 0 ? (
                            policyList.map((policy, index) => {
                              return (
                                <PoliciesListItem
                                  downloadId={downloadId}
                                  handleButtonClick={handleButtonClick}
                                  handleDownload={handleDownload}
                                  index={index}
                                  isPolicyInActive={isPolicyInActive}
                                  key={index}
                                  onRowClick={onRowClick}
                                  policy={policy}
                                  uploadClickHandler={
                                    uploadClickHandler
                                  }
                                />
                              );
                            })
                          ) : (
                            <NoDataFound />
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Box>

              <CustomPagination
                isSearchResultLoaded={isSearchResultLoaded}
                onPagination={onPagination}
                totalCount={totalCount}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <PoliciesDialog
        errors={errors}
        handleApplyDateFilter={handleApplyDateFilter}
        handleApplyStatusFilter={handleApplyStatusFilter}
        handleClose={handleClose}
        handleDateChange={handleDateChange}
        handleOnClose={handleOnClose}
        maxIssuanceEndDate={maxIssuanceEndDate}
        modal={modal}
        onSelectRemoveStatus={onSelectRemoveStatus}
        selectedDate={selectedDate}
        selectedStatus={selectedStatus}
        statusContainer={statusContainer}
      />

      <ToastContainer />

      {modal.invoice && (
        <UploadPhotoDialog
          disabled={!photo.invoice}
          errors={errors}
          filename={"invoice"}
          handleOnClose={handleOnClose}
          modal={modal}
          modalKey={"invoice"}
          photo={photo}
          photoChangeHandler={photoChangeHandler}
          submitHandler={submitInvoiceHandler}
          title={"Repaired Invoice Photo"}
        />
      )}

      {modal.repairedMobile && (
        <UploadPhotoDialog
          disabled={!photo.repairedMobile}
          errors={errors}
          filename={"repairedMobile"}
          handleOnClose={handleOnClose}
          modal={modal}
          modalKey={"repairedMobile"}
          photo={photo}
          photoChangeHandler={photoChangeHandler}
          submitHandler={submitRepairedMobileHandler}
          title={"Repaired Mobile Photo"}
        />
      )}
    </>
  );
}

export default withStyles(useStyles, { withTheme: true })(PoliciesList);
