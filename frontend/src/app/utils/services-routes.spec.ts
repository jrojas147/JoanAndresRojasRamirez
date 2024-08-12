import { buildRoute, ServicesRoutes } from '../utils/services-routes';
import { Config } from '@config/index';

// Mock Config
// const { baseUrl } = Config.api;
const baseUrl = 'http://localhost:3002';

// Tests for ServicesRoutes
describe('ServicesRoutes', () => {
  it('should have correct route configuration', () => {
    expect(ServicesRoutes.getAccounts).toEqual({
      needsAuth: true,
      url: `${baseUrl}/bp/products`,
    });
    expect(ServicesRoutes.getAccountsById).toEqual({
      needsAuth: true,
      url: `${baseUrl}/bp/products/:idAccount`,
    });
    expect(ServicesRoutes.postAccounts).toEqual({
      needsAuth: true,
      url: `${baseUrl}/bp/products`,
    });
    expect(ServicesRoutes.putAccounts).toEqual({
      needsAuth: true,
      url: `${baseUrl}/bp/products/:idAccount`,
    });
    expect(ServicesRoutes.deleteAccounts).toEqual({
      needsAuth: true,
      url: `${baseUrl}/bp/products/:idAccount`,
    });
    expect(ServicesRoutes.verificationAccounts).toEqual({
      needsAuth: true,
      url: `${baseUrl}/bp/products/verification/:idAccount`,
    });
  });
});

// Tests for buildRoute
describe('buildRoute', () => {
  it('should replace path parameters correctly', () => {
    const route = {
      needsAuth: true,
      url: `${baseUrl}/bp/products/:idAccount`,
    };
    const params = { idAccount: '123' };

    const result = buildRoute(route, params);

    expect(result.url).toBe(`${baseUrl}/bp/products/123`);
  });

  it('should handle multiple parameters correctly', () => {
    const route = {
      needsAuth: true,
      url: `${baseUrl}/bp/products/:idAccount/details/:detailId`,
    };
    const params = { idAccount: '123', detailId: '456' };

    const result = buildRoute(route, params);

    expect(result.url).toBe(`${baseUrl}/bp/products/123/details/456`);
  });

  it('should encode URI components in parameters', () => {
    const route = {
      needsAuth: true,
      url: `${baseUrl}/bp/products/:idAccount`,
    };
    const params = { idAccount: '123@#' }; // Special characters

    const result = buildRoute(route, params);

    expect(result.url).toBe(`${baseUrl}/bp/products/123%40%23`);
  });

  it('should not modify URL if no parameters are provided', () => {
    const route = {
      needsAuth: true,
      url: `${baseUrl}/bp/products`,
    };
    const params = {};

    const result = buildRoute(route, params);

    expect(result.url).toBe(`${baseUrl}/bp/products`);
  });

  it('should handle empty URL', () => {
    const route = {
      needsAuth: true,
      url: '',
    };
    const params = { idAccount: '123' };

    const result = buildRoute(route, params);

    expect(result.url).toBe('');
  });
});