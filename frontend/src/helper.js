import { apiCallAuthorised, apiCallBodyAuthorised, apiCallBody } from './api';

/**
 * Helper function checks if inputted strings are empty
 * @param {String} strings
 * @returns {Boolean}
 */
export const checkStringInput = (strings) => {
  for (const string of strings) {
    if (string === '') {
      return false;
    }
  }
  return true;
}

/**
 * Helper function returns all presentations in user store
 * @returns presentations[]
 */
export const getPresentations = async () => {
  const token = getToken();
  if (token === null) {
    throw new Error('No valid token. Please log out.')
  }

  try {
    const storeData = await apiCallAuthorised(token, 'GET', '/store', undefined);
    const presentations = storeData.store.presentations;
    return presentations;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Helper function returns specific presentation from presentationId
 * @param {UUID} presentationId
 * @returns presentation{}
 */
export const getFoundPresentation = async (presentationId) => {
  const token = getToken();
  if (token === null) {
    throw new Error('No valid token. Please log out.')
  }

  try {
    const storeData = await apiCallAuthorised(token, 'GET', '/store', undefined);
    const presentations = storeData.store.presentations;
    const foundPresentation = presentations.find((p) => p.id === presentationId);
    if (!foundPresentation) {
      throw new Error('No presentation found.');
    }
    return foundPresentation;
  } catch (err) {
    throw new Error(err);
  }
}

export const getToken = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser === null) {
    throw new Error('No valid token. Please log out.');
  }

  return JSON.parse(currentUser).token;
};

export const getEmail = () => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser === null) {
    throw new Error('No valid email. Please log out.');
  }

  return JSON.parse(currentUser).email;
};

export const submitRegister = async (userEmail, userPassword, confirmPassword, userName) => {
  if (!checkStringInput([userEmail, userPassword, confirmPassword, userName])) {
    throw new Error('One or more fields are empty.');
  }

  if (confirmPassword !== userPassword) {
    throw new Error('Confirmed password does not match.');
  }

  const postResult = await apiCallBody('POST', '/admin/auth/register', {
    email: userEmail,
    password: userPassword,
    name: userName
  });

  if (postResult.token) {
    const userData = JSON.stringify({
      token: postResult.token,
      email: userEmail
    });
    localStorage.setItem('currentUser', userData);

    // initialise user's presentations array
    apiCallBodyAuthorised(postResult.token, 'PUT', '/store', {
      store: {
        presentations: []
      }
    });
  } else if (postResult.error) {
    throw new Error(postResult.error);
  }
}

export const clickNewPresentation = () => {
  return true;
}

export const logout = () => {
  localStorage.removeItem('currentUser');
}
