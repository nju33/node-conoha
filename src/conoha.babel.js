import _ from 'lodash';
import identity from './identity';
import os from './os';

export default class Conoha {
  constructor(user) {
    this.user = user;
  }

  get identify() {
    return identity(this.user);
  }

  get os() {
    return os(this.user);
  }

  get objectStorage() {
    return os(this.user);
  }
}
