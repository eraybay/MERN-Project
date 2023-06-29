import {
  ORGANIZER_REGISTER_SUCCESS,
  ORGANIZER_REGISTER_FAIL,
  ORGANIZER_REGISTER_REQUEST,
  ORGANIZER_REGISTER_MESSAGE,
  ORGANIZER_LOGIN_SUCCESS,
  ORGANIZER_LOGIN_FAIL,
  ORGANIZER_LOGIN_REQUEST,
  ORGANIZER_LOGOUT,
} from "../constants/organizerConstants";
import axios from "axios";

export const register =
  (name, email, password, confirmpassword) => async (dispatch) => {
    try {
      dispatch({ type: ORGANIZER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/organizer/register",
        {
          name,
          email,
          password,
          confirmpassword,
        },

        config
      );

      dispatch({ type: ORGANIZER_REGISTER_SUCCESS, payload: data });
      dispatch({
        type: ORGANIZER_REGISTER_MESSAGE,
        payload: "Succesfully registered your Organizator account",
      });
    } catch (error) {
      dispatch({
        type: ORGANIZER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginOrganizer = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ORGANIZER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/organizer/login",
      {
        email,
        password,
      },
      config
    );
    //using stringfy because json cannot hold object data
    dispatch({ type: ORGANIZER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("organizerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORGANIZER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logoutOrganizer = () => async (dispatch) => {
  localStorage.removeItem("organizerInfo");
  dispatch({ type: ORGANIZER_LOGOUT });
};
