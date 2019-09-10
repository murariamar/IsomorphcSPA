import fetch from 'isomorphic-fetch';
import url from 'url';
import {
  BEGIN_FETCH_RESOURCES,
  RESOURCE_RECEIVED,
  ERROR_FETCHING_RESOURCES
} from './actions';

const resourceEndpoint = '/resource';
const buildFetchUrl = resources =>
  url.format({ path: resourceEndpoint, query: buildQueryString(resources) });

const buildQueryString = resources =>
  resources.reduce((acc, resource) => {
    acc[resource] = resource;
    return acc;
  }, {});

const beginFetch = () => ({ type: BEGIN_FETCH_RESOURCES });
const dataReceived = data => ({ type: RESOURCE_RECEIVED, data });

const fetchData = endpoint =>
  fetch(endpoint, {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const fetchResource = resource => {
  return (dispatch, getState) => {
    const endpoint = buildFetchUrl(resource);
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
