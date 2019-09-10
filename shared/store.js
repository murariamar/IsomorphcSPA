import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

const store = (initalState = {}) => {
  return createStore(reducer, initalState, applyMiddleware(thunk));
};

export default store;
