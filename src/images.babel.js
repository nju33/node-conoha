import url from 'url';
import ora from 'ora';
import request from 'request';
import Endpoint from './endpoint';

export default function servers(user, query = {}) {
  const endpoint = Endpoint.route('compute', user.tenantId);
  return {
    get() {
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: (() => {
            const parsed = url.parse(`${endpoint}/images`);
            parsed.query = query;
            return url.format(parsed);
          })(),
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': user.accessToken.id,
          }
        }, (err, res, body) => {
          if (err !== null) {
            return reject(err);
          }

          try {
            resolve({res, body: JSON.parse(body)});
          } catch (err) {
            resolve({res, body});
          }
        });
      });
    }
  };
}
