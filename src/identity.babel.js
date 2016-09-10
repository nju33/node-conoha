// conoha.identity.token.get
// conoha.identity.version.get(true)

import _ from 'lodash';
import request from 'request';
import Endpoint from './endpoint';

export default function identity(user) {
  const endpoint = Endpoint.route('identity', user.tenantId);
  return {
    token: {
      get() {
        return new Promise((resolve, reject) => {
          const url = endpoint
          request({
            method: 'POST',
            url: `${endpoint}/tokens`,
            form: JSON.stringify({
              auth: {
                passwordCredentials: user
              },
            })
          }, (err, res, body) => {
            if (err !== null) {
              return reject(err);
            }
            body = JSON.parse(body);
            user.accessToken = body.access.token;
            resolve({res, body});
          });
        })
      }
    },
    version: {
      get(detail) {
      }
    }
  };
};
