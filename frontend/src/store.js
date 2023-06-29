import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  createEventReducer,
  eventReducer,
  updateEventReducer,
  deleteEventReducer,
  eventUserReducer,
  enrollEvents,
} from "./reducers/eventReducers";
import {
  organizerLoginReducer,
  organizerRegisterReducer,
} from "./reducers/organizerReducers";

const reducers = combineReducers({
  //all of the reducers will go here
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  eventList: eventReducer,
  eventCreate: createEventReducer,
  eventUpdate: updateEventReducer,
  eventDelete: deleteEventReducer,
  organizerRegister: organizerRegisterReducer,
  organizerLogin: organizerLoginReducer,
  eventUserList: eventUserReducer,
  eventEnroll: enrollEvents,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const organizerInfoFromStorage = localStorage.getItem("organizerInfo")
  ? JSON.parse(localStorage.getItem("organizerInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  organizerLogin: { organizerInfo: organizerInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
