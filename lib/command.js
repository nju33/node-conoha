'use strict';
const fs = require('fs');
const path = require('path');
const get = require('lodash.get');
const pick = require('lodash.pick');
const conoha = require('./conoha');
const cli = require('./cli');
const defaultConfig = {
  objectFilter: {
    dirname: null,
    props: 'body'
  },
  print: true
};

module.exports = class Command {
  constructor(command) {
    this.command = command;
    this._required = ['accessTokenId'];
    this._config = Object.assign({}, defaultConfig);
  }

  set required(arr) {
    try {
      this._required = this._required.concat(arr);
    } catch (err) {
      console.log(err);
    }
  }

  set objectFilter(filter) {
    this._config.objectFilter =
      Object.assign({}, this._config.objectFilter, filter);
  }

  get requiredValues() {
    let values = {};
    this._required.forEach(prop => {
      const value = cli[prop] || cli.flags[prop] || conoha.DATA[prop];
      if (prop === 'targetFile') {
        const filePath = `${process.cwd()}/${cli.flags.targetFile}`;
        console.log(filePath);
        values.formData = {
          my_file: fs.createReadStream(filePath)
        }
        return;
      }

      if (value) {
        values[prop] = value;
      }

    });
    console.log(values);
    return values;
  }

  transformProp(prop) {
    const alias = {
      accessTokenId: 'accessTokenId',
      form: 'form',
      serverId: 'serverId',
      container: 'container',
      object: 'object',
      targetFile: 'formData'
    };
    return alias[prop];
  }

  config(config) {
    Object.assign(this._config, config);
    return this;
  }

  exec(required) {
    return new Promise(resolve => {
      if (typeof required === 'undefined') {
        required = this.requiredValues;
      }
      if (typeof required !== 'object') {
        console.log(`${required} isn't object`);
        process.exit(1);
      }

      const requiredKeys = Object.keys(required) || [];
      const passed = this._required.every(prop => {
        const index = requiredKeys.indexOf(this.transformProp(prop));
        if (!~index) {
          console.log(`${prop} was required`);
          return false;
        }
        return true;
      });
      if (!passed) {
        process.exit(1);
      }

      this.command(required)
      .then(res => {
        const result = this.filter(res)
        if (this._config.print) {
          console.log(JSON.stringify(result, null, 2));
        }
        return resolve(result);
      })
      .catch(err => {
        console.log(err);
      })
    })
  }

  filter(res) {
    const objectFilter = this._config.objectFilter
                  || {
                       dirname: cli.flags.d || cli.flags.dirname,
                       props: (cli.flags.p || cli.flags.props).split(/\s*,\s*/)
                     }
    const target = objectFilter.dirname
                   ? get(res, objectFilter.dirname)
                   : res;
    const filtered = objectFilter.props
                     ? pick(target, objectFilter.props)
                     : target;
    return filtered;
  }
}
