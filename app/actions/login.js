export const ACCEPT_CREDENTIALS = 'ACCEPT_CREDENTIALS';
export const RESET_CREDENTIALS = 'RESET_CREDENTIALS';
export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

export function signIn() {
  return {
    type: ACCEPT_CREDENTIALS,
  };
}

export function signOut() {
  return {
    type: RESET_CREDENTIALS,
  };
}

export function showError(errorText) {
  return {
    type: SHOW_ERROR,
    errorText,
  };
}

export function hideError() {
  return {
    type: HIDE_ERROR,
  };
}
