import React, { useContext, useEffect, useState, useRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PoliciesList from "./list";
import VehicleContext from "../../context/index";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./styles";
import {
  getRoute,
  parseMessage,
  redirectWithBlank,
  setStorageItem,
} from "../../helpers/utils";
import { getWebService, postWebService } from "../../helpers/server";
import {
  buildDefaultPolicyStatusList,
  buildClaimsListToExport,
  buildStatusFilterParams,
  getDefaultCustomDate,
  getFilterEndDate,
  getFilterMaxEndDate,
  isDurationCustomDateRange,
  isArrayContainsAllNonNullable,
  isPolicyIssued,
  isPolicyCreationFailed,
  isPolicyCancellationInitiated,
  isPolicyCancelled,
  isPolicyDetailsAwaited,
  isPolicyDocumentsPending,
  isPaymentCaptured,
  isPolicyOnHold,
  isPolicyNeedInsuredReview,
} from "../../helpers/policy";
import { ReducerUtils } from "../../constants/reducers";
import { Utils } from "../../constants/utils";
import {
  buildDateFilterParams,
  buildStartEndDate,
  getCurrentMonth,
  getCurrentYear,
} from "../../helpers/date";
import { toast } from "react-toastify";
import {
  ASSURANCE_PRODUCT_CATEGORY_SLUG,
  DURATION_FILTER_DEFAULT_VALUE,
  PARTNER_ID_MOBILE_STACK_DEMO,
  PROPOSAL_STATUS_DRAFT,
  PROPOSAL_STATUS_INITIATED,
  DOCUMENT_TPYE_ID_INVOICE,
  DOCUMENT_TPYE_ID_REPAIRED_MOBILE_PHOTOS,
} from "../../constants/index";
import { buildSystemErrorMessage, downloadExcel } from "../../helpers/proposal";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router";
import { durationMapping } from "../../mapping";

function Policies(props) {
  const {
    classes: { loaderBox },
  } = props;
  const { state, dispatch } = useContext(VehicleContext);
  const [filter, setFilter] = useState({
    search: state.searchText ?? "",
    tab: 1,
    createdAtStartDate: "",
    createdAtEndDate: "",
    duration: state.filterDuration ?? DURATION_FILTER_DEFAULT_VALUE,
  });
  const [openSearch, setOpenSearch] = useState(true);
  const [page, setPage] = useState(0);
  const [policyList, setPolicyList] = useState([]);
  const [value, setValue] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const [downloadId, setDownloadId] = useState("");
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    dateFilter: false,
    statusFilter: false,
    invoice: false,
    repairedMobile: false
  });
  const [clearFilter, setClearFilter] = useState(false);
  const [isSearchResultLoaded, setIsSearchResultLoaded] = useState(false);
  const [maxIssuanceEndDate, setMaxIssuanceEndDate] = useState(
    getFilterMaxEndDate()
  );
  const [selectedDate, handleDateChange] = useState(
    state.customDateRange ?? [null, null]
  );
  const [prevDuration, setPrevDuration] = useState(
    state.filterDuration ?? "allTime"
  );
  const [selectedDateClone, setSelectedDateClone] = useState(
    state.customDateRange ?? [null, null]
  );
  const [selectedStatus, setSelectedStatus] = useState(
    state.filterStatus ?? buildDefaultPolicyStatusList()
  );
  const [selectedStatusClone, setSelectedStatusClone] = useState(
    state.filterStatus ?? buildDefaultPolicyStatusList()
  );
  const [hasNavigated, setHasNavigated] = useState(true);
  const [isExportClicked, setIsExportClicked] = useState(false);
  const selectInputRef = useRef();
  const [photo, setPhoto] = useState({ invoice: "", repairedMobile: "" });
  const [claimId, setClaimId] = useState(null);

  const getPolicyList = async (isExport = false) => {
    /* let url = `v2/dealer/${
      JSON.parse(localStorage.getItem("user_details")).dealer_id
    }/policies?page=${page}`;

    if (filter.search) {
      url = `${url}&search=${filter.search}`;
    }

    const dateFilterParams = buildDateFilterParams(
      filter.duration,
      buildStartEndDate(selectedDate)
    );
    if (dateFilterParams) {
      url = `${url}&${dateFilterParams}`;
    }

    const statusFilterParams = buildStatusFilterParams(selectedStatus);
    if (statusFilterParams) {
      url = `${url}&${statusFilterParams}`;
    }

    if (isExport) {
      url = `${url}&export=${isExport}`;
    }

    url = `${url}&product_category_slug=${ASSURANCE_PRODUCT_CATEGORY_SLUG}`;

    url = "/data/claims.json"; */

    // let url = `partners/claim?start=0&partner_id=${PARTNER_ID_MOBILE_STACK_DEMO}&month=${getCurrentMonth()}&year=${getCurrentYear()}`;
    let url = `partners/claim?start=0&partner_id=${PARTNER_ID_MOBILE_STACK_DEMO}&date=${durationMapping[value]}`;

    const response = await getWebService(url);
    const {
      data: { message },
      data,
      success,
    } = response.data;
    if (success && !isExport) {
      setPolicyList(data["claims"] ?? data);
      setTotalCount(Math.ceil(data["totalCount"] / 25));
      setIsLoaded(true);
      setIsSearchResultLoaded(true);
    } else if (success && isExport) {
      notify(message);
      setIsExportClicked(false);
    }
  };

  useEffect(() => getPolicyList(), [value]);

  useEffect(() => {
    getPolicyList();
  }, [page]);

  useEffect(() => {}, [policyList]);

  useEffect(() => {
    if (clearFilter) {
      getPolicyList();
    }
  }, [clearFilter]);

  useEffect(() => {
    dispatchEvent(ReducerUtils.filter.duration, filter.duration);
    if (isDurationCustomDateRange(filter.duration)) {
      setSelectedDateClone(selectedDate.slice());
      if (!hasNavigated) {
        // This condition has been added to set some default custom dates in order to make focus on current and previous month
        if (!isArrayContainsAllNonNullable(selectedDate)) {
          handleDateChange(getDefaultCustomDate());
        }
        openFilterModal("dateFilter");
      }
    } else {
      handleDateChange([null, null]);
      setSelectedDateClone([null, null]);
      getPolicyList();
    }
  }, [filter.duration]);

  useEffect(() => {
    setMaxIssuanceEndDate(getFilterMaxEndDate(filter.createdAtStartDate));
    setFilter({
      ...filter,
      createdAtEndDate: getFilterEndDate(filter.createdAtStartDate),
    });
  }, [filter.createdAtStartDate]);

  useEffect(() => {
    const startDate = selectedDate[0] ?? null;
    setMaxIssuanceEndDate(getFilterMaxEndDate(startDate));
  }, [selectedDate]);

  useEffect(() => {
    console.log(`modal.uploadInvoice = ${modal.uploadInvoice}`);
  }, [modal.uploadInvoice]);

  useEffect(() => {
    console.log(`modal.uploadRepairedMobile = ${modal.uploadRepairedMobile}`);
  }, [modal.uploadRepairedMobile]);

  const tabChange = (event, newValue) => setValue(newValue);

  const cbError = ({ data: { error_msg } }) => {
    setDownloadId("");

    const message = parseMessage(error_msg);
    if (Array.isArray(message)) {
      setErrors(message);
    } else {
      let messageArray = [];
      messageArray.push(message);
      setErrors(messageArray);
    }

    setModal({ ...modal, open: true });
  };

  const handleDownload = async (event, orderId) => {
    try {
      event.stopPropagation();

      setErrors([]);
      setDownloadId(orderId);
      const response = await getWebService(`order/${orderId}/downloadPolicy`);

      setDownloadId("");
      const {
        data: { pdf_link },
      } = response.data;
      redirectWithBlank(pdf_link);
    } catch (error) {
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const onPagination = (pageNumber) => setPage(pageNumber);

  const onRowClick = ({ id = null, mobile = null, status_id = null }) => {
    const allowedStatus = ["quotation_received"];
    if (allowedStatus.indexOf(status_id) === -1) {
      return false;
    }

    setStorageItem("proposalId", Number(id));
    setStorageItem("mobile", Number(mobile));

    history.push(`${getRoute("summary")}/${id}`); //?source=policy_listing
  };

  const onSearchChange = (event) =>
    setFilter({ ...filter, [event.target.name]: event.target.value });

  const onSearchClickHandler = (e) => {
    e.preventDefault();

    dispatchEvent(ReducerUtils.search.text, filter.search);
    setIsSearchResultLoaded(false);
    setPage(0);
    setClearFilter(false);
    getPolicyList();
  };

  const handleClose = (flag = false, keyname = "open") =>
    setModal({ ...modal, [keyname]: flag });

  const isPolicyInActive = (status, active = null) =>
    isPolicyCancellationInitiated(status) || isPolicyCancelled(status) || status.toLowerCase().replace(" ", "_") === "settlement_completed";

  const isNavigateToReviewDetails = (status) => {
    return (
      isPolicyIssued(status) ||
      isPolicyCreationFailed(status) ||
      isPolicyInActive(status) ||
      isPolicyDetailsAwaited(status) ||
      isPaymentCaptured(status) ||
      isPolicyDocumentsPending(status) ||
      isPolicyOnHold(status) ||
      isPolicyNeedInsuredReview(status)
    );
  };

  const handleDateFilter = (event) => onSearchClickHandler(event);

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const handleChange = (event) => {
    setPrevDuration(filter.duration);
    setFilter({ ...filter, [event.target.name]: event.target.value });
    setHasNavigated(false);
  };

  const openFilterModal = (keyName = "dateFilter") =>
    setModal({ ...modal, [keyName]: true });

  const handleOnClose = (event, reason, filterName = "dateFilter") => {
    if (Utils.dialogOnCloseReasons.indexOf(reason) === -1) {
      if (filterName === "dateFilter") {
        handleDateChange(selectedDateClone);
        setFilter({
          ...filter,
          duration: isArrayContainsAllNonNullable(selectedDateClone)
            ? "customDateRange"
            : prevDuration,
        });
      } else if (filterName === "statusFilter") {
        setSelectedStatus(selectedStatusClone);
      }
      handleClose(false, filterName);
    }
  };

  const handleApplyDateFilter = () => {
    setIsSearchResultLoaded(false);
    setPage(0);
    dispatchEvent(ReducerUtils.filter.customDateRange, selectedDate);
    getPolicyList();
    handleClose(false, "dateFilter");
  };

  const handleDurationClick = (event) => {
    if (
      event.target.value === 0 &&
      isDurationCustomDateRange(filter.duration)
    ) {
      setSelectedDateClone(selectedDate.slice());
      // This condition has been added to set some default custom dates in order to make focus on current and previous month
      if (!isArrayContainsAllNonNullable(selectedDate)) {
        handleDateChange(getDefaultCustomDate());
      }
      openFilterModal("dateFilter");
    }
  };

  const handleStatusClick = () => {
    setSelectedStatusClone(selectedStatus.slice());
    openFilterModal("statusFilter");
  };

  const handleApplyStatusFilter = () => {
    setIsSearchResultLoaded(false);
    setPage(0);
    getPolicyList();
    dispatchEvent(ReducerUtils.filter.status, selectedStatus);
    handleClose(false, "statusFilter");
  };

  const onSelectRemoveStatus = (selectedList, item) =>
    setSelectedStatus(selectedList);

  const handleSearchKeyPress = (event) => {
    if (event.charCode === 13) {
      onSearchClickHandler(event);
    }
  };

  const handlePolicyExport = () => downloadExcel(buildClaimsListToExport(policyList));

  const notify = (message) => toast.success(message);

  const handleButtonClick = (
    section,
    message = "Message has been sent to the lender."
  ) => (message ? notify(message) : redirectWithBlank(Utils.url[section]));

  const photoChangeHandler = (keyname, file) => {
    setPhoto({
      ...photo,
      [keyname]: file,
    });
  };

  const uploadClickHandler = (claimId, keyname = "") => {
    setModal({ ...modal, [keyname]: true });
    setClaimId(claimId);
  };

  const buildInvoicePhotoRequestPayload = () => {
    const payload = new FormData();
    payload.append("document_type_id", DOCUMENT_TPYE_ID_INVOICE);
    payload.append("claimDocuments[]", photo.invoice);

    return payload;
  };

  const submitInvoiceHandler = async () => {
    try {
      setErrors([]);
      setIsSearchResultLoaded(false);
      const response = await postWebService(
        `web/claim/document/submit/${claimId}`,
        buildInvoicePhotoRequestPayload()
      );
      const { data, status } = response.data;

      console.log(data);
      console.log(status);

      setModal({ ...modal, invoice: false });
      setStorageItem(`invoice_uploaded_for_claim_${claimId}`, 1);
      setIsSearchResultLoaded(true);
    } catch (error) {
      console.log(error);
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const buildRepairedMobilePhotoRequestPayload = () => {
    const payload = new FormData();
    payload.append("document_type_id", DOCUMENT_TPYE_ID_REPAIRED_MOBILE_PHOTOS);
    payload.append("claimDocuments[]", photo.repairedMobile);

    return payload;
  };

  const submitRepairedMobileHandler = async () => {
    try {
      setErrors([]);
      setIsSearchResultLoaded(false);
      const response = await postWebService(
        `web/claim/document/submit/${claimId}`,
        buildRepairedMobilePhotoRequestPayload()
      );
      const { data, status } = response.data;

      console.log(data);
      console.log(status);

      setModal({ ...modal, repairedMobile: false });
      setStorageItem(`repaired_mobile_uploaded_for_claim_${claimId}`, 1);
      setIsSearchResultLoaded(true);
    } catch (error) {
      console.log(error);
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  return isLoaded ? (
    <PoliciesList
      downloadId={downloadId}
      errors={errors}
      filter={filter}
      handleApplyDateFilter={handleApplyDateFilter}
      handleApplyStatusFilter={handleApplyStatusFilter}
      handleButtonClick={handleButtonClick}
      handleChange={handleChange}
      handleClose={handleClose}
      handleDateChange={handleDateChange}
      handleDateFilter={handleDateFilter}
      handleDownload={handleDownload}
      handleDurationClick={handleDurationClick}
      handleOnClose={handleOnClose}
      handlePolicyExport={handlePolicyExport}
      handleSearchKeyPress={handleSearchKeyPress}
      handleStatusClick={handleStatusClick}
      isNavigateToReviewDetails={isNavigateToReviewDetails}
      isPolicyInActive={isPolicyInActive}
      isSearchResultLoaded={isSearchResultLoaded}
      maxIssuanceEndDate={maxIssuanceEndDate}
      modal={modal}
      onPagination={onPagination}
      onSearchChange={(value) => onSearchChange(value)}
      onSearchClickHandler={onSearchClickHandler}
      openSearch={openSearch}
      onRowClick={onRowClick}
      onSelectRemoveStatus={onSelectRemoveStatus}
      photo={photo}
      photoChangeHandler={photoChangeHandler}
      policyList={policyList}
      selectedDate={selectedDate}
      selectInputRef={selectInputRef}
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      submitInvoiceHandler={submitInvoiceHandler}
      submitRepairedMobileHandler={submitRepairedMobileHandler}
      tabChange={tabChange}
      totalCount={totalCount}
      uploadClickHandler={uploadClickHandler}
      value={value}
    />
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Policies);
