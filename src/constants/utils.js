export const Utils = {
  dialogOnCloseReasons: ["escapeKeyDown", "backdropClick"],
  limit: {
    digits: {
      aadhaar_number: 12,
      address: 50,
      mobile: 10,
      name: 30,
      nominee_name: 30,
      open_text_field: 50,
      otp: 6
    },
  },
  regex: {
    // pan_number: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
    aadhaar_number: /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/
  },
};
