// Server config
export const { REACT_APP_SERVER_BASE_URL } = process.env || {};


// Date time fomart
export const DATETIME_FORMAT = "HH:mm DD-MM-YYYY";
export const DATE_FORMAT = "DD-MM-YYYY";
export const TIME_FORMAT = "HH:mm";
export const SECOND_FORMAT = "HH:mm:ss DD-MM-YYYY";

// Regex
export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const PHONE_PATTERN =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const PASSWORD_PATTEN = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

// Common Config
export const AIPT_WEB_TOKEN = "AIPT_WEB_TIMEKEEPING_TOKEN";
export const SPINNING_SIZE = "large";
export const BTN_SIZE_TABLE = "small";

export const TYPE_KEEPING = {
  0: "Công tác",
  // 1: "Nghỉ phép",
  // 2: "Việc riêng",
};

