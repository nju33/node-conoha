const meow = require('meow');
module.exports =  meow(
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
