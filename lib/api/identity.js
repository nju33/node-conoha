const API = require('../api');
const conoha = require('../conoha');

const identity = new API(conoha.ENDPOINT.identity);

identity.routes = {tokens: identity.  process('tokens', {
  auth: {passwordCredentials: conoha.USER}
}, {
  method: 'POST'
})};
