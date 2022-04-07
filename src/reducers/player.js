import { PLAYER_LOGIN } from '../actions';

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
  default:
    return state;
  }
}

export default player;
