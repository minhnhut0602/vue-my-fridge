import axios from 'axios';
import logger from '../utils/logger';

function parseJSON (response) {
  return response.data;
}

function checkStatus (response) {
  logger.debug(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.response.status);
  error.response = response.response.data;
  throw error;
}

function fetchWithTimeout (fetchPromise, ms) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject(new Error('Time out')), ms);
    fetchPromise
      .then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err.response || err);
        }
      );
  });
}

export function call (url, options, dispatch) {
  return fetchWithTimeout(axios(url, options), 20000, dispatch)
    .then(checkStatus)
    .then(parseJSON);
}
