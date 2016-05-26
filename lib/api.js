'use strict';
const url = require('url');
const get = require('lodash.get');
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

    return function (path, info) {
      if (typeof info === 'undefined') {
        info = true;
      }

      return new Promise((resolve, reject) => {
        request(opts, (err, res, body) => {
          if (err) {
            return reject(err);
          }

          let result = null;
          try {
            result = path ? get(JSON.parse(body), path) : JSON.parse(body);
          } catch (err) {
            return reject(err);
          }

          if (info) {
            console.log(JSON.stringify(result, null, 2));
          }
          resolve(result);
        });
      });
    }
  }
};
