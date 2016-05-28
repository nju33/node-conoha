const API = require('../api');
const Command = require('../command');
const conoha = require('../conoha');

const compute = new API(conoha.ENDPOINT.compute);

compute.routes = {flavors: new Command(compute.process('flavors'))};
compute.routes = {servers: new Command(compute.process('servers'))};
compute.routes = {addServer: (() => {
  const command = new Command(compute.process('servers', {method: 'POST'}));
  command.required = ['form'];
  return command;
})()};
compute.routes = {serversDetail: (() => {
  return new Command(compute.process('servers/detail'));
})()};
compute.routes = {images: new Command(compute.process('images'))};
compute.routes = {isoImages: new Command(compute.process('iso-images'))};

(route => {
  compute.routes = {serverInfo: (() => {
    const command = new Command(compute.process(route));
    command.required = ['serverId'];
    return command;
  })()};
  compute.routes = {deleteServer: (() => {
    const command = new Command(compute.process(route, {method: 'DELETE'}));
    command.required = ['serverId'];
    return command;
  })()};
})('servers/:serverId');
