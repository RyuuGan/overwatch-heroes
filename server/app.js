'use strict';

const express = require('express')
  , http = require('http')
  , mongoose = require('mongoose')
  , conf = require('./conf')
  , debug = require('debug')('app')
  , cors = require('cors')
  , log = require('debug')('app:log');


const app = module.exports = exports = express();

app.disable('x-powered-by');

app.set('trust proxy', true);

app.use(cors({
  origin: `${conf.clientOrigin}`,
  credentials: true
}));

app.use(require('./routes'));

app.run = function (cb) {
  if (!cb)
    cb = function () {};
  app.init(function (err) {
    if (err) return cb(err);
    const server = http.createServer(app);
    process.on('SIGINT', app.shutdown);
    process.on('SIGTERM', app.shutdown);
    server.listen(conf.port, function () {
      log('Listening on %s.', conf.port);
      log('Type %s in browser omnibox to begin.', conf.origin);
      if (typeof cb === 'function')
        cb();
    });
    server.on('error', function (err) {
      cb(err);
    });
  });
};

app.init = function (cb) {
  mongoose.Promise = Promise;
  log('Starting app');
  app.connectToMongo(function () {
    log('Connected to MongoDB @ %s', conf.mongoUrl);
    cb();
  });
};

app.connectToMongo = function (cb) {
  mongoose.connect(conf.mongoUrl, { }, function (err) {
    if (err) {
      log('Failed connection to mongo. Reason:');
      log(err.message);
      log('Trying reconnect in 1 sec');
      setTimeout(function () {
        app.connectToMongo(cb);
      }, 1000);
      return;
    }
    cb();
  });
};

app.shutdown = function () {
  mongoose.disconnect(function (err) {
    if (err)
      throw err;
    debug('MongoDB connection closed.');
    process.exit(0);
  });
};
