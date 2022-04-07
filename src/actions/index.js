export const USER_LOGIN = 'USER_LOGIN';
export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const TOKEN_LOGIN = 'TOKEN_LOGIN';
export const USER_HASH = 'USER_HASH';
export const GRAVATAR_PROFILE = 'GRAVATAR_PROFILE';

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

export const userHash = (payload) => ({
  type: USER_HASH,
  payload,
});

export const gravatarProfile = (payload) => ({
  type: GRAVATAR_PROFILE,
  payload,
});

export function fetchTriviaToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const resultado = await response.json();
    dispatch(tokenLogin(resultado.token));
  };
}

export async function fetchTriviaResetToken(token) {
  const response = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
  const resultado = await response.json();
  console.log(resultado);
}
