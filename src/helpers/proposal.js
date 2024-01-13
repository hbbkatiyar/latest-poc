import moment from "moment";
import * as XLSX from "xlsx";
import {
  BUTTON_CONFIRM_AND_ISSUE_POLICY,
  DEALER,
  DEALER_OTP_LENGTH,
  DOCUMENT_CDN_PATH,
  ERROR_MESSAGE_TEXT,
  EX_SHOWROOM_PRICE,
  FORMAT_DOB,
  FORMAT_YYYY_MM_DD,
  GST_PERCENTAGE,
  PAYMENT_FAILED_MESSAGE,
  PROPOSAL_STATUS_DRAFT,
  PROPOSAL_STATUS_INITIATED,
  QUOTES_LIST,
  THIS_MONTH_TEXT,
  THIS_WEEK_TEXT,
  THIS_YEAR_TEXT,
  USER,
  USER_DETAILS,
} from "../constants";
import {
  FIELDS_HAVING_ALPHABET_AND_SPACE_ONLY,
  FIXED_LENGTH_FIELDS,
  ONLY_ALPHA_NUMERIC_FIELDS,
  ONLY_ALPHA_NUMERIC_SPACE_FIELDS,
  ONLY_DIGIT_FIELDS,
} from "../constants/field";
import { getStorageItem } from "./utils";
import { Utils } from "../constants/utils";
import { sectionTitle } from "../mapping";
import { validations } from "../messages/validation";
import { ProvidersUtils } from "../config/providers";

export const buildAddressDetailsErrorObject = (form, errorMessage) => {
  const { aadhaar_number, pincode = "", residence_type = "" } = errorMessage;

  return {
    aadhaar_number: aadhaar_number
      ? aadhaar_number
      : !form.aadhaar_number
      ? validations.aadhaar_number.required
      : "",
    pincode: pincode
      ? pincode
      : !form.pincode
      ? validations.pincode.required
      : "",
    residence_type: residence_type
      ? residence_type
      : !form.residence_type
      ? validations.residence_type.required
      : "",
  };
};

export const buildCustomerDetailsErrorObject = (form, errorMessage) => {
  const { dob, mobile, name, pan_number } = errorMessage;

  return {
    dob: dob ? dob : !form.dob ? validations.dob.required : "",
    mobile: mobile ? mobile : !form.mobile ? validations.mobile.required : "",
    name: name ? name : !form.name ? validations.name.required : "",
    pan_number: pan_number
      ? pan_number
      : !form.pan_number
      ? validations.pan_number.required
      : "",
  };
};

export const buildEmploymentDetailsErrorObject = (form, errorMessage) => {
  const {
    annual_income = "",
    applicant_type = "",
    business_name = "",
    employer_name = "",
    employment_type = "",
    monthly_salary = "",
    salary_deposit_tenure = "",
    work_email = "",
  } = errorMessage;

  return isSalariedPerson(form.employment_type)
    ? {
        employment_type: employment_type
          ? employment_type
          : !form.employment_type
          ? validations.employment_type.required
          : "",
        employer_name: employer_name
          ? employer_name
          : !form.employer_name
          ? validations.employer_name.required
          : "",
        work_email: work_email
          ? work_email
          : !form.work_email
          ? validations.work_email.required
          : "",
        monthly_salary: monthly_salary
          ? monthly_salary
          : !form.monthly_salary
          ? validations.monthly_salary.required
          : "",
        salary_deposit_tenure: salary_deposit_tenure
          ? salary_deposit_tenure
          : !form.salary_deposit_tenure
          ? validations.salary_deposit_tenure.required
          : "",
      }
    : {
        employment_type: employment_type
          ? employment_type
          : !form.employment_type
          ? validations.employment_type.required
          : "",
        business_name: business_name
          ? business_name
          : !form.business_name
          ? validations.business_name.required
          : "",
        annual_income: annual_income
          ? annual_income
          : !form.annual_income
          ? validations.annual_income.required
          : "",
        applicant_type: applicant_type
          ? applicant_type
          : !form.applicant_type
          ? validations.applicant_type.required
          : "",
      };
};

