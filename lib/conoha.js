'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const helper = require('./helper');
const cli = require('./cli');
const API = require('./api');
global.api = {};
const configPath = `${process.env.HOME}/.conoha/config.json`;
const dataPath = `${process.env.HOME}/.conoha/data.json`;

const USER = helper.readFile(configPath,
  `
  ${configPath} doesn't exists.
  Please create \`~/.conoha/config.json\`
  ref: http://foo.com
  `);
const DATA = helper.readFile(dataPath,
  `
  ${dataPath} doesn't exists.
  Please run \`conoha ready\`
  ref: http://foo.com
  `);
if (DATA) {
  API.headers = {'X-Auth-Token': DATA.accessTokenId};
}

let ENDPOINT = null;
try {
  ENDPOINT = require('./endpoint')(USER.tenantId);
} catch (e) {
  console.log(
  `
    ${tenantId} property doesn't exists in \`~/.conoha/config.json\`
    ref: http://foo.com
  `);
}

module.exports = {
  USER,
  ENDPOINT,
  DATA,
  exec
};

function exec() {
  require('./api/identity');
  require('./api/compute');
  require('./api/object-storage');

  try {
    switch (cli.input[0]) {
      case 'ready':
        Promise.all([
          api.tokens.config({
            filter: {
              dirname: 'body.access.token',
              props: 'id'
            },
            print: false
          }).exec()
        ]).then(result => {
          const data = {
            accessTokenId: result[0].id
          };
          fs.writeFileSync(dataPath, JSON.stringify(data));
          console.log(
`
Created \`~/.conoha/data.json\`

${JSON.stringify(data, null, 2)}
`);
        });
        break;
      default:
        const command = API.alias[cli.input[0]];
        if (command) {
          api[command].exec();
        } else {
          console.log(cli.help);
        }
    }
  } catch (err) {
    console.log(err);
  }
}
