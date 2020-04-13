import axios from "axios";

import { GET_USER, USER_LOADING, CLEAR_CURRENT_USER } from "./types";

export const getCurrentUser = () => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .get("/api/user/current")
    .then((res) =>
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER,
        payload: {},
      })
    );
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
