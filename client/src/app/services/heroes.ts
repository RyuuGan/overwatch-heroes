import { Injectable } from '@angular/core';
import api from '../utils/api';
import { RestResource } from '../shared/restResource';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { IList } from '../model/list';
import {
  IRestMethod, RestAction, RestHandler, RestParams
} from 'rest-core';
import { Hero } from '../model/hero';

interface IQueryInput {
  page?: number;
  perPage?: number;
}

@Injectable()
@RestParams({
  url: api.makeUrl('/heroes')
})
export class HeroesService extends RestResource {

  @RestAction({
    path: '/'
  })
  list: IRestMethod<IQueryInput, IList<Hero>>;

  constructor(restHandler: RestHandler) {
    super(restHandler);
  }

}

@Injectable()
export class HeroesResolver implements Resolve<IList<Hero>> {

  constructor(private service: HeroesService) {
  }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<IList<Hero>> {
    return this.service.list({ page: 0, perPage: 5 });
  }
}
