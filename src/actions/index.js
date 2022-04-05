export const USER_LOGIN = 'USER_LOGIN';
export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_LOGIN = 'TOKEN_LOGIN';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const playerLogin = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const tokenLogin = (payload) => ({
  type: TOKEN_LOGIN,
  payload,
});

export function fetchTriviaToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const resultado = await response.json();
    dispatch(tokenLogin(resultado.token));
    console.log(resultado.token);
  };
}
