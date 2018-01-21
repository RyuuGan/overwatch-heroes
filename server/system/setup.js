'use strict';

const conf = require('../conf')
  , heroes = require('./heroes')
  , Hero = require('../model/hero')
  , mongoose = require('mongoose')
  , log = require('debug')('app:log')
  , trace = require('debug')('app:trace')
  , async = require('async');

module.exports.master = function (cb) {
  connectToMongo(function () {
    async.series([
      createHeroes
    ], cb);
  });
};

function connectToMongo(cb) {
  mongoose.Promise = Promise;
  mongoose.connect(conf.mongoUrl, { }, function (err) {
    if (err) {
      log('Failed connection to mongo. Reason:');
      log(err.message);
      log('Trying reconnect in 1 sec');
      setTimeout(function () {
        connectToMongo(cb);
      }, 1000);
      return;
    }
    cb();
  });
}

function createHeroes(cb) {
  async.each(heroes, createHero, cb);
}

function createHero(_hero, cb) {
  Hero.findOne({
    _id: _hero.id
  }).exec(function (ignoredErr, exists) {
    if (exists) return cb();
    log('Create hero: %s', _hero.attributes.name);
    let hero = new Hero(_hero);
    hero._id = _hero.id;
    hero.save(function (err) {
      if (err) {
        trace(`Unable to create hero ${_hero.attributes.name}`);
        trace(err);
      }
      cb();
    });
  });
}
