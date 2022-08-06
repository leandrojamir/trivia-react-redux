import md5 from 'crypto-js/md5';

export const TOKEN = 'TOKEN';
export const NAMEGRAVATAR = 'nameGravatar';

const requestToken = (payload) => ({
  type: TOKEN,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  dispatch(requestToken(data.token));
  localStorage.setItem('token', data.token);
};

export const saveNameGravatar = (payload) => ({
  type: NAMEGRAVATAR,
  name: payload.name,
  gravatarEmail: md5(payload.email).toString(),
});
