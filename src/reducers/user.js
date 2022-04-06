import { USER_LOGIN } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return action.payload;
  default:
    return state;
  }
}

export default user;
