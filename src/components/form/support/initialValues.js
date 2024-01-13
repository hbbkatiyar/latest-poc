export const initialValues = () => ({
  name:
    localStorage.getItem("user_details") &&
    JSON.parse(localStorage.getItem("user_details"))?.dealership_name,
  mobile:
    localStorage.getItem("user_details") &&
    JSON.parse(localStorage.getItem("user_details"))?.mobile,
  email:
    localStorage.getItem("user_details") &&
    JSON.parse(localStorage.getItem("user_details"))?.email,
  type_of_query: "-",
  message: "",
});
