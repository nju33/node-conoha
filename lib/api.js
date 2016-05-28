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

  process(route, opts, form) {
    if (typeof opts === 'undefined') {
      opts = {};
    }
    if (typeof form === 'undefined') {
      form = {};
    }

    return (required) => {
      route = route.replace(/:([^\/]+)/g, matched => {
        return required[matched.substr(1)];
      });
      const url = `${this.api}/${route}`;
      Object.assign(opts, {url});

      if (required.form) {
        Object.assign(opts, ((form) => {
          return {form: JSON.stringify(form)};
        })(Object.assign({}, form,  required.form)));
      } else {
        Object.assign(opts, {form: JSON.stringify(form)});
      }
      return new Promise((resolve, reject) => {
        request(Object.assign({}, {headers}, opts), (err, res, body) => {
          if (err) {
            return reject(err);
          }
          res.body = (body && typeof body === 'object')
                     ? JSON.parse(body)
                     : body;
          resolve(res);
        });
      });
    }
  }
};
