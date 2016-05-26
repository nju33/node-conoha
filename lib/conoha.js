'use strict';
const request = require('request');
const meow = require('meow');
const cli = meow(
  `
  Usage
    $ conoha <input>

  Commands
    init
    list

  Options
    -h, --help Show help

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
identity.routes = {tokens: 'tokens'};

// const account = new API(ENDPOINT.account);
// account.routes = {items: 'order-items'};

module.exports = () => {
  try {
    const command = cli.input[0];
    if (command) {
      api[command].post(command, {auth: {passwordCredentials: USER}});
    } else {
      console.log(cli.help);
    }
  } catch (err) {
    console.log(err);
  }
}
