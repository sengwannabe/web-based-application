import port from './config.json';

/**
 * Helper function makes body request to backend
 * @param {String} inputMethod
 * @param {String} path
 * @param {Object} requestBody
 * @returns {Promise<any>}
 */
export const apiCallBody = async (inputMethod, path, requestBody) => {
  try {
    const data = await fetch(`http://localhost:${port.BACKEND_PORT}` + path, {
      method: inputMethod,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })
    return data.json();
  } catch (err) {
    return err;
  }
};

/**
 * Helper function makes authorised body request to backend,
 * requestBody input is {} if no body is required
 * @param {String} token
 * @param {String} inputMethod
 * @param {String} path
 * @param {Object} requestBody
 * @returns {Promise<any>}
 */
export const apiCallBodyAuthorised = async (token, inputMethod, path, requestBody) => {
  try {
    const data = await fetch(`http://localhost:${port.BACKEND_PORT}` + path, {
      method: inputMethod,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    })
    return data.json();
  } catch (err) {
    return err;
  }
};

/**
 * Helper function makes authorised call to backend,
 * @param {String} token
 * @param {String} inputMethod
 * @param {String} path
 * @returns {Promise<any>}
 */
export const apiCallAuthorised = async (token, inputMethod, path) => {
  try {
    const data = await fetch(`http://localhost:${port.BACKEND_PORT}` + path, {
      method: inputMethod,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return data.json();
  } catch (err) {
    return err;
  }
};
