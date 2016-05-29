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
  const command = new Command(os.process(':container'));
  command.required = ['container'];
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

(route => {
  os.routes = {containerUpload: (() => {
    const command = new Command(os.process(route, {method: 'PUT'}));
    command.required = ['container', 'object', 'targetFile'];
    return command;
  })()};

  os.routes = {containerDownload: (() => {
    const command = new Command(os.process(route));
    command.objectFilter = {props: null};
    command.required = ['container', 'object'];
    return command;
  })()};

  os.routes = {containerDelete: (() => {
    const command = new Command(os.process(route, {method: 'DELETE'}));
    command.required = ['container', 'object'];
    return command;
  })()};

  os.routes = {containerPublish: (() => {
    const command = new Command(os.process(route, {method: 'POST'}));
    command.required = ['container', 'object'];
    return command;
  })()};
})(':container/:object');