export const buildVehicleDetailsErrorObject = (form, errorMessage) => {
  const {
    dealer_code = "",
    ex_showroom_price = null,
    on_road_price = "",
    vehicle_manufacturer = "",
    vehicle_model = "",
    vehicle_variant = "",
  } = errorMessage;

  return {
    dealer_code: dealer_code
      ? dealer_code
      : !form.dealer_code
      ? validations.dealer_code.required
      : "",
    ex_showroom_price: ex_showroom_price
      ? ex_showroom_price
      : !form.ex_showroom_price
      ? validations.ex_showroom_price.required
      : "",
    on_road_price: on_road_price
      ? on_road_price
      : !form.on_road_price
      ? validations.on_road_price.required
      : "",
    vehicle_manufacturer: vehicle_manufacturer
      ? vehicle_manufacturer
      : !form.vehicle_manufacturer
      ? validations.vehicle_manufacturer.required
      : "",
    vehicle_model: vehicle_model
      ? vehicle_model
      : !form.vehicle_model
      ? validations.vehicle_model.required
      : "",
    vehicle_variant: vehicle_variant
      ? vehicle_variant
      : !form.vehicle_variant
      ? validations.vehicle_variant.required
      : "",
  };
};

export const buildErrorObject = (form, errorMessage) => {
  return {
    ...buildAddressDetailsErrorObject(form, errorMessage),
    ...buildCustomerDetailsErrorObject(form, errorMessage),
    ...buildEmploymentDetailsErrorObject(form, errorMessage),
    ...buildVehicleDetailsErrorObject(form, errorMessage),
  };
};

export const buildExShowroomPriceObject = (
  amount,
  title = EX_SHOWROOM_PRICE
) => {
  return { title, amount };
};

export const buildLoginPayload = ({ mobile }) => {
  return {
    mobile: Number(mobile),
    otp_length: DEALER_OTP_LENGTH,
    type: USER,
  };
};

export const buildProvisionalQuotesList = ({
  responses_quotes: quotes = {},
  responses_selected_nbfc: selected_nbfc = null,
  responses_selected_eligibility: selected_eligibility = null,
}) => {
  const list = [];

  for (let key in quotes) {
    const isSelected =
      key === selected_nbfc && selected_nbfc && selected_eligibility;
    const quote = quotes[key];
    const { name, original_eligibility: original = null } = quote;
    const selected =
      selected_nbfc && selected_eligibility
        ? quotes[selected_nbfc][selected_eligibility]
        : null;
    let object = { name, reference_code: key };

    if (isSelected) {
      object = {
        ...object,
        ...selected,
        visible: true,
      };
    } else if (original) {
      object = {
        ...object,
        ...original,
        visible: true,
      };
    }

    list.push({ ...object });
  }

  return list;
};

export const buildRazorpayResponseErrorMessage = () => {
  return {
    data: {
      error_msg: PAYMENT_FAILED_MESSAGE,
    },
  };
};

export const buildResendOtpPayload = ({ email, mobile, name }) => {
  const payload = buildLoginPayload({ mobile });

  return { ...payload, email, name };
};

export const buildSubmitOtpPayload = ({ mobile, otp }) => {
  return {
    mobile,
    otp,
    type: USER,
  };
};

export const buildSystemErrorMessage = () => {
  return {
    data: {
      error_msg: ERROR_MESSAGE_TEXT,
    },
  };
};

export const buildVehicleMasterUrl = (params) =>
  `assurance/vehicle/master?${new URLSearchParams(params).toString()}`;

export const buildVariantsList = (list = []) => {
  list.forEach((item) => {
    item.title = item.value;
    item.value = `${item.value}__${item.mmv_id}__${item.ex_showroom_price}`;
  });

  return list;
};

export const calulateOnRoadPrice = (finalBreakUp) => {
  let onRoadPrice = 0;

  finalBreakUp.map((item) => {
    onRoadPrice += Number(item.amount);
  });

  return onRoadPrice;
};

export const convertToInteger = (value) => (value ? parseInt(value) : null);

export const getDealerCode = () =>
  getStorageItem(USER_DETAILS) &&
  JSON.parse(getStorageItem(USER_DETAILS)).dealer_id;

export const getDealershipName = () =>
  getStorageItem(USER_DETAILS) &&
  JSON.parse(getStorageItem(USER_DETAILS)).dealership_name;

export const getDurationLabel = (selectedTab) => {
  let label = THIS_WEEK_TEXT;

  if (selectedTab === 1) {
    label = THIS_MONTH_TEXT;
  } else if (selectedTab === 2) {
    label = THIS_YEAR_TEXT;
  }

  return label;
};

export const getMinDobDate = (years = 99) =>
  moment(moment(new Date()).subtract(years, "years").add(1, "days")).format(
    FORMAT_YYYY_MM_DD
  );

