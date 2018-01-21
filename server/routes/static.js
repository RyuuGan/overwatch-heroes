'use strict';

const express = require('express')
  , conf = require('../conf');

let $ = require('./index');

if (process.env.SERVE_STATIC) {

  $.all(/^(?!\/(api|public|i18n)).*$/, function (req, res, next) {
    req.url = '/';
    next();
  });

  $.use(express.static(conf.path('../client/dist')));

}
