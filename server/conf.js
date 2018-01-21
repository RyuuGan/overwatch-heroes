'use strict';

const path = require('path');

class Conf {

  constructor() {
    this.root = process.cwd();

  }

  get port() {
    return process.env.PORT || 3001;
  }

  get host() {
    return process.env.HOST || '127.0.0.1:3001';
  }

  get clientHost() {
    return process.env.CLIENT_HOST || '127.0.0.1:3000'
  }

  get secured() {
    return process.env.SECURED === 'true';
  }

  get workers() {
    return 1;
  }

  get origin() {
    return '//' + this.host;
  }

  get clientOrigin() {
    return this.protocol + '://' + this.clientHost;
  }

  get protocol() {
    return this.secured ? 'https' : 'http';
  }

  get mongoUrl() {
    return process.env.MONGODB_URI || 'mongodb://127.0.0.1/overwatchHeroes';
  }

  path(relPath) {
    return path.join(this.root, relPath);
  }

}

module.exports = new Conf();
