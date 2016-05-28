const API = require('../api');
const Command = require('../command');
const conoha = require('../conoha');

const identity = new API(conoha.ENDPOINT.identity);

identity.routes = {tokens: (() => {
  const process = identity.process('tokens', {method: 'POST'}, {
                    auth: {passwordCredentials: conoha.USER}
                  });
  const command = new Command(process);
  command._required = [];
  return command;
})()};