export const getMaxDobDate = (years = 18) =>
  moment(moment(new Date()).subtract(years, "years").add(1, "days")).format(
    FORMAT_YYYY_MM_DD
  );

export const getSectionTitle = (str) =>
  sectionTitle[removeTrailingBackslash(removeDigits(str))];

export const getUniqueListBy = (list, key) => {
  return [...new Map(list.map((item) => [item[key], item])).values()];
};

export const isOnlyAlphaNumericField = (fieldName) =>
  ONLY_ALPHA_NUMERIC_FIELDS.indexOf(fieldName) > -1;

export const isOnlyAlphaNumericSpaceField = (fieldName) =>
  ONLY_ALPHA_NUMERIC_SPACE_FIELDS.indexOf(fieldName) > -1;

export const isOnlyDigitField = (fieldName) =>
  ONLY_DIGIT_FIELDS.indexOf(fieldName) > -1;

export const isFixedLengthField = (fieldName) =>
  FIXED_LENGTH_FIELDS.indexOf(fieldName) > -1;

export const isLoginNextButton = ({ empcode, password, hasError }, errorMessage) =>
  !empcode || !password || (password && errorMessage.password) || hasError;

export const isHandoverButtonDisabled = ({ tenure, emi, repay_amount }) =>
  !tenure || !emi || !repay_amount;

export const isHandoverButtonVisible = ({
  selected_quote: { reference_code = null } = {},
} = {}) => {
  return false;
  //reference_code && ProvidersUtils[reference_code].visible.buttonHandover;
};

export const isProceedButtonVisible = ({
  selected_quote: { reference_code = null } = {},
} = {}) => {
  return true;
  // reference_code && ProvidersUtils[reference_code].visible.buttonProceed;
};

export const isAddressDetailsNotFilled = (
  { aadhaar_number, city, pincode, residence_type, state },
  errorMessage
) => {
  return (
    !aadhaar_number ||
    (aadhaar_number && errorMessage.aadhaar_number !== "") ||
    !pincode ||
    (pincode && errorMessage.pincode) ||
    !city ||
    !state ||
    !residence_type
  );
};

export const isCustomerDetailsNotFilled = (
  { dob, mobile, name, pan_number },
  errorMessage
) => {
  return (
    !dob ||
    (dob && errorMessage.dob !== "") ||
    !mobile ||
    (mobile && errorMessage.mobile !== "") ||
    !name ||
    (name && errorMessage.name !== "") ||
    !pan_number ||
    (pan_number && errorMessage.pan_number !== "")
  );
};

export const isEmploymentDetailsNotFilled = (
  {
    annual_income,
    applicant_type,
    business_name,
    employment_type,
    employer_name,
    work_email,
    monthly_salary,
    salary_deposit_tenure,
  },
  errorMessage
) => {
  return (
    !employment_type ||
    (isSalariedPerson(employment_type) &&
      (!employer_name ||
        !work_email ||
        (work_email && errorMessage.work_email) ||
        !monthly_salary ||
        !salary_deposit_tenure)) ||
    (isSelfEmployed(employment_type) &&
      (!business_name || !annual_income || !applicant_type))
  );
};

export const isVehicleDetailsNotFilled = (
  {
    dealer_code,
    ex_showroom_price,
    on_road_price,
    vehicle_manufacturer,
    vehicle_model,
    vehicle_variant,
  },
  errorMessage
) => {
  return (
    !dealer_code ||
    !ex_showroom_price ||
    !on_road_price ||
    !vehicle_manufacturer ||
    !vehicle_model ||
    !vehicle_variant
  );
};

export const isSubmitButtonDisabled = (form, errorMessage) => {
  const { hasError } = form;

  const a = isAddressDetailsNotFilled(form, errorMessage);
  const c = isCustomerDetailsNotFilled(form, errorMessage);
  const e = isEmploymentDetailsNotFilled(form, errorMessage);
  const v = isVehicleDetailsNotFilled(form, errorMessage);

  return a || c || e || v || hasError;
};

export const isValidDate = (dateString) =>
  moment(dateString, FORMAT_YYYY_MM_DD, true).isValid() === true;

