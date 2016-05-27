'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const cli = require('./cli');
const API = require('./api');
global.api = {};
const configPath = `${process.env.HOME}/.conoha/config.json`;
const dataPath = `${process.env.HOME}/.conoha/data.json`;

const USER = readFile(configPath,
  `
  ${configPath} doesn't exists.
  Please create \`~/.conoha/config.json\`
  ref: http://foo.com
  `);
const DATA = readFile(dataPath,
  `
  ${dataPath} doesn't exists.
  Please run \`conoha ready\`
  ref: http://foo.com
  `);

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

let formData = null;
if (cli.flags.f || cli.flags.form) {
  try {
    const formFilePath = path.resolve(cli.flags.f || fli.flags.form);
    formData = readFile(formFilePath);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  USER,
  ENDPOINT,
  DATA,
  formData,
  serverId: cli.flags.serverId,
  exec
};

function exec() {
  require('./api/identity');
  require('./api/compute');

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
          const property = cli.flags.g || cli.flags.get;
          api[command](property);
        } else {
          console.log(cli.help);
        }
    }
  } catch (err) {
    console.log(err);
  }
}

function readFile(filePath, message) {
  let content = null
  try {
    fs.accessSync(filePath, fs.F_OK);
    content = require(filePath);
  } catch (err) {
    message ? console.log(message) : console.log(err);
    process.exit(1);
  }
  return content;
}
