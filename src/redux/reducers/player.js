import { ASSERTIONS, NAMEGRAVATAR, SCORE } from '../actions';

const initialState = {
  name: 'Nome',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case NAMEGRAVATAR:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
