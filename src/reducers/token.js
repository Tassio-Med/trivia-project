import { TOKEN_LOGIN } from '../actions';

const initialState = {
  token: '',
};

function token(state = initialState, action) {
  switch (action.type) {
  case TOKEN_LOGIN:
    return action.payload;
  default:
    return state;
  }
}

export default token;
