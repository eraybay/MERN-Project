import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );
    //using stringfy because json cannot hold object data
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
export const update =
  (
    name,
    email,
    district,
    province,
    adress_line_1,
    adress_line_2,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/users/profile",
        {
          name,
          email,
          district,
          province,
          adress_line_1,
          adress_line_2,
          description,
        },
        config
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error.response);

      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      });
    }
  };
