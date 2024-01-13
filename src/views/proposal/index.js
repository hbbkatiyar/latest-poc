import React, { useContext, useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import moment from "moment";
import LendingContext from "../../context/index";
import ProposalForm from "./indexForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import useApi from "../../hooks/useApi";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { useStyles } from "./indexFormStyles";
import { useHistory } from "react-router";
import { ReducerUtils } from "../../constants/reducers";
import { Utils } from "../../constants/utils";
import {
  options,
  formFields,
  initialFormState,
  touchFieldsObject,
} from "../../defaultValues/index";
import {
  buildErrorObject,
  buildCreateProposalPayload,
  buildInitiateClaimPayload,
  buildSubmitClaimInput,
  buildSystemErrorMessage,
  buildVariantsList,
  buildVehicleMasterUrl,
  calulateOnRoadPrice,
  getMinDobDate,
  getMaxDobDate,
  getUniqueListBy,
  isSubmitButtonDisabled,
  buildExShowroomPriceObject,
} from "../../helpers/proposal";
import { getWebService, postWebService } from "../../helpers/server";
import {
  getRoute,
  getStorageItem,
  logout,
  navigateToUrl,
  parseMessage,
  setStorageItem,
} from "../../helpers/utils";
import { PinCodesMapping } from "../../locations/pincodes";
import { validations } from "../../messages/validation";
import {
  CONFIG_ENTITY_ID,
  CONFIG_ENTITY_NAME,
  DOCUMENT_TPYE_ID_AADHAAR,
  DOCUMENT_TPYE_ID_ESTIMATE,
  DOCUMENT_TPYE_ID_MOBILE_PHOTOS,
  FORMAT_DD_MM_YYYY,
  MODAL_KEY_PREMIUM,
  NO_ACTIVE_POLICY_TO_CLAIM_TEXT,
} from "../../constants/index";
import {
  FORM_FIELD_AADHAAR_NUMBER,
  FORM_FIELD_ANNUAL_INCOME,
  FORM_FIELD_APPLICANT_TYPE,
  FORM_FIELD_BUSINESS_NAME,
  FORM_FIELD_CATEGORY,
  FORM_FIELD_CITY,
  FORM_FIELD_DEALER_CODE,
  FORM_FIELD_DOB,
  FORM_FIELD_EMPLOYER_NAME,
  FORM_FIELD_EMPLOYMENT_TYPE,
  FORM_FIELD_EX_SHOWROOM_PRICE,
  FORM_FIELD_GST_PERCENTAGE,
  FORM_FIELD_MANUFACTURER,
  FORM_FIELD_MOBILE,
  FORM_FIELD_MODEL,
  FORM_FIELD_MONTHLY_SALARY,
  FORM_FIELD_NAME,
  FORM_FIELD_ON_ROAD_PRICE,
  FORM_FIELD_PAN_NUMBER,
  FORM_FIELD_PINCODE,
  FORM_FIELD_RESIDENCE_TYPE,
  FORM_FIELD_STATE,
  FORM_FIELD_TITLE,
  FORM_FIELD_VARIANT,
  FORM_FIELD_WORK_EMAIL,
} from "../../constants/field";

function Proposal(props) {
  const {
    classes: { loaderBox },
  } = props;

  const orderId = getStorageItem("proposalId") ?? null;
  const mobile = getStorageItem("mobile") ?? null;
  const orderDetails = useApi(
    orderId ? `lending/proposal?mobile=${mobile}` : "/data/no-order.json"
  );
  const { state, dispatch } = useContext(LendingContext);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(formFields);
  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isManufacturerChanged, setIsManufacturerChanged] = useState(false);
  const [isModelChanged, setIsModelChanged] = useState(false);
  const [isManufacturerVisible, setIsManufacturerVisible] = useState(true);
  const [isModelVisible, setIsModelVisible] = useState(true);
  const [isPremiumLoaded, setIsPremiumLoaded] = useState(true);
  const [isVariantVisible, setIsVariantVisible] = useState(true);
  const [modal, setModal] = useState({
    [MODAL_KEY_PREMIUM]: false,
    on_road_price: false,
  });
  const [breakup, setBreakup] = useState([...options.breakupList]);
  const [touchFields, setTouchFields] = useState(touchFieldsObject);
  const [isSearchCompleted, setIsSearchCompleted] = useState(true);
  const [noSearchResultFound, setNoSearchResultFound] = useState([]);
  const [disabledAccordion, setDisabledAccordion] = useState(false);
  const [photo, setPhoto] = useState({ estimate: "", aadhaar: "", phone: "" });

  useEffect(() => fetchProductConfig(), []);

  useEffect(() => {
    // dispatchEvent(ReducerUtils.order.details, orderDetails);
    // setTimeout(() => {
    //   setIsLoaded(true);
    // }, 1000);
  }, [orderDetails]);

  useEffect(() => {
    console.log(photo.estimate);
  }, [photo.estimate]);

  useEffect(() => {
    console.log(photo.aadhaar);
  }, [photo.aadhaar]);

  useEffect(() => {
    console.log(photo.phone);
  }, [photo.phone]);

  useEffect(() => {
    if (form[FORM_FIELD_CATEGORY]) {
      fetchVehicleMakes();
      setForm({
        ...form,
        [FORM_FIELD_MANUFACTURER]: "",
      });
    }
  }, [form[FORM_FIELD_CATEGORY]]);

  useEffect(() => {
    // For vehicle manufacturer change, need to set vehicle model as empty value
    if (form[FORM_FIELD_MODEL]) {
      setFormState(FORM_FIELD_MODEL, "");
    }

    validateRequiredInput(FORM_FIELD_MANUFACTURER);
    if (form[FORM_FIELD_MANUFACTURER]) {
      fetchVehicleModels();
    }
  }, [form[FORM_FIELD_MANUFACTURER]]);

  useEffect(() => {
    // For vehicle model change, need to set vehicle variant as empty value
    if (form[FORM_FIELD_VARIANT]) {
      setFormState(FORM_FIELD_VARIANT, "");
    }

    validateRequiredInput(FORM_FIELD_MODEL);
    if (form[FORM_FIELD_MODEL]) {
      fetchVehicleVariants();
    }
  }, [form[FORM_FIELD_MODEL]]);

  useEffect(() => {
    validateRequiredInput(FORM_FIELD_VARIANT);
    setFormState(
      FORM_FIELD_EX_SHOWROOM_PRICE,
      form[FORM_FIELD_VARIANT].split("__")[2]
    );
  }, [form[FORM_FIELD_VARIANT]]);

  useEffect(() => validateMobile(), [form[FORM_FIELD_MOBILE]]);

  useEffect(
    () => validateName(FORM_FIELD_NAME, form[FORM_FIELD_NAME]),
    [form[FORM_FIELD_NAME]]
  );

  useEffect(() => validateDateOfBirth(FORM_FIELD_DOB), [form[FORM_FIELD_DOB]]);

  useEffect(() => {
    validatePanAndAadhaarNumber(
      FORM_FIELD_PAN_NUMBER,
      form[FORM_FIELD_PAN_NUMBER]
    );
  }, [form[FORM_FIELD_PAN_NUMBER]]);

  useEffect(() => {
    validatePanAndAadhaarNumber(
      FORM_FIELD_AADHAAR_NUMBER,
      form[FORM_FIELD_AADHAAR_NUMBER]
    );
  }, [form[FORM_FIELD_AADHAAR_NUMBER]]);

  useEffect(
    () => getCityStateByPincode(form[FORM_FIELD_PINCODE]),
    [form[FORM_FIELD_PINCODE]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_EMPLOYMENT_TYPE),
    [form[FORM_FIELD_EMPLOYMENT_TYPE]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_EMPLOYER_NAME),
    [form[FORM_FIELD_EMPLOYER_NAME]]
  );

  useEffect(
    () => validateEmail(FORM_FIELD_WORK_EMAIL),
    [form[FORM_FIELD_WORK_EMAIL]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_MONTHLY_SALARY),
    [form[FORM_FIELD_MONTHLY_SALARY]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_BUSINESS_NAME),
    [form[FORM_FIELD_BUSINESS_NAME]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_ANNUAL_INCOME),
    [form[FORM_FIELD_ANNUAL_INCOME]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_APPLICANT_TYPE),
    [form[FORM_FIELD_APPLICANT_TYPE]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_DEALER_CODE),
    [form[FORM_FIELD_DEALER_CODE]]
  );

  useEffect(
    () => validateRequiredInput(FORM_FIELD_RESIDENCE_TYPE),
    [form[FORM_FIELD_RESIDENCE_TYPE]]
  );

  useEffect(() => {
    if (form[FORM_FIELD_EX_SHOWROOM_PRICE]) {
      const finalBreakUp = [
        buildExShowroomPriceObject(form[FORM_FIELD_EX_SHOWROOM_PRICE]),
        ...options.breakupList,
      ];
      const onRoadPrice = calulateOnRoadPrice(finalBreakUp);

      setFormState("on_road_price", onRoadPrice);
      setBreakup(finalBreakUp);
    }
  }, [form[FORM_FIELD_EX_SHOWROOM_PRICE]]);

  useEffect(() => validateOnRoadPrice(), [form[FORM_FIELD_ON_ROAD_PRICE]]);

  /* Start: Vehicle Details Section */
  const setMakeModelVariantSectionVisibility = (flag) => {
    setIsManufacturerVisible(flag);
    setIsModelVisible(flag);
    setIsVariantVisible(flag);
  };

  const buildVehicleMakesParams = () => {
    return {
      vehicle_category: "MOBILE",
    };
  };

  const buildVehicleModelsParams = () => {
    return {
      ...buildVehicleMakesParams(),
      manufacturer: encodeURIComponent(form[FORM_FIELD_MANUFACTURER]),
    };
  };

  const buildVehicleVariantsParams = () => {
    return {
      ...buildVehicleModelsParams(),
      model: encodeURIComponent(form[FORM_FIELD_MODEL]),
    };
  };

  const fetchVehicleMakes = async () => {
    /* if (!isLoaded && orderId) {
      return false;
    } */

    setMakeModelVariantSectionVisibility(false);
    const response = await getWebService(
      buildVehicleMasterUrl(buildVehicleMakesParams())
    );
    const { data } = response.data;
    dispatchEvent(ReducerUtils.vehicle.makes, data);
    setMakeModelVariantSectionVisibility(true);
  };

  const fetchVehicleModels = async () => {
    const response = await getWebService(
      buildVehicleMasterUrl(buildVehicleModelsParams())
    );
    const { data } = response.data;

    dispatchEvent(ReducerUtils.vehicle.models, data);
    setIsModelVisible(true);
  };

  const fetchVehicleVariants = async () => {
    const response = await getWebService(
      buildVehicleMasterUrl(buildVehicleVariantsParams())
    );
    const { data } = response.data;

    dispatchEvent(
      ReducerUtils.vehicle.variants,
      getUniqueListBy(buildVariantsList(data), FORM_FIELD_TITLE)
    );
    setIsVariantVisible(true);
  };

  const handleAutocompleteChange = (field, value) => {
    setFormState(field, value);

    if (field === FORM_FIELD_MANUFACTURER) {
      setIsManufacturerChanged(true);
      setIsModelVisible(false);
    }

    if (field === FORM_FIELD_MODEL) {
      setIsModelChanged(true);
      setIsVariantVisible(false);
    }
  };

  const handleClose = (flag = false, keyname = MODAL_KEY_PREMIUM) =>
    setModal({ ...modal, [keyname]: flag });

  const handleIconClick = (keyname = "on_road_price", flag = true) => {
    setModal({ ...modal, [keyname]: flag });
  };

  const handleOnClose = (event, reason, modalKey = MODAL_KEY_PREMIUM) => {
    // Preventing from closing dialog either on escape key press and backdrop click
    if (Utils.dialogOnCloseReasons.indexOf(reason) > -1) {
      event.preventDefault();
    } else if (modalKey === MODAL_KEY_PREMIUM) {
      setErrors([]);
      handleClose(false, modalKey);
    } else if (modalKey === "on_road_price") {
      setErrors([]);
      handleClose(false, modalKey);
    }
  };

  const changeOptionBaseOnValue = async (search, field) => {
    // console.log(`field = ${field}, search for = ${search}`);
    // TODO: Need to make an API call using field and response need to populate accordingly like makes, models, variants
  };
  /* End: Vehicle Details Section */

  /* Start: Customer Details Section */
  const validateMobile = () => {
    if (form[FORM_FIELD_MOBILE]) {
      let isValid = isMobilePhone(form[FORM_FIELD_MOBILE], ["en-IN"]);
      setStateVariables(
        FORM_FIELD_MOBILE,
        isValid,
        isValid ? "" : validations[FORM_FIELD_MOBILE].valid
      );
    } else if (touchFields[FORM_FIELD_MOBILE]) {
      setErrorMessageState(
        FORM_FIELD_MOBILE,
        validations[FORM_FIELD_MOBILE].required
      );
    }
  };

  const validateFirstAndLastName = (fieldName, fieldValue) => {
    const words = fieldValue.split(" ");
    const firstName = words.slice(0, -1).join(" ");
    const lastName = words[words.length - 1];
    const {
      productConfig: { field_character_limit },
    } = state;
    const firstNameLimit = field_character_limit.first_name;
    const lastNameLimit = field_character_limit.last_name;

    if (firstName.length > firstNameLimit || lastName.length > lastNameLimit) {
      if (firstName.length > firstNameLimit) {
        setStateVariables(
          fieldName,
          false,
          `${validations[fieldName].firstNameMaxLengthPrefix} ${firstNameLimit} ${validations[fieldName].firstNameMaxLengthSuffix} `
        );
      }
      if (lastName.length > lastNameLimit) {
        setStateVariables(
          fieldName,
          false,
          `${validations[fieldName].lastNameMaxLengthPrefix} ${lastNameLimit} ${validations[fieldName].lastNameMaxLengthSuffix} `
        );
      }
    } else {
      setStateVariables(fieldName, true, "");
    }
  };

  const validateName = (fieldName, fieldValue) => {
    if (fieldValue) {
      let isValid = fieldValue.trim().split(" ").length > 1;
      setStateVariables(
        fieldName,
        isValid,
        isValid ? "" : validations[fieldName].valid
      );

      if (isValid) {
        validateFirstAndLastName(fieldName, fieldValue);
      }
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validateEmail = (fieldName) => {
    if (form[fieldName]) {
      let isValid = isEmail(form[fieldName]);
      setStateVariables(
        fieldName,
        isValid,
        isValid ? "" : validations[fieldName].valid
      );
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validateDateOfBirth = (fieldName) => {
    if (form[fieldName]) {
      const minDate = getMinDobDate();
      const maxDate = getMaxDobDate();

      if (
        moment(form[fieldName]).isSameOrAfter(minDate) &&
        moment(form[fieldName]).isSameOrBefore(maxDate)
      ) {
        setTouchFieldsState(fieldName, true);
        setErrorMessageState(fieldName, "");
      } else if (!moment(form[fieldName]).isSameOrAfter(minDate)) {
        setErrorMessageState(
          fieldName,
          validations[fieldName].min +
            " " +
            moment(minDate).format(FORMAT_DD_MM_YYYY) +
            ". (Maximum age should be 99 years)"
        );
      } else if (!moment(form[fieldName]).isSameOrBefore(maxDate)) {
        setErrorMessageState(
          fieldName,
          validations[fieldName].max +
            " " +
            moment(maxDate).format(FORMAT_DD_MM_YYYY) +
            ". (Minimum age should be 18 years)"
        );
      } else {
        setErrorMessageState(fieldName, validations[fieldName].valid);
      }
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const validatePanAndAadhaarNumber = (fieldName, fieldValue) => {
    if (fieldValue) {
      let isValid = Utils.regex[fieldName].test(fieldValue);
      setStateVariables(
        fieldName,
        isValid,
        isValid ? "" : validations[fieldName].valid
      );
    } else if (touchFields[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };
  /* End: Customer Details Section */

  /* Start: Address Details Section */
  const cbCityState = (response = ["", ""]) =>
    setForm({
      ...form,
      [FORM_FIELD_CITY]: response[0],
      [FORM_FIELD_STATE]: response[1],
    });

  const getCityStateByPincode = async (pincode) => {
    if (pincode) {
      let isValid = pincode.length === Utils.limit.digits[FORM_FIELD_PINCODE];
      let message = isValid ? "" : validations[FORM_FIELD_PINCODE].valid;
      setFormState("hasError", !isValid);
      setErrorMessageState(FORM_FIELD_PINCODE, message);
      setTouchFieldsState(FORM_FIELD_PINCODE, true);
      if (isValid) {
        const res = await new PinCodesMapping().get(pincode);
        if (res) {
          cbCityState(res);
        } else {
          setErrorMessageState(
            FORM_FIELD_PINCODE,
            validations[FORM_FIELD_PINCODE].noData
          );
          cbCityState();
        }
      } else {
        cbCityState();
      }
    } else {
      cbCityState();
      if (touchFields[FORM_FIELD_PINCODE]) {
        setErrorMessageState(
          FORM_FIELD_PINCODE,
          validations[FORM_FIELD_PINCODE].required
        );
      }
    }
  };
  /* End: Address Details Section */

  /* Start: Vehicle Details Section */
  const validateOnRoadPrice = () => {
    if (form[FORM_FIELD_ON_ROAD_PRICE]) {
      let isValid =
        Number(form[FORM_FIELD_ON_ROAD_PRICE]) <=
        Number(form[FORM_FIELD_EX_SHOWROOM_PRICE]);
      setStateVariables(
        FORM_FIELD_ON_ROAD_PRICE,
        isValid,
        isValid ? "" : validations[FORM_FIELD_ON_ROAD_PRICE].valid
      );
    } else if (touchFields[FORM_FIELD_ON_ROAD_PRICE]) {
      setErrorMessageState(
        FORM_FIELD_ON_ROAD_PRICE,
        validations[FORM_FIELD_ON_ROAD_PRICE].required
      );
    }
  };
  /* End: Vehicle Details Section */

  const dispatchEvent = (type, payload) => dispatch({ type, payload });

  const handleChange = (event) =>
    setFormState(event.target.name, event.target.value);

  const handleChangeCheckbox = (name, value) => setFormState(name, value);

  const handleChangeChipSelect = (name, value) => setFormState(name, value);

  const handleChangePlan = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const cbCreateProposal = (
    { data: { id } },
    {
      mobile,
      vehicle_manufacturer = "",
      vehicle_model = "",
      ex_showroom_price = "",
      on_road_price = "",
      dealer_code = "",
    }
  ) => {
    setIsFormSubmitted(false);
    setStorageItem("proposalId", id);
    setStorageItem("mobile", mobile);
    setStorageItem("brand", vehicle_manufacturer);
    setStorageItem("model", vehicle_model);
    setStorageItem("ex_showroom_price", ex_showroom_price);
    setStorageItem("on_road_price", on_road_price);
    setStorageItem("dealer_code", dealer_code);

    navigateToUrl(`${getRoute("summary")}/${id}`, history);
  };

  const doForceLogout = () => {
    // Here setTimeout has been added in order to introduced some delay so that dealer should be able to read error message clearly before redirecting it to login page
    setTimeout(() => {
      logout();
      navigateTo("/");
    }, 1000);
  };

  const cbError = ({ data: { error_msg }, code = 400 }, modalKey = "") => {
    setIsFormSubmitted(false);
    setIsPremiumLoaded(true);

    const message = parseMessage(error_msg);
    if (Array.isArray(message)) {
      setErrors(message);
    } else {
      let messageArray = [];
      messageArray.push(message);
      setErrors(messageArray);
    }

    if (code === 401) {
      doForceLogout();
    }

    if (modalKey === MODAL_KEY_PREMIUM) {
      handleClose(true, MODAL_KEY_PREMIUM);
    }
  };

  const fetchProductConfig = async () => {
    const response = await getWebService(
      `get_app_config?entity=${CONFIG_ENTITY_NAME}&entity_id=${CONFIG_ENTITY_ID}`
    );
    const {
      data: {
        field_default_value: { title, vehicle_category },
        gst_percentange,
      },
      data,
    } = response.data;

    dispatchEvent(ReducerUtils.products.config, data);
    setForm({
      ...form,
      [FORM_FIELD_CATEGORY]: vehicle_category,
      [FORM_FIELD_GST_PERCENTAGE]: gst_percentange,
    });
    setIsLoaded(true);
  };

  const createUpdateProposal = async () => {
    try {
      setErrors([]);
      setIsFormSubmitted(true);

      const payload = buildCreateProposalPayload(form, state);
      const response = await postWebService("lending/proposal", payload);
      cbCreateProposal(response.data, form);
    } catch (error) {
      console.log(error);
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const navigateTo = (pathname) => history.push({ pathname });

  /* const onSubmit = (event) => {
    event.preventDefault();

    if (isSubmitButtonDisabled(form, errorMessage)) {
      setErrorMessage({
        ...errorMessage,
        ...buildErrorObject(form, errorMessage),
      });
    } else {
      createUpdateProposal();
    }
  }; */

  const setErrorMessageState = (name, value) =>
    setErrorMessage({ ...errorMessage, [name]: value });

  const setFormState = (name, value) => setForm({ ...form, [name]: value });

  const setStateVariables = (key, isValid, message) => {
    setFormState("hasError", !isValid);
    setErrorMessageState(key, message);
    setTouchFieldsState(key, true);
  };

  const setTouchFieldsState = (name, value) =>
    setTouchFields({ ...touchFields, [name]: value });

  const validateRequiredInput = (fieldName) => {
    if (form[fieldName]) {
      setTouchFieldsState(fieldName, true);
      setErrorMessageState(fieldName, "");
    } else if (touchFields[fieldName] && !form[fieldName]) {
      setErrorMessageState(fieldName, validations[fieldName].required);
    }
  };

  const fetchRecentOrderForClaim = async () => {
    const response = await getWebService(`search/order/${form.mobile}`);
    const { data } = response.data;

    console.log(data);

    return data;
  };

  const searchClickHanlder = async () => {
    setNoSearchResultFound([]);
    setDisabledAccordion(false);
    setIsSearchCompleted(false);
    setPhoto({ estimate: "", aadhaar: "", phone: "" });
    // setForm({ ...form, on_road_price: null });

    const order = await fetchRecentOrderForClaim();

    if (order) {
      const response = await getWebService(`orders/${order.id}/details/dealer`);
      const { data } = response.data;

      dispatchEvent(ReducerUtils.order.details, data);
      setDisabledAccordion(false);
      setIsSearchCompleted(true);
      console.log(`Order ID: ${data.order_id}, Reference ID: ${data.toffee_id}`);
    } else {
      setNoSearchResultFound([NO_ACTIVE_POLICY_TO_CLAIM_TEXT]);
      dispatchEvent(ReducerUtils.order.details, null);
      setDisabledAccordion(true);
      setIsSearchCompleted(true);
    }
  };

  const photoChangeHandler = (keyname, file) => {
    setPhoto({
      ...photo,
      [keyname]: file,
    });
  };

  const submitClaimInput = async (claimId) => {
    const response = await postWebService(
      `web/claim/inputs/${claimId}`,
      buildSubmitClaimInput(form)
    );

    const { data } = response.data;

    console.log("submitClaimInput", data);
  };

  const buildAadhaarPhotoRequestPayload = () => {
    const payload = new FormData();
    payload.append("document_type_id", DOCUMENT_TPYE_ID_AADHAAR);
    payload.append("claimDocuments[]", photo.aadhaar);
    payload.append("claimDocuments[]", photo.aadhaar);
  
    return payload;
  };
  
  const buildPhonePhotoRequestPayload = () => {
    const payload = new FormData();
    payload.append("document_type_id", DOCUMENT_TPYE_ID_MOBILE_PHOTOS);
    payload.append("claimDocuments[]", photo.phone);
  
    return payload;
  };
  
  const buildEstimatePhotoRequestPayload = () => {
    const payload = new FormData();
    payload.append("document_type_id", DOCUMENT_TPYE_ID_ESTIMATE);
    payload.append("claimDocuments[]", photo.phone);
  
    return payload;
  };

  const submitClaimDocument = async (claimId, payload) => {
    const response = await postWebService(
      `web/claim/document/submit/${claimId}`,
      payload
    );
    const { data } = response.data;

    console.log(data);
  };

  const submitClaim = async (claimId) => {
    const response = await postWebService(`web/claim/submit/${claimId}`, {claimed_amount: Number(form?.on_road_price)});
    const { success } = response.data;

    if (success) {
      console.log("Claim has been submit");
      navigateToUrl(getRoute("dashboard"), history);
    }
  };

  const initiateClaim = async () => {
    try {
      setIsFormSubmitted(true);
      const response = await postWebService(
        `web/claim/initiate/${form.toffee_id}`,
        buildInitiateClaimPayload()
      );
      const {
        data: { claimId = null },
        success,
      } = response.data;

      console.log("claimId", claimId);

      if (success) {
        setStorageItem("claimId", claimId);
      }

      await submitClaimInput(claimId);
      await submitClaimDocument(claimId, buildAadhaarPhotoRequestPayload());
      await submitClaimDocument(claimId, buildPhonePhotoRequestPayload());
      await submitClaimDocument(claimId, buildEstimatePhotoRequestPayload());
      await submitClaim(claimId);

      setIsFormSubmitted(false);
    } catch (error) {
      console.log(error);
      cbError(
        error && error.response && error.response.data
          ? error.response.data
          : buildSystemErrorMessage()
      );
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    initiateClaim();
  };

  return (isLoaded && state.productConfig && !orderId) ||
    (orderId && state.orderDetails) ? (
    <ProposalForm
      changeOptionBaseOnValue={changeOptionBaseOnValue}
      disabledAccordion={disabledAccordion}
      errorMessage={errorMessage}
      errors={errors}
      form={form}
      handleAutocompleteChange={handleAutocompleteChange}
      handleChange={handleChange}
      handleChangeCheckbox={handleChangeCheckbox}
      handleChangeChipSelect={handleChangeChipSelect}
      handleChangePlan={handleChangePlan}
      handleIconClick={handleIconClick}
      handleOnClose={handleOnClose}
      searchClickHanlder={searchClickHanlder}
      isFormSubmitted={isFormSubmitted}
      isManufacturerChanged={isManufacturerChanged}
      isModelChanged={isModelChanged}
      isManufacturerVisible={isManufacturerVisible}
      isModelVisible={isModelVisible}
      isPremiumLoaded={isPremiumLoaded}
      isSearchCompleted={isSearchCompleted}
      isVariantVisible={isVariantVisible}
      modal={modal}
      noSearchResultFound={noSearchResultFound}
      onSubmit={onSubmit}
      breakup={breakup}
      setForm={setForm}
      photo={photo}
      photoChangeHandler={photoChangeHandler}
    />
  ) : (
    <Box className={loaderBox}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
}

export default withStyles(useStyles, { withTheme: true })(Proposal);
