
export const hasLogged = (store) => !!store.auth.token;
export const hasntLogged = (store) => !store.auth.token;