import ora from 'ora';
import request from 'request';
import Endpoint from './endpoint';

export default function servers(user, serverId = null) {
  const endpoint = Endpoint.route('compute', user.tenantId);
  return {
    get(detail = false) {
      let url = `${endpoint}/servers`;
      if (serverId !== null) {
        url += `/${serverId}`;
      } else if (detail) {
        url += '/detail';
      }

      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: url,
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
    },

    add(form = {}) {
      console.log(JSON.stringify(form));
      const spinner = ora({
        text: 'Creating server...',
        color: 'cyan'
      }).start();
      return new Promise((resolve, reject) => {
        request({
          method: 'POST',
          url: `${endpoint}/servers`,
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': user.accessToken.id,
          },
          form: JSON.stringify(form)
        }, err => {
          if (err !== null) {
            spinner.fail();
            return reject(err);
          }

          spinner.text = 'Created server';
          spinner.succeed();
          resolve();
        });
      });
    },

    delete() {
      const spinner = ora({
        text: `Deleting ${serverId} server...`,
        color: 'cyan'
      }).start();
      return new Promise((resolve, reject) => {
        request({
          method: 'DELETE',
          url: `${endpoint}/servers/${serverId}`,
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': user.accessToken.id,
          }
        }, err => {
          if (err !== null) {
            spinner.fail();
            return reject(err);
          }

          spinner.text = `Deleted ${serverId} server`;
          spinner.succeed();
          resolve();
        });
      });
    }
  }
}
