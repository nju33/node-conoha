'use strict';
const fs = require('fs');
const request = require('request');
const cli = require('./cli');
const API = require('./api');
global.api = {};
const configPath = `${process.env.HOME}/.conoha/config`;
const dataPath = `${process.env.HOME}/.conoha/data.json`;

let USER = null;
let endpoint = null;
try {
  USER = require(configPath);
  endpoint = require('./endpoint')(USER.tenantId);
} catch (e) {
  console.error(e);
}

module.exports = () => {
  try {
    fs.accessSync(dataPath, fs.F_OK);
  } catch (err) {
    if (cli.input[0] !== 'ready') {
      console.log(
        `
        ${dataPath} doesn't exists.
        Please run \`conoha ready\`
        `
      );
      process.exit(1);
    }
  }
  const data = require(dataPath);
  const identity = new API(endpoint.identity);
  identity.routes = {tokens: identity.process('tokens', {
    auth: {passwordCredentials: USER}
  }, {
    method: 'POST'
  })};

  const compute = new API(endpoint.compute);
  compute.routes = {flavors: compute.process('flavors', {}, {
    headers: {'X-Auth-Token': data.accessTokenId}
  })};
  compute.routes = {servers: compute.process('servers', {}, {
    headers: {'X-Auth-Token': data.accessTokenId}
  })};
  compute.routes = {serversDetail: compute.process('servers/detail', {}, {
    headers: {'X-Auth-Token': data.accessTokenId}
  })};
  compute.routes = {images: compute.process('images', {}, {
    headers: {'X-Auth-Token': data.accessTokenId}
  })};
  compute.routes = {isoImages: compute.process('iso-images', {}, {
    headers: {'X-Auth-Token': data.accessTokenId}
  })};

  try {
    switch (cli.input[0]) {
      case 'ready':
        Promise.all([
          api.tokens('access.token.id', false)
        ]).then(result => {
          const data = {
            accessTokenId: result[0]
          };
          fs.writeFileSync(dataPath, JSON.stringify(data));
        });
        break;
      default:
        const command = API.alias[cli.input[0]];
        if (command) {
          api[command]();
        } else {
          console.log(cli.help);
        }
    }
  } catch (err) {
    console.log(err);
  }
}