export const reBuildOrderDetails = (orderDetails) => {
  const shallowCopy = { ...orderDetails };
  const totalPremium = Number(orderDetails?.premium);
  const gst = orderDetails.gst_percentange ?? GST_PERCENTAGE;
  const gstPercentage = Number(gst) / 100;
  const divisor = 1 + gstPercentage;
  const excludingGst = Number((totalPremium / divisor).toFixed(2));
  const gstAmount = Number((totalPremium - excludingGst).toFixed(2));

  return {
    ...shallowCopy,
    premium_total: totalPremium,
    premium_excluding_gst: excludingGst,
    premium_gst: gstAmount,
  };
};

export const sleep = (m) => new Promise((r) => setTimeout(r, m));

export const removeSelectedProductFromStorage = () => {};

export const renderFieldTitleByValue = (list = [], value) => {
  let title = "",
    isFound = false;

  list.forEach((item) => {
    if (!isFound && item.value === value) {
      title = item.title;
      isFound = true;
    }
  });

  return title;
};

export const renderButtonText = () => BUTTON_CONFIRM_AND_ISSUE_POLICY;

export const removeDigits = (str) => str.replace(/[0-9]/g, "");

export const removeTrailingBackslash = (str) => str.replace(/\/$/, "");

export const splitProductName = (name, delimeter = " ") =>
  name.split(delimeter);

export const syncDateFormat = (
  dob = null,
  currentFormat = FORMAT_DOB,
  newFormat = FORMAT_YYYY_MM_DD
) => {
  if (!dob) {
    return dob;
  }

  return moment(dob, currentFormat).format(newFormat);
};

