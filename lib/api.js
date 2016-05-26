'use strict';
const url = require('url');
const request = require('request');
const defaultAlias = require('./default-alias');

module.exports = class API {
  static get alias() {
    return defaultAlias;
  }

  constructor(api) {
    this.api = api;
    this._routes = {};
  }

  set routes(route) {
    Object.assign(this._routes, route);
    Object.keys(route)
      .forEach(route => {
        Object.assign(global.api, {[route]: this._routes[route]});
      });
  }

  process(command, data, opts) {
    try {
      const url = `${this.api}/${command}`;
      const form = JSON.stringify(data);
      Object.assign(opts, {url}, {form});
    } catch (err) {
      console.log(err);
    }

    return function () {
      request(opts, (err, res, body) => {
        console.log(JSON.stringify(JSON.parse(body), null, 2));
      });
    }
  }
};
