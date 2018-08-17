import localStorageKeys from '@/utils/local-storage-keys';

const defaultMethod = 'GET';
/**
 * Build options
 */
export function buildRequestOptions (method = defaultMethod, body, customHeaders) {
  const token = localStorageKeys.getItem(localStorageKeys.TOKEN);
  return {
    method,
    headers: {
      ...{
        'Content-Type': 'application/json',
        Authorization: token
      },
      ...customHeaders
    },
    data: body,
    params: body && body.params ? body.params : null
  };
}

/**
 * Build api server
 */
export function buildApiServer () {
  return process.env.AMP_API_SERVER_HOST;
}

/**
 * Build endpoints
 */
export function getEndPoints () {
  return {
    users: {
      login: `${buildApiServer()}/api/login`
    }
  };
}
