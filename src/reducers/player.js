import { PLAYER_LOGIN, RESULTS_SCORE } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
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
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
