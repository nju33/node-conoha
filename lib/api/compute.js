const API = require('../api');
const conoha = require('../conoha');

const compute = new API(conoha.ENDPOINT.compute);

((accessTokenId, formData, serverId) => {
  if (accessTokenId) {
    compute.routes = {flavors: compute.process('flavors')};
    compute.routes = {servers: compute.process('servers')};
    if (formData) {
      compute.routes = {addServer: compute.process('servers', formData, {
        method: 'POST'
      })};
    }
    compute.routes = {serversDetail: compute.process('servers/detail')};
    compute.routes = {images: compute.process('images')};
    compute.routes = {isoImages: compute.process('iso-images')};

    if (serverId) {
      ((route) => {
        compute.routes = {serverInfo: compute.process(route)};
        compute.routes = {deleteServer: compute.process(route, {}, {
          method: 'DELETE'
        })};
    })(`servers/${serverId}`);
    }
  }
})(conoha.DATA.accessTokenId, conoha.formData, conoha.serverId);
