'use strict';

const $ = require('./index')
  , Hero = require('../../model/hero');

const PAGE_DEFAULT = 0
  , PER_PAGE_DEFAULT = 5
  , PER_PAGE_MAX = 15;

$.get('/heroes', function (req, res, next) {
  let page, perPage;
  page = parseInt(req.query.page);
  if (isNaN(page)) {
    page = PAGE_DEFAULT;
  }

  perPage = parseInt(req.query.perPage);
  if (isNaN(perPage)) {
    perPage = PER_PAGE_DEFAULT;
  }

  perPage = Math.min(perPage, PER_PAGE_MAX);

  Hero.paginate({
    page: page,
    limit: perPage,
    sort: {
      'attributes.name': 1
    }
  }).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    res.apiSuccess(result);
  });

});
