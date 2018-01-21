'use strict';

import conf from '../conf';
// import AuthService from '../services/auth.service';

/**
 * Helper for construction api URLs
 */
class ApiHelper {
  static secured = conf.secured;

  static makeUrl(endpoint: string, prefix = ''): string {
    const _endpoint = endpoint.replace(/^\//, '');
    const _prefix = prefix ? prefix.replace(/^\//, '') + '/' : '';
    return conf.apiOrigin + '/api/' + _prefix + _endpoint;
  }

}

export default ApiHelper;
