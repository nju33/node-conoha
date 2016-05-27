'use strict';
const url = require('url');
const get = require('lodash.get');
const request = require('request');
const defaultAlias = require('./default-alias');
const headers = {
  'X-Auth-Token': null
};

module.exports = class API {
  static set headers(header) {
    Object.assign(headers, header);
  }

  static get alias() {
    return defaultAlias;
  }

  constructor(api) {
    this.api = api;
    this._routes = {};
  }

  set routes(route) {
    Object.assign(this._routes, route);
    for (const command in route) {
      Object.assign(global.api, {[command]: this._routes[command]});
    }
  }

  process(command, data, opts) {
    if (typeof data === 'undefined') {
      data = {};
    }
    if (typeof opts === 'undefined') {
      opts = {};
    }

    try {
      const url = `${this.api}/${command}`;
      const form = JSON.stringify(data);
      Object.assign(opts, {url}, {form});
    } catch (err) {
      console.log(err);
    }

    return function (property, info) {
      if (typeof info === 'undefined') {
        info = true;
      }

      return new Promise((resolve, reject) => {
        request(Object.assign({}, {headers}, opts), (err, res, body) => {
          if (err) {
            return reject(err);
          }

          let result = null;
          try {
            result = property
                     ? get(JSON.parse(body), property)
                     : body && JSON.parse(body);
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
