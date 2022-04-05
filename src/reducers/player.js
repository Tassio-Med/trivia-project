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
    return action.payload;
  default:
    return state;
  }
}

export default player;
