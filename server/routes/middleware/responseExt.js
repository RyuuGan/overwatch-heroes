'use strict';

/**
 * Middleware that adds some helper functions to request and response.
 */
module.exports = function (req, res, next) {

  /**
   * Sends success response to client
   *
   * @param data -- data that will be sent to client as a `results`
   */
  res.apiSuccess = function (data) {
    res.json({
      error: false,
      results: data
    });
  };

  /**
   * Sends error response to client
   * @param errorCode -- error code
   * @param errorMessage -- error description
   * @param [data] -- optional data that will be sent to client as a `results`.
   */
  res.apiFailed = function (errorCode, errorMessage, data) {
    let response = {
      error: true,
      errorCode: errorCode,
      errorMessage: errorMessage
    };
    if (data) {
      response.results = data;
    }
    res.json(response);
  };

  res.apiMissing = function (missingFields) {
    res.apiFailed(
      'BAD_REQUEST',
      'Not all required fields are filled. See results for more details',
      missingFields
    );
  };

  next();
};
