import { GET_TEAM, TEAM_LOADING } from "../actions/types";

const intitialState = {
  user: null,
  loading: false,
};

export default function (state = intitialState, action) {
  switch (action.type) {
    case TEAM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TEAM:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
