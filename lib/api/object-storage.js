const API = require('../api');
const Command = require('../command');
const conoha = require('../conoha');
const cli = require('../cli');

const os = new API(conoha.ENDPOINT.objectStorage);

os.routes = {objectStorageInfo: (() => {
  const command = new Command(os.process(''));
  command.objectFilter = {props: null};
  return command;
})()};

os.routes = {containerInfo: (() => {
  const command = new Command(os.process('container'));
  return command;
})()};

os.routes = {addContainer: (() => {
  const command = new Command(os.process(':container', {method: 'PUT'}));
  command.required = ['container'];
  return command;
})()};

os.routes = {deleteContainer: (() => {
  const command = new Command(os.process(':container', {method: 'DELETE'}));
  command.required = ['container'];
  return command;
})()};
