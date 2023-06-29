import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_MESSAGE,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";
import axios from "axios";

export const register =
  (
    name,
    email,
    password,
    adress_line_1,
    adress_line_2,
    district,
    province,
    description,
    confirmpassword,
    age
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/register",
        {
          name,
          email,
          password,
          adress_line_1,
          adress_line_2,
          district,
          province,
          description,
          confirmpassword,
          age,
        },
        config
      );
      //using stringfy because json cannot hold object data to hold the data in localstrorage
      //dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({
        type: USER_REGISTER_MESSAGE,
        payload: "User Succesfully Created",
      });

      const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
      };
      if (password !== confirmpassword) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: "Passwords do not match",
        });
      }
      if (!isValidEmail(email)) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: "Email Format is Invalid",
        });
      }
      //You can use the history.push() method to navigate to a new location. The new location will override the current location in the history stack, similar to how a call to window.location behaves in a web browser.
      //history.push("/");
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
