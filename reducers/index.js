import {
  BEGIN_FETCH_RESOURCES,
  RESOURCE_RECEIVED,
  ERROR_FETCHING_RESOURCES
} from '../actions/actions';

const defaultState = {
  isLoading: true,
  repos: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case BEGIN_FETCH_RESOURCES:
      return { ...state, isLoading: true, repos: undefined };
    case RESOURCE_RECEIVED:
      return { ...state, repos: action.data, isLoading: false };
    case ERROR_FETCHING_RESOURCES:
      return { ...state, isLoading: false, error: true };
  }
  return state;
};
