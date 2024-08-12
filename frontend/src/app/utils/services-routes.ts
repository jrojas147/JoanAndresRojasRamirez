import { Config } from '@config/index';

const { baseUrl } = Config.api;

const ServicesRoutes = {
  getAccounts: {
    needsAuth: true,
    url: baseUrl + '/bp/products',
  },
  getAccountsById: {
    needsAuth: true,
    url: baseUrl + '/bp/products/:idAccount',
  },
  postAccounts: {
    needsAuth: true,
    url: baseUrl + '/bp/products',
  },
  putAccounts: {
    needsAuth: true,
    url: baseUrl + '/bp/products/:idAccount',
  },
  deleteAccounts: {
    needsAuth: true,
    url: baseUrl + '/bp/products/:idAccount',
  },
  verificationAccounts: {
    needsAuth: true,
    url: baseUrl + '/bp/products/verification/:idAccount',
  }
};

const buildRoute = (path: any, params: any) => {
  const route = Object.assign({}, path);

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      route.url = route.url.replace(
        new RegExp(':' + key, 'g'),
        encodeURIComponent(params[key])
      );
    }
  }

  return route;
};

export { buildRoute, ServicesRoutes };
