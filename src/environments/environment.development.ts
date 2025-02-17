// https://api.escuelajs.co/api/v1/auth/login

// https://api.escuelajs.co/ => host
// /api/v1/ => version
// /auth => resource (type)
// /login => resource identifier
// ?email=...&password=...&remember=... => query string

export const environment = {
  API_URL: 'https://api.escuelajs.co/api/v1',
  API_RESOURCES: {
    AUTH: '/auth',
    USERS: '/users',
    PRODUCTS: '/products'
  },
  LOCAL_STORAGE: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
  }
};
