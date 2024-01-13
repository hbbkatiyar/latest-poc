import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default function validation() {
  return yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    mobile: yup
      .string()
      .required("Mobile number is required")
      .matches(phoneRegExp, "Please input valid phone number")
      .min(10, "Please input valid phone number")
      .max(10, "Please input valid phone number"),
    email: yup
      .string()
      .required("Email is required")
      .email("Please input valid email"),
    type_of_query: yup
      .string()
      .notOneOf(["-"], "Type of query is required")
      .trim()
      .required("Type of query is required"),
    message: yup.string().trim().required("Message is required"),
  });
}
