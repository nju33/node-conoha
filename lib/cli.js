'use strict';
const meow = require('meow');
const cli = meow(
  `
  Usage
    $ conoha <command> <options...>

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
    -f --form
       --server-id

  Examples
    $ conoha tokens
    {
      "access": {
        "token": {
          "issued_at": "...",
          "expires": "...",
          "id": "...",
  `, {
    alias: {
      f: 'form',
      g: 'get',
      i: 'inquirer'
    }
  });
module.exports = cli;

Object.assign(cli, {
  get serverId() {
    return cli.flags.serverId;
  },
  get form() {
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
    return formData;
  },
  get container() {
    return cli.flags.container;
  },
  get object() {
    return cli.flags.object;
  }
});
