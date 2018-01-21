import { IRestActionInner, IRestResponse, Rest, RestHandler } from 'rest-core';

export class RestResource extends Rest {

  constructor(restHandler: RestHandler) {
    super(restHandler)
  }

  $handleSuccessResponse(_options: IRestActionInner, resp: IRestResponse): any {

    let body = resp.body;

    if (!body) {
      return;
    }

    if (body.error) {

      throw body;
    }

    return body.results;
  }

}
