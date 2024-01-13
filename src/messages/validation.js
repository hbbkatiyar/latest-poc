import { Utils } from "../constants/utils";

export const validations = {
  aadhaar_number: {
    required: "Please enter aadhaar number",
    valid: "Please enter valid aadhaar number"
  },
  address: {
    required: "Please enter address",
  },
  dob: {
    required: "Please enter date of birth",
    min: "Date of birth should be greater than or equal to",
    max: "Date of birth should be greater than or equal to",
    valid: "Please enter valid date of birth",
  },
  nominee_dob: {
    required: "Please enter date of birth",
    min: "Date of birth should be greater than or equal to",
    max: "Date of birth should be greater than or equal to",
    valid: "Please enter valid date of birth",
  },
  email: {
    required: "Please enter email",
    valid: "Please enter valid email",
  },
  mobile: {
    required: "Please enter mobile number",
    valid: "Please enter valid mobile number",
  },
  name: {
    required: "Please enter name",
  },
  nominee_name: {
    required: "Please enter nominee name",
  },
  nominee_relationship: {
    required: "Please enter nominee relationship",
  },
  gender: {
    required: "Please enter gender",
  },
  password: {
    required: "Please enter password",
    min: "Min 6 characters long password",
  },
  empcode: {
    required: "Please enter employee id",
  }
};
