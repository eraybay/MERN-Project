import {
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
} from "../constants/eventConstants";
import axios from "axios";

export const createEvent =
  (eventName, description, ageRange, deadline, category) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + userInfo.token,
        },
      };
      const { data } = await axios.post(
        "/api/events/create",
        { eventName, description, ageRange, deadline, category },
        config
      );
      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: "Your Event has successfully created",
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: EVENT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const listEvents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    //just like postman api requests we are sending a token request
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const { data } = await axios.get("api/events", config);

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: EVENT_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateEvent =
  (id, eventName, description, ageRange, deadline, category) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EVENT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/events/" + id,
        { eventName, description, ageRange, deadline, category },
        config
      );
      dispatch({
        type: EVENT_UPDATE_SUCCESS,
        updatedMessage: "Your Event is succesfully updated",
        payload: data,
      });
    } catch (error) {
      console.log(error.response);

      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: EVENT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: EVENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    //just like postman api requests we are sending a token request
    const config = {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    };

    const { data } = await axios.delete("/api/events/" + id, config);

    dispatch({
      type: EVENT_DELETE_SUCCESS,
      payload: data,
      message: "Event has been successfully deleted",
    });
  } catch (error) {
    console.log(error.response);

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: message,
    });
  }
};
