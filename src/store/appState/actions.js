import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
export const APP_LOADING = "APP_LOADING";
export const APP_DONE_LOADING = "APP_DONE_LOADING";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const appLoading = () => ({ type: APP_LOADING });
export const appDoneLoading = () => ({ type: APP_DONE_LOADING });
export const clearAppMessage = () => ({ type: CLEAR_MESSAGE });
export const setAppMessage = (type, text) => ({
  // type should be "success" | "error"
  type: SET_MESSAGE,
  payload: { type, text },
});

export const showMessageWithTimeout = (type, text, timeOutMilliSeconds) => {
  return (dispatch) => {
    dispatch(setAppMessage(type, text));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearAppMessage()), timeout);
  };
};
