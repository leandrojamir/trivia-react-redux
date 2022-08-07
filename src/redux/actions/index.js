import md5 from 'crypto-js/md5';

export const TOKEN = 'TOKEN';
export const LOGOUT = 'logout';
export const NAMEGRAVATAR = 'nameGravatar';
export const QUESTION = 'question';

const requestToken = (payload) => ({
  type: TOKEN,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});

const saveQuestions = (payload) => ({
  type: QUESTION,
  payload,
});

export const fetchQuestion = (token) => async (dispatch) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  dispatch(saveQuestions(data));
};

export const fetchToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  localStorage.setItem('token', data.token);
  dispatch(requestToken(data.token));
};

export const saveNameGravatar = (payload) => ({
  type: NAMEGRAVATAR,
  name: payload.name,
  gravatarEmail: md5(payload.email).toString(),
});
