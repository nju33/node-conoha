import _ from 'lodash';
import ora from 'ora';
import request from 'request';
import Endpoint from './endpoint';
import object from './object';

export default function container(user, containername) {
  const endpoint = Endpoint.route('os', user.tenantId);
  return {
    get() {
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: `${endpoint}/${containername}`,
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
            resolve({res, body});
          }
        });
      });
    },

    create(referrers) {
      referrers = _.flatten([referrers]).join(',');
      const headers = {
        Accept: 'application/json',
        'X-Auth-Token': user.accessToken.id,
        'X-Container-Read': ``
      };
      if (referrers) {
        Object.assign(headers, {
          'X-Container-Read': `.r:${referrers}`
        });
      }

      const spinner = ora({
        text: `Creating ${containername}...`,
        color: 'cyan'
      }).start();
      return new Promise((resolve, reject) => {
        request({
          method: 'PUT',
          url: `${endpoint}/${containername}`,
          headers: headers
        }, (err, res, body) => {
          if (err !== null) {
            spinner.fail();
            return reject(err);
          }

          spinner.text = `Created ${containername}`
          spinner.succeed();
          try {
            resolve({res, body: JSON.parse(body)});
          } catch (err) {
            resolve({res, body});
          }
        });
      });
    },

    publish(referrers = '*') {
      return this.create(referrers);
    },

    unpublish() {
      return this.create();
    },

    delete() {
      const spinner = ora({
        text: `Deleting ${containername}...`,
        color: 'cyan'
      }).start();
      return new Promise((resolve, reject) => {
        request({
          method: 'DELETE',
          url: `${endpoint}/${containername}`,
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': user.accessToken.id
          }
        }, (err, res, body) => {
          if (err !== null) {
            return reject(err);
          }

          spinner.text = `Deleted ${containername}`
          spinner.succeed();
          try {
            resolve({res, body: JSON.parse(body)});
          } catch (err) {
            resolve({res, body});
          }
        });
      });
    },

    object(objectname) {
      return object(user, containername, objectname);
    }
  };
};