export const validateInputLength = (event) => {
  const elName = event.target.name;
  let elValue = event.target.value;

  if (FIELDS_HAVING_ALPHABET_AND_SPACE_ONLY.indexOf(elName) > -1) {
    elValue = elValue.replace(/(\s{2,})|[^a-zA-Z']/g, " ");
    elValue = elValue.replace(/^\s*/, "");
    event.target.value = elValue;
  }

  if (isOnlyDigitField(elName)) {
    event.target.value = elValue.replace(/[^0-9]+/g, "");
  }

  if (isOnlyAlphaNumericField(elName)) {
    event.target.value = elValue.replace(/[^0-9A-Za-z]+/g, "").toUpperCase();
  }

  if (isOnlyAlphaNumericSpaceField(elName)) {
    event.target.value = elValue.replace(/[^0-9A-Za-z\s]+/g, "").toUpperCase();
  }

  if (elValue.length > Utils.limit.digits[elName]) {
    event.target.value = elValue.substring(0, Utils.limit.digits[elName]);
  }
};

/* Start: Lending Proposal Section */
export const buildCreateProposalPayload = (
  { hasError, ...rest },
  { productConfig }
) => {
  const {
    application_number = null,
    dob,
    ex_showroom_price,
    mmv_id = null,
    mobile,
    name,
  } = rest;
  const {
    emi_scheme,
    interest_rate_suffix_text,
    processing_charges_suffix_text,
    step_amount = 1000,
    step_tenure = 0.5,
  } = productConfig;

  const split_array = rest.vehicle_variant.split("__");
  const payload = {
    // Request Payloads based on input filled by dealer
    ...rest,
    ...(application_number && { application_number }),
    dob: moment(dob).format(FORMAT_DOB),
    ex_showroom_price: Number(ex_showroom_price),
    mobile: mobile,
    mmv_id: split_array.length > 1 ? Number(split_array[1]) : mmv_id,
    name: name.trim(),
    vehicle_variant: split_array[0],

    // Request Payloads based on provided configuration
    emi_scheme,
    interest_rate_suffix_text,
    processing_charges_suffix_text,
    step_amount,
    step_tenure,

    // Additional Request Payloads
    amount: null,
    emi: null,
    interest_rate: null,
    max_amount: null,
    max_tenure: null,
    min_amount: null,
    min_tenure: null,
    processing_charges: null,
    repay_amount: null,
    status: PROPOSAL_STATUS_DRAFT,
    tenure: null,
  };

  // Clean up unused Request Payload
  if (isSalariedPerson(payload.employment_type)) {
    delete payload.business_name;
    delete payload.annual_income;
    delete payload.applicant_type;
  } else {
    delete payload.employer_name;
    delete payload.work_email;
    delete payload.monthly_salary;
    delete payload.salary_deposit_tenure;
  }

  return payload;
};

export const buildUpdateProposalPayload = (
  {
    amount,
    application_number = null,
    emi,
    interest_rate,
    min_amount,
    min_tenure,
    max_amount,
    max_tenure,
    processing_charges,
    reference_code,
    repay_amount,
    taxes,
    tenure,
  },
  action = null
) => {
  return {
    // quote request payload
    amount,
    interest_rate,
    min_amount,
    max_amount,
    min_tenure,
    max_tenure,
    processing_charges,
    reference_code,
    taxes,

    // tenure emi request payload
    emi,
    repay_amount,
    tenure,

    // additional request payload
    application_number: application_number
      ? application_number
      : Math.random().toString(36).toUpperCase().slice(2),
    status: PROPOSAL_STATUS_INITIATED,
    ...(action && { action }),
  };
};

export const calculateEMI = (principal, interest_rate, tenure) => {
  let i = interest_rate / (12 * 100);
  let n = tenure * 12;
  let emi = (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);

  return Math.round(emi);
};

export const calculateRepayAmount = (emi, tenure) => {
  return Number(emi * tenure * 12);
};

export const findEmiObject = ({
  selected_quote: { tenures = [] } = {},
  tenure,
} = {}) => {
  const object = {
    emi: null,
    repay_amount: null,
    isFound: false,
  };

  tenures.map((item) => {
    if (!object.isFound && item.value === tenure) {
      object.emi = item.emi;
      object.repay_amount = item.repay_amount;
      object.isFound = true;
    }
  });

  return object;
};

export const getTentativeLoanAmount = (
  ex_showroom_price,
  tentative_loan_amount_percentage
) => {
  return Math.round(
    Number(
      (Number(ex_showroom_price) * Number(tentative_loan_amount_percentage)) /
        100
    )
  );
};

export const isSalariedPerson = (employment_type) =>
  employment_type === "SALARIED" || employment_type === "SALARIED_DOCTOR";

export const isSelfEmployed = (employment_type) =>
  employment_type === "SELF_EMPLOYED_BUSINESS" ||
  employment_type === "SELF_EMPLOYED_PROFESSIONAL";

export const isSelecteQuoteButtonDisabled = ({
  amount = null,
  min_amount = null,
  max_amount = null,
} = {}) => Number(amount) < min_amount || Number(amount) > max_amount;

export const reBuildProvisionalQuotes = (quotes = []) => {
  quotes.map((quote) => {
    const { amount, interest_rate, tenures = [] } = quote;
    tenures.map((item) => {
      const tenure = item.value / 12;
      item.emi = calculateEMI(amount, interest_rate, tenure);
      item.repay_amount = Math.round(calculateRepayAmount(item.emi, tenure));
    });
  });

  return quotes;
};

export const syncEmiGridToForm = ({
  emi = null,
  repay_amount = null,
  tenure = null,
}) => {
  return {
    emi,
    repay_amount,
    tenure,
  };
};

export const syncFetchOriginalQuoteResponse = (data, reference_code) => {
  const shallowCopy = JSON.parse(
    JSON.stringify(JSON.parse(getStorageItem(QUOTES_LIST)))
  );

  shallowCopy.map((item, index) => {
    if (item.reference_code === reference_code) {
      if (data) {
        shallowCopy[index] = {
          ...shallowCopy[index],
          ...data,
          visible: true,
        };
      } else {
        shallowCopy[index] = { ...shallowCopy[index], visible: true };
      }
    }
  });

  return shallowCopy;
};

export const syncOrderDetails = ({
  amount = null,
  application_number = null,
  emi = null,
  interest_rate = null,
  processing_charges = null,
  reference_code = null,
  repay_amount = null,
  taxes = null,
  tenure = null,
}) => {
  return {
    amount,
    application_number,
    emi,
    interest_rate,
    processing_charges,
    reference_code,
    repay_amount,
    taxes,
    tenure,
  };
};

export const syncProposalDetails = ({
  name = null,
  email = null,
  // mobile,
  pincode = null,
  city = null,
  state = null,
  address_line_1 = null,
  address_line_2,
  response_phone_brand: phone_brand = null,
  response_phone_model: phone_model = null,
  response_phone_color: phone_color = null,
  response_phone_storage: phone_storage = null,
  response_phone_ram: phone_ram = null,
  response_screen_photo: screen_photo = null,
  response_imei_number: imei_number = null,
  response_manufactured_date: manufactured_date = null,
  response_serial_number: serial_number = null,
  product_name = null,
  response_coverage_period: coverage_period = null,
  start_date = null,
  end_date = null,
  response_invoice_amount: invoice_amount = null,
  response_invoice_number: invoice_number = null,
  response_invoice_date: invoice_date = null,
  response_invoice: invoice = null,
  policy_document = null,
  policy_number = null,
  toffee_id = null,
  on_road_price = null,
} = {}) => {
  const splittedScreenPhoto = screen_photo ? screen_photo.split("/") : [];
  const screenLength = splittedScreenPhoto.length;
  const screen_photo_name = screenLength
    ? splittedScreenPhoto[screenLength - 1]
    : null;
  const screen_photo_link = screen_photo
    ? `${DOCUMENT_CDN_PATH}${screen_photo}`
    : null;

  const splittedInvoicePhoto = invoice ? invoice.split("/") : [];
  const invoiceLength = splittedInvoicePhoto.length;
  const invoice_name = invoiceLength
    ? splittedInvoicePhoto[invoiceLength - 1]
    : null;
  const invoice_link = invoice ? `${DOCUMENT_CDN_PATH}${invoice}` : null;

  const splittedPolicyDocument = policy_document
    ? policy_document.split("/")
    : [];
  const documentLength = splittedPolicyDocument.length;
  const policy_document_name = documentLength
    ? splittedPolicyDocument[documentLength - 1]
    : null;

  return {
    name,
    email,
    // mobile,

    pincode,
    city,
    state,
    address: address_line_1,

    phone_brand,
    phone_model,
    phone_color,
    phone_storage: phone_storage ? `${phone_storage} GB` : null,
    phone_ram: phone_ram ? `${phone_ram} GB` : null,
    screen_photo,
    screen_photo_name,
    screen_photo_link,

    imei_number,
    manufactured_date,
    serial_number,
    product_name,
    coverage_period,
    start_date: start_date ? moment(start_date).format("DD/MM/YYYY") : "",
    end_date: end_date ? moment(end_date).format("DD/MM/YYYY") : "",
    invoice_amount,
    invoice_number,
    invoice_date,
    invoice,
    invoice_name,
    invoice_link,

    policy_document,
    policy_document_name,
    policy_number,
    toffee_id,
    on_road_price,
    ex_showroom_price: invoice_amount
  };
};

export const syncSelectedQuoteToForm = (
  {
    amount,
    emi = null,
    interest_rate,
    min_amount,
    max_amount,
    min_tenure,
    max_tenure,
    processing_charges,
    reference_code,
    repay_amount = null,
    taxes,
    tenure = null,
  } = {},
  source = ""
) => {
  return {
    amount,
    interest_rate,
    min_amount,
    max_amount,
    min_tenure,
    max_tenure,
    processing_charges,
    reference_code,
    taxes,
    emi,
    repay_amount,
    tenure,
    // Commented this code since now we are assigning emi, repay_amount and tenure on select button click instead
    // emi: source === "sync" ? emi : null,
    // repay_amount: source === "sync" ? repay_amount : null,
    // tenure: source === "sync" ? tenure : null,
  };
};

export const toSentenceCase = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const toTitleCase = (str) => {
  return str
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
};
/* End: Lending Proposal Section */

// This function is used to calculate EMI and Repay Amount
export const buildSampleJSONData = () => {
  [
    { principal: 104000, tenure: 30 },
    { principal: 104000, tenure: 36 },
  ].map((item) => {
    const emi = calculateEMI(item.principal, 17.5, item.tenure / 12);
    const repay_amount = calculateRepayAmount(emi, item.tenure / 12);

    console.log(
      `principal = ${item.principal}, interest_rate = 18, tenure = ${item.tenure}, emi = ${emi}, repay_amount = ${repay_amount}`
    );
  });
};

export const buildInitiateClaimPayload = () => {
  return {
    claim_type_id: [117],
  };
};

export const buildSubmitClaimInput = ({
  city = "Gurugram",
  state = "Haryana",
  pincode = 122001,
}) => {
  return {
    inputs: [
      {
        name: "date_of_damage",
        value: "Tue Jun 20 2023 09:30 AM",
      },
      {
        name: "location_of_damage",
        value: {
          city,
          state,
          pincode,
        },
      },
      {
        name: "damage_details",
        value: "Test damage details",
      },
      {
        name: "damaged_cycle_parts",
        value: [
          "Display Screen",
          "Battery",
          "Camera Lens",
          "Charging Port",
          "Speaker and Microphone",
          "SIM Card Tray",
          "Antenna",
          "Others",
        ],
      },
    ],
  };
};

export const downloadExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, "ClaimsList.xlsx");
};