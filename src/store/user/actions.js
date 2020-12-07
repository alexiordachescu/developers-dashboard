import Axios from "axios";
import { apiUrl } from "../../config/constants";

export const loginSuccess = (response) => ({
  type: "LOGIN_SUCCESS",
  payload: response,
});
export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await Axios.post(`${apiUrl}/login`, { email, password });
      console.log(response.data);
      dispatch(loginSuccess(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
