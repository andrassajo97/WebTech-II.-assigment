import axios from "axios";

import { GET_ERRORS } from "./types";

export const addPlayer = (playerData, history) => (dispatch) => {
  axios
    .post("/api/player/add", playerData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
