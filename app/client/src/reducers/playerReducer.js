import { PLAYER_LOADING } from "../actions/types";

const intitialState = {
  player: null,
  loading: false,
};

export default function (state = intitialState, action) {
  switch (action.type) {
    case PLAYER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
