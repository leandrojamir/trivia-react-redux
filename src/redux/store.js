import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  composeWithDevTools(applyMiddleware(thunk), rootReducer),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
