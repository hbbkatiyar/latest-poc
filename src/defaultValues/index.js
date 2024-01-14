
import {
  FORM_FIELD_EMP_CODE,
  FORM_FIELD_PASSWORD,
} from "../constants/field";
import { toObject } from "../helpers/utils";
export const fields = [
  FORM_FIELD_EMP_CODE,
  FORM_FIELD_PASSWORD,
];
export const formFields = toObject(fields);
export const initialFormState = {
  ...formFields,
  hasError: false,
};
export const touchFieldsObject = toObject(fields, false);