'use strict';
const get = require('lodash.get');
const pick = require('lodash.pick');
const conoha = require('./conoha');
const cli = require('./cli');
const defaultConfig = {
  filter: {
    dirname: null,
    props: 'body'
  },
  print: true
};

module.exports = class Command {
  constructor(command) {
    this.command = command;
    this._required = ['accessTokenId'];
    this._config = defaultConfig;
  }

  set required(arr) {
    try {
      this._required = this._required.concat(arr);
    } catch (err) {
      console.log(err);
    }
  }

  get requiredValues() {
    let values = {};
    this._required.forEach(prop => {
      const value = cli[prop] || cli.flags[prop] || conoha.DATA[prop];
      if (value) {
        values[prop] = value;
      }
    });
    return values;
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
        const index = requiredKeys.indexOf(prop);
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
    const configFilter = this._config.filter
                  || {
                       dirname: cli.flags.d || cli.flags.dirname,
                       props: (cli.flags.p || cli.flags.props).split(/\s*,\s*/)
                     }
                  || 'body';
    const target = configFilter.dirname
                   ? get(res, configFilter.dirname)
                   : res;
    const filtered = configFilter.props
                     ? pick(target, configFilter.props)
                     : target;
    return filtered;
  }
}
