import { PLAYER_LOGIN, RESULTS_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function player(state = initialState, action) {
  switch (action.type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: action.payload.name,
    };
  case RESULTS_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default player;
