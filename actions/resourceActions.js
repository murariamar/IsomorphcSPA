import fetch from 'isomorphic-fetch';
import url from 'url';
import {
  BEGIN_FETCH_RESOURCES,
  RESOURCE_RECEIVED,
  ERROR_FETCHING_RESOURCES
} from './actions';

const resourceEndpoint = '/resource';
const buildFetchUrl = (resources, args) =>
  url.format({
    pathname: resourceEndpoint,
    query: buildQueryString(resources, args)
  });

const buildQueryString = (resources, args) => ({
  ...args,
  resource: resources.join(',')
});

const beginFetch = () => ({ type: BEGIN_FETCH_RESOURCES });
const dataReceived = data => ({ type: RESOURCE_RECEIVED, data });

const fetchData = endpoint =>
  fetch(endpoint, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

export const fetchResource = (resource, args) => {
  return (dispatch, getState) => {
    const endpoint = buildFetchUrl(resource, args);
    dispatch(beginFetch());
    fetchData(endpoint)
      .then(res => res.json())
      .then(data => {
        dispatch(dataReceived(data));
      })
      .catch(ex => {
        dispatch({ type: ERROR_FETCHING_RESOURCES });
      });
  };
};
