import axios from "axios";

import { GET_ERRORS } from "./types";

export const addTeam = (teamData, history) => (dispatch) => {
  axios
    .post("/api/team/add", teamData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
