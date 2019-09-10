import {
  BEGIN_FETCH_RESOURCES,
  RESOURCE_RECEIVED,
  ERROR_FETCHING_RESOURCES
} from '../actions/actions';

export default (state, action) => {
  switch (action.type) {
    case BEGIN_FETCH_RESOURCES:
      return { ...state, isLoading: true };
    case RESOURCE_RECEIVED:
      return { ...state, data: action.data, isLoading: false };
    case ERROR_FETCHING_RESOURCES:
      return { ...state, isLoading: false, error: true };
  }
  return state;
};
