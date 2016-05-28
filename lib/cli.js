'use strict';
const path = require('path');
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
const helper = require('./helper');

module.exports = cli;

Object.assign(cli, {
  form: () => {
    if (cli.flags.j || cli.flags.json) {
      let formData = null;
      if (cli.flags.j || cli.flags.json) {
        try {
          const jsonPath = path.resolve(cli.flags.j || fli.flags.json);
          formData = helper.readFile(jsonPath,
            `
            \`${jsonPath} doesn't exists\`
            `);
        } catch (err) {
          console.log(err);
          process.exit(1);
        }
      }
      return formData;
    }
    return cli.flags.f || cli.flags.form;
  }()
});
