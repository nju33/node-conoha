'use strict';
const request = require('request');
const meow = require('meow');
const cli = meow(
  `
  Usage
    $ conoha <input>

  Commands
    ready

    tokens
    servers
    add server
    remove server

  Options
    -h --help Show help
    -c --config
    -g --get
    -i --inquire

  Examples
    $ conoha items
    ...
  `
);
const API = require('./api');
global.api = {};

let USER = null;
let ENDPOINT = null;
try {
  USER = require(`${process.env.HOME}/.conoha/user`);
  ENDPOINT = require(`${process.env.HOME}/.conoha/endpoint`);
} catch (e) {
  console.error(e);
}

const identity = new API(ENDPOINT.identity);
identity.routes = {tokens: identity.process('tokens', {
  auth: {passwordCredentials: USER}
}, {
  method: 'POST'
})};

const compute = new API(ENDPOINT.compute);
compute.routes = {flavors: compute.process('flavors', {}, {
  headers: {'X-Auth-Token': 'f57092f79002453f8dfe6c9a520d334a'}
})};
compute.routes = {servers: compute.process('servers', {}, {
  headers: {'X-Auth-Token': 'f57092f79002453f8dfe6c9a520d334a'}
})};
compute.routes = {serversDetail: compute.process('servers/detail', {}, {
  headers: {'X-Auth-Token': 'f57092f79002453f8dfe6c9a520d334a'}
})};
compute.routes = {images: compute.process('images', {}, {
  headers: {'X-Auth-Token': 'f57092f79002453f8dfe6c9a520d334a'}
})};
compute.routes = {isoImages: compute.process('iso-images', {}, {
  headers: {'X-Auth-Token': 'f57092f79002453f8dfe6c9a520d334a'}
})};

module.exports = () => {
  try {
    const command = API.alias[cli.input[0]];
    if (command) {
      api[command]();
    } else {
      console.log(cli.help);
    }
  } catch (err) {
    console.log(err);
  }
}
