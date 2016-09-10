import request from 'request';
import Endpoint from './endpoint';
import container from './container';

export default function os(user) {
  const endpoint = Endpoint.route('os', user.tenantId);
  return {
    getStatus() {
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: endpoint,
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': user.accessToken.id
          }
        }, (err, res, body) => {
          if (err !== null) {
            return reject(err);
          }
          try {
            resolve({res, body: JSON.parse(body)});
          } catch (err) {
            resolve({res, body: body});
          }
        });
      });
    },

    container(containername) {
      return container(user, containername);
    },
  }
};
