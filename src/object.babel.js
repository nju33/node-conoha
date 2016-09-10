import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import ora from 'ora';
import chalk from 'chalk';
import request from 'request';
import Endpoint from './endpoint';

export default function object(user, containername, objectname) {
  const endpoint = Endpoint.route('os', user.tenantId);
  return {
    getStatus() {
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: `${endpoint}/${containername}/${encodeURIComponent(objectname)}`,
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

    upload(file) {
      const spinner = ora({
        text: `Uploading ${file} to ${containername}/${encodeURIComponent(objectname)}...`,
        color: 'cyan'
      }).start();
      return new Promise((resolve, reject) => {
        fs.createReadStream(file)
          .pipe(request({
            method: 'PUT',
            url: `${endpoint}/${containername}/${encodeURIComponent(objectname)}`,
            headers: {
              Accept: 'application/json',
              'X-Auth-Token': user.accessToken.id,
            }
          }, (err, res, body) => {
            if (err !== null) {
              spinner.fail();
              return reject(err);
            }

            spinner.text = `Uploaded! ${file}`;
            spinner.succeed();
            resolve();
          }));
      });
    },

    download(dirname) {
      const spinner = ora({
        text: `Downloading ${objectname}...`,
        color: 'cyan'
      }).start();
      return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: `${endpoint}/${containername}/${encodeURIComponent(objectname)}`,
          headers: {
            'X-Auth-Token': user.accessToken.id
          }
        }, (err, res, body) => {
          if (err !== null) {
            spinner.fail();
            return reject(err);
          }

          spinner.text = `Downloaded! ${objectname}`;
          spinner.succeed();
          resolve();
        }).pipe(fs.createWriteStream(path.resolve(dirname, objectname)));
      });
    },

    copy(dest) {
      const spinner = ora({
        text: `Copying ${containername}/${encodeURIComponent(objectname)} to ${dest}...`,
        color: 'cyan'
      }).start();

      return new Promise((resolve, reject) => {
        request({
          method: 'COPY',
          url: `${endpoint}/${containername}/${encodeURIComponent(objectname)}`,
          headers: {
            'X-Auth-Token': user.accessToken.id,
            'Destination': _.map(dest.split('/'), p => encodeURIComponent(p)).join('/')
          }
        }, (err, res, body) => {
          if (err !== null) {
            spinner.fail();
            return reject(err);
          }

          spinner.text = `Copied ${containername}/${encodeURIComponent(objectname)} to ${dest}`;
          spinner.succeed();
          resolve();
        });
      });
    },

    delete() {
      const spinner = ora({
        text: `Deleting ${containername}/${encodeURIComponent(objectname)}`,
        color: 'cyan'
      }).start();

      return new Promise((resolve, reject) => {
        request({
          method: 'DELETE',
          url: `${endpoint}/${containername}/${encodeURIComponent(objectname)}`,
          headers: {
            'X-Auth-Token': user.accessToken.id,
          }
        }, (err, res, body) => {
          if (err !== null) {
            spinner.fail();
            return reject(err);
          }

          spinner.text = `Deleted ${containername}/${encodeURIComponent(objectname)}`;
          spinner.succeed();
          resolve();
        });
      });
    },
  }
};
