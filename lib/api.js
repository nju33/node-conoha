'use strict';
const url = require('url');
const request = require('request');

module.exports = class API {
  constructor(api) {
    this.api = api;
    this._routes = {};
  }

  set routes(route) {
    Object.assign(this._routes, route);
    Object.keys(route)
      .forEach(route => {
        Object.assign(global.api, {[route]: this});
      });
  }

  get(route, auth) {
    try {
      request
        .get(`${this.api}/${this._routes[route]}`, {
          auth,
          // headers: {
            // 'content-type': 'application/json'
          // }
        })
        .on('error', (err) => {
          console.log(err);
        })
        .on('response', (res) => {
          console.log(res.headers);
          res.on('data', (data) => {
            console.log(data.toString());
          });
          // console.log(body);
        });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  post(route, data) {
    console.log(JSON.stringify(data));
    try {
      request.post(`${this.api}/${this._routes[route]}`, {
        form: JSON.stringify(data),
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // json: true
      }, (err, res, body) => {
        // console.log(err);
        // console.log(res);
        console.log(body);
      });
    } catch (err) {
      console.log(err);
    }
  }
};
