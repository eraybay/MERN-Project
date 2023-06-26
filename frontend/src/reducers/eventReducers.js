import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
} from "../constants/eventConstants";

export const eventReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return { loading: true };
    case EVENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_LIST_SUCCESS:
      return { loading: false, events: action.payload };
    default:
      return state;
  }
};

export const createEventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success: action.payload, created: true };
    default:
      return state;
  }
};
export const updateEventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_UPDATE_REQUEST:
      return { loading: true };
    case EVENT_UPDATE_FAIL:
      return { loading: false, error: action.payload, updated: false };
    case EVENT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: action.payload,
        updated: true,
      };
    default:
      return state;
  }
};
export const deleteEventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_DELETE_FAIL:
      return { loading: false, deleted: false, error: action.payload };
    case EVENT_DELETE_SUCCESS:
      return {
        loading: false,
        deleted: true,
        deletedMessage: action.message,
      };
    default:
      return state;
  }
};
