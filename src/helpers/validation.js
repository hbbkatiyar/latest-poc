export const isLoginButtonDisabled = (isFormSubmitted, form, errorMessage) => {
  return (isFormSubmitted ||
    !form.empcode ||
    !form.password ||
    errorMessage.empcode ||
    errorMessage.password);
};