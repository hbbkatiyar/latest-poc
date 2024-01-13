
import { Images } from "../constants/images";
import {
  FORM_FIELD_EMP_CODE,
  FORM_FIELD_PASSWORD,
} from "../constants/field";
import { getDealerCode } from "../helpers/proposal";
import { toObject } from "../helpers/utils";

export const fields = [
  FORM_FIELD_EMP_CODE,
  FORM_FIELD_PASSWORD,
];

export const formFields = toObject(fields);

export const initialFormState = {
  ...formFields,
  hasError: false,
  dealer_code: getDealerCode()
};

export const touchFieldsObject = toObject(fields, false);

export const vehicleCategoryIcon = {
  "2W": Images.scooter,
  GCV: Images.threeWheeler,
  PCV: Images.threeWheeler,
  "4W": null,
  TRACTOR: null,
};

export const options = {
  breakupList: [
    // { title: "RTO", amount: 0 },
    // { title: "Insurance", amount: 0 },
    // { title: "Accessories", amount: 0 },
    { title: "Other Charges", amount: 0 }
  ],
  languages: [
    { title: "English", value: "en" },
    { title: "Hindi", value: "hindi" },
    { title: "Tamil", value: "tamil" },
  ]
};
