import { TOKEN } from '../actions';

const initialState = {
  token: '',
  redirect: false,
};

const token = (state = initialState, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.payload,
      redirect: true,
    };
  default:
    return state;
  }
};

export default token;
