import {
  ORGANIZER_LOGIN_FAIL,
  ORGANIZER_LOGIN_REQUEST,
  ORGANIZER_LOGIN_SUCCESS,
  ORGANIZER_LOGOUT,
  ORGANIZER_REGISTER_FAIL,
  ORGANIZER_REGISTER_MESSAGE,
  ORGANIZER_REGISTER_REQUEST,
  ORGANIZER_REGISTER_SUCCESS,
} from "../constants/organizerConstants";

export const organizerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ORGANIZER_REGISTER_REQUEST:
      return { loading: true };
    case ORGANIZER_REGISTER_SUCCESS:
      return { loading: false, oganizerInfo: action.payload };
    case ORGANIZER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case ORGANIZER_REGISTER_MESSAGE:
      return { loading: false, message: action.payload };
    default:
      return state;
  }
};
export const organizerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ORGANIZER_LOGIN_REQUEST:
      return { loading: true };
    case ORGANIZER_LOGIN_SUCCESS:
      return { loading: false, organizerInfo: action.payload };
    case ORGANIZER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ORGANIZER_LOGOUT:
      return {};
    default:
      return state;
  }
};
