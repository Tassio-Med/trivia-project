import { USER_LOGIN, USER_HASH } from '../actions';

const initialState = {
  email: '',
  hash: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload.email,
    };
  case USER_HASH:
    return {
      ...state,
      hash: action.payload,
    };
  default:
    return state;
  }
}

export default user;
